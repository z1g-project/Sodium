const maxRedirects = 20;

// The user likely has overwritten all networking functions after importing bare-client
// It is our responsibility to make sure components of Bare-Client are using native networking functions
const fetch = globalThis.fetch;
const WebSocket = globalThis.WebSocket;
const Request = globalThis.Request;
const Response = globalThis.Response;
const SharedWorker = globalThis.SharedWorker;
const localStorage = globalThis.localStorage;
const serviceWorker = globalThis.navigator.serviceWorker;
const WebSocketFields = {
    prototype: {
        send: WebSocket.prototype.send,
    },
    CLOSED: WebSocket.CLOSED,
    CLOSING: WebSocket.CLOSING,
    CONNECTING: WebSocket.CONNECTING,
    OPEN: WebSocket.OPEN,
};

async function searchForPort() {
    // @ts-expect-error
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    const promises = clients.map(async (x) => {
        const port = await tryGetPort(x);
        await testPort(port);
        return port;
    });
    const promise = Promise.race([Promise.any(promises), new Promise((_, reject) => setTimeout(reject, 1000, new TypeError("timeout")))]);
    try {
        return await promise;
    }
    catch (err) {
        if (err instanceof AggregateError) {
            console.error("bare-mux: failed to get a bare-mux SharedWorker MessagePort as all clients returned an invalid MessagePort.");
            throw new Error("All clients returned an invalid MessagePort.");
        }
        console.warn("bare-mux: failed to get a bare-mux SharedWorker MessagePort within 1s, retrying");
        return await searchForPort();
    }
}
function tryGetPort(client) {
    let channel = new MessageChannel();
    return new Promise(resolve => {
        client.postMessage({ type: "getPort", port: channel.port2 }, [channel.port2]);
        channel.port1.onmessage = event => {
            resolve(event.data);
        };
    });
}
function testPort(port) {
    const pingChannel = new MessageChannel();
    const pingPromise = new Promise((resolve, reject) => {
        pingChannel.port1.onmessage = event => {
            if (event.data.type === "pong") {
                resolve();
            }
        };
        setTimeout(reject, 1500);
    });
    port.postMessage({ message: { type: "ping" }, port: pingChannel.port2 }, [pingChannel.port2]);
    return pingPromise;
}
function createPort(path, registerHandlers) {
    const worker = new SharedWorker(path, "bare-mux-worker");
    if (registerHandlers) {
        // @ts-expect-error we are using snapshot.ts
        serviceWorker.addEventListener("message", (event) => {
            if (event.data.type === "getPort" && event.data.port) {
                console.debug("bare-mux: recieved request for port from sw");
                const newWorker = new SharedWorker(path, "bare-mux-worker");
                event.data.port.postMessage(newWorker.port, [newWorker.port]);
            }
        });
    }
    return worker.port;
}
let browserSupportsTransferringStreamsCache = null;
function browserSupportsTransferringStreams() {
    if (browserSupportsTransferringStreamsCache === null) {
        const chan = new MessageChannel();
        const stream = new ReadableStream();
        let res;
        try {
            chan.port1.postMessage(stream, [stream]);
            res = true;
        }
        catch (err) {
            res = false;
        }
        browserSupportsTransferringStreamsCache = res;
        return res;
    }
    else {
        return browserSupportsTransferringStreamsCache;
    }
}
class WorkerConnection {
    constructor(worker) {
        this.channel = new BroadcastChannel("bare-mux");
        if (worker instanceof MessagePort) {
            this.port = worker;
        }
        else {
            this.createChannel(worker, true);
        }
    }
    createChannel(workerPath, inInit) {
        // @ts-expect-error
        if (self.clients) {
            // running in a ServiceWorker
            // ask a window for the worker port, register for refreshPort
            this.port = searchForPort();
            this.channel.onmessage = (event) => {
                if (event.data.type === "refreshPort") {
                    this.port = searchForPort();
                }
            };
        }
        else if (workerPath && SharedWorker) {
            // running in a window, was passed a workerPath
            // create the SharedWorker and help other bare-mux clients get the workerPath
            if (!workerPath.startsWith("/") && !workerPath.includes("://"))
                throw new Error("Invalid URL. Must be absolute or start at the root.");
            this.port = createPort(workerPath, inInit);
            console.debug("bare-mux: setting localStorage bare-mux-path to", workerPath);
            localStorage["bare-mux-path"] = workerPath;
        }
        else if (SharedWorker) {
            // running in a window, was not passed a workerPath
            // use sessionStorage for the workerPath
            const path = localStorage["bare-mux-path"];
            console.debug("bare-mux: got localStorage bare-mux-path:", path);
            if (!path)
                throw new Error("Unable to get bare-mux workerPath from localStorage.");
            this.port = createPort(path, inInit);
        }
        else {
            // SharedWorker does not exist
            throw new Error("Unable to get a channel to the SharedWorker.");
        }
    }
    async sendMessage(message, transferable) {
        if (this.port instanceof Promise)
            this.port = await this.port;
        try {
            await testPort(this.port);
        }
        catch {
            console.warn("bare-mux: Failed to get a ping response from the worker within 1.5s. Assuming port is dead.");
            this.createChannel();
            return await this.sendMessage(message, transferable);
        }
        const channel = new MessageChannel();
        const toTransfer = [channel.port2, ...(transferable || [])];
        const promise = new Promise((resolve, reject) => {
            channel.port1.onmessage = event => {
                const message = event.data;
                if (message.type === "error") {
                    reject(message.error);
                }
                else {
                    resolve(message);
                }
            };
        });
        this.port.postMessage({ message: message, port: channel.port2 }, toTransfer);
        return await promise;
    }
}

