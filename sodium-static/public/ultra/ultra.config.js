/*global Ultraviolet*/
self.__uv$config = {
    /**
     * The prefix for ultra (Ultraviolet) resources.
     * @type {string}
     */
    prefix: '/sw/',

    /**
     * The bare path.
     * @type {string}
     */
    bare: [
        "https://phantomnetwork.cloud/bare/"
        // Using a backend? Use this instead of Tomp.app:
        // "/bare1/",
        // "/bare2/",
        // "/bare3/",
    ],

    /**
     * Function to encode URLs using Ultraviolet's XOR codec.
     * @type {function}
     * @param {string} url - The URL to encode.
     * @returns {string} The encoded URL.
     */
    encodeUrl: Ultraviolet.codec.xor.encode,

    /**
     * Function to decode URLs using Ultraviolet's XOR codec.
     * @type {function}
     * @param {string} url - The URL to decode.
     * @returns {string} The decoded URL.
     */
    decodeUrl: Ultraviolet.codec.xor.decode,

    /**
     * The handler path.
     * @type {string}
     */
    handler: '/ultra/ultra.handler.js',

    /**
     * The client path.
     * @type {string}
     */
    client: '/ultra/ultra.client.js',

    /**
     * The bundle path.
     * @type {string}
     */
    bundle: '/ultra/ultra.bundle.js',

    /**
     * The config path.
     * @type {string}
     */
    config: '/ultra/ultra.config.js',

    /**
     * The service worker path.
     * @type {string}
     */
    sw: '/ultra/ultra.sw.js',

    /**
     * Function to inject scripts into the doc Head
     * @type {function}
     * @param {URL} url - The URL for the rewrite function.
     * @returns {string} - The script to inject.
     */
    inject: async (url) => {
        if (url.host === 'discord.com') {
            return `
                <script src="https://raw.githubusercontent.com/Vencord/builds/main/browser.js"></script>
                <link rel="stylesheet" href="https://raw.githubusercontent.com/Vencord/builds/main/browser.css">
              `;
        }

        return ``;
    },
};
