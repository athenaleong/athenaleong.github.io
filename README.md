# Athena's Playground

The interactive React/Vite playground remains at `/`. About, projects, and story
also have readable, static HTML pages at `/about/`, `/projects/`, and `/story/`.
Folder clicks still open AthenaOS windows; opening their links in a new tab opens
the reading pages. The **Reading view** link is available in the desktop menu,
and **Read** is available in the mobile header.

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
npm run preview
```

The build renders the existing `AboutTab`, `ProjectTab`, and `WhatTab` components
to static HTML. Edit those components to update both views; do not edit `dist/`.
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
