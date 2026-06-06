import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repositoryBase = '/JavaBackendDeveloperTheory/';

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? repositoryBase : '/',
});
