import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ["package/**/*.vue", "package/**/*.ts"],
      staticImport: true,
      insertTypesEntry: true,
      copyDtsFiles: true,
      cleanVueFileName: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "package/index.ts"),
      name: "vue3-popover",
      fileName: (format) => `vue3-popover.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'vue3-popover.css';
          return assetInfo.name;
        },
      },
    },
  },
  resolve: {
    alias: {
      'vue3-popover/style.css': path.resolve(__dirname, 'package/popover.vue'),
    },
  },
});
