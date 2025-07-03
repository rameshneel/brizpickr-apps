import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  build: {
    outDir: '../../dist/apps/customer-dashboard',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  plugins: [react(), nxViteTsPaths()],
  server: {
    port: 4200,
    host: 'localhost',
    open: true,
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
});
