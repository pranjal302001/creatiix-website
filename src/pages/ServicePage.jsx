import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import { allServices } from '../data/services';
import { servicePages, servicePageSlugs } from '../data/servicePages';
import { demoBySlug } from '../data/demoProject';
import AIVisual from '../components/AIVisuals';
import FAQ from '../components/FAQ';
import { goToContact, SITE_URL } from '../lib/site';

gsap.registerPlugin(ScrollTrigger);

const SectionHeading = ({ label, title, accent }) => (
    <div className="mb-10 md:mb-12">
        <p className="font-mono tracking-[0.16em] text-[13px] text-accent uppercase mb-4">{label}</p>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-[1.05] text-ink">
            {title} <span className="font-drama italic font-normal text-grad">{accent}</span>
        </h2>
    </div>
);

// One full page per service, all from the same template (see data/servicePages.js).
export default function ServicePage({ slug }) {
    const service = allServices.find((s) => s.slug === slug);
    const page = servicePages[slug];
    const ref = useRef(null);
    usePageMeta(page.seoTitle, page.seoDescription);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.sp-rise', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 });
            gsap.utils.toArray('.reveal-block').forEach((block) => {
                gsap.fromTo(block, { y: 60, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: block, start: 'top 85%' },
                });
            });
        }, ref);
        return () => ctx.revert();
    }, [slug]);

    const features = service.tabs[0].features;
    const demo = demoBySlug[slug];
    const others = allServices.filter((s) => s.group === 'ai' && s.slug !== slug);
    const linkFor = (s) => (servicePageSlugs.includes(s.slug) ? `/services/${s.slug}` : `/services#${s.slug}`);

    // Tells search engines what this page offers and repeats the questions below.
    const schema = [
        {
            '@context': 'https://schema.org', '@type': 'Service',
            name: page.seoTitle, serviceType: service.title, description: page.seoDescription,
            url: `${SITE_URL}/services/${slug}`,
            provider: { '@type': 'Organization', name: 'CREATIIX', url: SITE_URL },
            areaServed: { '@type': 'Country', name: 'India' },
        },
        {
            '@context': 'https://schema.org', '@type': 'FAQPage',
            mainEntity: page.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
    ];

    return (
        <div ref={ref} className="relative bg-background min-h-screen text-ink pt-32 overflow-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <i className="glow glow-flame w-[50rem] h-[32rem] left-1/2 -translate-x-1/2 -top-40" />

            {/* Hero */}
            <section className="relative max-w-7xl mx-auto px-6 md:px-16 pt-10 mb-24 md:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-7">
                    <p className="sp-rise font-mono tracking-[0.16em] text-[13px] uppercase mb-6">
                        <Link to="/services" className="text-ink/50 hover:text-accent transition-colors">Services</Link>
                        <span className="text-ink/30 mx-2">/</span>
                        <span className="text-accent">{service.title}</span>
                    </p>
                    <h1 className="sp-rise font-display font-bold text-4xl md:text-6xl tracking-tight leading-[1.04] mb-8">
                        {page.heading}{' '}
                        <span className="font-drama italic font-normal text-grad">{page.headingAccent}</span>
                    </h1>
                    <p className="sp-rise text-lg md:text-xl text-ink/60 max-w-2xl font-light leading-relaxed mb-10">{page.intro}</p>
                    <div className="sp-rise flex flex-wrap items-center gap-4">
                        <button onClick={goToContact} className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-brand text-onaccent font-bold uppercase tracking-widest text-sm hover:brightness-110 transition">
                            Discuss your chatbot
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        {demo && demo.status === 'live' && (
                            <Link to={`/demo#${slug}`} className="inline-flex items-center gap-2 px-7 py-4 glass text-ink font-bold uppercase tracking-widest text-sm hover:text-accent transition-colors">
                                Try the live demo
                            </Link>
                        )}
                    </div>
                </div>
                <div className="sp-rise lg:col-span-5">
                    <AIVisual type={service.visual} />
                </div>
            </section>

            {/* Who it is for */}
            <section className="relative max-w-7xl mx-auto px-6 md:px-16 mb-24 md:mb-32">
                <i className="glow glow-orange w-[34rem] h-[34rem] -left-72 top-0" />
                <div className="relative reveal-block">
                    <SectionHeading label="Who it is for" title="Built for businesses" accent="that live on enquiries." />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {page.audiences.map((a, i) => (
                            <div key={a.who} className="glass p-6 md:p-7 flex flex-col">
                                <span className="font-mono text-accent text-[13px] font-bold mb-5">{String(i + 1).padStart(2, '0')}</span>
                                <h3 className="font-display font-bold text-2xl leading-tight mb-3">{a.who}</h3>
                                <p className="text-ink/60 font-light leading-relaxed">{a.need}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What we build */}
            <section className="relative max-w-7xl mx-auto px-6 md:px-16 mb-24 md:mb-32">
                <i className="glow glow-peach w-[30rem] h-[30rem] -right-60 top-10" />
                <div className="relative reveal-block glass p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-7">
                        <SectionHeading label="What we build" title={service.tagline.replace(/[.]$/, '')} accent="" />
                        <p className="text-ink/70 text-lg font-light leading-relaxed mb-8 max-w-2xl">{page.buildIntro}</p>
                        <ul className="space-y-5">
                            {features.map((f) => {
                                const [label, rest] = f.split(': ');
                                return (
                                    <li key={f} className="flex items-start gap-4">
                                        <span className="mt-2.5 h-1.5 w-1.5 rounded-2xl bg-accent shrink-0" />
                                        <span className="text-ink/70 text-lg font-light leading-relaxed">
                                            <strong className="text-ink font-medium">{label}</strong>{rest && `: ${rest}`}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        {[['Popular uses', service.useCases, true], ['Built with', service.stack, false]].map(([title, items, strong]) => (
                            <div key={title}>
                                <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-3">{title}</p>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((item) => (
                                        <span key={item} className={`rounded-2xl px-3.5 py-1.5 ${strong ? 'text-sm text-ink bg-accent/10 border border-accent/30' : 'font-mono text-[13px] text-ink/70 border border-ink/15'}`}>{item}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <p className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-widest text-ink/50">
                            <Clock className="w-4 h-4 text-accent" /> Timeline: as per requirement
                        </p>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="relative max-w-7xl mx-auto px-6 md:px-16 mb-24 md:mb-32">
                <div className="reveal-block">
                    <SectionHeading label="How it works" title="From first message" accent="to a bot that is live." />
                    <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                        {page.steps.map((s, i) => (
                            <li key={s.title} className="glass p-6 flex flex-col">
                                <span className="font-mono text-4xl font-bold leading-none text-accent/40 mb-5">{String(i + 1).padStart(2, '0')}</span>
                                <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
                                <p className="text-ink/60 font-light leading-relaxed">{s.desc}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Demo */}
            {demo && demo.status === 'live' && (
                <section className="relative max-w-7xl mx-auto px-6 md:px-16 mb-8">
                    <i className="glow glow-flame w-[40rem] h-[28rem] -left-60 -top-10" />
                    <div className="relative reveal-block glass p-6 md:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="max-w-2xl">
                            <span className="inline-block font-mono text-xs uppercase tracking-widest text-accent border border-accent/40 rounded-2xl px-2.5 py-1 mb-5">Demo project, not a client</span>
                            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight leading-tight mb-4">
                                See one working <span className="font-drama italic font-normal text-grad">before you decide.</span>
                            </h2>
                            <p className="text-ink/70 text-lg font-light leading-relaxed">{page.demoNote}</p>
                        </div>
                        <Link to={`/demo#${slug}`} className="group shrink-0 inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-brand text-onaccent font-bold uppercase tracking-widest text-sm hover:brightness-110 transition self-start lg:self-auto">
                            Open the demo
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </section>
            )}

            {/* Questions */}
            <FAQ items={page.faqs} />

            {/* Other services */}
            <section className="relative max-w-7xl mx-auto px-6 md:px-16 mb-24">
                <div className="reveal-block">
                    <p className="font-mono text-[13px] uppercase tracking-widest text-ink/40 mb-5">Works well with</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {others.map((s) => (
                            <Link key={s.slug} to={linkFor(s)} className="glass group p-6 flex flex-col hover:text-accent transition-colors">
                                <span className="font-display font-bold text-xl mb-2">{s.title}</span>
                                <span className="text-ink/60 font-light leading-relaxed">{s.short}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative px-6 md:px-16 pb-24">
                <div className="max-w-7xl mx-auto bg-brand text-onaccent rounded-2xl py-20 md:py-24 px-8 text-center">
                    <h2 className="font-display font-bold text-3xl md:text-6xl tracking-tight mb-6">
                        Tell us what your customers <span className="font-drama italic font-normal normal-case tracking-normal">keep asking.</span>
                    </h2>
                    <p className="text-xl text-onaccent/80 mb-10 max-w-2xl mx-auto">
                        Send us the questions on WhatsApp and we will show you how a chatbot would handle them. Timelines are set as per your requirement.
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
