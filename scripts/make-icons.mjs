// Regenerates the PNG icons and the social share image in public/ (run: npm run icons). Needs `sharp`.
import sharp from 'sharp';
import { resolve } from 'node:path';

const pub = resolve(import.meta.dirname, '..', 'public');
const tomato = (size, x = 0, y = 0) => `
  <g transform="translate(${x} ${y}) scale(${size / 34})">
    <circle cx="17" cy="19" r="14" fill="#C8381F"/>
    <path d="M13 5c2 2 6 2 8 0" stroke="#2F5D3A" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M12.5 15.5 9 19l3.5 3.5M21.5 15.5 25 19l-3.5 3.5" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

const icon = (px, pad) => `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 ${px} ${px}"><rect width="${px}" height="${px}" fill="#F5F2EC"/>${tomato(px - pad * 2, pad, pad)}</svg>`;

const chip = (x, label, color) => `
  <rect x="${x}" y="470" rx="30" width="${label.length * 21 + 64}" height="60" fill="${color}"/>
  <text x="${x + 32}" y="509" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#fff">${label}</text>`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F5F2EC"/>
  <rect x="0" y="560" width="1200" height="70" fill="#17181C"/>
  <text x="80" y="606" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#9CA0AB">games.techomato.com  ·  softwares.techomato.com  ·  labs.techomato.com</text>
  ${tomato(120, 80, 70)}
  <text x="226" y="170" font-family="Arial, Helvetica, sans-serif" font-size="84" font-weight="800" fill="#17181C">techomato</text>
  <text x="80" y="300" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="800" fill="#17181C">Free browser games,</text>
  <text x="80" y="380" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="800" fill="#C8381F">apps and labs.</text>
  <text x="80" y="440" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#45484F">Nothing to install. Opens in your browser.</text>
  ${chip(80, 'Games', '#C8381F')}${chip(280, 'Softwares', '#1F4FA8')}${chip(570, 'Labs', '#2F5D3A')}
</svg>`;

const png = (svg, file, w, h) => sharp(Buffer.from(svg)).resize(w, h).png({ compressionLevel: 9 }).toFile(resolve(pub, file));

await png(icon(512, 64), 'icon-512.png', 512, 512);
await png(icon(192, 24), 'icon-192.png', 192, 192);
await png(icon(180, 22), 'apple-touch-icon.png', 180, 180);
await png(og, 'og.png', 1200, 630);
console.log('icons written to public/');
