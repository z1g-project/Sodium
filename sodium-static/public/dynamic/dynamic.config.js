self.__dynamic$config = {
  prefix: '/service/',
  encoding: 'aes',
  mode: 'production',
  logLevel: 3,
  bare: {
    version: 2,
    path: "https://uv.studentportal.lol/", "https://uv.radon.games/" : "https://uv.holyubofficial.net/", "https://tomp.app/" : "https://flow-works.me/bare/"
  },
  tab: {
    title: 'Service',
    icon: null,
    ua: null,
  },
  assets: {
    prefix: '/dynamic/',
    files: {
      handler: '/dynamic/dynamic.handler.js',
      client: '/dynamic/dynamic.client.js',
      worker: '/dynamic/dynamic.worker.js',
      config: '/dynamic/dynamic.config.js',
      inject: null,
    }
  },
  block: [
  
  ]
};