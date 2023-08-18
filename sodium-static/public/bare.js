var bareServer = localStorage.getItem('bareServer')

importScripts("/uv/uv.bundle.js");
importScripts("/uv/uv.config.js");
importScripts("/uv/uv.sw.js");

importScripts("/dynamic/dynamic.config.js");
importScripts("/dynamic/dynamic.worker.js");

const req = await fetch(bareServer + "/", {
  redirect: "follow"
});

self.__uv$config.bare = bareServer;
self.__dynamic$config.bare.path = bareServer;