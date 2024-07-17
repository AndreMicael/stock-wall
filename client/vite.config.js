import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// Carrega as variáveis de ambiente do arquivo .env


export default defineConfig({
  plugins: [react()],

});
