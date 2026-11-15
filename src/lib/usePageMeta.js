import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from './site';

const DEFAULT_TITLE = 'CREATIIX – AI, Apps, Design & Marketing';

const setTag = (selector, create, attr, value) => {
    let el = document.head.querySelector(selector);
    if (!el) { el = create(); document.head.appendChild(el); }
    el.setAttribute(attr, value);
};

// When pages are rendered to HTML at build time (scripts/prerender.mjs) there is
// no document to update, so the page's details are kept here for that script.
export const renderedMeta = { current: null };

// Gives each page its own browser title, search description and canonical link.
export function usePageMeta(title, description) {
    const { pathname } = useLocation();
    const full = title ? `${title} | CREATIIX` : DEFAULT_TITLE;
    const url = SITE_URL + (pathname === '/' ? '' : pathname);

    if (typeof document === 'undefined') renderedMeta.current = { title: full, description, url };

    useEffect(() => {
        document.title = full;
        const meta = (name) => () => Object.assign(document.createElement('meta'), { name });
        const og = (property) => () => { const m = document.createElement('meta'); m.setAttribute('property', property); return m; };
        setTag('meta[name="description"]', meta('description'), 'content', description);
        setTag('meta[property="og:title"]', og('og:title'), 'content', full);
        setTag('meta[property="og:description"]', og('og:description'), 'content', description);
        setTag('meta[property="og:url"]', og('og:url'), 'content', url);
        setTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', url);
    }, [full, description, url]);
}
