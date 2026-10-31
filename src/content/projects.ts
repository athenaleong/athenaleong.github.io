import { guinnessPress, pursuitPress, ratatouillePress, type PressLink } from './press';

type ProjectLink = { label: string; href: string };
type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    imageFit?: 'contain';
    imageAspectRatio?: string;
    imageBackground?: string;
    links?: ProjectLink[];
    press?: PressLink[];
};

export const projects: Project[] = [
    {
        id: 'pursuit',
        title: 'Pursuit',
        description: "A month-long city-wide scavenger hunt around San Francisco! 1.5% of SF's population participated. We did it three times.",
        image: '/projects/pursuit.png',
        imageAlt: 'Pursuit scavenger hunt mascot',
        imageFit: 'contain',
        links: [{ label: 'sfpursuit.org', href: 'https://www.sfpursuit.org' }],
        press: pursuitPress,
    },
    {
        id: 'ratatouille',
        title: 'Ratatouille IRL',
        description: 'An animatronic Remy that improves your culinary skills through electric shocks.',
        image: '/projects/ratatouille.jpeg',
        imageAlt: 'Athena wearing her animatronic Remy',
        links: [
            { label: 'Demo', href: 'https://www.tiktok.com/@athena.makes/video/7425750355796921630' },
            { label: 'Internet Archive talk', href: 'https://youtu.be/Y0HBiyo3W48?si=2MYcK-P-ToaqMS30&t=1226' },
        ],
        press: ratatouillePress,
    },
    {
        id: 'guinness-world-record',
        title: 'Guinness World Record',
        description: 'My friend Sevy and I went on a side quest and set a Guinness World Record for the fastest two-person build of the LEGO World Map, the largest LEGO set by piece count.',
        image: '/projects/guinness-world-record.jpg',
        imageAlt: 'Sevy Swift and Athena Leong holding their Guinness World Records certificates beneath their completed LEGO World Map',
        imageAspectRatio: '3 / 4',
        press: guinnessPress,
    },
    {
        id: 'finefood',
        title: 'Finefood.institute',
        description: 'I roped in 20 friends to scientifically rank ALL the croissants in San Francisco. Double blind.',
        image: '/projects/croissant.jpg',
        imageAlt: 'Croissant ranking study',
        links: [{ label: 'finefood.institute', href: 'https://www.finefood.institute' }],
    },
    {
        id: 'wikiposter',
        title: 'Wikiposter',
        description: 'Turn Wikipedia rabbit holes into posters. Collect images, arrange them, and share what you love.',
        image: '/projects/wikiposter.jpg',
        imageAlt: 'The Wikiposter gallery, with posters about mushrooms, lighthouses, and childhood favorites',
        links: [{ label: 'wikiposter.athenaleong.com', href: 'https://wikiposter.athenaleong.com/' }],
    },
    {
        id: 'obsidian',
        title: 'Obsidian Spaced Repetition',
        description: 'Plugin that enables flashcards with Anki-like spaced repetition in Obsidian.',
        image: '/projects/obsidian.png',
        imageAlt: 'Obsidian spaced repetition plugin',
        imageFit: 'contain',
        imageBackground: '#080808',
        links: [
            { label: 'Obsidian plugin', href: 'https://obsidian.md/plugins?id=spaced-repetition-ai' },
            { label: 'Demo', href: 'https://x.com/athenamakes/status/1881219693736042872' },
        ],
    },
    {
        id: 'field-trip',
        title: 'Field Trip',
        description: "AI walking guides that pull fascinating stories from whatever's around you. Turn every walk into an adventure!",
        image: '/projects/field-trip.jpeg',
        imageAlt: 'Field Trip AI walking guide in front of a historic building',
        links: [{ label: 'Demo', href: 'https://x.com/athenamakes/status/1600990306056687617' }],
    },
    {
        id: 'mirror-of-erised',
        title: 'Mirror of Erised',
        description: 'An interactive art exhibition that makes your dreams feel real. Exhibited at Fidget Camp 2025.',
        image: '/projects/erised.jpg',
        imageAlt: 'Mirror of Erised art exhibition',
    },
];

export const collegeProjects = [
    { title: 'Phyzmo', description: 'Motion tracking for physics', href: 'https://www.youtube.com/watch?v=2WZ-GL2cJlM' },
    { title: 'Amigu', description: 'Tamagotchi for building parent-child relationships', href: 'https://amigu.webflow.io/' },
    { title: 'Wherefi', description: 'Geiger counter for Wi-Fi signals', href: 'https://devpost.com/software/wherefi' },
    { title: 'Aortic Pump', description: 'Sentence sophisticator', href: 'https://aorticpump.athenaleong.com/' },
    { title: 'Emoji cannon', description: 'Blast your screen with emojis', href: 'https://emojicannon.webflow.io/' },
    { title: 'A Colorful Thing', description: 'A collaborative pixel painting web app', href: 'https://a-colorful-thing.vercel.app/' },
    { title: 'Motifs & Pattern', description: 'Animations built with Processing', href: 'https://www.youtube.com/watch?v=O3tr3pSMPho&ab_channel=AthenaLeong' },
    { title: 'Berkeleyland', href: 'https://www.youtube.com/watch?v=EBlkpBf28S8&ab_channel=JiHyunLee' },
    { title: 'Doodles', href: 'https://athenaleong.notion.site/athenaleong/Doodles-e6b6f3cde2d64de5a3fa9382972c6ff0' },
];
