import { useEffect, useState } from 'react';

const KEY = 'creatiix-theme';
// No document when pages are rendered at build time; dark is the default there.
const current = () => (typeof document === 'undefined' ? 'dark' : document.documentElement.getAttribute('data-theme') || 'dark');

// Light / dark mode. Dark is the default; the choice is remembered.
export function useTheme() {
    const [theme, setTheme] = useState(current);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.querySelector('meta[name="theme-color"]')
            ?.setAttribute('content', theme === 'light' ? '#FFF4E6' : '#050505');
        try { localStorage.setItem(KEY, theme); } catch (e) { /* ignore */ }
    }, [theme]);

    const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    return { theme, toggle };
}
