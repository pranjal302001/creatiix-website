// Runs after "vite build". Writes one finished HTML file per page into dist/,
// each with its own title, description, canonical link and page content.
// To add a page: add its address to ROUTES (and to public/sitemap.xml).
// Only addresses listed here exist on the live site: anything else gets 404.html
// with a real "not found" status. So when the blog is switched on (SHOW_BLOG),
// /blogs and each /blogs/<id> must be added here as well.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROUTES = ['/', '/services', '/portfolio', '/demo', '/privacy'];
const NOT_FOUND = '/404'; // rendered as the "Page not found" screen, saved as 404.html

const dist = path.resolve('dist');
const { render } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const setAttr = (html, tag, value) => {
    const re = new RegExp(`(<${tag}[^>]*?\\s(?:content|href)=")[^"]*(")`);
    if (!re.test(html)) throw new Error(`Template is missing <${tag}>`);
    return html.replace(re, `$1${esc(value)}$2`);
};

async function page(route, { noindex = false } = {}) {
    const { html, meta } = await render(route);
    if (!meta) throw new Error(`${route} did not set a title and description`);
    let out = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
    out = setAttr(out, 'meta name="description"', meta.description);
    out = setAttr(out, 'meta property="og:title"', meta.title);
    out = setAttr(out, 'meta property="og:description"', meta.description);
    out = setAttr(out, 'meta property="og:url"', meta.url);
    out = setAttr(out, 'link rel="canonical"', meta.url);
    if (noindex) out = out.replace('</title>', '</title>\n  <meta name="robots" content="noindex" />');
    if (!out.includes('<div id="root"></div>')) throw new Error('Template is missing the empty #root');
    // data-prerendered keeps this HTML out of sight until the app starts (see index.html and main.jsx).
    return out.replace('<div id="root"></div>', `<div id="root" data-prerendered>${html}</div>`);
}

for (const route of ROUTES) {
    const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html');
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, await page(route));
    console.log('prerendered', route);
}
await writeFile(path.join(dist, '404.html'), await page(NOT_FOUND, { noindex: true }));
console.log('prerendered 404.html');

await rm(path.resolve('dist-ssr'), { recursive: true, force: true });
