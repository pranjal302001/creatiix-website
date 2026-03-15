import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesCategories } from '../data/servicesCategories';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
    const heroRef = useRef(null);
    const containerRef = useRef(null);

    // Hero Entrance Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.hero-text-split span',
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.5 }
            );
            gsap.fromTo('.hero-desc',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1 }
            );
            gsap.fromTo('.hero-line',
                { scaleX: 0 },
                { scaleX: 1, duration: 1.5, ease: 'power3.inOut', delay: 1.2, transformOrigin: 'left center' }
            );
        }, heroRef);
        return () => ctx.revert();
    }, []);

    // ScrollTrigger Animations for the Sticky Layout
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate each category section as it scrolls
            const sections = gsap.utils.toArray('.category-section');

            sections.forEach((section) => {
                const cards = section.querySelectorAll('.service-card');

                // Fade in cards as they scroll up
                gsap.fromTo(cards,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 70%",
                            end: "bottom 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-background min-h-screen text-white pt-32 hidden-overflow">

            {/* Hero Section */}
            <section ref={heroRef} className="container mx-auto px-6 mb-24 md:mb-40 pt-10">
                <div className="max-w-5xl">
                    <p className="tracking-[0.2em] text-sm text-gray-400 uppercase mb-6 flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-accent hero-line origin-left"></span>
                        Our Expertise
                    </p>
                    <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[1.1] mb-8 hero-text-split overflow-hidden">
                        <span className="inline-block relative">Crafting</span>{' '}
                        <span className="inline-block relative">Digital</span><br />
                        <span className="inline-block relative font-serif italic text-accent">Excellence.</span>
                    </h1>
                    <p className="hero-desc text-lg md:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed opacity-0">
                        We blend high-end aesthetics with strategic architecture to build brands, platforms, and content that dominate the digital space.
                    </p>
                </div>
            </section>

            {/* Main Sticky-Scroll Layout */}
            <section ref={containerRef} className="container mx-auto px-6 pb-32">
                {servicesCategories.map((category, index) => (
                    <div
                        key={category.id}
                        className="category-section flex flex-col lg:flex-row gap-12 lg:gap-24 mb-32 lg:mb-48 relative"
                    >
                        {/* Left Column: Sticky Title & Image */}
                        <div className="lg:w-5/12 relative">
                            <div className="lg:sticky lg:top-32 h-auto lg:h-[80vh] flex flex-col justify-between pb-12">
                                <div>
                                    <span className="text-accent font-mono text-lg mb-4 block">
                                        {category.id} / 0{servicesCategories.length}
                                    </span>
                                    <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">
                                        {category.title}
                                    </h2>
                                </div>

                                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden hidden lg:block border border-white/10 group">
                                    <div className="absolute inset-0 bg-background/20 mix-blend-overlay z-10 transition-opacity duration-700 group-hover:opacity-0"></div>
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-100"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Scrolling Service Cards */}
                        <div className="lg:w-7/12 flex flex-col gap-8 lg:pt-32">
                            {category.services.map((service, sIndex) => (
                                <div
                                    key={sIndex}
                                    className="service-card p-8 md:p-12 rounded-2xl bg-[#111111] border border-white/5 hover:border-accent/30 transition-colors duration-500 group"
                                >
                                    <h3 className="text-2xl md:text-3xl font-light mb-2 group-hover:text-accent transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-accent font-serif italic text-lg mb-6">
                                        {service.subtitle}
                                    </p>
                                    <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                                        {service.desc}
                                    </p>

                                    <ul className="space-y-4">
                                        {service.features.map((feature, fIndex) => {
                                            const [boldPart, restPart] = feature.split(': ');
                                            return (
                                                <li key={fIndex} className="flex items-start gap-4">
                                                    <span className="text-accent mt-1.5 opacity-60">
                                                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </span>
                                                    <span className="text-gray-300 font-light leading-relaxed">
                                                        <strong className="text-white font-normal">{boldPart}</strong>
                                                        {restPart && `: ${restPart}`}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* CTA Section */}
            <section className="py-32 border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background to-accent/5 pointer-events-none"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-7xl font-light mb-8">
                        Ready to elevate your brand?
                    </h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
                        Let's discuss how our comprehensive creative services can drive your business forward.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-4 bg-white text-background px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform duration-300"
                    >
                        Start a Project
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </section>
        </div>
    );
}
