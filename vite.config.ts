// This is used to compile client-side code.
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // This avoids deleting outDir server files
    // created using vite.config.server.js.
    emptyOutDir: false,

    rollupOptions: {
      input: {
        client: "src/hello-world.ts",
      },
      output: {
        // Default is "assets/{name}-{hash}.js" which we do not want.
        entryFileNames: "[name].js",
      },
    },
  },
});
