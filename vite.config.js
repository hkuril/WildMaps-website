import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  /* base: '/habitat-web-map/', */
  base: '/',
  plugins: [react()],
});
