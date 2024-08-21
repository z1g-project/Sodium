(function () {
  'use strict';

  // The user likely has overwritten all networking functions after importing bare-client
  // It is our responsibility to make sure components of Bare-Client are using native networking functions
  const Response = globalThis.Response;

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

  let currentTransport = null;
  let currentTransportName = "";
  const channel = new BroadcastChannel("bare-mux");
  channel.postMessage({ type: "refreshPort" });
  function noClients() {
      // @ts-expect-error mdn error constructor: new Error(message, options)
      return new Error("there are no bare clients", {
          cause: "No BareTransport was set. Try creating a BareMuxConnection and calling setTransport() or setManualTransport() on it before using BareClient."
      });
  }
  function handleRemoteClient(message, port) {
      const remote = currentTransport;
      let transferables = [port];
      if (message.fetch?.body)
          transferables.push(message.fetch.body);
      if (message.websocket?.channel)
          transferables.push(message.websocket.channel);
      remote.postMessage({ message, port }, transferables);
  }
  function handleConnection(port) {
      port.onmessage = async (event) => {
          const port = event.data.port;
          const message = event.data.message;
          if (message.type === "ping") {
              port.postMessage({ type: "pong" });
          }
          else if (message.type === "set") {
              try {
                  const AsyncFunction = (async function () { }).constructor;
                  if (message.client.function === "bare-mux-remote") {
                      currentTransport = message.client.args[0];
                      currentTransportName = `bare-mux-remote (${message.client.args[1]})`;
                  }
                  else {
                      // @ts-expect-error
                      const func = new AsyncFunction(message.client.function);
                      const [newTransport, name] = await func();
                      currentTransport = new newTransport(...message.client.args);
                      currentTransportName = name;
                  }
                  console.log("set transport to ", currentTransport, currentTransportName);
                  port.postMessage({ type: "set" });
              }
              catch (err) {
                  sendError(port, err, 'set');
              }
          }
          else if (message.type === "get") {
              port.postMessage({ type: "get", name: currentTransportName });
          }
          else if (message.type === "fetch") {
              try {
                  if (!currentTransport)
                      throw noClients();
                  if (currentTransport instanceof MessagePort) {
                      handleRemoteClient(message, port);
                      return;
                  }
                  if (!currentTransport.ready)
                      await currentTransport.init();
                  await handleFetch(message, port, currentTransport);
              }
              catch (err) {
                  sendError(port, err, 'fetch');
              }
          }
          else if (message.type === "websocket") {
              try {
                  if (!currentTransport)
                      throw noClients();
                  if (currentTransport instanceof MessagePort) {
                      handleRemoteClient(message, port);
                      return;
                  }
                  if (!currentTransport.ready)
                      await currentTransport.init();
                  await handleWebsocket(message, port, currentTransport);
              }
              catch (err) {
                  sendError(port, err, 'websocket');
              }
          }
      };
  }
  // @ts-expect-error
  self.onconnect = (event) => {
      handleConnection(event.ports[0]);
  };

})();
//# sourceMappingURL=worker.js.map
