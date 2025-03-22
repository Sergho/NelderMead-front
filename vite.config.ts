import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
	plugins: [react()],
	root: path.resolve(__dirname, './src/renderer'),
	base: './',
	build: {
		outDir: path.resolve(__dirname, './dist/renderer'),
		emptyOutDir: true,
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
