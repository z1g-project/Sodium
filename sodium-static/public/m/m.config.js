// src/config.ts
var config = {
  prefix: "/route/",
  codec: self.$meteor_codecs.xor,
  debug: true,
  plugins: [
    {
      name: "exampleplugin",
      filter: /https:\/\/example.com*/g,
      async inject(ctx) {
        await ctx.injectHTML(`
          <meta name="meteor" content="meteor - epic proccy">
          <script x-inject="true" src="data:application/javascript,console.log('pneis')"><\/script>
          `);
      },
      async onRequest(request) {
        request.headers.set("X-Proxy", "Meteor");
        return request;
      },
      handleClient(window) {
        window.console.log("Meteor is running on the client!");
        const ws = new WebSocket("wss://echo.websocket.org/");
        ws.addEventListener("message", (e) => {
          console.log(e.data);
        });
      }
    }
  ],
  files: {
    client: "/meteor/meteor.client.js",
    worker: "/meteor/meteor.worker.js",
    bundle: "/meteor/meteor.bundle.js",
    codecs: "/meteor/meteor.codecs.js",
    config: "/meteor/meteor.config.js"
  }
};
self.$meteor_config = config;
export {
  config
};
