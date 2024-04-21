/*global Ultraviolet*/
self.__uv$config = {
    prefix: '/sw/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/ultra/uv.handler.js',
    client: '/ultra/uv.client.js',
    bundle: '/ultra/uv.bundle.js',
    config: '/ultra/uv.config.js',
    sw: '/ultra/uv.sw.js',
};
