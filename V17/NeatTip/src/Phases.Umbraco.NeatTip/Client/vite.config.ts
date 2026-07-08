import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/bundle.manifests.ts",
      formats: ["es"],
      fileName: "phases-umbraco-neat-tip",
    },
    outDir: "../wwwroot/App_Plugins/PhasesUmbracoNeatTip",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/],
    },
  },
  css: {
    devSourcemap: true,
  },
});
