import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { servicePageSlugs } from '../data/servicePages';
import { allServices } from '../data/services';
import AIVisual from './AIVisuals';

// Home page: every service as the same glass card with a small live preview on top.
// The first five are AI & Development.
export default function ServicesGrid() {
    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.svc-reveal', {
                scrollTrigger: { trigger: container.current, start: 'top 70%' },
                y: 50, opacity: 0, stagger: 0.06, duration: 0.8, ease: 'power3.out'
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={container} className="relative py-24 md:py-36 bg-background overflow-hidden">
            <i className="glow glow-flame w-[46rem] h-[30rem] -left-60 top-1/3" />
            <i className="glow glow-peach w-[30rem] h-[30rem] -right-40 top-10" />
            <i className="glow glow-orange w-[34rem] h-[34rem] right-1/4 -bottom-40" />

            <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="svc-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
                    <div>
                        <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent mb-5">Services</p>
                        <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-[1.02] text-ink">
                            Everything <span className="font-drama italic font-normal text-grad">under one roof.</span>
                        </h2>
                    </div>
                    <p className="font-body text-lg text-ink/60 max-w-md font-light leading-relaxed">
                        AI and development that run your business, and the design and marketing that grow it. One team, one look, one point of contact.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
                    {allServices.map((s) => (
                        // Outer div takes the scroll reveal; the card itself takes the 3D tilt.
                        <div key={s.slug} className="svc-reveal">
                            <Link
                                to={servicePageSlugs.includes(s.slug) ? `/services/${s.slug}` : `/services#${s.slug}`}
                                data-tilt
                                className="glass group flex flex-col h-full p-4 transition-transform duration-200 ease-out will-change-transform"
                            >
                                {/* Live preview: the full visual, scaled down and cropped */}
                                <div className="relative h-[168px] overflow-hidden rounded-2xl pointer-events-none" aria-hidden="true">
                                    <div className="w-[142.86%] origin-top-left scale-[0.7]">
                                        <AIVisual type={s.visual} />
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background/90 to-transparent" />
                                </div>

                                <div className="flex items-center justify-between mt-5 mb-3 px-1">
                                    <span className="font-mono text-accent text-[13px] font-bold">{s.id}</span>
                                    {s.group === 'ai' && (
                                        <span className="font-mono text-xs uppercase tracking-wider font-bold bg-brand text-onaccent rounded-2xl px-2.5 py-0.5">Core focus</span>
                                    )}
                                </div>
                                <h3 className="font-display font-bold text-xl tracking-tight leading-tight text-ink mb-2 px-1">{s.title}</h3>
                                <p className="font-body text-[15px] text-ink/60 leading-relaxed font-light px-1">{s.short}</p>
                                <span className="mt-auto pt-5 pb-1 px-1 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-widest text-ink group-hover:text-accent transition-colors">
                                    Explore
                                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
