import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import test from 'node:test';

const origin = 'https://www.athenaleong.com';
const paths = ['/', '/about/', '/projects/', '/story/'];
const dist = new URL('../dist/', import.meta.url);
const read = (path) => readFile(new URL(path, dist), 'utf8');
const documents = await Promise.all(paths.map(path => read(`${path.slice(1)}index.html`)));

test('every indexable URL ships content, links, and unique metadata without running JavaScript', async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (let i = 0; i < paths.length; i++) {
    const html = documents[i];
    const path = paths[i];
    assert.match(html, /<html lang="en">/);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path} needs exactly one H1`);
    assert.equal([...html.matchAll(/<meta name="viewport"/g)].length, 1);
    assert.equal([...html.matchAll(/<title>/g)].length, 1);
    titles.add(html.match(/<title>(.*?)<\/title>/s)?.[1]);
    const description = html.match(/<meta name="description" content="([^"]+)"/);
    assert.ok(description, `${path} needs a description`);
    descriptions.add(description[1]);
    assert.ok(html.includes(`<link rel="canonical" href="${origin}${path}"`));
    assert.ok(html.includes(`<meta property="og:url" content="${origin}${path}"`));
    assert.match(html, /<meta property="og:image" content="https:\/\/www\.athenaleong\.com\//);
    assert.match(html, /<meta name="twitter:card" content="summary"/);
    assert.doesNotMatch(html, /noindex|<!--seo-head-->|<!--static-content-->/);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
    assert.ok(main && main.replace(/<[^>]*>/g, '').length > 700, `${path} must contain real body text`);
    for (const destination of paths) assert.ok(html.includes(`href="${destination}"`));

    // Static page assets must resolve in the deployment artifact, not just in dev.
    for (const [, asset] of html.matchAll(/(?:src|href)="(\/[^"#?]*\.[a-z0-9]+)"/g)) {
      await access(new URL(asset.slice(1), dist));
    }
    for (const [image] of html.matchAll(/<img\b[^>]*>/g)) assert.match(image, /\balt="/);
  }
  assert.equal(titles.size, paths.length);
  assert.equal(descriptions.size, paths.length);
});

test('the bio, projects, and story survive without the interactive app', () => {
  assert.match(documents[1], /UC Berkeley/);
  assert.match(documents[1], /Machine Learning @ Berkeley/);
  for (const project of ['Pursuit', 'Finefood.institute', 'Ratatouille IRL', 'Lockin.cafe', 'Obsidian Space Repetition Plugin', 'Field Trip', 'Dewy', 'Mirror of Erised', 'Phyzmo', 'Amigu']) {
    assert.ok(documents[2].includes(project), `Missing project: ${project}`);
  }
  assert.match(documents[2], /<h2\b[^>]*>Pursuit<\/h2>/);
  assert.match(documents[2], /href="https:\/\/www\.sfpursuit\.org"/);
  assert.match(documents[3], /everlasting exuberance/);
  assert.match(documents[0], /<script type="module"[^>]*src="\/assets\//);
  for (const html of documents.slice(1)) {
    assert.doesNotMatch(html, /<script\b[^>]*type="module"|id="root"/);
  }
});

test('structured data is valid JSON and uses the public canonical identity', () => {
  for (let i = 0; i < documents.length; i++) {
    const json = documents[i].match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
    assert.ok(json);
    const data = JSON.parse(json);
    assert.equal(data['@context'], 'https://schema.org');
    const person = data['@graph'].find(item => item['@type'] === 'Person');
    assert.equal(person.name, 'Athena Leong');
    assert.equal(person.url, `${origin}/`);
    assert.ok(person.sameAs.includes('https://github.com/athenaleong'));
    const page = data['@graph'].find(item => ['WebPage', 'ProfilePage'].includes(item['@type']));
    assert.equal(page.url, `${origin}${paths[i]}`);
    if (paths[i] === '/about/') assert.equal(page.mainEntity['@id'], person['@id']);
  }
});

test('robots and sitemap advertise exactly the generated canonical pages', async () => {
  const robots = await read('robots.txt');
  assert.match(robots, /User-agent: \*\nAllow: \//);
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  const sitemap = await read('sitemap.xml');
  assert.match(sitemap, /xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), paths.map(path => `${origin}${path}`));
});
