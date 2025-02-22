import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      "/api": "http://pmsbacke-env.eba-ye4gzvts.ap-south-1.elasticbeanstalk.com",
    },
  },
});
