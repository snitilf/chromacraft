import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Vite automatically exposes env variables prefixed with VITE_ to import.meta.env
  // So VITE_API_KEY in .env will be available as import.meta.env.VITE_API_KEY
});