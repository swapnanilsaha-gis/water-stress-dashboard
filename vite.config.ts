import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  // Absolute base. Required for client-side routing: with a relative base,
  // nested routes such as /prediction would resolve assets to
  // /prediction/assets/... and fail to load.
  base: "/",
});
