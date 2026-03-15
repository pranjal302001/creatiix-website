import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import portfolioData from '../data/portfolioData.json';

// Get unique categories from data
const categories = ['All', ...new Set(portfolioData.map(item => item.category))];

const PortfolioPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    // Filter projects based on category
    const filteredProjects = activeCategory === 'All'
        ? portfolioData
        : portfolioData.filter(project => project.category === activeCategory);

    useEffect(() => {
        // Reveal animation for items
        gsap.fromTo(
            ".portfolio-item",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                clearProps: "all"
            }
        );
    }, [activeCategory]);

    // Helper to render media based on type
    const renderMedia = (project) => {
        switch (project.type) {
            case 'youtube':
                return (
                    <iframe
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-auto"
                        src={project.url}
                        title={project.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                );
            case 'instagram':
                // For Instagram we embed their standard code (simplified for React)
                // Appending embed suffix to URL if missing
                const instaUrl = project.url.endsWith('/') ? `${project.url}embed` : `${project.url}/embed`;
                return (
                    <iframe
                        src={instaUrl}
                        className="w-full h-full object-cover pointer-events-auto bg-white"
                        frameBorder="0"
                        scrolling="yes" // Allowing scroll for long IG captions
                        allowTransparency="true"
                    ></iframe>
                );
            case 'video':
                return (
                    <video
                        src={project.url}
                        className="w-full h-full object-contain bg-black/40 pointer-events-auto"
                        controls
                        controlsList="nodownload"
                        playsInline
                        preload="metadata"
                    />
                );
            case 'image':
            default:
                return (
                    <img
                        src={project.url}
                        alt={project.title}
                        className={`w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110 ${project.contain ? 'object-contain p-8 bg-white' : 'object-cover filter brightness-75 group-hover:brightness-100'}`}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-background text-white pt-32 pb-24 px-6 md:px-16 overflow-hidden">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16">
                <h1 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter mix-blend-difference mb-6">
                    <span className="text-secondary/70">Selected</span> Works
                </h1>
                <p className="font-sans text-xl md:text-2xl text-secondary/60 max-w-2xl font-light">
                    A curated collection of our finest projects across design, development, and motion.
                </p>
            </div>

            {/* Filter Buttons */}
            <div className="max-w-7xl mx-auto mb-12 flex flex-wrap gap-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-6 py-2 rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-300 ${activeCategory === category
                                ? 'bg-[#F5DF77] text-background'
                                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                            }`}
                        style={{ cursor: 'none' }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 items-start`}>
                {filteredProjects.map((project) => (
                    <div
                        key={project.id}
                        className={`portfolio-item group relative rounded-[2rem] overflow-hidden cursor-none bg-white/5 ${project.type === 'video' || project.type === 'youtube' || project.type === 'instagram' ? 'h-auto w-full' : 'h-[50vh] md:h-[60vh]'}`}
                        onMouseEnter={(e) => {
                            const ring = document.getElementById('cursor-ring');
                            if (ring && project.type === 'image') {
                                ring.classList.add('scale-[4]');
                                ring.style.backgroundColor = '#F5DF77';
                                ring.style.mixBlendMode = 'normal';
                            }
                        }}
                        onMouseLeave={(e) => {
                            const ring = document.getElementById('cursor-ring');
                            if (ring && project.type === 'image') {
                                ring.classList.remove('scale-[4]');
                                ring.style.backgroundColor = 'transparent';
                                ring.style.mixBlendMode = 'difference';
                            }
                        }}
                    >
                        {/* Media Container */}
                        <div className={`${project.type === 'video' || project.type === 'youtube' || project.type === 'instagram' ? 'relative w-full h-auto flex justify-center bg-black/40' : 'absolute inset-0 w-full h-full overflow-hidden'}`}>
                            {renderMedia(project)}
                        </div>

                        {/* Dark Gradient Overlay for Readability (only on images) */}
                        {project.type === 'image' && (
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-40 pointer-events-none" />
                        )}

                        {/* Title and Category Overlay (only on images for cleaner video UI) */}
                        {project.type === 'image' && (
                            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10 pointer-events-none">
                                <p className="font-mono text-xs md:text-sm text-[#F5DF77] tracking-widest uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                                    {project.category}
                                </p>
                                <h3 className="font-display text-3xl md:text-5xl text-white font-bold uppercase transition-transform duration-500 group-hover:-translate-y-2">
                                    {project.title}
                                </h3>
                            </div>
                        )}

                        {/* Optional Badge for Videos */}
                        {project.type !== 'image' && (
                            <div className="absolute top-4 left-4 z-10 pointer-events-none bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
                                <p className="font-mono text-xs text-[#F5DF77] tracking-widest uppercase font-bold">
                                    {project.category}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Fallback message */}
            {filteredProjects.length === 0 && (
                <div className="py-20 text-center">
                    <p className="text-white/50 font-sans text-xl">No projects found for this category.</p>
                </div>
            )}
        </div>
    );
};

export default PortfolioPage;
