import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// How a project runs: five stacked cards (Discover → Design → Develop → Launch → Support).
// NOTE(owner): the wording below describes your working process. Please review and adjust.
const steps = [
    {
        num: "01",
        title: "Discover",
        desc: "We start with your business, not our tools. One conversation to understand the goal, the users and what is slowing you down today.",
        happens: ["A first conversation about your goals", "Goals, audience and current workflow mapped", "For AI projects: which tasks are worth automating"],
        youGet: ["A written scope", "Timeline and proposal"],
        tone: "surface"
    },
    {
        num: "02",
        title: "Design",
        desc: "You see it before we build it. Screens for websites and apps, conversation flows for chatbots, workflow maps for automation.",
        happens: ["Wireframes and UI design", "Chatbot conversations and automation flows planned", "Brand look applied across every screen"],
        youGet: ["A clickable prototype", "Flow diagrams to approve"],
        tone: "accent"
    },
    {
        num: "03",
        title: "Develop",
        desc: "We build in short cycles and show progress as we go, so there are no surprises at the end.",
        happens: ["Development in weekly cycles", "AI trained and tested on your real content", "Integrations with your existing tools"],
        youGet: ["Regular progress demos", "A private test link"],
        tone: "background"
    },
    {
        num: "04",
        title: "Launch",
        desc: "Tested on real devices, deployed, and handed over with everything your team needs to run it.",
        happens: ["Testing across devices and browsers", "Deployment, domain and app store submission", "Analytics and tracking set up"],
        youGet: ["Your product, live", "Handover and training"],
        tone: "peach"
    },
    {
        num: "05",
        title: "Support",
        desc: "Launch is the beginning. We monitor, fix and keep improving, and AI systems get sharper from real usage.",
        happens: ["Monitoring and quick fixes", "AI answers tuned from real conversations", "New features as your business grows"],
        youGet: ["Ongoing support", "Regular improvements"],
        tone: "surface"
    }
];

// Colour sets per card. "onaccent" text is used on the orange and peach cards.
const tones = {
    surface: { card: 'bg-surface', text: 'text-ink', sub: 'text-ink/70', num: 'text-accent', box: 'glass', glow: true, tick: 'bg-brand text-onaccent' },
    background: { card: 'bg-background', text: 'text-ink', sub: 'text-ink/70', num: 'text-accent', box: 'glass', glow: true, tick: 'bg-brand text-onaccent' },
    accent: { card: 'bg-brand', text: 'text-onaccent', sub: 'text-onaccent/80', num: 'text-onaccent', box: 'bg-onaccent/10 border-onaccent/15', tick: 'bg-onaccent text-accent' },
    peach: { card: 'bg-peach', text: 'text-onaccent', sub: 'text-onaccent/80', num: 'text-onaccent', box: 'bg-onaccent/10 border-onaccent/15', tick: 'bg-onaccent text-peach' },
};

export default function Process() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Cards stack with CSS sticky; each one shrinks slightly as the next slides over it.
            cardsRef.current.forEach((card, index) => {
                if (index === 0) return;
                gsap.to(cardsRef.current[index - 1].querySelector('.process-inner'), {
                    scale: 0.94,
                    opacity: 0.5,
                    scrollTrigger: { trigger: card, start: 'top bottom', end: 'top top', scrub: true }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="process" ref={containerRef} className="relative bg-background border-t border-ink/10">
            <div className="max-w-7xl mx-auto px-6 md:px-16 pt-28 md:pt-40 pb-16 md:pb-24">
                <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent mb-6">How a project runs</p>
                <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] text-ink">
                    From first message <br /><span className="font-drama italic font-normal normal-case tracking-normal text-grad">to long after launch.</span>
                </h2>
            </div>

            {steps.map((step, i) => {
                const t = tones[step.tone];
                return (
                    <div
                        key={step.num}
                        ref={(el) => (cardsRef.current[i] = el)}
                        className={`md:sticky md:top-0 md:min-h-screen w-full flex items-center overflow-hidden ${t.card} border-t border-ink/10 shadow-[0_-10px_30px_rgba(0,0,0,0.25)]`}
                    >
                        {t.glow && <i className="glow glow-flame w-[34rem] h-[26rem] right-0 top-1/2 -translate-y-1/2" />}
                        <div className="process-inner relative origin-top max-w-7xl mx-auto px-6 md:px-16 py-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 w-full items-center">
                            <div className="md:col-span-6">
                                <div className="flex items-baseline gap-4">
                                    <span className={`font-mono text-6xl md:text-8xl font-bold leading-none ${t.num}`}>{step.num}</span>
                                    <span className={`font-mono text-[13px] uppercase tracking-widest ${t.sub}`}>of 05</span>
                                </div>
                                <h3 className={`font-display text-5xl md:text-7xl font-bold tracking-tight mt-4 leading-none ${t.text}`}>
                                    {step.title}
                                </h3>
                                <p className={`font-body text-xl md:text-2xl font-light leading-relaxed mt-6 max-w-lg ${t.sub}`}>
                                    {step.desc}
                                </p>
                            </div>

                            <div className="md:col-span-6 flex flex-col gap-5">
                                <div className={`rounded-3xl border p-6 md:p-8 ${t.box}`}>
                                    <p className={`font-mono text-[13px] uppercase tracking-widest mb-5 ${t.sub}`}>What happens</p>
                                    <ul className="flex flex-col gap-3.5">
                                        {step.happens.map((item) => (
                                            <li key={item} className={`flex items-start gap-3 text-lg leading-snug ${t.text}`}>
                                                <span className={`mt-1 w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${t.tick}`}>
                                                    <Check className="w-3 h-3" strokeWidth={3} />
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={`rounded-3xl border p-6 md:p-8 ${t.box}`}>
                                    <p className={`font-mono text-[13px] uppercase tracking-widest mb-4 ${t.sub}`}>You get</p>
                                    <div className="flex flex-wrap gap-2.5">
                                        {step.youGet.map((item) => (
                                            <span key={item} className={`font-display font-bold text-base md:text-lg rounded-2xl border px-4 py-2 ${t.box} ${t.text}`}>
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
