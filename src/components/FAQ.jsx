import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const faqs = [
    {
        q: "What can an AI chatbot actually do for my business?",
        a: "It answers customer questions from your own content, captures and qualifies leads, books appointments and shares order updates, on your website, WhatsApp or Instagram, at any hour. When a human is needed, it hands the chat to your team."
    },
    {
        q: "Do I need technical knowledge to use AI automation?",
        a: "No. We study how you work today, build the automation around the tools you already use, and train your team. You get a simple way to see what ran and what needs your attention."
    },
    {
        q: "Can you build both my website and my mobile app?",
        a: "Yes. Design, websites, web apps and Android and iOS apps are built by one team, so your brand, data and logins stay consistent everywhere."
    },
    {
        q: "Do I need to hire multiple agencies?",
        a: "No. CREATIIX handles identity, design, video, content, marketing, development and AI under one strategic vision."
    },
    {
        q: "How long does a project take?",
        a: "As per your requirement. The bigger the work, the more time it needs, but we move fast and most projects are delivered sooner than clients expect. You get a clear timeline before we start."
    },
    {
        q: "Who is your ideal client?",
        a: "Ambitious founders, creators and business owners who want world-class design and modern technology without managing uncoordinated teams."
    }
];

export default function FAQ() {
    const sectionRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.faq-reveal', {
                scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
                y: 50, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="faq" ref={sectionRef} className="py-28 md:py-40 px-6 md:px-16 bg-background max-w-7xl mx-auto relative">
            <div className="faq-reveal mb-16 md:mb-24 text-center md:text-left">
                <h2 className="font-display font-bold text-4xl md:text-6xl text-ink tracking-tight leading-none">
                    Common <span className="font-drama italic font-normal normal-case tracking-normal text-grad">questions.</span>
                </h2>
            </div>

            <div className="flex flex-col border-t border-ink/15 relative z-10 w-full">
                {faqs.map((item, i) => {
                    const isOpen = openIndex === i;
                    return (
                        <div key={i} className={`faq-reveal group w-full border-b border-ink/15 transition-colors duration-300 ${isOpen ? 'bg-brand rounded-2xl border-transparent' : 'hover:bg-ink/5'}`}>
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : i)}
                                aria-expanded={isOpen}
                                className="flex items-center justify-between gap-6 py-7 md:py-9 px-4 md:px-8 w-full text-left"
                            >
                                <span className="flex items-baseline gap-5 md:gap-8">
                                    <span className={`font-mono text-[13px] md:text-sm tabular-nums ${isOpen ? 'text-onaccent/60' : 'text-accent'}`}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className={`font-display font-bold text-xl md: text-3xl lg: text-3xl leading-tight tracking-tight ${isOpen ? 'text-onaccent' : 'text-ink'}`}>
                                        {item.q}
                                    </span>
                                </span>
                                <span className="relative w-6 h-6 shrink-0">
                                    <span className={`absolute top-1/2 left-0 w-full h-[2px] ${isOpen ? 'bg-onaccent' : 'bg-ink'}`} />
                                    <span className={`absolute top-1/2 left-0 w-full h-[2px] transition-transform duration-500 ${isOpen ? 'rotate-0 bg-onaccent' : 'rotate-90 bg-ink'}`} />
                                </span>
                            </button>

                            {/* Answer: animates open with the grid-rows trick, no height measuring needed */}
                            <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                <div className="overflow-hidden">
                                    <p className="font-body text-lg md:text-2xl font-light leading-relaxed text-onaccent max-w-4xl px-4 md:px-8 pl-[3.25rem] md:pl-[5.5rem] pb-10">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
