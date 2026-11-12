import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { FilterChip } from '../PageHeader';
import { article, ads, whatsappTemplates, rewrite } from '../../data/demoContent';

const TABS = ['Blog article', 'Ad copy', 'WhatsApp messages', 'Listing rewrite'];

// Samples of the writing a property agency needs, all for the fictional demo brand.
export default function ContentDemo() {
    const [tab, setTab] = useState(TABS[0]);

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-5">
                {TABS.map((t) => <FilterChip key={t} active={tab === t} onClick={() => setTab(t)}>{t}</FilterChip>)}
            </div>

            {tab === 'Blog article' && (
                <article className="glass p-6 md:p-12">
                    <div className="max-w-3xl mx-auto">
                        <p className="font-mono text-[13px] uppercase tracking-wider text-accent mb-4">{article.meta}</p>
                        <h3 className="font-display font-bold text-3xl md:text-4xl tracking-tight leading-[1.08] mb-6">{article.title}</h3>
                        <p className="font-drama italic text-2xl text-ink/70 leading-snug mb-8">{article.intro}</p>
                        <ol className="flex flex-col gap-6">
                            {article.points.map(([h, p], i) => (
                                <li key={h} className="flex gap-5">
                                    <span className="font-mono text-accent text-[13px] font-bold pt-1.5 shrink-0">0{i + 1}</span>
                                    <span><span className="block font-display font-bold text-xl tracking-tight mb-1">{h}</span><span className="block text-ink/70 text-lg font-light leading-relaxed">{p}</span></span>
                                </li>
                            ))}
                        </ol>
                        <p className="text-ink/80 text-lg font-light leading-relaxed mt-8">{article.outro}</p>
                        <p className="text-ink/40 text-sm mt-8 pt-6 border-t border-ink/10">{article.note}</p>
                    </div>
                </article>
            )}

            {tab === 'Ad copy' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {ads.map((ad) => (
                        <div key={ad.where} className="glass p-6">
                            <p className="font-mono text-[13px] uppercase tracking-wider text-accent mb-5">{ad.where}</p>
                            {ad.lines.map(([k, v], i) => (
                                <div key={i} className="mb-4 last:mb-0">
                                    <p className="font-mono text-xs uppercase tracking-wider text-ink/40 mb-1">{k}</p>
                                    <p className={k === 'Headline' || k === 'On the image' ? 'font-display font-bold text-xl tracking-tight leading-tight' : 'text-ink/80 font-light leading-relaxed'}>{v}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {tab === 'WhatsApp messages' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {whatsappTemplates.map(([name, text]) => (
                        <div key={name} className="glass p-6">
                            <p className="font-mono text-[13px] uppercase tracking-wider text-accent mb-4">{name}</p>
                            <p className="rounded-2xl bg-[#202c33] text-white/90 leading-relaxed px-4 py-3">
                                {text.split(/(\{[a-z]+\})/).map((part, i) => part.startsWith('{')
                                    ? <span key={i} className="text-[#FFD3A3] font-mono text-sm">{part}</span>
                                    : part)}
                            </p>
                        </div>
                    ))}
                    <p className="md:col-span-2 text-ink/40 text-sm">Words in braces are filled in automatically for each customer.</p>
                </div>
            )}

            {tab === 'Listing rewrite' && (
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-5 items-center">
                    <div className="glass p-6">
                        <p className="font-mono text-[13px] uppercase tracking-wider text-ink/50 mb-4">The broker's note</p>
                        <p className="font-mono text-ink/60 leading-relaxed">{rewrite.before}</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-accent mx-auto rotate-90 md:rotate-0" />
                    <div className="glass p-6 border-accent/50">
                        <p className="font-mono text-[13px] uppercase tracking-wider text-accent mb-4">What buyers read</p>
                        <p className="text-ink text-lg font-light leading-relaxed">{rewrite.after}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
