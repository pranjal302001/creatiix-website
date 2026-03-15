import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function FAQ() {
    const faqs = [
        {
            q: "Do I need to hire multiple agencies?",
            a: "No. CREATIIX handles everything seamlessly. From visual identity to 3D motion, packaging, and digital marketing—it’s all unified under one strategic vision."
        },
        {
            q: "How do you ensure the work converts?",
            a: "Every project is backed by branding psychology. Work is built on clear business objectives, so it doesn’t just look premium but fundamentally drives results."
        },
        {
            q: "What is your typical turnaround time?",
            a: "While timelines depend on scope, we prioritize professional communication, rapid execution, and clear milestones so nothing stalls your momentum."
        },
        {
            q: "Who is your ideal client?",
            a: "Ambitious founders, creators, and marketing directors looking for world-class design and execution without the hassle of uncoordinated teams."
        }
    ];

    // Stagger in title and items on scroll
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.faq-reveal', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-6 md:px-16 bg-background max-w-7xl mx-auto border-t border-primary/10 mb-24 relative overflow-hidden">

            {/* Background Texture */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50 blur-[100px] pointer-events-none" />

            <div className="faq-reveal mb-24 text-center md:text-left">
                <h2 className="font-display font-medium text-4xl md:text-6xl text-primary tracking-tight leading-none uppercase">
                    Common <span className="text-accent italic">Questions.</span>
                </h2>
                <div className="w-24 h-[1px] bg-primary mt-8 mx-auto md:mx-0 opacity-50"></div>
            </div>

            <div className="flex flex-col border-t border-primary/20 relative z-10 w-full">
                {faqs.map((item, i) => (
                    <FAQRow key={i} question={item.q} answer={item.a} index={i + 1} />
                ))}
            </div>
        </section>
    );
}

function FAQRow({ question, answer, index }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const rowRef = useRef(null);

    // Dynamic hover text color switch
    const handleMouseEnter = () => {
        gsap.to(rowRef.current, { backgroundColor: '#F5DF77', duration: 0.4, ease: "power2.out" });
        gsap.to(rowRef.current.querySelectorAll('.toggle-text'), { color: '#353B4E', duration: 0.4 });
    };

    const handleMouseLeave = () => {
        if (!isOpen) { // Only revert if not kept open
            gsap.to(rowRef.current, { backgroundColor: 'transparent', duration: 0.4, ease: "power2.out" });
            gsap.to(rowRef.current.querySelectorAll('.toggle-text'), { color: '#F5DF77', duration: 0.4, clearProps: "all" });
        }
    };

    // If conceptually clicked open, we keep the highlight
    useEffect(() => {
        if (isOpen) {
            gsap.to(rowRef.current, { backgroundColor: '#F5DF77', duration: 0.4, ease: "power2.out" });
            gsap.to(rowRef.current.querySelectorAll('.toggle-text'), { color: '#353B4E', duration: 0.4 });
        } else {
            handleMouseLeave(); // Revert colors when closed
        }
    }, [isOpen]);

    return (
        <div
            ref={rowRef}
            className="faq-reveal group w-full border-b border-primary/20 overflow-hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* The Question Header */}
            <div className="flex items-center justify-between py-10 px-4 md:px-8 w-full">
                <div className="flex items-center gap-8 w-10/12">
                    <span className="toggle-text font-mono text-xs md:text-sm uppercase tracking-widest opacity-50 tabular-nums">
                        {index.toString().padStart(2, '0')}
                    </span>
                    <h3 className="toggle-text font-display font-bold text-3xl md:text-5xl lg:text-6xl text-primary leading-none uppercase tracking-tighter">
                        {question}
                    </h3>
                </div>

                {/* Animated Plus/Minus icon */}
                <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                    <span className="toggle-text absolute w-full h-[2px] bg-primary"></span>
                    <span
                        className={`toggle-text absolute w-full h-[2px] bg-primary transition-transform duration-500 origin-center ${isOpen ? 'rotate-0' : 'rotate-90'}`}
                    ></span>
                </div>
            </div>

            {/* The Hidden Answer Area */}
            <div
                ref={contentRef}
                className="overflow-hidden transition-[max-height,opacity,padding] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{
                    maxHeight: isOpen ? `${contentRef.current.scrollHeight + 100}px` : "0px",
                    opacity: isOpen ? 1 : 0,
                    paddingBottom: isOpen ? "4rem" : "0"
                }}
            >
                <div className="px-4 md:px-8 pl-[12%] md:pl-[15%] w-full">
                    <p className="font-body text-xl md:text-3xl font-light leading-relaxed text-[#353B4E] max-w-4xl">
                        {answer}
                    </p>
                </div>
            </div>

        </div>
    );
}
