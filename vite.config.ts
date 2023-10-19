import react from '@vitejs/plugin-react';
import path from 'path';
import uno from 'unocss/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy as copy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    uno(),
    copy({
      targets: [
        { src: './_redirects', dest: '' },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
});

