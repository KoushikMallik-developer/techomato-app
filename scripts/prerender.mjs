// Build step 3 of 3: turn the built single-page app into real HTML files that search engines can read.
//   vite build                                  -> dist/ (browser bundle + index.html template)
//   vite build --ssr ... --outDir dist-server   -> dist-server/entry-server.js
//   node scripts/prerender.mjs                  -> dist/index.html, dist/about/index.html, 404.html, sitemap.xml, robots.txt
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const { render, PAGES, headTags } = await import(pathToFileURL(resolve(root, 'dist-server/entry-server.js')).href);
const SITE_URL = 'https://techomato.com';

const template = readFileSync(resolve(dist, 'index.html'), 'utf8').replace(/<title>[\s\S]*?<\/title>\s*/, '');

const write = (file, html) => {
  const out = resolve(dist, file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log('prerendered', file, `${(html.length / 1024).toFixed(1)} kB`);
};
const page = (head, body) => template.replace('</head>', `    ${head}\n  </head>`).replace('<div id="root"></div>', `<div id="root">${body}</div>`);

for (const path of Object.keys(PAGES)) {
  write(path === '/' ? 'index.html' : `${path.slice(1)}/index.html`, page(headTags(path), render(path)));
}

// Unknown URLs get a real 404 status (Vercel serves 404.html) and are kept out of the index
write('404.html', page('<title>Page not found – Techomato</title>\n    <meta name="robots" content="noindex" />', render('/404')));

const today = new Date().toISOString().slice(0, 10);
const urls = Object.keys(PAGES).map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod><priority>${p === '/' ? '1.0' : '0.7'}</priority></url>`);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

rmSync(resolve(root, 'dist-server'), { recursive: true, force: true });
