// This file overwrites the stock UV config.js

self.__uv$config = {
  prefix: "/uv/service/",
  bare: "https://uv.holyubofficial.net/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "../uv.handler.js",
  client: "../uv.client.js",
  bundle: "../uv.bundle.js",
  config: "../uv.config.js",
  sw: "../uv.sw.js",
};
