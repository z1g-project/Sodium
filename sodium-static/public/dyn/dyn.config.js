self.__dynamic$config = {
  prefix: '/service/',
  encoding: 'xor',
  mode: 'production',
  logLevel: 3,
  bare: {
    version: 3,
    path: "https://server2.flow-works.me/bare/"
  },
  tab: {
    title: 'Service',
    icon: null,
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Sodium/2.0.0',
  },
  assets: {
    prefix: '/dyn/',
    files: {
      handler: 'dyn.handler.js',
      client: 'dyn.client.js',
      worker: 'dyn.worker.js',
      config: 'dyn.config.js',
      inject: null,
    }
  },
  block: [
  
  ]
};
