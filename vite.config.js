import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/cloudy_a",
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },
});
