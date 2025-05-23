import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@electric-sql/pglite']
  },
  build: {
    rollupOptions: {
      external: ['*.wasm']
    },
    target: 'esnext',
    outDir: 'dist'
  },
  assetsInclude: ['**/*.wasm']
});
