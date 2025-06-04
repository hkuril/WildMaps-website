import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // or '/habitat-web-map/' if deploying to subdirectory
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Proxy API calls to your local GEE backend
    },
  },
});

