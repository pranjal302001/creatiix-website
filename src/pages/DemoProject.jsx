import { usePageMeta } from '../lib/usePageMeta';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, ArrowUpRight, Monitor, Smartphone } from 'lucide-react';
import PageHeader, { FilterChip } from '../components/PageHeader';
import { allServices } from '../data/services';
import { demoBrand, demoProblems, demoItems, redesignChanges } from '../data/demoProject';
import { goToContact } from '../lib/site';
import DemoChat from '../components/demo/DemoChat';
import AutomationDemo from '../components/demo/AutomationDemo';
import AgentDemo from '../components/demo/AgentDemo';
import AppPrototype from '../components/demo/AppPrototype';
import ContentDemo from '../components/demo/ContentDemo';
import SocialDemo from '../components/demo/SocialDemo';
import portfolioData from '../data/portfolioData.json';

const STATUS = {
    live: { label: 'Live demo', cls: 'bg-brand text-onaccent' },
    work: { label: 'Our work', cls: 'border border-ink/25 text-ink' },
    soon: { label: 'Coming next', cls: 'border border-ink/15 text-ink/50' },
};
const serviceBySlug = Object.fromEntries(allServices.map((s) => [s.slug, s]));

// A browser window around a live page. The page inside is real and can be used.
function BrowserFrame({ src, label, phone = false }) {
    return (
        <div className="glass p-3 mx-auto" style={{ maxWidth: phone ? 420 : '100%' }}>
            <div className="flex items-center gap-1.5 px-2 pb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                <span className="w-2.5 h-2.5 rounded-full bg-peach" />
                <span className="w-2.5 h-2.5 rounded-full bg-ink/20" />
                <span className="ml-3 flex-1 truncate font-mono text-xs text-ink/50 bg-ink/10 rounded-2xl px-3 py-1">{label}</span>
            </div>
            <iframe
                key={src}
                src={src}
                title={label}
                className="demo-iframe w-full h-[640px] rounded-2xl bg-white"
            />
        </div>
    );
}

const SectionHead = ({ id, label, title, highlight, children }) => (
    <div className="mb-10">
        <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent mb-4">{label}</p>
        <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.04] text-ink mb-4">
            {title} <span className="font-drama italic font-normal text-grad">{highlight}</span>
        </h2>
        <p className="text-ink/60 text-lg font-light max-w-2xl leading-relaxed">{children}</p>
    </div>
);

