// Search-engine metadata for every page, shared by the build-time prerenderer (scripts/prerender.mjs).
import { PROPERTIES, GAMES, APPS, TEAM } from './config.js';

export const SITE_URL = 'https://techomato.com';
export const SITE_NAME = 'Techomato';
const LIVE = APPS.filter((a) => a.status === 'available');

export const PAGES = {
  '/': {
    title: 'Techomato – Free Browser Games, Apps and Labs',
    description: `Techomato makes free 3D browser games, ${LIVE.length} everyday apps like Docs, Sheets, Slides and Video Studio, and a lab for new ideas. Nothing to install.`,
    keywords: 'Techomato, free browser games, online apps, web apps, online docs, online spreadsheet, online video editor, 3D games, Techomato Labs',
  },
  '/about': {
    title: 'About Techomato – Games, Software and Labs for the Web',
    description: 'Techomato builds free browser games, everyday web apps and experiments, founded by Koushik Mallik. Meet the team and the ideas behind Games, Softwares and Labs.',
    keywords: 'about Techomato, Techomato founder, Koushik Mallik, Techomato games, Techomato softwares, Techomato labs',
  },
};

const CATEGORY = {
  Office: 'BusinessApplication',
  Productivity: 'ProductivityApplication',
  Life: 'LifestyleApplication',
  Creative: 'DesignApplication',
  Studio: 'MultimediaApplication',
  Utilities: 'UtilitiesApplication',
  Developer: 'DeveloperApplication',
};

const orgId = `${SITE_URL}/#organization`;
const founder = TEAM[0];

const organization = {
  '@type': 'Organization',
  '@id': orgId,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
  description: PAGES['/'].description,
  founder: { '@type': 'Person', name: founder.name, jobTitle: founder.role },
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  description: PAGES['/'].description,
  inLanguage: 'en',
  publisher: { '@id': orgId },
};

export function jsonLd(path) {
  if (path === '/about') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        website,
        {
          '@type': 'AboutPage',
          '@id': `${SITE_URL}/about#webpage`,
          url: `${SITE_URL}/about`,
          name: PAGES['/about'].title,
          description: PAGES['/about'].description,
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': orgId },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'About us', item: `${SITE_URL}/about` },
          ],
        },
      ],
    };
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      website,
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: PAGES['/'].title,
        description: PAGES['/'].description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'ItemList',
        name: 'Techomato sites',
        itemListElement: PROPERTIES.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: `Techomato ${p.title}`, url: p.url })),
      },
      {
        '@type': 'ItemList',
        name: 'Techomato games',
        itemListElement: GAMES.map((g, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'VideoGame',
            name: g.title,
            url: g.url,
            genre: g.genre,
            description: g.tagline,
            image: `${SITE_URL}${g.cover}`,
            gamePlatform: 'Web browser',
            applicationCategory: 'GameApplication',
            operatingSystem: 'Any',
            publisher: { '@id': orgId },
          },
        })),
      },
      {
        '@type': 'ItemList',
        name: 'Techomato browser apps',
        itemListElement: LIVE.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'SoftwareApplication',
            name: `Techomato ${a.name}`,
            url: a.url,
            description: a.tagline,
            applicationCategory: CATEGORY[a.category] || 'UtilitiesApplication',
            operatingSystem: 'Any (web browser)',
            publisher: { '@id': orgId },
          },
        })),
      },
    ],
  };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Everything that goes in <head> for one page (title, description, canonical, social cards, structured data)
export function headTags(path) {
  const p = PAGES[path];
  const url = `${SITE_URL}${path === '/' ? '/' : path}`;
  const image = `${SITE_URL}/og.png`;
  return [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}" />`,
    `<meta name="keywords" content="${esc(p.keywords)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Techomato: games, softwares and labs in your browser" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(path)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');
}
