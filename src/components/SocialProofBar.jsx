import React from 'react';

export default function SocialProofBar() {
    const logos = [
        "STRATEGY", "CREATIVE", "MOTION", "WEBSITE", "MARKETING"
    ];

    const stats = [
        "Premium Quality", "End-to-End Solutions", "Result-Focused", "Fast Turnaround"
    ];

    return (
        <section className="bg-primary text-contrast py-10 relative overflow-hidden border-b border-background/10">
            {/* Logos Row */}
            <div className="flex mask-linear w-[200%] md:w-[150%] mb-6">
                <div className="flex animate-[scroll_25s_linear_infinite] shrink-0 whitespace-nowrap min-w-full justify-around pr-16 items-center">
                    {[...logos, ...logos].map((logo, i) => (
                        <span key={i} className="font-display text-4xl font-black text-contrast/20 uppercase tracking-widest px-8">
                            {logo}
                        </span>
                    ))}
                </div>
            </div>

            {/* Stats Row */}
            <div className="flex mask-linear w-[200%] md:w-[150%]">
                <div className="flex animate-[scroll_20s_linear_infinite_reverse] shrink-0 whitespace-nowrap min-w-full justify-around pr-16 items-center">
                    {[...stats, ...stats].map((stat, i) => (
                        <span key={i} className="font-mono text-sm uppercase tracking-widest text-accent px-8 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            {stat}
                        </span>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .mask-linear {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
        </section>
    );
}
