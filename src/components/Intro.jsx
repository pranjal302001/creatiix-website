import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { markIntroSeen } from '../lib/site';

// Short logo reveal shown once per session (replaces the old splash video).
export default function Intro({ onFinish }) {
    const root = useRef(null);

    useEffect(() => {
        markIntroSeen();
        const ctx = gsap.context(() => {
            gsap.timeline({ onComplete: onFinish })
                .from('.intro-mark', { scale: 0.6, opacity: 0, rotate: -12, duration: 0.6, ease: 'back.out(1.6)' })
                .from('.intro-word', { y: 20, opacity: 0, duration: 0.45, ease: 'power3.out' }, '-=0.2')
                .to(root.current, { yPercent: -100, duration: 0.6, ease: 'power4.inOut' }, '+=0.25');
        }, root);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={root} className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center gap-6">
            <img src="/brand/mark.png" alt="" className="intro-mark w-32 md:w-40 h-auto" />
            <div className="intro-word">
                <img src="/brand/wordmark-ivory.png" alt="CREATIIX" className="logo-for-dark w-56 md:w-72 h-auto" />
                <img src="/brand/wordmark-charcoal.png" alt="CREATIIX" className="logo-for-light w-56 md:w-72 h-auto" />
            </div>
        </div>
    );
}
