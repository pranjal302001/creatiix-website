import { usePageMeta } from '../lib/usePageMeta';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Play, X } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';
import PageHeader, { FilterChip } from '../components/PageHeader';
import { CONTACT, goToContact } from '../lib/site';

const categories = ['All', ...new Set(portfolioData.map((item) => item.category))];

// One card for every project. Videos preview silently on hover; a click opens the full view.
function ProjectCard({ project, onOpen }) {
    const videoRef = useRef(null);
    const isVideo = project.type === 'video';

    const preview = (play) => {
        const v = videoRef.current;
        if (!v) return;
        if (play) v.play().catch(() => { });
        else { v.pause(); v.currentTime = 0; }
    };

    return (
        <button
            onClick={() => onOpen(project)}
            aria-label={project.title || `Play ${project.category.toLowerCase()} reel`}
            onMouseEnter={() => preview(true)}
            onMouseLeave={() => preview(false)}
            data-tilt
            className="portfolio-item glass group relative block w-full text-left p-3 transition-transform duration-200 ease-out"
        >
            <div className={`relative aspect-[4/5] overflow-hidden rounded-2xl ${project.contain ? 'bg-white' : 'bg-black'}`}>
                {isVideo ? (
                    <>
                        <video ref={videoRef} src={`${project.url}#t=0.5`} muted loop playsInline preload="metadata" className="w-full h-full object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                            <span className="w-14 h-14 rounded-full bg-brand flex items-center justify-center shadow-xl">
                                <Play className="w-5 h-5 text-onaccent ml-0.5" fill="currentColor" />
                            </span>
                        </span>
                    </>
                ) : (
                    <img src={project.url} alt={project.title} loading="lazy" className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${project.contain ? 'object-contain p-8' : 'object-cover'}`} />
                )}
            </div>
            {/* Reels have no name: they show as the video only */}
            {project.title && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3 px-2 pt-4 pb-2">
                    <h2 className="font-display font-bold text-lg tracking-tight text-ink truncate">{project.title}</h2>
                    <span className="font-mono text-xs uppercase tracking-wider text-accent shrink-0">{project.category}</span>
                </div>
            )}
        </button>
    );
}

export default function PortfolioPage() {
    usePageMeta("Portfolio", "Logos, reels and brand work delivered by CREATIIX, plus a full demo project you can try.");
    const [activeCategory, setActiveCategory] = useState('All');
    const [open, setOpen] = useState(null);
    const pageRef = useRef(null);

    const projects = activeCategory === 'All' ? portfolioData : portfolioData.filter((p) => p.category === activeCategory);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.fade-up', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
        }, pageRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.portfolio-item', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out', clearProps: 'opacity,transform' });
        }, pageRef);
        return () => ctx.revert();
    }, [activeCategory]);

    // Close the full view with Escape
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && setOpen(null);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <div ref={pageRef} className="relative min-h-screen bg-background text-ink pt-36 pb-24 px-6 md:px-16 overflow-hidden">
            <PageHeader
                label="Portfolio"
                title="Selected"
                highlight="works."
                intro="Logos, reels and brand work we have delivered. AI and app projects will be added here as they launch."
            >
                {categories.map((c) => (
                    <FilterChip key={c} active={activeCategory === c} onClick={() => setActiveCategory(c)}>{c}</FilterChip>
                ))}
            </PageHeader>

            <i className="glow glow-orange w-[34rem] h-[34rem] -right-60 top-1/2" />

            {/* Demo project */}
            <Link to="/demo" className="relative max-w-7xl mx-auto mb-6 glass group grid grid-cols-1 md:grid-cols-2 gap-6 p-3 hover:-translate-y-1 transition-transform duration-300">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-white">
                    <iframe src="/demos/urban-nest/index.html" title="Urban Nest Properties demo website" tabIndex={-1} className="absolute top-0 left-0 w-[250%] h-[250%] origin-top-left scale-[0.4] pointer-events-none" />
                </div>
                <div className="flex flex-col justify-center p-3 md:p-6">
                    <span className="self-start font-mono text-xs uppercase tracking-wider font-bold bg-brand text-onaccent rounded-2xl px-2.5 py-1 mb-4">Demo project</span>
                    <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight leading-[1.05] mb-3">Urban Nest Properties, Mumbai</h2>
                    <p className="text-ink/60 font-light leading-relaxed mb-6">One fictional property agency, built out across all ten of our services. Try the working website and see the before and after.</p>
                    <span className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-widest text-ink group-hover:text-accent transition-colors">
                        Explore the demo <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                </div>
            </Link>

            <div className="relative max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {projects.map((project) => <ProjectCard key={project.id} project={project} onOpen={setOpen} />)}
            </div>

            {/* Instagram */}
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="relative max-w-7xl mx-auto mt-6 glass group p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:-translate-y-1 transition-transform duration-300">
                <span className="flex items-center gap-4">
                    <span className="w-12 h-12 shrink-0 rounded-2xl bg-brand text-onaccent flex items-center justify-center"><Instagram className="w-5 h-5" /></span>
                    <span>
                        <span className="block font-display font-bold text-xl md:text-2xl tracking-tight">More reels and posts on Instagram</span>
                        <span className="block text-ink/60 font-light">Follow {CONTACT.instagramHandle} for our latest work.</span>
                    </span>
                </span>
                <span className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-widest text-ink group-hover:text-accent transition-colors">
                    Open Instagram <ArrowUpRight className="w-4 h-4" />
                </span>
            </a>

            {/* CTA */}
            <div className="relative max-w-7xl mx-auto mt-20 glass p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
                    Want your project <span className="font-drama italic font-normal text-grad">here next?</span>
                </h2>
                <button onClick={goToContact} className="shrink-0 px-8 py-4 rounded-2xl bg-brand text-onaccent font-bold uppercase tracking-widest text-sm hover:brightness-110 transition">
                    Let's talk
                </button>
            </div>

            {/* Full view. Rendered on <body> so it sits above the navbar. */}
            {open && createPortal(
                <div className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setOpen(null)} data-lenis-prevent>
                    <button aria-label="Close" className="absolute top-6 right-6 w-12 h-12 rounded-2xl glass flex items-center justify-center text-white">
                        <X className="w-5 h-5" />
                    </button>
                    <div className="max-h-full max-w-4xl flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
                        {open.type === 'video' ? (
                            <video src={open.url} controls autoPlay playsInline className="max-h-[80vh] rounded-2xl bg-black" />
                        ) : (
                            <img src={open.url} alt={open.title} className={`max-h-[80vh] rounded-2xl ${open.contain ? 'bg-white p-10' : ''}`} />
                        )}
                        {open.title && <p className="font-display font-bold text-white text-xl">{open.title} <span className="font-mono text-xs uppercase tracking-wider text-[#FF7A00] ml-2">{open.category}</span></p>}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
