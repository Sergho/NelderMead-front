import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, './src/client'),
  base: './',
  build: {
    outDir: path.resolve(__dirname, './dist/client'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './src/client/index.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
});
