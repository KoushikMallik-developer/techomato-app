# techomato-app
The Techomato home site (techomato.com). Promotes games.techomato.com, softwares.techomato.com and labs.techomato.com.

Same stack and design tokens as Techomato Games: Vite + React, warm paper / ink / tomato palette, Bricolage Grotesque + Instrument Sans.

```bash
npm install
npm run dev      # http://localhost:5173 (client-rendered, no SEO tags)
npm run build    # prerendered static site in dist/
npm run icons    # regenerate public/*.png and og.png (needs sharp)
```

Edit the promoted sites, games, team and founder note in `src/config.js`.

## SEO

`npm run build` runs three steps: the browser build, an SSR build of `src/entry-server.jsx`, then `scripts/prerender.mjs`. The last step writes real HTML for every page (`dist/index.html`, `dist/about/index.html`, `dist/404.html`) with the title, description, canonical URL, Open Graph / Twitter tags and JSON-LD from `src/seo.js`, plus `sitemap.xml` and `robots.txt`.

- To add a page: add it to `PAGES` in `src/seo.js`, render it in `src/App.jsx`, and it is prerendered and added to the sitemap automatically.
- The canonical domain is `SITE_URL` in `src/seo.js` (https://techomato.com).
- Unknown URLs return a real 404 with `noindex` (`cleanUrls` is on in `vercel.json`).
- After deploying: verify the domain in Google Search Console and submit `https://techomato.com/sitemap.xml`.
