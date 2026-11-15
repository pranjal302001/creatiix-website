import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { finishIntro, markIntroSeen } from '../lib/site';

const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Site loader: the 4-second logo animation, shown once per browser session.
// A tap skips it. If the video cannot start quickly (slow network, autoplay
// blocked) or the visitor prefers reduced motion, a short still-logo reveal
// runs instead, so the site is never held back.
export default function Intro({ onFinish }) {
    const root = useRef(null);
    const video = useRef(null);
    const leaving = useRef(false);
    const [fallback, setFallback] = useState(reducedMotion);

    const leave = () => {
        if (leaving.current) return;
        leaving.current = true;
        finishIntro();
        gsap.to(root.current, { yPercent: -100, duration: 0.7, ease: 'power4.inOut', onComplete: onFinish });
    };

    useEffect(() => { markIntroSeen(); }, []);

    // Video path
    useEffect(() => {
        if (fallback) return;
        const v = video.current;
        let started = false;
        const onPlaying = () => { started = true; };
        v.addEventListener('playing', onPlaying);
        v.play?.()?.catch?.(() => setFallback(true));
        const slow = setTimeout(() => { if (!started) setFallback(true); }, 1800);
        const hardStop = setTimeout(leave, 7000); // never trap the visitor
        return () => {
            v.removeEventListener('playing', onPlaying);
            clearTimeout(slow);
            clearTimeout(hardStop);
        };
    }, [fallback]);

    // Fallback path: still logo, about a second and a half
    useEffect(() => {
        if (!fallback) return;
        const ctx = gsap.context(() => {
            gsap.timeline({ onComplete: leave })
                .from('.intro-mark', { scale: 0.6, opacity: 0, rotate: -12, duration: 0.6, ease: 'back.out(1.6)' })
                .from('.intro-word', { y: 20, opacity: 0, duration: 0.45, ease: 'power3.out' }, '-=0.2')
                .to({}, { duration: 0.25 });
        }, root);
        return () => ctx.revert();
    }, [fallback]);

    return (
        <div
            ref={root}
            onClick={leave}
            className="fixed inset-0 z-[200] bg-[#0a1013] flex flex-col items-center justify-center gap-6 overflow-hidden cursor-pointer"
        >
            {fallback ? (
                <>
                    <img src="/brand/mark.png" alt="" className="intro-mark w-32 md:w-40 h-auto" />
                    <img src="/brand/wordmark-ivory.png" alt="CREATIIX" className="intro-word w-56 md:w-72 h-auto" />
                </>
            ) : (
                <>
                    <video
                        ref={video}
                        src="/brand/intro.mp4"
                        muted
                        playsInline
                        autoPlay
                        preload="auto"
                        onEnded={leave}
                        onError={() => setFallback(true)}
                        aria-label="CREATIIX logo animation"
                        className="intro-video absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none portrait:w-[170vw] landscape:w-full landscape:h-full landscape:object-cover"
                    />
                    <p className="absolute bottom-8 inset-x-0 text-center font-mono text-[13px] uppercase tracking-widest text-[#FFF4E6]/40">Skip intro</p>
                </>
            )}
        </div>
    );
}
