import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
    const containerRef = useRef(null);
    const scrollWrapperRef = useRef(null);

    const projects = [
        {
            title: "Simandhar Swami Mandir",
            category: "Logo Design",
            image: "/borivali-logo.png",
            contain: true
        },
        {
            title: "Soul Spartans",
            category: "Logo Design",
            image: "/soul-spartans-logo.png",
            contain: true
        },
        {
            title: "Mahavir Dham",
            category: "Logo Design",
            image: "/mahavir-dham-logo.png",
            contain: true
        },
        {
            title: "Neon Nexus",
            category: "Branding & Motion",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop"
        },
        {
            title: "Aura Skincare",
            category: "E-Commerce Web",
            image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2874&auto=format&fit=crop"
        },
        {
            title: "FinTech Pro",
            category: "UX/UI Design",
            image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2942&auto=format&fit=crop"
        },
        {
            title: "Onyx Records",
            category: "3D Animation",
            image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2940&auto=format&fit=crop"
        }
    ];

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
        <section id="portfolio" ref={containerRef} className="relative h-screen bg-[#232838] overflow-hidden flex flex-col justify-center border-t border-[#F5DF77]/10">

            <div className="portfolio-header absolute top-24 left-6 md:left-16 z-20 pointer-events-none">
                <h2 className="font-display text-5xl md:text-8xl font-black text-[#F5DF77] uppercase tracking-tighter mix-blend-difference">
                    Selected <br /> Works.
                </h2>
            </div>

            {/* Wrapping div that moves horizontally */}
            <div ref={scrollWrapperRef} className="flex h-[60vh] md:h-[70vh] items-center relative gap-8 md:gap-16 px-[20vw] mt-20">

                {projects.map((project, i) => (
                    <div
                        key={i}
                        className="portfolio-panel relative shrink-0 w-[85vw] md:w-[60vw] h-full rounded-[2rem] overflow-hidden group cursor-pointer"
                        onMouseEnter={(e) => {
                            const ring = document.getElementById('cursor-ring');
                            if (ring) {
                                ring.classList.add('scale-[4]');
                                ring.style.backgroundColor = '#F5DF77';
                                ring.style.mixBlendMode = 'normal';
                            }
                        }}
                        onMouseLeave={(e) => {
                            const ring = document.getElementById('cursor-ring');
                            if (ring) {
                                ring.classList.remove('scale-[4]');
                                ring.style.backgroundColor = 'transparent';
                                ring.style.mixBlendMode = 'difference';
                            }
                        }}
                    >
                        {/* Actual Image Background */}
                        <div className={`absolute inset-0 w-full h-full overflow-hidden ${project.contain ? 'bg-white' : ''}`}>
                            <img
                                src={project.image}
                                alt={project.title}
                                className={`w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110 ${project.contain ? 'object-contain p-12 md:p-24' : 'object-cover'}`}
                            />
                        </div>

                        {/* Dark Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-60" />

                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                            {/* Subtle Grid overlay inside panel */}
                            <div className="w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_#fff_2px,_transparent_2px)] bg-[size:40px_40px] mix-blend-overlay" />
                        </div>

                        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10">
                            <p className="font-mono text-xs md:text-sm text-[#F5DF77] tracking-widest uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                                {project.category}
                            </p>
                            <h3 className="font-display text-4xl md:text-6xl text-white font-bold uppercase transition-transform duration-500 group-hover:-translate-y-2">
                                {project.title}
                            </h3>
                        </div>

                        <div className="absolute top-8 right-8 md:top-12 md:right-12 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 -rotate-45 transition-all duration-500 group-hover:rotate-0 bg-white/5 backdrop-blur-sm">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}
