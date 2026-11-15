import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Intro from './components/Intro';
import Home from './pages/Home';
// Only the home page ships in the first download; other pages load when visited.
const Services = lazy(() => import('./pages/Services'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const DemoProject = lazy(() => import('./pages/DemoProject'));
const Privacy = lazy(() => import('./pages/Privacy'));
const ChatWidget = lazy(() => import('./components/ChatWidget'));
import { usePageMeta } from './lib/usePageMeta';
import { SHOW_INTRO, setLenis, scrollToTop, scrollToId, SHOW_BLOG } from './lib/site';

gsap.registerPlugin(ScrollTrigger);

// Scroll to top (or to a #section) whenever the route changes.
function ScrollManager() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            scrollToTop();
            return;
        }
        // The target section may belong to a page that is still loading, so keep
        // looking for it for a couple of seconds before giving up.
        const id = hash.replace('#', '');
        let tries = 0;
        const timer = setInterval(() => {
            tries += 1;
            if (id === 'contact' || document.getElementById(id)) {
                clearInterval(timer);
                scrollToId(id);
            } else if (tries > 20) {
                clearInterval(timer);
            }
        }, 120);
        return () => clearInterval(timer);
    }, [pathname, hash]);

    return null;
}

function NotFound() {
    usePageMeta('Page not found', 'The page you are looking for has moved or never existed.');
    return (
        <div className="relative min-h-screen bg-background flex items-center justify-center px-6 overflow-hidden">
            <i className="glow glow-flame w-[50rem] h-[30rem] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
            <div className="relative glass max-w-xl w-full p-10 md:p-14 text-center flex flex-col items-center">
                <img src="/brand/mark.png" alt="" className="w-16 h-auto mb-8" />
                <p className="font-mono text-accent tracking-[0.16em] uppercase text-[13px] mb-4">Error 404</p>
                <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-[1.02] text-ink mb-5">
                    Page <span className="font-drama italic font-normal text-grad">not found.</span>
                </h1>
                <p className="text-ink/60 text-lg font-light mb-10 max-w-sm">The page you are looking for has moved or never existed.</p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link to="/" className="px-7 py-4 bg-brand text-onaccent font-bold uppercase tracking-widest text-sm rounded-2xl hover:brightness-110 transition">
                        Back to home
                    </Link>
                    <Link to="/services" className="px-7 py-4 glass text-ink font-bold uppercase tracking-widest text-sm hover:text-accent transition-colors">
                        See services
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
}

function AppLayout() {
    const [showIntro, setShowIntro] = useState(SHOW_INTRO);
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    // Custom cursor (desktop only)
    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        let rafId;
        let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (dotRef.current) dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        };
        const render = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            rafId = requestAnimationFrame(render);
        };

        window.addEventListener('mousemove', handleMouseMove);
        rafId = requestAnimationFrame(render);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    // 3D tilt: any element with data-tilt leans toward the mouse (desktop only)
    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        let current = null;
        const reset = (el) => { el.style.transform = ''; };
        const onMove = (e) => {
            const el = e.target.closest?.('[data-tilt]');
            if (current && current !== el) reset(current);
            current = el;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            el.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-4px)`;
        };
        document.addEventListener('mousemove', onMove);
        return () => { document.removeEventListener('mousemove', onMove); if (current) reset(current); };
    }, []);

    // Smooth scroll (Lenis) driven by the GSAP ticker
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
        setLenis(lenis);

        const tick = (time) => lenis.raf(time * 1000);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tick);
            setLenis(null);
            lenis.destroy();
        };
    }, []);

    return (
        <>
            {showIntro && <Intro onFinish={() => setShowIntro(false)} />}

            <ScrollManager />

            {/* Custom Cursor */}
            <div className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block" ref={dotRef}>
                <div className="w-2 h-2 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block" ref={ringRef}>
                <div id="cursor-ring" className="w-8 h-8 rounded-full border border-accent/40 transition-[transform,background-color] duration-300 -translate-x-1/2 -translate-y-1/2" />
            </div>

            <Navbar />

            {/* Page content. On desktop the bottom margin leaves room for the contact panel revealed underneath. */}
            <main className="relative z-10 bg-background md:mb-[80vh] shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <Suspense fallback={<div className="min-h-screen bg-background" />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/demo" element={<DemoProject />} />
                    <Route path="/privacy" element={<Privacy />} />
                    {SHOW_BLOG && <Route path="/blogs" element={<Blogs />} />}
                    {SHOW_BLOG && <Route path="/blogs/:id" element={<BlogPost />} />}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                </Suspense>
            </main>

            <Contact />

            <Suspense fallback={null}><ChatWidget /></Suspense>
        </>
    );
}
