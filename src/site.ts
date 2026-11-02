// Shared by the interactive UI and the static HTML build.
export const site = {
  url: 'https://www.athenaleong.com',
  name: "Athena's Playground",
  author: 'Athena Leong',
  description: 'Athena Leong creates magical experiences with technology and is building Outernet for everyday adventures. Explore her projects and playground.',
  shareTitle: "Athena's Personal Website",
  image: '/social-card.jpg',
  imageAlt: 'Athena’s Personal Website, illustrated as an AthenaOS window with her About, Projects, story, and Thought Garden icons.',
  social: [
    { label: 'GitHub', url: 'https://github.com/athenaleong' },
    { label: 'X / Twitter', url: 'https://x.com/athenamakes' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@athena.makes' },
  ],
  garden: 'https://garden.athenaleong.com',
  email: 'athenaleong619@gmail.com',
};

export const pages = {
  '/': {
    title: "Athena Leong | Athena's Playground",
    heading: 'Athena Leong',
    description: site.description,
  },
  '/about/': {
    title: "About Athena Leong | Athena's Playground",
    heading: 'About Athena Leong',
    description: 'Meet Athena Leong, building Outernet after creating education apps for 2M+ kids. She studied computer science and child development at UC Berkeley.',
  },
  '/projects/': {
    title: "Projects by Athena Leong | Athena's Playground",
    heading: 'Projects by Athena Leong',
    description: 'Explore Athena Leong’s projects: Pursuit, Finefood.institute, Ratatouille IRL, Wikiposter, Field Trip, creative technology, and playful experiments.',
  },
  '/story/': {
    title: "Curiosity, Play & My Story | Athena Leong",
    heading: 'Curiosity, play, and my story',
    description: 'Athena Leong on learning by making, creating digital experiences for children, curiosity, friendship, and a life of playful exploration.',
  },
};

export type PagePath = keyof typeof pages;

export const tabLinks: Record<string, string> = {
  about: '/about/',
  projects: '/projects/',
  '???': '/story/',
  garden: site.garden,
};
