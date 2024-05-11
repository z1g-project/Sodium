const factory = (key) => {
	const getShuffledAlphabet = () => {
		const alphabet =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
		return shuffle(alphabet, key);
	};
	const shuffle = (alphabet, key) => {
		const shuffledAlphabet = [...alphabet];

		for (let i = 0; i < key.length; i++) {
			const charCode = key.charCodeAt(i) % alphabet.length;
			const shiftAmount = charCode < 0 ? charCode + alphabet.length : charCode;

			for (let j = 0; j < alphabet.length; j++) {
				const newIndex = (j + shiftAmount) % alphabet.length;
				const temp = shuffledAlphabet[j];
				shuffledAlphabet[j] = shuffledAlphabet[newIndex];
				shuffledAlphabet[newIndex] = temp;
			}
		}

		return shuffledAlphabet.join("");
	};

	const base64Encode = (text) => {
		const shuffledAlphabet = getShuffledAlphabet();
		const alphabet =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		return [...btoa(text)]
			.map((char) => {
				const index = alphabet.indexOf(char);
				return index !== -1 ? shuffledAlphabet[index] : char;
			})
			.join("");
	};

	const base64Decode = (encodedText) => {
		const shuffledAlphabet = getShuffledAlphabet();
		const alphabet =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		return atob(
			[...encodedText]
				.map((char) => {
					const index = shuffledAlphabet.indexOf(char);
					return index !== -1 ? alphabet[index] : char;
				})
				.join(""),
		);
	};

	return {
		enc: base64Encode,
		dec: (encodedText) => {
			if (encodedText.includes("?")) {
				// biome-ignore lint:
				encodedText = base64Encode(
					`${base64Decode(encodedText.split("?")[0])}?${encodedText.split("?")[1]}`,
				);
				console.log(1);
			}
			return base64Decode(encodedText);
		},
	};
};

const key = (location.origin + navigator.userAgent).toUpperCase();
const cipher = factory(key);

self.__uv$config = {
    prefix: '/sw/',
    encodeUrl: cipher.enc,
	decodeUrl: cipher.dec,
    handler: '/ultra/uv.handler.js',
    client: '/ultra/uv.client.js',
    bundle: '/ultra/uv.bundle.js',
    config: '/ultra/uv.config.js',
    sw: '/ultra/uv.sw.js',
};
self.encoder = {
	encode: cipher.enc,
	decode: cipher.dec,
};