export default function DemoProject() {
    usePageMeta("Demo Project: Urban Nest Properties", "A fictional Mumbai property agency built out across all ten CREATIIX services: live chatbot, automation, website, app prototype, content and social media.");
    const pageRef = useRef(null);
    const [phone, setPhone] = useState(false);
    const [version, setVersion] = useState('after');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.fade-up', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
        }, pageRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="relative min-h-screen bg-background text-ink pt-36 pb-24 px-6 md:px-16 overflow-hidden">
            <PageHeader
                label="Demo project"
                title="Urban Nest"
                highlight="Properties."
                intro="One property agency in Mumbai, seen through all ten of our services. The business is fictional and made by us, so you can try real working examples instead of reading about them."
            >
                <span className="glass px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink/70">Fictional business · not client work</span>
            </PageHeader>

            <i className="glow glow-orange w-[34rem] h-[34rem] -right-60 top-[30%]" />
            <i className="glow glow-flame w-[40rem] h-[30rem] -left-72 top-[62%]" />

            {/* The problems */}
            <section className="relative max-w-7xl mx-auto mb-24">
                <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent mb-5">The problems we set out to solve</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {demoProblems.map((p, i) => (
                        <div key={p.title} className="glass p-6">
                            <span className="font-mono text-accent text-[13px] font-bold">0{i + 1}</span>
                            <h3 className="font-display font-bold text-xl tracking-tight mt-3 mb-2">{p.title}</h3>
                            <p className="text-ink/60 font-light leading-relaxed">{p.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* All ten services */}
            <section className="relative max-w-7xl mx-auto mb-28">
                <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent mb-5">Ten services, one business</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {demoItems.map((d) => {
                        const s = serviceBySlug[d.slug];
                        const st = STATUS[d.status];
                        const to = d.status === 'soon' ? null : `/demo#${d.slug}`;
                        const body = (
                            <>
                                <span className="font-mono text-accent text-[13px] font-bold w-7 shrink-0 pt-1">{s.id}</span>
                                <span className="flex-1">
                                    <span className="block font-display font-bold text-lg tracking-tight">{s.title}</span>
                                    <span className="block text-ink/60 font-light leading-snug mt-1">{d.built}</span>
                                </span>
                                <span className={`shrink-0 font-mono text-xs uppercase tracking-wider font-bold rounded-2xl px-2.5 py-1 ${st.cls}`}>{st.label}</span>
                            </>
                        );
                        return to
                            ? <Link key={d.slug} to={to} className="glass p-5 flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300">{body}</Link>
                            : <div key={d.slug} className="glass p-5 flex items-start gap-4 opacity-70">{body}</div>;
                    })}
                </div>
            </section>

            {/* Chatbot */}
            <section id="ai-chatbots" className="relative max-w-7xl mx-auto mb-28 scroll-mt-28">
                <SectionHead label="01 · AI Chatbots" title="Talk to the" highlight="agency's chatbot.">
                    This one is live. It knows the nine demo listings and nothing else. Tell it your budget and area, in English or Hindi, and it will suggest homes and offer a visit.
                </SectionHead>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    <div className="lg:col-span-7"><DemoChat /></div>
                    <div className="lg:col-span-5 flex flex-col gap-5">
                        {[
                            ['Answers at any hour', 'A buyer who writes at 11 PM gets a useful reply in seconds, not the next morning.'],
                            ['Asks the right questions', 'Buy or rent, area, size, budget. The advisor receives a lead that is already qualified.'],
                            ['Only says what it knows', 'It suggests only real listings from the agency and does not invent prices or addresses.'],
                        ].map(([t, d]) => (
                            <div key={t} className="glass p-6 flex-1">
                                <h3 className="font-display font-bold text-xl tracking-tight mb-2">{t}</h3>
                                <p className="text-ink/60 font-light leading-relaxed">{d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Automation */}
            <section id="ai-automation" className="relative max-w-7xl mx-auto mb-28 scroll-mt-28">
                <SectionHead label="02 · AI Automation" title="One enquiry," highlight="six steps, no typing.">
                    Send a test enquiry and watch what a connected system does with it: tag the lead, save it, reply on WhatsApp, remind before the visit and follow up after.
                </SectionHead>
                <AutomationDemo />
            </section>

            {/* Agent */}
            <section id="ai-agents" className="relative max-w-7xl mx-auto mb-28 scroll-mt-28">
                <SectionHead label="03 · AI Agents" title="A sales assistant" highlight="that sorts the inbox.">
                    Seven enquiries came in overnight. Run the agent and it reads them all, ranks who is ready to buy, says why, and drafts the first reply for you to approve.
                </SectionHead>
                <AgentDemo />
            </section>

            {/* Website */}
            <section id="websites-web-apps" className="relative max-w-7xl mx-auto mb-28 scroll-mt-28">
                <SectionHead label="04 · Websites & Web Apps" title="The agency" highlight="website.">
                    A real, working site. Switch between buy and rent, filter by area and budget, open a property and request a visit. Use it right here, or open it in its own tab.
                </SectionHead>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                    <FilterChip active={!phone} onClick={() => setPhone(false)}><span className="inline-flex items-center gap-2"><Monitor className="w-4 h-4" /> Desktop</span></FilterChip>
                    <FilterChip active={phone} onClick={() => setPhone(true)}><span className="inline-flex items-center gap-2"><Smartphone className="w-4 h-4" /> Phone</span></FilterChip>
                    <a href={demoBrand.siteUrl} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-widest text-ink hover:text-accent transition-colors">
                        Open full site <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
                <BrowserFrame src={demoBrand.siteUrl} label="urbannest.demo" phone={phone} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                    {[
                        ['Search that works', 'Buy or rent, area, size and budget. Results update instantly.'],
                        ['Every property has a page', 'Photo, price, key facts and a visit form that sits beside them.'],
                        ['Easy to keep current', 'Listings live in one simple file, so adding a property takes minutes.'],
                    ].map(([t, d]) => (
                        <div key={t} className="glass p-6">
                            <h3 className="font-display font-bold text-xl tracking-tight mb-2">{t}</h3>
                            <p className="text-ink/60 font-light leading-relaxed">{d}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mobile app */}
            <section id="mobile-apps" className="relative max-w-7xl mx-auto mb-28 scroll-mt-28">
                <SectionHead label="05 · Mobile Apps" title="The buyer's" highlight="app.">
                    A clickable prototype of the agency's app. This is how we show an app before building it, so you can hold it, tap through it and change your mind early.
                </SectionHead>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-5"><AppPrototype /></div>
                    <div className="lg:col-span-7 flex flex-col gap-5">
                        <div className="glass p-6 md:p-8">
                            <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent mb-4">Try this</p>
                            <ol className="flex flex-col gap-3">
                                {['Switch between Buy and Rent, then open any home.', 'Tap the heart to save it.', 'Pick a day and time, then request a visit.', 'Check the Saved, Visits and Alerts tabs.'].map((t, i) => (
                                    <li key={t} className="flex items-start gap-4 text-lg font-light text-ink">
                                        <span className="font-mono text-accent text-[13px] font-bold pt-1.5">0{i + 1}</span>{t}
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {[
                                ['Buyers come back', 'Saved homes and alerts for new listings bring people back without an ad.'],
                                ['Visits without phone tag', 'The buyer picks a slot; the advisor gets a clear request.'],
                                ['One app, both stores', 'Built once for Android and iPhone, sharing data with the website.'],
                                ['Prototype first', 'You approve the flow on your own phone before development starts.'],
                            ].map(([t, d]) => (
                                <div key={t} className="glass p-6">
                                    <h3 className="font-display font-bold text-xl tracking-tight mb-2">{t}</h3>
                                    <p className="text-ink/60 font-light leading-relaxed">{d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Graphic design: real studio work, not the demo brand */}
            <section id="graphic-design" className="relative max-w-7xl mx-auto mb-28 scroll-mt-28">
                <SectionHead label="06 · Graphic Design" title="Logos from" highlight="our studio.">
                    These are real projects we have delivered, not part of the Urban Nest demo. A logo and identity for the demo agency will be added here.
                </SectionHead>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {portfolioData.filter((p) => p.type === 'image').map((p) => (
                        <div key={p.id} className="glass p-3">
                            <div className="aspect-[4/3] rounded-2xl bg-white overflow-hidden"><img src={p.url} alt={p.title} loading="lazy" className="w-full h-full object-contain p-8" /></div>
                            <div className="flex items-center justify-between gap-3 px-2 pt-4 pb-2">
                                <h3 className="font-display font-bold text-lg tracking-tight truncate">{p.title}</h3>
                                <span className="font-mono text-xs uppercase tracking-wider text-accent shrink-0">Our work</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Redesign */}
            <section id="website-redesign" className="relative max-w-7xl mx-auto mb-24 scroll-mt-28">
                <SectionHead label="07 · Website Redesign" title="Before" highlight="and after.">
                    The same agency, the same properties. The old site made visitors call to learn anything. The new one lets them find a home and book a visit by themselves.
                </SectionHead>
                <div className="flex flex-wrap gap-2 mb-5">
                    <FilterChip active={version === 'before'} onClick={() => setVersion('before')}>Before</FilterChip>
                    <FilterChip active={version === 'after'} onClick={() => setVersion('after')}>After</FilterChip>
                </div>
                <BrowserFrame
                    src={version === 'before' ? demoBrand.oldSiteUrl : demoBrand.siteUrl}
                    label={version === 'before' ? 'urbannest.demo (old site)' : 'urbannest.demo (new site)'}
                />
                <div className="glass p-6 md:p-8 mt-6 overflow-x-auto">
                    <table className="w-full text-left min-w-[560px]">
                        <thead>
                            <tr className="font-mono text-xs uppercase tracking-wider text-ink/50">
                                <th className="pb-4 pr-4 font-normal w-28"></th>
                                <th className="pb-4 pr-4 font-normal">Before</th>
                                <th className="pb-4 font-normal text-accent">After</th>
                            </tr>
                        </thead>
                        <tbody>
                            {redesignChanges.map(([what, before, after]) => (
                                <tr key={what} className="border-t border-ink/10 align-top">
                                    <td className="py-4 pr-4 font-display font-bold">{what}</td>
                                    <td className="py-4 pr-4 text-ink/50 font-light">{before}</td>
                                    <td className="py-4 text-ink font-light">{after}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Video editing: real studio work */}
            <section id="video-editing" className="relative max-w-7xl mx-auto mb-28 scroll-mt-28">
                <SectionHead label="08 · Video Editing" title="Reels edited" highlight="by our studio.">
                    Real edits from our team, not part of the Urban Nest demo. Press play on any of them.
                </SectionHead>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {portfolioData.filter((p) => p.type === 'video').map((p) => (
                        <div key={p.id} className="glass p-3">
                            <video src={`${p.url}#t=0.5`} controls playsInline preload="metadata" className="w-full aspect-[9/16] object-cover rounded-2xl bg-black" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Content */}
            <section id="content-writing" className="relative max-w-7xl mx-auto mb-28 scroll-mt-28">
                <SectionHead label="09 · Content Writing" title="The words" highlight="that do the selling.">
                    A buyer's guide, ad copy, WhatsApp messages and a listing rewrite, all written for the demo agency. Switch between them below.
                </SectionHead>
                <ContentDemo />
            </section>

            {/* Social */}
            <section id="social-media" className="relative max-w-7xl mx-auto mb-24 scroll-mt-28">
                <SectionHead label="10 · Social Media" title="A month of posts," highlight="planned and designed.">
                    Thirteen posts across the month, mixing listings, tips, guides and reels, with nine of them designed and captioned. Tap a highlighted day to see the post.
                </SectionHead>
                <SocialDemo />
            </section>

            {/* CTA */}
            <div className="relative max-w-7xl mx-auto glass p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
                    Want this for <span className="font-drama italic font-normal text-grad">your business?</span>
                </h2>
                <button onClick={goToContact} className="shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-brand text-onaccent font-bold uppercase tracking-widest text-sm hover:brightness-110 transition">
                    Start your project <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
