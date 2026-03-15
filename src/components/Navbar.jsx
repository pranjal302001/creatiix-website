import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Initial entrance animation - drops in smoothly after the wipe transition
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 2.2 }
        );
    }, []);

    const handleHashClick = (e, targetHash) => {
        // Only override if we are already on the target base URL (which is '/')
        if (location.pathname === '/') {
            e.preventDefault();
            const id = targetHash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                // Update URL for copy-pasting purposes
                window.history.pushState(null, '', `/${targetHash}`);
            }
        }
    };

    return (
        <nav
            ref={navRef}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[90] transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] flex items-center justify-between px-6 py-3 rounded-full ${scrolled
                ? 'w-[90%] lg:w-[800px] bg-[#353B4E]/80 backdrop-blur-xl border border-white/10 shadow-lg'
                : 'w-[90%] lg:w-[1000px] bg-transparent border-transparent'
                }`}>
            {/* Brand -> left */}
            <Link to="/" className="flex items-center gap-3 cursor-pointer">
                <img src="/logo-icon.png" alt="CREATIIX Icon" className="h-8 md:h-10 w-auto object-contain" />
                <span className="font-display font-black text-xl md:text-2xl tracking-widest uppercase text-white">CREATIIX</span>
            </Link>

            {/* Links -> center */}
            <div className={`hidden md:flex items-center gap-8 font-body text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${scrolled ? 'text-[#F5DF77]' : 'text-[#353B4E]'}`}>
                <Link to="/#about" onClick={(e) => handleHashClick(e, '#about')} className="hover:text-[#7CC159] transition-colors relative group">
                    About Us
                    <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#7CC159] group-hover:w-full"></span>
                </Link>
                <Link to="/services" className="hover:text-[#7CC159] transition-colors relative group">
                    Services
                    <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#7CC159] group-hover:w-full"></span>
                </Link>
                <Link to="/portfolio" className="hover:text-[#7CC159] transition-colors relative group">
                    Portfolio
                    <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#7CC159] group-hover:w-full"></span>
                </Link>
                <Link to="/blogs" className="hover:text-[#7CC159] transition-colors relative group">
                    Blogs
                    <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#7CC159] group-hover:w-full"></span>
                </Link>
            </div>

            {/* CTA -> right */}
            <Link to="/#contact" onClick={(e) => handleHashClick(e, '#contact')} className="hidden md:block px-6 py-2.5 bg-[#F5DF77] text-[#353B4E] font-body text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#7CC159] hover:text-[#353B4E] transition-colors duration-300">
                Let's Talk
            </Link>

            {/* Mobile Menu Icon */}
            <button className={`md:hidden p-2 ${scrolled ? 'text-[#F5DF77]' : 'text-[#353B4E]'}`}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </nav>
    );
}
