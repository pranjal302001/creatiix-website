import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { CONTACT, goToContact, whatsappLink } from '../lib/site';

export default function FinalCTA() {
    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.cta-content',
                { scale: 0.95, opacity: 0 },
                { scrollTrigger: { trigger: container.current, start: "top 75%" }, scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }
            );
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative px-6 md:px-16 w-full pb-24 bg-background overflow-hidden">
            <i className="glow glow-flame w-[50rem] h-[26rem] left-1/2 -translate-x-1/2 top-10" />
            <div className="cta-content relative max-w-7xl mx-auto glass text-ink py-24 md:py-32 px-8 md:px-20 text-center flex flex-col items-center">
                <h2 className="font-display font-bold tracking-tight text-5xl md:text-7xl leading-none mb-6">
                    Ready to <span className="font-drama italic font-normal normal-case tracking-normal text-grad">build?</span>
                </h2>

                <p className="font-body text-lg md:text-xl font-semibold uppercase mb-12 max-w-2xl tracking-widest text-ink/60">
                    One team for AI, apps, design and marketing.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <button onClick={goToContact} className="group px-9 py-5 bg-brand text-onaccent font-body font-bold tracking-widest uppercase text-sm flex items-center gap-4 rounded-2xl hover:brightness-110 transition duration-300">
                        <span>Start your project</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="px-9 py-5 glass text-ink font-body font-bold tracking-widest uppercase text-sm flex items-center gap-3 hover:text-accent transition-colors duration-300">
                        <MessageCircle className="w-5 h-5" /> WhatsApp us
                    </a>
                </div>
            </div>
        </section>
    );
}
