/*global Ultraviolet*/
self.__uv$config = {
    prefix: '/sw/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/ultra/ultra.handler.js',
    client: '/ultra/ultra.client.js',
    bundle: '/ultra/ultra.bundle.js',
    config: '/ultra/ultra.config.js',
    sw: '/ultra/ultra.sw.js',
};
