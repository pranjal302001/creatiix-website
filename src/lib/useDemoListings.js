import { useEffect, useState } from 'react';

// The demo agency's listings are a plain script shared with the demo website
// (public/demos/urban-nest/listings.js). Load it once and share the result.
let pending = null;
function load() {
    if (globalThis.LISTINGS) return Promise.resolve(globalThis.LISTINGS);
    pending ||= new Promise((resolve) => {
        const tag = document.createElement('script');
        tag.src = '/demos/urban-nest/listings.js';
        tag.onload = () => resolve(globalThis.LISTINGS);
        document.head.appendChild(tag);
    });
    return pending;
}

export function useDemoListings() {
    const [listings, setListings] = useState(globalThis.LISTINGS || null);
    useEffect(() => {
        let alive = true;
        load().then((l) => { if (alive) setListings(l); });
        return () => { alive = false; };
    }, []);
    return listings;
}
