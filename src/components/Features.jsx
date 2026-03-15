import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PenTool, Video, TrendingUp } from 'lucide-react';

export default function Features() {
    const container = useRef(null);
    const marqueeRef = useRef(null);
    const [activeItem, setActiveItem] = useState(null);

    const services = [
        {
            title: "Design Ecosystem",
            desc: "A strategic approach to identity, packaging, and digital presence.",
            color: "#7CC159",
            icon: <PenTool className="w-8 h-8 md:w-12 md:h-12 text-[#7CC159]" strokeWidth={1.5} />,
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop" // Branding mockup
        },
        {
            title: "Motion & Media",
            desc: "Video editing, 3D animation, and motion ads to stop the scroll.",
            color: "#F5DF77",
            icon: <Video className="w-8 h-8 md:w-12 md:h-12 text-[#F5DF77]" strokeWidth={1.5} />,
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop" // Abstract colorful motion
        },
        {
            title: "Growth Marketing",
            desc: "Social media strategy, website UX/UI, and compelling copy.",
            color: "#FFFFFF",
            icon: <TrendingUp className="w-8 h-8 md:w-12 md:h-12 text-white" strokeWidth={1.5} />,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop" // Clean data/desk
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background Marquee Scroll
            gsap.to(marqueeRef.current, {
                xPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // Item appearances
            gsap.from('.service-item', {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 60%",
                },
                y: 100,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out"
            });

        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section id="features" ref={container} className="relative py-40 min-h-screen bg-[#353B4E] overflow-hidden flex flex-col justify-center">

            {/* Massive Background Marquee */}
            <div className="absolute top-1/2 -translate-y-1/2 w-[200vw] pointer-events-none opacity-5 z-0 flex">
                <h2 ref={marqueeRef} className="font-display text-[30vw] font-black text-[#F5DF77] whitespace-nowrap leading-none tracking-tighter">
                    SERVICES — EXPERTISE — SERVICES — EXPERTISE —
                </h2>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col gap-8 md:gap-16">

                <div className="mb-8 md:mb-16">
                    <h2 className="font-drama italic text-5xl md:text-7xl text-[#F5DF77] mb-6">Our Expertise</h2>
                    <div className="w-24 h-px bg-[#7CC159]" />
                </div>

                {/* Interactive Service List */}
                <div className="flex flex-col border-t border-white/10 relative" onMouseLeave={() => setActiveItem(null)}>
                    {services.map((srv, i) => (
                        <div
                            key={i}
                            className="service-item group relative border-b border-white/10 py-10 md:py-16 cursor-pointer flex flex-col md:flex-row md:items-center justify-between transition-colors duration-500 hover:bg-white/5 overflow-hidden"
                            onMouseEnter={() => setActiveItem(i)}
                        >
                            {/* Animated Cinematic Background Image on Hover */}
                            <div
                                className={`absolute inset-0 z-0 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] overflow-hidden origin-top ${activeItem === i ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}
                            >
                                <img src={srv.image} alt={srv.title} className="w-full h-full object-cover transform scale-110 transition-transform duration-[2s] group-hover:scale-100" />
                                <div className="absolute inset-0 bg-[#353B4E]/80 mix-blend-multiply"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#353B4E] via-[#353B4E]/50 to-transparent"></div>
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row md:items-baseline gap-6 md:gap-12 w-full px-6">
                                <div className="flex items-center gap-6">
                                    <span className="font-mono text-[#7CC159] text-xl font-bold">0{i + 1}</span>
                                    <div className="opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                        {srv.icon}
                                    </div>
                                </div>
                                <h3 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter group-hover:text-white transition-all duration-500 md:group-hover:translate-x-4 transform drop-shadow-lg">
                                    {srv.title}
                                </h3>
                            </div>

                            <div className="relative z-10 px-6 mt-6 md:mt-0 md:max-w-xs md:text-right overflow-hidden flex flex-col md:items-end">
                                <p className="font-body text-lg text-white/60 group-hover:text-white transition-colors duration-500 drop-shadow-sm">
                                    {srv.desc}
                                </p>
                                {/* Magnetic Arrow */}
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mt-6 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 bg-white text-background">
                                    <svg className="w-5 h-5 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
