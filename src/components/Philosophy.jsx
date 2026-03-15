import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Philosophy() {
    const container = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Setup Initial State of SVG Line
            const length = pathRef.current.getTotalLength();
            gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 60%",
                }
            });

            tl.from('.phil-line', {
                y: 60,
                opacity: 0,
                rotateX: -45,
                stagger: 0.2,
                duration: 1.2,
                ease: "power3.out"
            })
                .to(pathRef.current, {
                    strokeDashoffset: 0,
                    duration: 1.5,
                    ease: "power2.out"
                }, "-=0.5"); // Start drawing SVG slightly before text finishes

        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section id="philosophy" ref={container} className="relative py-32 md:py-64 bg-background overflow-hidden border-t border-white/5 flex items-center justify-center">
            {/* Background Parallax Texture / Abstract elements */}
            <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7CC159]/10 via-background to-transparent blur-3xl opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/2 rounded-full" />

            {/* Aesthetic Spinning Element */}
            <div className="absolute top-1/4 left-10 md:left-32 opacity-20 pointer-events-none">
                <svg className="w-24 h-24 md:w-48 md:h-48 animate-spin-slow text-[#F5DF77]" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0L53.5 35.5L85.5 14.5L64.5 46.5L100 50L64.5 53.5L85.5 85.5L53.5 64.5L50 100L46.5 64.5L14.5 85.5L35.5 53.5L0 50L35.5 46.5L14.5 14.5L46.5 35.5L50 0Z" />
                </svg>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 text-center lg:text-left flex flex-col items-center lg:items-end w-full">

                <h2 className="font-drama italic text-4xl md:text-[clamp(3rem,6vw,6rem)] leading-[1.1] text-white">
                    <div className="phil-line space-x-2">
                        <span>We don't do</span>
                        <span className="font-display font-black uppercase text-[#353B4E] bg-white px-4 py-1 rounded-full text-3xl md:text-5xl border border-white/20 select-none transform rotate-2 inline-block shadow-lg">generic.</span>
                    </div>

                    <div className="phil-line mt-4 md:mt-8 space-x-2 relative inline-block">
                        <span>We build brands with</span>

                        {/* The highlighted text with SVG scribble */}
                        <span className="relative inline-block text-white font-black px-2 ml-4 transform -rotate-2">
                            <span className="relative z-10 pl-2">soul and strategy.</span>

                            {/* Complex SVG marker drawn beneath */}
                            <svg
                                className="absolute inset-x-0 w-[120%] h-[150%] -left-[10%] -top-[25%] pointer-events-none z-0 mix-blend-difference"
                                viewBox="0 0 400 100"
                                preserveAspectRatio="none"
                            >
                                <path
                                    ref={pathRef}
                                    d="M 20 80 Q 150 70, 380 75 Q 390 40, 370 20 Q 200 30, 30 15 Q 15 50, 40 90"
                                    fill="none"
                                    stroke="#F5DF77"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </div>
                </h2>

                <div className="phil-line mt-12 md:mt-24 max-w-xl self-end">
                    <p className="font-body text-xl md:text-2xl text-white/50 font-light leading-relaxed">
                        Standard templates are <span className="text-[#F5DF77] line-through decoration-[#7CC159] decoration-2">everywhere</span>. We focus on bespoke digital ecosystems that make your competitors look outdated. From the first pixel to the final code.
                    </p>
                </div>

            </div>
        </section>
    );
}
