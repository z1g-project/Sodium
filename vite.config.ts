import { defineConfig, BuildOptions } from 'vite'
import path from "path";
const resolve = path.resolve
const __dirname = path.resolve();
export default defineConfig({
  esbuild: {
    jsxInject: `import "dreamland/dev";`,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./components"),
    },
  },
});