function sendError(port, err, name) {
    console.error(`error while processing '${name}': `, err);
    port.postMessage({ type: "error", error: err });
}
async function handleFetch(message, port, transport) {
    const resp = await transport.request(new URL(message.fetch.remote), message.fetch.method, message.fetch.body, message.fetch.headers, null);
    if (!browserSupportsTransferringStreams() && resp.body instanceof ReadableStream) {
        const conversionResp = new Response(resp.body);
        resp.body = await conversionResp.arrayBuffer();
    }
    if (resp.body instanceof ReadableStream || resp.body instanceof ArrayBuffer) {
        port.postMessage({ type: "fetch", fetch: resp }, [resp.body]);
    }
    else {
        port.postMessage({ type: "fetch", fetch: resp });
    }
}
async function handleWebsocket(message, port, transport) {
    const onopen = (protocol) => {
        message.websocket.channel.postMessage({ type: "open", args: [protocol] });
    };
    const onclose = (code, reason) => {
        message.websocket.channel.postMessage({ type: "close", args: [code, reason] });
    };
    const onerror = (error) => {
        message.websocket.channel.postMessage({ type: "error", args: [error] });
    };
    const onmessage = (data) => {
        if (data instanceof ArrayBuffer) {
            message.websocket.channel.postMessage({ type: "message", args: [data] }, [data]);
        }
        else {
            message.websocket.channel.postMessage({ type: "message", args: [data] });
        }
    };
    const [data, close] = transport.connect(new URL(message.websocket.url), message.websocket.origin, message.websocket.protocols, message.websocket.requestHeaders, onopen, onmessage, onclose, onerror);
    message.websocket.channel.onmessage = (event) => {
        if (event.data.type === "data") {
            data(event.data.data);
        }
        else if (event.data.type === "close") {
            close(event.data.closeCode, event.data.closeReason);
        }
    };
    port.postMessage({ type: "websocket" });
}

