import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import postcssPxToViewport from "postcss-px-to-viewport";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  css: {
    postcss: {
      plugins: [
        postcssPxToViewport({
          unitToConvert: 'px',
          viewportWidth: 750,
          unitPrecision: 6
        })
      ]
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url))
    }
  }

})
