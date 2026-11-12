import React from 'react';

const words = ["AI CHATBOTS", "AUTOMATION", "AI AGENTS", "WEB APPS", "MOBILE APPS", "BRANDING", "VIDEO", "MARKETING"];
const stats = ["One team, end to end", "Built around your business", "Design + technology", "Support after launch"];

export default function SocialProofBar() {
    return (
        <section className="bg-surface py-10 relative overflow-hidden border-y border-ink/10">
            <div className="flex mask-linear mb-6 overflow-hidden">
                <div className="flex animate-marquee shrink-0 whitespace-nowrap items-center">
                    {[...words, ...words].map((word, i) => (
                        <span key={i} className="font-display text-3xl font-bold text-ink/20 tracking-widest px-8 flex items-center gap-16">
                            {word}<span className="w-2.5 h-2.5 bg-accent rotate-45" />
                        </span>
                    ))}
                </div>
                <div className="flex animate-marquee shrink-0 whitespace-nowrap items-center" aria-hidden="true">
                    {[...words, ...words].map((word, i) => (
                        <span key={i} className="font-display text-3xl font-bold text-ink/20 tracking-widest px-8 flex items-center gap-16">
                            {word}<span className="w-2.5 h-2.5 bg-accent rotate-45" />
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex mask-linear overflow-hidden">
                {[0, 1].map((copy) => (
                    <div key={copy} className="flex animate-marquee-reverse shrink-0 whitespace-nowrap items-center" aria-hidden={copy === 1}>
                        {[...stats, ...stats].map((stat, i) => (
                            <span key={i} className="font-mono text-sm uppercase tracking-widest text-support px-8 flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                {stat}
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .mask-linear {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}} />
        </section>
    );
}
