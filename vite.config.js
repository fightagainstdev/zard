import { defineConfig } from 'vite';

export default defineConfig({
  base: '/zard',
  build: {
    rollupOptions: {
      input: '/main.js',
    },
  },
});
