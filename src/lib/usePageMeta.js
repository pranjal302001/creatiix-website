import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from './site';

const setTag = (selector, create, attr, value) => {
    let el = document.head.querySelector(selector);
    if (!el) { el = create(); document.head.appendChild(el); }
    el.setAttribute(attr, value);
};

// Gives each page its own browser title, search description and canonical link.
export function usePageMeta(title, description) {
    const { pathname } = useLocation();
    useEffect(() => {
        const full = title ? `${title} | CREATIIX` : 'CREATIIX – AI, Apps, Design & Marketing';
        document.title = full;
        const url = SITE_URL + (pathname === '/' ? '' : pathname);
        const meta = (name) => () => Object.assign(document.createElement('meta'), { name });
        const og = (property) => () => { const m = document.createElement('meta'); m.setAttribute('property', property); return m; };
        setTag('meta[name="description"]', meta('description'), 'content', description);
        setTag('meta[property="og:title"]', og('og:title'), 'content', full);
        setTag('meta[property="og:description"]', og('og:description'), 'content', description);
        setTag('meta[property="og:url"]', og('og:url'), 'content', url || SITE_URL);
        setTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', url || SITE_URL);
    }, [title, description, pathname]);
}
