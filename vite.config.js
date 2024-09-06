import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist", // Output directory for production build
    emptyOutDir: true, // Cleans the output directory before building
  },
  server: {
    port: 3000, // Port to run the dev server on
    open: true, // Automatically open the app in the browser
    strictPort: true, // Exit if the specified port is already in use
  },
  plugins: [],
  resolve: {
    alias: {
      "@": "/src", // Example: Alias @ to the /src folder
    },
  },
});
