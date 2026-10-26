import software from './softwareList.json';

export const SITE_NAME = 'Techomato';
export const TAGLINE = 'Games, softwares and labs. Built by Techomato.';

// The three Techomato sites. Each one is promoted in the hero, the nav, its own section and the footer.
export const PROPERTIES = [
  {
    id: 'games',
    title: 'Games',
    host: 'games.techomato.com',
    url: 'https://games.techomato.com',
    icon: 'gamepad',
    cta: 'Play now',
    tagline: 'Play in your browser.',
    cover: '/covers/ascendants.jpg',
    colors: ['#C8381F', '#5A1A10'],
  },
  {
    id: 'softwares',
    title: 'Softwares',
    host: 'softwares.techomato.com',
    url: 'https://softwares.techomato.com',
    icon: 'window',
    cta: 'Open apps',
    tagline: 'Everyday apps in your browser.',
    colors: ['#1F4FA8', '#0F2552'],
  },
  {
    id: 'labs',
    title: 'Labs',
    host: 'labs.techomato.com',
    url: 'https://labs.techomato.com',
    icon: 'flask',
    cta: 'Visit the labs',
    tagline: 'Experiments from the Techomato team.',
    colors: ['#2F5D3A', '#15301D'],
  },
];

// The people shown on the About page. Add a `role` or `bio` here to show more.
export const TEAM = [
  { name: 'Koushik Mallik', role: 'CEO and Founder', color: '#C8381F' },
];

// DRAFT founder words shown on the About page. Rewrite in the founder's own voice before launch.
export const FOUNDER_NOTE = {
  title: 'A note from the founder',
  paragraphs: [
    'I started Techomato with a simple belief: the best software and the best games should be one click away. No installers, no accounts to create before you can try something, no waiting.',
    'Everything you see on our three sites is built around that idea. Games you can play in a tab, apps that cover everyday work, and a lab where we try new things in the open.',
    'We are still growing, and we build with the people who use our products. If something can be faster, clearer or more fun, we want to hear about it.',
  ],
  quotes: [
    'If it takes more than a click to start, it is not finished.',
    'Your work belongs to you, so it should live on your device.',
    'Good tools should feel as friendly as good games.',
  ],
};

// Games on games.techomato.com (links go to /play/<id>).
export const GAMES = [
  { id: 'ascendants', title: 'Ascendants', genre: 'Battle Royale', badge: '50 players · Online', tagline: 'Anime-style battle royale for 50: fly, charge your ki, clash beams and be the last one standing.' },
  { id: 'horde-surge', title: 'Horde Surge', genre: 'Action', badge: 'Phone ready', tagline: 'Fire a crowd up the lane, multiply it through gates, smash bosses and storm the fortress.' },
  { id: 'core-breach', title: 'Core Breach', genre: 'Shooter', badge: '5v5 · Online', tagline: 'Tactical shooter with eight agents, buy rounds and a Core to plant, against bots or friends.' },
  { id: 'midnight-pursuit', title: 'Midnight Pursuit', genre: 'Racing', badge: 'Open world · Online', tagline: 'Open-world street racing with police pursuits, a Blacklist of rivals, cars and upgrades.' },
].map((g) => ({ ...g, url: `https://games.techomato.com/play/${g.id}`, cover: `/covers/${g.id}.jpg` }));

// Browser apps on softwares.techomato.com (links go to /#/app/<id>).
export const APPS = software.map((a) => ({ ...a, url: `https://softwares.techomato.com/#/app/${a.id}` }));
export const APP_CATEGORIES = ['All', ...new Set(APPS.filter((a) => a.status === 'available').map((a) => a.category))];
