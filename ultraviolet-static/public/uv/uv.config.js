self.__uv$config = {
  prefix: "/uv/service/",
  bare: [
    "https://uv.studentportal.lol/",
    "https://uv.radon.games/",
    "https://uv.holyubofficial.net/",
    "https://bare-server-repl.johnglynn2.repl.co/",
  ],
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/uv/uv.handler.js",
  client: "/uv/uv.client.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  sw: "/uv/uv.sw.js",
};

function customBareServer() {
  const cookieName = "bareServer";
  const localStorageKey = "bareServer";

  // Check if the custom bare server URL exists in cookies
  const cookieValue = getCookie(cookieName);

  if (cookieValue) {
    // Custom bare server URL found in cookies
    return cookieValue;
  } else {
    // Fallback to the value in localStorage
    const localStorageValue = localStorage.getItem(localStorageKey);
    return localStorageValue || "https://uv.studentportal.lol/";
  }
}

function getCookie(name) {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}
