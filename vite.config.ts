import { defineConfig, BuildOptions } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'
const resolve = path.resolve
const __dirname = path.resolve();
export default defineConfig({
  esbuild: {
    jsxInject: `import "dreamland/dev";`,
  },
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        notfound: resolve(__dirname, '404.html'),
      },
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./components"),
    },
  },
});