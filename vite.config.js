import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'lib/main.js',
      name: 'bulma-wc',
      fileName: (format) => `bulma-wc.${format}.js`,
      formats: ['es'],
    },
    minify: false,
    target: 'esnext',
    rollupOptions: {
      external: ['lit'],
    },
  },
});