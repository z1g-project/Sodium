// TODO

export interface BareTransport {
    init: () => Promise<void>;
    ready: boolean;
    connect: (
      url: URL,
      origin: string,
      protocols: string[],
      requestHeaders: BareHeaders,
      onopen: (protocol: string) => void,
      onmessage: (data: Blob | ArrayBuffer | string) => void,
      onclose: (code: number, reason: string) => void,
      onerror: (error: string) => void,
    ) => (data: Blob | ArrayBuffer | string) => void;
  
    request: (
      remote: URL,
      method: string,
      body: BodyInit | null,
      headers: BareHeaders,
      signal: AbortSignal | undefined
    ) => Promise<TransferrableResponse>;
  
    meta: () => BareMeta
  }