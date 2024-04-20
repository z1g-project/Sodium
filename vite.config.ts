import { defineConfig, BuildOptions } from 'vite'
import path from "path";
const resolve = path.resolve
const __dirname = path.resolve();
import { viteStaticCopy } from "vite-plugin-static-copy";
import { execSync } from "child_process";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { dynamicPath } from "@nebula-services/dynamic";
//@ts-ignore
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
//@ts-ignore
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
export default defineConfig({
  esbuild: {
    jsxInject: `import "dreamland/dev";`,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: `${uvPath}/**/*`.replace(/\\/g, "/"),
          dest: "ultra",
          overwrite: false
        },
        {
          src: `${epoxyPath}/**/*`.replace(/\\/g, "/"),
          dest: "epoxy",
          overwrite: false
        },
        {
          src: `${libcurlPath}/**/*`.replace(/\\/g, "/"),
          dest: "libcurl",
          overwrite: false
        },
        {
          src: `${dynamicPath}/dyn.*.js`.replace(/\\/g, "/"),
          dest: "dync",
          overwrite: false
        },
        {
          src: `${__dirname}/node_modules/localforage/dist/localforage.*.js`.replace(
            /\\/g,
            "/"
          ),
          dest: "localforage",
          overwrite: false
        }
      ]
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./components"),
    },
  },
  define: {
		__BUILD_DATE__: Date.now(),
		__GIT_COMMIT__: JSON.stringify(
			process.env.VERCEL_GIT_COMMIT_SHA ??
				process.env.CF_PAGES_COMMIT_SHA ??
				execSync("git rev-parse HEAD").toString().trim(),
		),
	},
});