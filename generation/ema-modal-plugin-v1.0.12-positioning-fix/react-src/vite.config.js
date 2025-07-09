import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    // Output to the /dist folder in the plugin's root
    outDir: '../dist',
    assetsDir: '',
    rollupOptions: {
      input: resolve(__dirname, 'src/index.tsx'),
      output: {
        entryFileNames: 'ema-modal.js',
        assetFileNames: 'ema-modal.css'
      }
    }
  }
}); 