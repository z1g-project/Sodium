import { defineConfig } from "vite";
import path from "path";
const __dirname = path.resolve();
export default defineConfig({
  esbuild: {
    jsxInject: `import "@mercuryworkshop/alicejs";`,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});