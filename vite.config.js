import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            components: resolve(__dirname, 'src/components'),
            helpers: resolve(__dirname, 'src/helpers'),
            store: resolve(__dirname, 'src/store'),
            api: resolve(__dirname, 'src/api'),
            constants: resolve(__dirname, 'src/constants'),
            assets: resolve(__dirname, 'src/assets'),
            styles: resolve(__dirname, 'src/styles'),
        },
    },
    server: {
        port: 3001,
    },
});
