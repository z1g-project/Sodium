self.__uv$config = {
  prefix: "/bruhprox/service/",
  bare: [
    "https://uv.studentportal.lol/",
    "https://uv.radon.games/",
    "https://uv.holyubofficial.net/",
    "https://tomp.app/",
    "https://flow-works.me/bare/"
  ],
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/bruhprox/uv.handler.js",
  client: "/bruhprox/uv.client.js",
  bundle: "/bruhprox/uv.bundle.js",
  config: "/bruhprox/uv.config.js",
  sw: "/bruhprox/uv.sw.js",
};
