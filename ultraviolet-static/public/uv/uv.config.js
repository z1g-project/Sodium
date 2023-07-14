function customBareServer() {
  const cookieName = "bareServer";
  const localStorageKey = "bareServer";

  const cookieValue = getCookie(cookieName);

  if (cookieValue) {
    console.log("Custom bare server URL found in cookies:", cookieValue);
    return cookieValue;
  } else {
    const localStorageValue = localStorage.getItem(localStorageKey);
    if (localStorageValue) {
      console.log("Using custom bare server URL from localStorage:", localStorageValue);
      return localStorageValue;
    } else {
      console.log("Custom bare server URL not found. Falling back to default.");
      return "https://uv.studentportal.lol/";
    }
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

self.__uv$config = {
  prefix: "/uv/service/",
  bare: [
    "https://uv.studentportal.lol/",
    "https://uv.radon.games/",
    "https://uv.holyubofficial.net/",
    "https://nebulaproxy.io/bare/",
    "https://kazwire.com/bare/",
  ],
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/uv/uv.handler.js",
  client: "/uv/uv.client.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  sw: "/uv/uv.sw.js",
};
