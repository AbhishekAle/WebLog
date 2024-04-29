import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Configure MIME types
    mimeTypes: {
      // Add MIME type for JavaScript files
      "text/javascript": ["js"],
    },
  },
});
