import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const badgeRef = useRef(null);

    const textStr = "At CREATIIX, we believe great brands are built with creativity, strategy, and technology. We design the identity, build the websites and apps, and wire in AI that answers, automates and acts, so your business keeps growing while you focus on the work.";
    const words = textStr.split(' ');

    useEffect(() => {
        const ctx = gsap.context(() => {

            const spans = textRef.current.querySelectorAll('span');

            gsap.to(spans, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    end: "bottom bottom",
                    scrub: 1,
                },
                opacity: 1,
                stagger: 0.1,
                ease: "none"
            });

            // Pin the text container so it stays on screen while scrolling the section height
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: '.pinned-content',
            });

            // Interactive Badge follow mouse
            const badge = badgeRef.current;
            let badgeX = 0, badgeY = 0;
            let targetX = 0, targetY = 0;

            const moveBadge = (e) => {
                // Calculate relative to the pinned container center roughly
                const rect = containerRef.current.getBoundingClientRect();
                targetX = e.clientX - rect.left - badge.offsetWidth / 2;
                targetY = e.clientY - rect.top - badge.offsetHeight / 2;
            };

            containerRef.current.addEventListener('mousemove', moveBadge);

            gsap.ticker.add(() => {
                badgeX += (targetX - badgeX) * 0.1;
                badgeY += (targetY - badgeY) * 0.1;
                gsap.set(badge, { x: badgeX, y: badgeY });
            });

            // Constant rotation for badge
            gsap.to(badge.querySelector('.rotate-text'), {
                rotation: 360,
                duration: 10,
                repeat: -1,
                ease: "linear"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        // Make container very tall to allow scrolling space for the scrub
        <section id="about" ref={containerRef} className="relative h-[300vh] bg-background">

            <div className="pinned-content absolute top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden px-6 md:px-16 p-20 z-0">

                {/* Floating Interactive Badge */}
                <div ref={badgeRef} className="absolute left-0 top-0 w-32 h-32 md:w-48 md:h-48 z-20 pointer-events-none hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="rotate-text w-full h-full" viewBox="0 0 200 200">
                        <path id="curve" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="transparent" />
                        <text width="500" className="text-accent font-mono text-xl uppercase tracking-[0.16em] fill-current">
                            <textPath href="#curve">
                                Scroll to read our story — Scroll to read our story —
                            </textPath>
                        </text>
                    </svg>
                    {/* Center dot */}
                    <div className="absolute w-4 h-4 bg-accent rounded-full" />
                </div>

                {/* The Massive Text */}
                <div className="group w-full max-w-7xl relative z-10"
                    onMouseEnter={() => gsap.to(badgeRef.current, { opacity: 1, duration: 0.3 })}
                    onMouseLeave={() => gsap.to(badgeRef.current, { opacity: 0, duration: 0.3 })}
                >
                    <h2
                        ref={textRef}
                        className="font-display font-medium text-3xl md:text-5xl lg:text-[4.2vw] leading-[1.1] tracking-tight"
                    >
                        {words.map((word, i) => (
                            <React.Fragment key={i}>
                                <span className="text-ink opacity-10">
                                    {word}
                                </span>
                                {' '}
                            </React.Fragment>
                        ))}
                    </h2>
                </div>

            </div>

        </section>
    );
}
