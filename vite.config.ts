import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile } from 'node:fs/promises'
import type { Plugin } from 'vite'

// Serve the same generated documents in development as in the Pages build.
function staticPages(): Plugin {
  return {
    name: 'static-reading-pages',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const url = new URL(request.url || '/', 'http://localhost');
        const path = url.pathname === '/index.html' ? '/' : url.pathname;
        const routes = ['/', '/about/', '/projects/', '/story/', '/robots.txt', '/sitemap.xml'];
        if (routes.includes(`${path}/`)) {
          response.writeHead(301, { Location: `${path}/${url.search}` });
          response.end();
          return;
        }
        if (!routes.includes(path)) return next();
        try {
          const renderer = await server.ssrLoadModule('/src/entry-static.tsx');
          const isRobots = path === '/robots.txt';
          const isSitemap = path === '/sitemap.xml';
          const template = await readFile(new URL('./index.html', import.meta.url), 'utf8');
          const content = isRobots ? renderer.renderRobots()
            : isSitemap ? renderer.renderSitemap()
            : await server.transformIndexHtml(path, renderer.renderDocument(template, path));
          response.setHeader('Content-Type', isRobots ? 'text/plain; charset=utf-8' : isSitemap ? 'application/xml; charset=utf-8' : 'text/html; charset=utf-8');
          response.end(content);
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ ssrBuild }) => ({
  plugins: [react(), staticPages()],
  publicDir: ssrBuild ? false : 'public',
  base: '/',
}))
