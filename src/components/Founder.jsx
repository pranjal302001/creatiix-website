import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// A short note from the founder, shown on the home page right after "About".
export default function Founder() {
    const ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.founder-rise',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: ref.current, start: 'top 75%' },
                }
            );
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <section id="founder" ref={ref} className="relative bg-background py-24 md:py-36 px-6 md:px-16 overflow-hidden">
            <i className="glow glow-flame w-[42rem] h-[30rem] -left-60 top-1/4" />
            <i className="glow glow-peach w-[26rem] h-[26rem] -right-40 bottom-0" />

            <div className="relative max-w-6xl mx-auto glass p-3 md:p-4 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-stretch">

                {/* Photo */}
                <div className="founder-rise md:col-span-5 relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-auto md:min-h-[30rem]">
                    <img
                        src="/brand/founder.webp"
                        alt="Pranjal Jain, Founder and CEO of CREATIIX"
                        loading="lazy"
                        width="720"
                        height="941"
                        className="absolute inset-0 w-full h-full object-cover object-[60%_15%]"
                    />
                    {/* Warm tint and a soft fade so the photo sits inside the dark theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-accent/10 mix-blend-soft-light" />
                </div>

                {/* Message */}
                <div className="md:col-span-7 flex flex-col justify-center p-4 pb-6 md:p-10 lg:p-14">
                    <p className="founder-rise font-mono tracking-[0.16em] text-[13px] text-accent uppercase mb-6">A note from the founder</p>

                    <blockquote className="founder-rise">
                        <p className="font-display font-medium text-2xl md:text-3xl lg:text-4xl tracking-tight leading-[1.2] text-ink">
                            I started CREATIIX with one belief:{' '}
                            <span className="font-drama italic font-normal text-grad">good work should be easy to get.</span>
                        </p>
                        <p className="text-ink/70 text-lg font-light leading-relaxed mt-6 max-w-xl">
                            You tell us what your business needs, and we build it properly, whether that is an AI chatbot,
                            an app, or a brand that people remember. Every project gets my personal attention.
                        </p>
                    </blockquote>

                    <div className="founder-rise flex items-center gap-4 mt-10 pt-8 border-t border-ink/10">
                        <span className="h-0.5 w-10 bg-brand rounded-2xl" />
                        <div>
                            <p className="font-display font-bold text-xl tracking-tight text-ink leading-none">Pranjal Jain</p>
                            <p className="font-mono text-[13px] uppercase tracking-widest text-ink/50 mt-1.5">Founder &amp; CEO</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
