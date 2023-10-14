import react from '@vitejs/plugin-react';
import path from 'path';
import uno from 'unocss/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ 
    react(),
    uno(),
  ],
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
});
