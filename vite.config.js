import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'lib/main.js',
      name: 'cpage-ui',
      fileName: (format) => `cpage-ui.${format}.js`,
      formats: ['es'],
    },
    minify: false,
    target: 'esnext',
    rollupOptions: {
      external: ['lit'],
    },
  },
});