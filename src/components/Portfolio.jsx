import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Link } from 'react-router-dom';
import portfolioData from '../data/portfolioData.json';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
    const containerRef = useRef(null);
    const scrollWrapperRef = useRef(null);

    // Image projects come from the same data file as the Portfolio page.
    const projects = portfolioData.filter((item) => item.type === 'image');

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('.portfolio-panel');
            const totalWidth = scrollWrapperRef.current.scrollWidth - window.innerWidth;

            gsap.to(sections, {
                x: () => `-${totalWidth}px`,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: {
                        snapTo: 1 / (sections.length - 1),
                        duration: { min: 0.2, max: 0.8 },
                        ease: "power2.inOut"
                    },
                    end: () => `+${totalWidth}px` // Pin for the amount of width to scroll
                }
            });

            // Reveal header
            gsap.from('.portfolio-header', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="portfolio" ref={containerRef} className="relative h-screen bg-surface overflow-hidden flex flex-col justify-center border-t border-ink/10">

            <div className="portfolio-header absolute top-24 left-6 md:left-16 z-20 pointer-events-none">
                <h2 className="font-display text-4xl md:text-6xl font-bold text-ink tracking-tight">
                    Selected <span className="font-drama italic font-normal text-grad">works.</span>
                </h2>
            </div>

            {/* Wrapping div that moves horizontally */}
            <div ref={scrollWrapperRef} className="flex h-[40vh] md:h-[44vh] items-center relative gap-5 md:gap-6 px-[8vw] md:px-[20vw] mt-24">

                {projects.map((project, i) => (
                    <div
                        key={i}
                        className="portfolio-panel relative shrink-0 w-[70vw] md:w-[30vw] h-full rounded-2xl overflow-hidden group cursor-pointer"
                        onMouseEnter={(e) => {
                            const ring = document.getElementById('cursor-ring');
                            if (ring) {
                                ring.classList.add('scale-[3]');
                                ring.style.backgroundColor = '#FF7A00';
                                ring.style.mixBlendMode = 'normal';
                            }
                        }}
                        onMouseLeave={(e) => {
                            const ring = document.getElementById('cursor-ring');
                            if (ring) {
                                ring.classList.remove('scale-[3]');
                                ring.style.backgroundColor = 'transparent';
                                ring.style.mixBlendMode = 'difference';
                            }
                        }}
                    >
                        {/* Actual Image Background */}
                        <div className={`absolute inset-0 w-full h-full overflow-hidden ${project.contain ? 'bg-white' : ''}`}>
                            <img
                                src={project.url}
                                alt={project.title}
                                className={`w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110 ${project.contain ? 'object-contain p-8 md:p-12' : 'object-cover'}`}
                            />
                        </div>

                        {/* Dark Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-60" />

                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                            {/* Subtle Grid overlay inside panel */}
                            <div className="w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_#fff_2px,_transparent_2px)] bg-[size:40px_40px] mix-blend-overlay" />
                        </div>

                        <div className="absolute bottom-5 left-6 md:bottom-6 md:left-7 z-10">
                            <p className="font-mono text-[13px] md:text-sm text-accent tracking-widest uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                                {project.category}
                            </p>
                            <h3 className="font-display text-xl md:text-2xl text-ink font-bold transition-transform duration-500 group-hover:-translate-y-2">
                                {project.title}
                            </h3>
                        </div>

                        <div className="absolute top-5 right-5 w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center opacity-0 group-hover:opacity-100 -rotate-45 transition-all duration-500 group-hover:rotate-0 bg-ink/5 backdrop-blur-sm">
                            <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                ))}

                {/* Last panel: link to the full portfolio */}
                <Link to="/portfolio" className="portfolio-panel relative shrink-0 w-[70vw] md:w-[30vw] h-full rounded-2xl bg-brand text-onaccent flex flex-col justify-between p-6 md:p-7 group">
                    <span className="font-mono text-[13px] md:text-sm uppercase tracking-widest">Logos · Reels · More</span>
                    <span className="font-display font-bold text-2xl md:text-4xl tracking-tight leading-none">
                        See all <br />work <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">→</span>
                    </span>
                </Link>

            </div>
        </section>
    );
}
