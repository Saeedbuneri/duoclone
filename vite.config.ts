import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 5173,
        open: true,
    },
    // SPA fallback - redirect all routes to index.html
    appType: 'spa',
});
