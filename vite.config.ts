import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@configs": path.resolve(__dirname, "src/configs"),
      "@components": path.resolve(__dirname, "src/components"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@types-d": path.resolve(__dirname, "src/types"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@services": path.resolve(__dirname, "src/services"),
      "@sections": path.resolve(__dirname, "src/sections"),
    },
  },
});
