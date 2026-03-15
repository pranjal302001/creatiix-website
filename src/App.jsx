import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Home from './pages/Home';
import Services from './pages/Services';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import PortfolioPage from './pages/PortfolioPage';
import SplashScreen from './components/SplashScreen';

gsap.registerPlugin(ScrollTrigger);

// A helper component to scroll to top or hash on route change since Lenis might hold position
function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
        } else {
            setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [pathname, hash]);

    return null;
}

export default function App() {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
}

function AppLayout() {
    const [showSplash, setShowSplash] = useState(true);
    const containerRef = useRef(null);
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        // Custom Cursor
        const isMobile = window.matchMedia('(pointer: coarse)').matches;
        let rafHoverId;
        if (!isMobile) {
            let mouseX = 0;
            let mouseY = 0;
            let ringX = 0;
            let ringY = 0;

            const handleMouseMove = (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                if (dotRef.current) {
                    dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
                }
            };

            const renderHover = () => {
                ringX += (mouseX - ringX) * 0.12;
                ringY += (mouseY - ringY) * 0.12;
                if (ringRef.current) {
                    ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
                }
                rafHoverId = requestAnimationFrame(renderHover);
            };

            window.addEventListener('mousemove', handleMouseMove);
            rafHoverId = requestAnimationFrame(renderHover);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                cancelAnimationFrame(rafHoverId);
            };
        }
    }, []);

    useEffect(() => {
        // Smooth Scroll (Lenis)
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
            lenis.destroy();
        };
    }, []);

    // Fade in the app content after splash screen vanishes
    useEffect(() => {
        if (!showSplash && containerRef.current) {
            gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' });
        }
    }, [showSplash]);

    return (
        <>
            {showSplash ? (
                <SplashScreen onFinish={() => setShowSplash(false)} />
            ) : (
                <div ref={containerRef} className="opacity-0">
                    <ScrollToTop />

                    {/* Custom Cursor */}
                    <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block" />
                    <div ref={ringRef} className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent/30 pointer-events-none z-[9998] transition-[width,height,border-color] duration-300 -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference" id="cursor-ring" />

                    {/* Global Navbar */}
                    <Navbar />

                    {/* Main Content Area Routing */}
                    <main className="relative z-10 bg-background mb-[80vh] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/portfolio" element={<PortfolioPage />} />
                            <Route path="/blogs" element={<Blogs />} />
                            <Route path="/blogs/:id" element={<BlogPost />} />
                        </Routes>
                    </main>

                    {/* Global Contact Footer */}
                    <Contact />
                </div>
            )}
        </>
    );
}
