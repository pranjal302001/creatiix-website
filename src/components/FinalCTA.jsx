import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FinalCTA() {
    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.cta-content',
                { scale: 0.95, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 75%",
                    },
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: "back.out(1.5)"
                }
            );
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="py-0 px-6 md:px-16 w-full mb-24">
            <div className="cta-content max-w-7xl mx-auto bg-accent text-primary rounded-[3rem] py-32 px-10 md:px-20 text-center flex flex-col items-center shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 opacity-10 background-radial bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent pointer-events-none mix-blend-overlay" />

                <h2 className="font-drama italic text-6xl md:text-8xl leading-none mb-6 font-black capitalize z-10">
                    Ready to scale?
                </h2>

                <p className="font-body text-xl md:text-2xl font-bold uppercase mb-12 max-w-2xl tracking-widest text-[#5e4b10] z-10">
                    Stop juggling agencies. Start dominating your industry.
                </p>

                <button
                    className="group relative px-10 py-5 bg-primary text-contrast font-body hover:bg-white hover:text-primary transition-colors duration-300 font-bold tracking-widest uppercase overflow-hidden z-10 flex items-center gap-4 rounded"
                    onMouseEnter={() => {
                        const ring = document.getElementById('cursor-ring');
                        if (ring) {
                            ring.classList.add('scale-150');
                            ring.style.backgroundColor = '#232838'; // Darker background to contrast on the green CTA block
                            ring.style.mixBlendMode = 'normal';
                        }
                    }}
                    onMouseLeave={() => {
                        const ring = document.getElementById('cursor-ring');
                        if (ring) {
                            ring.classList.remove('scale-150');
                            ring.style.backgroundColor = 'transparent';
                            ring.style.mixBlendMode = 'difference';
                        }
                    }}
                >
                    <span>Book a free 30-minute consultation</span>
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
