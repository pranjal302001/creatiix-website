import { usePageMeta } from '../lib/usePageMeta';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock } from 'lucide-react';
import { allServices, serviceGroups } from '../data/services';
import { industryConcepts } from '../data/aiServices';
import AIVisual from '../components/AIVisuals';
import { goToContact } from '../lib/site';
import { demoBySlug } from '../data/demoProject';
import { servicePageSlugs } from '../data/servicePages';

gsap.registerPlugin(ScrollTrigger);

// "Label: description" → bold label + description
function Feature({ text }) {
    const [label, rest] = text.split(': ');
    return (
        <li className="flex items-start gap-4">
            <span className="text-accent mt-1.5 shrink-0">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span className="text-ink/70 font-light leading-relaxed">
                <strong className="text-ink font-medium">{label}</strong>
                {rest && `: ${rest}`}
            </span>
        </li>
    );
}

const Chips = ({ title, items, strong }) => (
    <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-3">{title}</p>
        <div className="flex flex-wrap gap-2">
            {items.map((item) => (
                <span key={item} className={`rounded-2xl px-3.5 py-1.5 ${strong ? 'text-sm text-ink bg-accent/10 border border-accent/30' : 'font-mono text-[13px] text-ink/70 border border-ink/15'}`}>{item}</span>
            ))}
        </div>
    </div>
);

