<<<<<<< HEAD
export default defineConfig(({ mode }) => ({
  base: "/salary-slip-generator/",

=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
>>>>>>> 3d8a23148107b996e3ac154ea72caae82f997a8e
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
<<<<<<< HEAD

  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),

=======
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
>>>>>>> 3d8a23148107b996e3ac154ea72caae82f997a8e
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
