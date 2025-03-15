import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'src/renderer'), // Корневая директория для Vite
  build: {
    outDir: path.resolve(__dirname, 'dist/renderer'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './src/renderer/index.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
});