// The single template used for every service, AI or creative.
function ServicePanel({ service, index, total }) {
    const [tab, setTab] = useState(0);
    const active = service.tabs[tab];
    const flip = index % 2 === 1;

    return (
        <article id={service.slug} className="service-panel glass scroll-mt-28 p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

                {/* Text */}
                <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-accent text-sm font-bold">{service.id} / {String(total).padStart(2, '0')}</span>
                        {service.group === 'ai' && (
                            <span className="font-mono text-xs uppercase tracking-widest font-bold bg-brand text-onaccent rounded-2xl px-2.5 py-1">Core focus</span>
                        )}
                    </div>
                    <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-none mt-4 mb-3">{service.title}</h2>
                    <p className="font-drama italic text-2xl md:text-3xl text-grad inline-block mb-6">{service.tagline}</p>

                    {service.tabs.length > 1 && (
                        <div className="flex flex-wrap gap-2 mb-7" role="tablist">
                            {service.tabs.map((t, i) => (
                                <button
                                    key={t.title}
                                    role="tab"
                                    aria-selected={i === tab}
                                    onClick={() => setTab(i)}
                                    className={`rounded-2xl px-4 py-2 text-sm font-semibold transition-colors ${i === tab ? 'bg-brand text-onaccent' : 'border border-ink/15 text-ink/70 hover:text-ink hover:border-ink/40'}`}
                                >
                                    {t.title}
                                </button>
                            ))}
                        </div>
                    )}

                    {active.subtitle && <p className="font-display font-bold text-xl text-ink mb-2">{active.subtitle}</p>}
                    <p className="text-ink/70 text-lg font-light leading-relaxed mb-8 max-w-2xl">{active.desc}</p>

                    <ul className="space-y-4 mb-10">
                        {active.features.map((f) => <Feature key={f} text={f} />)}
                    </ul>

                    <div className="flex flex-wrap items-center gap-4">
                        <button onClick={goToContact} className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-brand text-onaccent font-bold uppercase tracking-widest text-xs hover:brightness-110 transition">
                            Discuss this project
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        {demoBySlug[service.slug] && demoBySlug[service.slug].status !== 'soon' && (
                            <Link to={`/demo#${service.slug}`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl glass text-ink font-bold uppercase tracking-widest text-xs hover:text-accent transition-colors">
                                {demoBySlug[service.slug].status === 'work' ? 'See our work' : 'See demo'}
                            </Link>
                        )}
                        {servicePageSlugs.includes(service.slug) && (
                            <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl glass text-ink font-bold uppercase tracking-widest text-xs hover:text-accent transition-colors">
                                Learn more
                            </Link>
                        )}
                        <span className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-widest text-ink/50">
                            <Clock className="w-4 h-4 text-accent" /> Timeline: as per requirement
                        </span>
                    </div>
                </div>

                {/* Visual + quick facts */}
                <div className={`lg:col-span-5 flex flex-col gap-6 ${flip ? 'lg:order-1' : ''}`}>
                    <AIVisual type={service.visual} />
                    <Chips title="Popular uses" items={service.useCases} strong />
                    {service.stack && <Chips title="Built with" items={service.stack} />}
                </div>
            </div>
        </article>
    );
}

export default function Services() {
    usePageMeta("Services: AI, Apps, Design and Marketing", "Ten services from one studio: AI chatbots, automation and agents, websites, web and mobile apps, graphic design, video editing, content writing and social media.");
    const pageRef = useRef(null);
    const { hash } = useLocation();
    const [group, setGroup] = useState('all');
    const visible = allServices.filter((s) => group === 'all' || s.group === group);

    // A link to a specific service must not be hidden by the filter
    useEffect(() => { if (hash) setGroup('all'); }, [hash]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.hero-text-split span',
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
            );
            gsap.fromTo('.hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 });
        }, pageRef);
        return () => ctx.revert();
    }, []);

    // Panels fade up as they enter; re-run when the filter changes the list
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.service-panel, .reveal-block').forEach((block) => {
                gsap.fromTo(block, { y: 60, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: block, start: 'top 85%' }
                });
            });
        }, pageRef);
        return () => ctx.revert();
    }, [group]);

    return (
        <div ref={pageRef} className="relative bg-background min-h-screen text-ink pt-32 overflow-hidden">
            <i className="glow glow-flame w-[50rem] h-[32rem] left-1/2 -translate-x-1/2 -top-40" />

            {/* Hero */}
            <section className="relative max-w-7xl mx-auto px-6 md:px-16 mb-16 md:mb-20 pt-10">
                <p className="font-mono tracking-[0.16em] text-[13px] text-accent uppercase mb-6">Services</p>
                <h1 className="font-display font-bold text-4xl md:text-7xl tracking-tight leading-[1.02] mb-8 hero-text-split">
                    <span className="inline-block">AI,</span>{' '}
                    <span className="inline-block">apps</span>{' '}
                    <span className="inline-block">&amp;</span><br />
                    <span className="inline-block font-drama italic font-normal normal-case tracking-normal text-grad">the creative that sells them.</span>
                </h1>
                <p className="hero-desc text-lg md:text-2xl text-ink/60 max-w-2xl font-light leading-relaxed">
                    Ten services, one studio. We build the technology that runs your business, and the brand and content that grow it.
                </p>

                {/* Filter */}
                <div className="hero-desc flex flex-wrap gap-2 mt-10">
                    {serviceGroups.map((g) => (
                        <button
                            key={g.key}
                            onClick={() => setGroup(g.key)}
                            aria-pressed={group === g.key}
                            className={`px-6 py-3 rounded-2xl font-bold uppercase tracking-widest text-xs transition-colors ${group === g.key ? 'bg-brand text-onaccent' : 'glass text-ink hover:text-accent'}`}
                        >
                            {g.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* All services, one template */}
            <section className="relative max-w-7xl mx-auto px-6 md:px-16 pb-24">
                <i className="glow glow-orange w-[36rem] h-[36rem] -left-72 top-[12%]" />
                <i className="glow glow-peach w-[30rem] h-[30rem] -right-60 top-[30%]" />
                <i className="glow glow-flame w-[40rem] h-[30rem] -left-72 top-[55%]" />
                <i className="glow glow-orange w-[34rem] h-[34rem] -right-60 top-[78%]" />

                <div className="relative flex flex-col gap-8 md:gap-12">
                    {visible.map((s, i) => <ServicePanel key={s.slug} service={s} index={i} total={allServices.length} />)}
                </div>

                {/* Concepts by industry */}
                {group !== 'creative' && (
                    <div className="reveal-block relative mt-24 md:mt-32">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                            <h3 className="font-display font-bold text-3xl md:text-4xl tracking-tight leading-none">
                                What we can build <span className="font-drama italic font-normal normal-case tracking-normal text-grad">for you</span>
                            </h3>
                            <p className="font-mono text-[13px] uppercase tracking-widest text-ink/40">Example concepts, not client work</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {industryConcepts.map((c) => (
                                <div key={c.industry} className="glass p-6 md:p-7 flex flex-col">
                                    <span className="self-start font-mono text-xs uppercase tracking-widest text-accent border border-accent/40 rounded-2xl px-2.5 py-1 mb-5">Concept</span>
                                    <p className="font-mono text-[13px] uppercase tracking-widest text-ink/50 mb-2">{c.industry}</p>
                                    <h4 className="font-display font-bold text-2xl leading-tight mb-3">{c.idea}</h4>
                                    <p className="text-ink/60 font-light leading-relaxed">{c.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="relative px-6 md:px-16 pb-24">
                <div className="max-w-7xl mx-auto bg-brand text-onaccent rounded-2xl py-20 md:py-24 px-8 text-center">
                    <h2 className="font-display font-bold text-3xl md:text-6xl tracking-tight mb-6">
                        Have a project <span className="font-drama italic font-normal normal-case tracking-normal">in mind?</span>
                    </h2>
                    <p className="text-xl text-onaccent/80 mb-10 max-w-2xl mx-auto">
                        Tell us what you want to build. Timelines are set as per your requirement: bigger projects need more time, and we deliver as fast as the work allows.
                    </p>
                    <button onClick={goToContact} className="inline-flex items-center gap-4 bg-onaccent text-[#FFF4E6] px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-black transition-colors duration-300">
                        Let's talk
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>
        </div>
    );
}
