import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AIBrainstormer from './AIBrainstormer';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    const steps = [
        {
            num: "01",
            title: "Discovery & Strategy",
            desc: "Deep dive into branding psychology, market understanding, and business goals. We don't just design; we build foundations that stand the test of time.",
            color: "bg-[#353B4E]",
            textColor: "text-[#F5DF77]",
            image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2940&auto=format&fit=crop" // Meeting/Strategy
        },
        {
            num: "02",
            title: "Creative Execution",
            desc: "End-to-end design: UI/UX, Motion 3D, and Branding—all under one roof. We craft cohesive visual identities that demand attention and command respect.",
            color: "bg-[#7CC159]",
            textColor: "text-[#353B4E]",
            image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2940&auto=format&fit=crop" // Design/UX Execution
        },
        {
            num: "03",
            title: "Scale & Grow",
            desc: "Deploy result-focused marketing campaigns to stand out and convert. We ensure your new identity isn't just seen, but actively drives revenue and growth.",
            color: "bg-[#F5DF77]",
            textColor: "text-[#353B4E]",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop" // Metrics/Growth
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Setup sticky card stacking effect
            const cards = cardsRef.current;

            cards.forEach((card, index) => {
                // Pin each card
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    endTrigger: containerRef.current,
                    end: `bottom bottom`,
                    pin: true,
                    pinSpacing: false,
                    id: `card-pin-${index}`
                });

                // Scale down previous cards slightly as new ones overlap
                if (index > 0) {
                    gsap.to(cards[index - 1], {
                        scale: 0.95 - (0.02 * index), // Stack gets smaller in background
                        filter: "brightness(0.5)", // Darken covered cards
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "top top",
                            scrub: true,
                        }
                    });
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative bg-background border-t border-primary/10">
            {/* 
              We don't need padding-y here because each card is 100vh.
              The overall container height is determined by the stacked cards pushing the flow.
            */}

            {steps.map((step, i) => (
                <div
                    key={i}
                    ref={el => cardsRef.current[i] = el}
                    className={`h-screen w-full flex items-center justify-center sticky top-0 ${step.color} shadow-[0_-10px_30px_rgba(0,0,0,0.3)] origin-top z-[${i * 10}]`}
                >
                    <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 w-full h-[80vh] items-center">

                        <div className="md:col-span-6 flex flex-col justify-center h-full pt-12 md:pt-0">
                            <span className={`font-mono text-[15vw] md:text-[8vw] font-black leading-none opacity-20 ${step.textColor}`}>
                                {step.num}
                            </span>
                            <h2 className={`font-display text-5xl md:text-7xl font-bold uppercase mt-4 ${step.textColor} leading-tight`}>
                                {step.title}
                            </h2>
                            <p className={`font-body text-xl md:text-3xl font-light leading-relaxed mt-6 ${step.textColor} opacity-90 max-w-lg`}>
                                {step.desc}
                            </p>

                            <div className="mt-12 flex items-center gap-4">
                                <div className={`w-12 h-[2px] ${step.textColor} opacity-50`}></div>
                                <span className={`font-mono text-xs md:text-sm uppercase tracking-widest ${step.textColor} opacity-70`}>Phase {step.num} Complete</span>
                            </div>
                        </div>

                        <div className="md:col-span-6 h-full hidden md:flex items-center justify-end relative">
                            {/* Cinematic Image Panel */}
                            <div className="w-[90%] h-[70%] rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 group">
                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-[1s] ease-[cubic-bezier(0.19,1,0.22,1)] scale-105 group-hover:scale-100"
                                />
                                <div className={`absolute inset-0 opacity-20 group-hover:opacity-0 transition-opacity duration-700 mix-blend-overlay ${step.textColor}`}></div>
                            </div>
                        </div>

                    </div>
                </div>
            ))}

            {/* Embedded AI Brainstormer Section */}
            <div className="relative z-[100] bg-background pt-24 pb-8 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <div className="max-w-7xl mx-auto px-6 md:px-16 text-center mb-12">
                    <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight text-white mb-4">
                        Experience the <span className="text-[#F5DF77]">Method</span>
                    </h2>
                    <p className="font-mono text-[#F5DF77] uppercase tracking-widest text-sm">
                        Test drive our creative strategy.
                    </p>
                </div>
                <AIBrainstormer />
            </div>

            {/* Added spacer to allow scrolling past the final pinned card smoothly */}
            <div className="h-[20vh] bg-background w-full relative z-[100]"></div>

        </section>
    );
}