const validChars = "!#$%&'*+-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~";
function validProtocol(protocol) {
    for (let i = 0; i < protocol.length; i++) {
        const char = protocol[i];
        if (!validChars.includes(char)) {
            return false;
        }
    }
    return true;
}
const wsProtocols = ['ws:', 'wss:'];
const statusEmpty = [101, 204, 205, 304];
const statusRedirect = [301, 302, 303, 307, 308];
class BareMuxConnection {
    constructor(workerPath) {
        this.worker = new WorkerConnection(workerPath);
    }
    async getTransport() {
        return (await this.worker.sendMessage({ type: "get" })).name;
    }
    async setTransport(path, options, transferables) {
        await this.setManualTransport(`
			const { default: BareTransport } = await import("${path}");
			return [BareTransport, "${path}"];
		`, options, transferables);
    }
    async setManualTransport(functionBody, options, transferables) {
        if (functionBody === "bare-mux-remote")
            throw new Error("Use setRemoteTransport.");
        await this.worker.sendMessage({
            type: "set",
            client: {
                function: functionBody,
                args: options,
            },
        }, transferables);
    }
    async setRemoteTransport(transport, name) {
        const channel = new MessageChannel();
        channel.port1.onmessage = async (event) => {
            const port = event.data.port;
            const message = event.data.message;
            if (message.type === "fetch") {
                try {
                    if (!transport.ready)
                        await transport.init();
                    await handleFetch(message, port, transport);
                }
                catch (err) {
                    sendError(port, err, "fetch");
                }
            }
            else if (message.type === "websocket") {
                try {
                    if (!transport.ready)
                        await transport.init();
                    await handleWebsocket(message, port, transport);
                }
                catch (err) {
                    sendError(port, err, "websocket");
                }
            }
        };
        await this.worker.sendMessage({
            type: "set",
            client: {
                function: "bare-mux-remote",
                args: [channel.port2, name]
            },
        }, [channel.port2]);
    }
    getInnerPort() {
        return this.worker.port;
    }
}
class BareClient {
    /**
     * Create a BareClient. Calls to fetch and connect will wait for an implementation to be ready.
     */
    constructor(worker) {
        this.worker = new WorkerConnection(worker);
    }
    createWebSocket(remote, protocols = [], webSocketImpl, requestHeaders, arrayBufferImpl) {
        try {
            remote = new URL(remote);
        }
        catch (err) {
            throw new DOMException(`Faiiled to construct 'WebSocket': The URL '${remote}' is invalid.`);
        }
        if (!wsProtocols.includes(remote.protocol))
            throw new DOMException(`Failed to construct 'WebSocket': The URL's scheme must be either 'ws' or 'wss'. '${remote.protocol}' is not allowed.`);
        if (!Array.isArray(protocols))
            protocols = [protocols];
        protocols = protocols.map(String);
        for (const proto of protocols)
            if (!validProtocol(proto))
                throw new DOMException(`Failed to construct 'WebSocket': The subprotocol '${proto}' is invalid.`);
        let wsImpl = (webSocketImpl || WebSocket);
        const socket = new wsImpl("ws://127.0.0.1:1", protocols);
        let fakeProtocol = '';
        let fakeReadyState = WebSocketFields.CONNECTING;
        let initialErrorHappened = false;
        socket.addEventListener("error", (e) => {
            if (!initialErrorHappened) {
                fakeReadyState = WebSocket.CONNECTING;
                e.stopImmediatePropagation();
                initialErrorHappened = true;
            }
        });
        let initialCloseHappened = false;
        socket.addEventListener("close", (e) => {
            if (!initialCloseHappened) {
                e.stopImmediatePropagation();
                initialCloseHappened = true;
            }
        });
        // TODO socket onerror will be broken
        arrayBufferImpl = arrayBufferImpl || wsImpl.constructor.constructor("return ArrayBuffer")().prototype;
        requestHeaders = requestHeaders || {};
        requestHeaders['Host'] = (new URL(remote)).host;
        // requestHeaders['Origin'] = origin;
        requestHeaders['Pragma'] = 'no-cache';
        requestHeaders['Cache-Control'] = 'no-cache';
        requestHeaders['Upgrade'] = 'websocket';
        // requestHeaders['User-Agent'] = navigator.userAgent;
        requestHeaders['Connection'] = 'Upgrade';
        const onopen = (protocol) => {
            fakeReadyState = WebSocketFields.OPEN;
            fakeProtocol = protocol;
            socket.meta = {
                headers: {
                    "sec-websocket-protocol": protocol,
                }
            }; // what the fuck is a meta
            socket.dispatchEvent(new Event("open"));
        };
        const onmessage = async (payload) => {
            if (typeof payload === "string") {
                socket.dispatchEvent(new MessageEvent("message", { data: payload }));
            }
            else if ("byteLength" in payload) {
                if (socket.binaryType === "blob") {
                    payload = new Blob([payload]);
                }
                else {
                    Object.setPrototypeOf(payload, arrayBufferImpl);
                }
                socket.dispatchEvent(new MessageEvent("message", { data: payload }));
            }
            else if ("arrayBuffer" in payload) {
                if (socket.binaryType === "arraybuffer") {
                    payload = await payload.arrayBuffer();
                    Object.setPrototypeOf(payload, arrayBufferImpl);
                }
                socket.dispatchEvent(new MessageEvent("message", { data: payload }));
            }
        };
        const onclose = (code, reason) => {
            fakeReadyState = WebSocketFields.CLOSED;
            socket.dispatchEvent(new CloseEvent("close", { code, reason }));
        };
        const onerror = () => {
            fakeReadyState = WebSocketFields.CLOSED;
            socket.dispatchEvent(new Event("error"));
        };
        const channel = new MessageChannel();
        channel.port1.onmessage = event => {
            if (event.data.type === "open") {
                onopen(event.data.args[0]);
            }
            else if (event.data.type === "message") {
                onmessage(event.data.args[0]);
            }
            else if (event.data.type === "close") {
                onclose(event.data.args[0], event.data.args[1]);
            }
            else if (event.data.type === "error") {
                onerror( /* event.data.args[0] */);
            }
        };
        this.worker.sendMessage({
            type: "websocket",
            websocket: {
                url: remote.toString(),
                origin: origin,
                protocols: protocols,
                requestHeaders: requestHeaders,
                channel: channel.port2,
            },
        }, [channel.port2]);
        // protocol is always an empty before connecting
        // updated when we receive the metadata
        // this value doesn't change when it's CLOSING or CLOSED etc
        const getReadyState = () => fakeReadyState;
        // we have to hook .readyState ourselves
        Object.defineProperty(socket, 'readyState', {
            get: getReadyState,
            configurable: true,
            enumerable: true,
        });
        /**
         * @returns The error that should be thrown if send() were to be called on this socket according to the fake readyState value
         */
        const getSendError = () => {
            const readyState = getReadyState();
            if (readyState === WebSocketFields.CONNECTING)
                return new DOMException("Failed to execute 'send' on 'WebSocket': Still in CONNECTING state.");
        };
        // we have to hook .send ourselves
        // use ...args to avoid giving the number of args a quantity
        // no arguments will trip the following error: TypeError: Failed to execute 'send' on 'WebSocket': 1 argument required, but only 0 present.
        socket.send = function (...args) {
            const error = getSendError();
            if (error)
                throw error;
            let data = args[0];
            // @ts-expect-error idk why it errors?
            if (data.buffer)
                data = data.buffer;
            channel.port1.postMessage({ type: "data", data: data }, data instanceof ArrayBuffer ? [data] : []);
        };
        socket.close = function (code, reason) {
            channel.port1.postMessage({ type: "close", closeCode: code, closeReason: reason });
        };
        Object.defineProperty(socket, 'url', {
            get: () => remote.toString(),
            configurable: true,
            enumerable: true,
        });
        const getProtocol = () => fakeProtocol;
        Object.defineProperty(socket, 'protocol', {
            get: getProtocol,
            configurable: true,
            enumerable: true,
        });
        return socket;
    }
    async fetch(url, init) {
        // Only create an instance of Request to parse certain parameters of init such as method, headers, redirect
        // But use init values whenever possible
        const req = new Request(url, init);
        // try to use init.headers because it may contain capitalized headers
        // furthermore, important headers on the Request class are blocked...
        // we should try to preserve the capitalization due to quirks with earlier servers
        const inputHeaders = init?.headers || req.headers;
        const headers = inputHeaders instanceof Headers
            ? Object.fromEntries(inputHeaders)
            : inputHeaders;
        const body = req.body;
        let urlO = new URL(req.url);
        if (urlO.protocol.startsWith('blob:')) {
            const response = await fetch(urlO);
            const result = new Response(response.body, response);
            result.rawHeaders = Object.fromEntries(response.headers);
            result.rawResponse = response;
            return result;
        }
        for (let i = 0;; i++) {
            if ('host' in headers)
                headers.host = urlO.host;
            else
                headers.Host = urlO.host;
            let resp = (await this.worker.sendMessage({
                type: "fetch",
                fetch: {
                    remote: urlO.toString(),
                    method: req.method,
                    headers: headers,
                    body: body || undefined,
                },
            }, body ? [body] : [])).fetch;
            let responseobj = new Response(statusEmpty.includes(resp.status) ? undefined : resp.body, {
                headers: new Headers(resp.headers),
                status: resp.status,
                statusText: resp.statusText,
            });
            responseobj.rawHeaders = resp.headers;
            responseobj.rawResponse = new Response(resp.body);
            responseobj.finalURL = urlO.toString();
            const redirect = init?.redirect || req.redirect;
            if (statusRedirect.includes(responseobj.status)) {
                switch (redirect) {
                    case 'follow': {
                        const location = responseobj.headers.get('location');
                        if (maxRedirects > i && location !== null) {
                            urlO = new URL(location, urlO);
                            continue;
                        }
                        else
                            throw new TypeError('Failed to fetch');
                    }
                    case 'error':
                        throw new TypeError('Failed to fetch');
                    case 'manual':
                        return responseobj;
                }
            }
            else {
                return responseobj;
            }
        }
    }
}

export { BareClient, BareMuxConnection, WebSocketFields, WorkerConnection, browserSupportsTransferringStreams, BareClient as default, maxRedirects, validProtocol };
//# sourceMappingURL=index.mjs.map
