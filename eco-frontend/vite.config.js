import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {

      '@contexts': '/src/contexts',
      '@pages': '/src/pages',
      '@assets': '/src/assets',
      // '@layout': '/src/layout',
      // '@modules': '/src/modules',
      // '@lib': '/src/lib',
      // '@redux-utils': '/src/redux-utils',
    },
  },
})
