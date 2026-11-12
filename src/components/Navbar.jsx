import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { INTRO_DELAY, SHOW_BLOG, goToContact, scrollToId } from '../lib/site';

const links = [
    { label: 'About', to: '/#about' },
    { label: 'Services', to: '/services' },
    { label: 'Portfolio', to: '/portfolio' },
    ...(SHOW_BLOG ? [{ label: 'Blogs', to: '/blogs' }] : []),
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggle } = useTheme();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: INTRO_DELAY + 0.2 }
        );
    }, []);

    // Close the mobile menu whenever the page changes
    useEffect(() => { setMenuOpen(false); }, [location.pathname, location.hash]);

    const handleLink = (e, to) => {
        setMenuOpen(false);
        // "/#about" while already on the home page: smooth-scroll instead of reloading the route
        if (to.startsWith('/#') && location.pathname === '/') {
            e.preventDefault();
            scrollToId(to.slice(2));
            navigate(to, { replace: true });
        }
    };

    const ThemeButton = ({ className = '' }) => (
        <button
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            className={`w-10 h-10 rounded-2xl border border-ink/15 flex items-center justify-center text-ink hover:text-accent hover:border-accent transition-colors ${className}`}
        >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
    );

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-4 md:top-6 inset-x-0 mx-auto z-[90] transition-[width,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] flex items-center justify-between pl-5 pr-2.5 py-2.5 rounded-2xl ${scrolled || menuOpen
                    ? 'w-[92%] lg:w-[900px] glass !bg-background/70'
                    : 'w-[92%] lg:w-[1080px] border border-transparent'
                    }`}>

                {/* Brand */}
                <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="CREATIIX home">
                    <img src="/brand/mark.png" alt="" className="h-8 md:h-9 w-auto" />
                    <img src="/brand/wordmark-ivory.png" alt="CREATIIX" className="logo-for-dark h-[18px] md:h-5 w-auto" />
                    <img src="/brand/wordmark-charcoal.png" alt="CREATIIX" className="logo-for-light h-[18px] md:h-5 w-auto" />
                </Link>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8 font-body text-sm font-semibold uppercase tracking-widest text-ink">
                    {links.map((l) => (
                        <Link key={l.label} to={l.to} onClick={(e) => handleLink(e, l.to)} className="hover:text-accent transition-colors relative group">
                            {l.label}
                            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-accent group-hover:w-full"></span>
                        </Link>
                    ))}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2">
                    <ThemeButton />
                    <button onClick={goToContact} className="hidden md:block px-6 py-2.5 bg-brand text-onaccent font-body text-xs font-bold uppercase tracking-widest rounded-2xl hover:brightness-110 transition-colors duration-300">
                        Let's talk
                    </button>
                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        className="md:hidden w-10 h-10 flex items-center justify-center text-ink"
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <div className={`md:hidden fixed inset-0 z-[80] bg-background transition-opacity duration-300 flex flex-col justify-center px-8 gap-2 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {links.map((l, i) => (
                    <Link key={l.label} to={l.to} onClick={(e) => handleLink(e, l.to)} className="font-display font-bold text-4xl tracking-tight text-ink py-3 border-b border-ink/10 flex items-baseline gap-4">
                        <span className="font-mono text-[13px] text-accent">0{i + 1}</span>{l.label}
                    </Link>
                ))}
                <button onClick={() => { setMenuOpen(false); goToContact(); }} className="mt-8 py-4 bg-brand text-onaccent font-bold uppercase tracking-widest text-sm rounded-2xl">
                    Let's talk
                </button>
            </div>
        </>
    );
}
