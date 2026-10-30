import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { pages, renderDocument, renderRobots, renderSitemap } from '../.prerender/entry-static.js';

const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
for (const path of Object.keys(pages)) {
  const directory = new URL(`../dist${path}`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), renderDocument(template, path));
}
await writeFile(new URL('../dist/robots.txt', import.meta.url), renderRobots());
await writeFile(new URL('../dist/sitemap.xml', import.meta.url), renderSitemap());
console.log(`Pre-rendered ${Object.keys(pages).length} pages, robots.txt, and sitemap.xml.`);
