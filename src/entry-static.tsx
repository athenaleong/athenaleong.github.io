import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import AboutTab from './container/AboutTab';
import ProjectTab from './container/ProjectTab';
import WhatTab from './container/WhatTab';
import Loading from './container/Loading';
import { pages, PagePath, site } from './site';

export { pages, site };

const absoluteUrl = (path: string) => new URL(path, site.url).href;

function StructuredData({ path }: { path: PagePath }) {
  const page = pages[path];
  const personId = `${site.url}/#person`;
  const websiteId = `${site.url}/#website`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: site.author,
        url: `${site.url}/`,
        sameAs: site.social.map(({ url }) => url),
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: site.name,
        url: `${site.url}/`,
        author: { '@id': personId },
        inLanguage: 'en',
      },
      {
        '@type': path === '/about/' ? 'ProfilePage' : 'WebPage',
        '@id': `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name: page.title,
        description: page.description,
        isPartOf: { '@id': websiteId },
        author: { '@id': personId },
        ...(path === '/about/' ? { mainEntity: { '@id': personId } } : {}),
        inLanguage: 'en',
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  }} />;
}

function Metadata({ path }: { path: PagePath }) {
  const page = pages[path];
  const shareTitle = path === '/' ? site.shareTitle : page.title;
  return <>
    <title>{page.title}</title>
    <meta name="description" content={page.description} />
    <meta name="author" content={site.author} />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href={absoluteUrl(path)} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={site.name} />
    <meta property="og:title" content={shareTitle} />
    <meta property="og:description" content={page.description} />
    <meta property="og:url" content={absoluteUrl(path)} />
    <meta property="og:image" content={absoluteUrl(site.image)} />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={site.imageAlt} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@athenamakes" />
    <meta name="twitter:title" content={shareTitle} />
    <meta name="twitter:description" content={page.description} />
    <meta name="twitter:image" content={absoluteUrl(site.image)} />
    <meta name="twitter:image:alt" content={site.imageAlt} />
    <StructuredData path={path} />
  </>;
}

function ReadingPage({ path }: { path: PagePath }) {
  return <div className="reading-page">
    <header className="reading-header">
      <a className="reading-brand" href="/">
        <img src="/optimized/slide-thick.webp" width="40" height="40" alt="" />
        <span>Athena's Playground</span>
      </a>
      <nav aria-label="Site navigation">
        <a href="/">Playground</a>
        <a href="/about/" aria-current={path === '/about/' ? 'page' : undefined}>About</a>
        <a href="/projects/" aria-current={path === '/projects/' ? 'page' : undefined}>Projects</a>
        <a href="/story/" aria-current={path === '/story/' ? 'page' : undefined}>My story</a>
        <a href={site.garden}>Thought Garden</a>
      </nav>
    </header>
    <main id="content" className="reading-main">
      <h1>{pages[path].heading}</h1>
      {path === '/' && <p className="reading-intro">{site.description} This is the reading view of my interactive playground. Explore my <a href="/projects/">projects</a>, <a href="/story/">story</a>, and <a href={site.garden}>thought garden</a>.</p>}
      <article className="reading-content">
        {(path === '/' || path === '/about/') && <AboutTab isMobile />}
        {path === '/projects/' && <ProjectTab isMobile />}
        {path === '/story/' && <WhatTab isMobile />}
      </article>
    </main>
    <footer id="contact" className="reading-footer">
      <p>Find Athena in San Francisco, CA, and around the internet.</p>
      <nav aria-label="Contact Athena">
        {site.social.map(({ label, url }) => <a key={url} href={url}>{label}</a>)}
        <a href={`mailto:${site.email}`}>Email</a>
      </nav>
      <a href="/">Back to the interactive playground</a>
    </footer>
  </div>;
}

// The same document is served to humans and crawlers. Only the homepage starts
// AthenaOS; the reading pages keep their HTML available without JavaScript.
export function renderDocument(template: string, path: PagePath) {
  if (!template.includes('<!--seo-head-->') || !template.includes('<!--static-content-->')) {
    throw new Error('The HTML template is missing its static rendering markers.');
  }
  let html = template
    .replace('<!--seo-head-->', renderToStaticMarkup(<Metadata path={path} />))
    .replace('<!--playground-loading-->', path === '/' ? renderToStaticMarkup(
      <div id="playground-loading" role="status" aria-label="Loading playground"><Loading /></div>,
    ) : '')
    .replace('<!--static-content-->', renderToStaticMarkup(<ReadingPage path={path} />));

  if (path !== '/') {
    html = html
      .replace(/<script\b[^>]*\bid="playground-boot"[^>]*>[\s\S]*?<\/script>/g, '')
      .replace(/<script\b[^>]*\btype="module"[^>]*>[\s\S]*?<\/script>/g, '')
      .replace(/<link\b[^>]*\brel="modulepreload"[^>]*>/g, '')
      .replace('<div id="root"></div>', '');
  }
  return html;
}

export function renderSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(pages).map(path => `  <url><loc>${absoluteUrl(path)}</loc></url>`).join('\n')}\n</urlset>\n`;
}

export function renderRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`;
}
