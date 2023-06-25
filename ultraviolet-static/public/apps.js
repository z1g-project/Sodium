"use strict";

/**
 * @type {HTMLButtonElement}
 */
const displus = document.getElementById("displus");

displus.addEventListener("click", async () => {
  try {
    await registerSW();
  } catch (err) {
    console.error("Failed to register service worker.", err);
    return;
  }

  const url = "https://www.openai.com"; // Replace with the desired URL
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});
