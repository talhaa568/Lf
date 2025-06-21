import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://staging-laundry-free-cdd931a42c66.herokuapp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    host: true, // This tells Vite to listen on all network interfaces
    // port: 5173, // Optional: You can specify a different port if 5173 is busy
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
