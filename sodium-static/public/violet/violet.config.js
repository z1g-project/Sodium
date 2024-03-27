/*global Ultraviolet*/
self.__uv$config = {
    prefix: '/violet/service/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/violet/violet.handler.js',
    client: '/violet/violet.client.js',
    bundle: '/violet/violet.bundle.js',
    config: '/violet/violet.config.js',
    sw: '/violet/violet.sw.js',
};
