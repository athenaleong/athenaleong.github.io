# Athena's Playground

The interactive React/Vite playground remains at `/`. About, projects, and story
also have readable, static HTML pages at `/about/`, `/projects/`, and `/story/`.
Folder clicks still open AthenaOS windows; opening their links in a new tab opens
the reading pages. The **Reading view** link is available in the desktop menu,
and **Read** is available in the mobile header.

On desktop, About, Projects, and My story can stay open together. Click a window
or its dock icon to bring it forward; use **−** to minimize it and the dock to
restore it. Each window keeps its scroll position while switching or minimizing.
Drag a title bar to move a window, or focus it and use arrow keys (Shift moves
farther). **×** closes one window; the reset icon closes all windows.
The folder and dock icons remain real links to the static pages, including for
Command/Ctrl-click and opening in a new browser tab.

The desktop has an **On rotation** record-player icon in the upper-left corner
and a larger matching dock icon. The player starts closed; either icon opens it.
It is absent from the phone view. Set the public Spotify playlist URL in `src/content/music.ts`.
An empty URL shows the turntable without loading Spotify. Clicking the record
loads the official 80px single-item embed and requests playback through Spotify's
iFrame API. Click the record again to pause or resume. Browser playback rules
still apply; Spotify's native controls remain available. Playback events move the
tonearm and spin the record. **×** closes the player and stops playback; the record
icon in the dock reopens it. Buffering keeps the tonearm in place; it pivots only
when playback changes. Reduced-motion preferences disable spinning. Spotify keeps
its own controls and playback rules; the embed API does not expose shuffle.
The **Open playlist in Spotify** link provides access to Spotify's full player.
The embed retains Spotify's encrypted-media permission. Spotify decides whether
each browser/session can play full tracks or previews; the site cannot force it.
Reading pages remain independent of Spotify and contain no third-party player.

## Development

Use Node.js 22 and the checked-in lockfile:

```sh
npm ci
npm run dev
```

## Build and check

```sh
npm run build
npm run test:seo
npm run test:windows
npm run preview
```

The build renders the existing `AboutTab`, `ProjectTab`, and `WhatTab` components
to static HTML. Edit those components to update both views; do not edit `dist/`.
Project press links live in `src/content/press.ts`, with the publication, year,
article title, and original URL. They appear in both versions of the projects page.
The homepage also contains a readable bio and navigation before JavaScript loads.
It switches to AthenaOS when the app is ready. Reading pages never need the app
bundle. All visitors receive the same HTML, without user-agent detection.

`src/site.ts` owns the canonical origin, page titles, descriptions, and profile
links. The live site redirects both the GitHub Pages hostname and the bare domain
to **https://www.athenaleong.com/**, so the canonical URLs use that origin.
`src/entry-static.tsx` generates metadata, JSON-LD, `robots.txt`, and `sitemap.xml`.
The build-only renderer is written to the ignored `.prerender/` directory.

## Publishing and indexing

The existing GitHub Actions workflow builds, checks, and deploys `dist/` when
changes reach `main`. Local edits do not change the public site until published.
Keep the existing GitHub Pages custom-domain setting for `www.athenaleong.com`.

After publishing:

1. Verify the four pages, `/robots.txt`, and `/sitemap.xml` on the live domain.
2. Submit `https://www.athenaleong.com/sitemap.xml` in Google Search Console and
   Bing Webmaster Tools for the verified site.
3. Use Google Search Console URL Inspection on the homepage and reading pages,
   check the rendered content, and request indexing.

The robots policy allows crawling for all user agents, including search and AI
crawlers; it does not distinguish search retrieval from model-training crawlers.
The static HTML is the primary machine-readable content. Structured data helps
describe the site and its author, but cannot guarantee indexing or AI citations.

References: [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics),
[crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable),
and [AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
