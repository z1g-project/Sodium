/// <reference types="vite/client" />

declare const __BUILD_DATE__: number;
declare const __GIT_COMMIT__: string;
interface ImportMetaEnv {
	readonly VITE_WISP_SERVER: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}