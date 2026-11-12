import React from 'react';

// Shared header for inner pages (Portfolio, Blogs): label, heading with a
// highlighted word, intro line, and the same glow as the rest of the site.
export default function PageHeader({ label, title, highlight, intro, children }) {
    return (
        <header className="relative max-w-7xl mx-auto mb-12 md:mb-16">
            <i className="glow glow-flame w-[50rem] h-[30rem] left-1/2 -translate-x-1/2 -top-64" />
            <div className="relative">
                <p className="fade-up font-mono text-[13px] uppercase tracking-[0.16em] text-accent mb-5">{label}</p>
                <h1 className="fade-up font-display font-bold text-5xl md:text-7xl tracking-tight leading-[1.02] text-ink mb-6">
                    {title} <span className="font-drama italic font-normal text-grad">{highlight}</span>
                </h1>
                <p className="fade-up font-body text-lg md:text-xl text-ink/60 max-w-2xl font-light leading-relaxed">{intro}</p>
                {children && <div className="fade-up flex flex-wrap gap-2 mt-10">{children}</div>}
            </div>
        </header>
    );
}

// Filter chip used under the header.
export function FilterChip({ active, onClick, children }) {
    return (
        <button
            onClick={onClick}
            aria-pressed={active}
            className={`px-5 py-2.5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-colors ${active ? 'bg-brand text-onaccent' : 'glass text-ink hover:text-accent'}`}
        >
            {children}
        </button>
    );
}
