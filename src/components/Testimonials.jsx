import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';
import { whatsappLink } from '../lib/site';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
    const containerRef = useRef(null);
    const [status, setStatus] = useState(''); // 'submitting', 'success', 'error', or ''
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        rating: 5,
        review: ''
    });

    // Client testmonials
    const testimonials = [
        {
            name: "Devang Mehta",
            rating: 5,
            review: "Creatiix delivered exactly what I needed for my brand. The designs were creative, professional, and perfectly aligned with my vision."
        },
        {
            name: "Kirtibhai Jobalia",
            rating: 5,
            review: "Working with Creatiix was a great experience. Their team understands design and marketing very well and provides excellent results."
        },
        {
            name: "Preeti Shah",
            rating: 5,
            review: "I loved the creativity and attention to detail in the work done by Creatiix. Highly professional and easy to work with."
        },
        {
            name: "Dhaval Mehta",
            rating: 5,
            review: "Creatiix helped bring my ideas to life with their innovative design approach. Communication and delivery were both excellent."
        },
        {
            name: "Rajnibhai Doshi",
            rating: 5,
            review: "Very reliable and talented team. Creatiix provided high-quality design work and maintained professionalism throughout the project."
        },
        {
            name: "Shweta",
            rating: 5,
            review: "Beautiful designs and quick turnaround time. I’m really happy with the work Creatiix delivered."
        },
        {
            name: "Navin Shah",
            rating: 5,
            review: "Creatiix helped improve our brand presence with creative visuals and smart marketing ideas. Highly recommended."
        },
        {
            name: "Bhumika Shah",
            rating: 5,
            review: "Professional, creative, and very supportive team. Creatiix made the entire design process smooth and enjoyable."
        },
        {
            name: "Jitendra Jain",
            rating: 5,
            review: "Creatiix is a very creative agency. They delivered quality work and exceeded my expectations."
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.testimonials-marquee-wrapper', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            gsap.from('.testimonial-form-section', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 40%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRatingClick = (rating) => {
        setFormData(prev => ({ ...prev, rating }));
    };

    // The review opens in WhatsApp, already typed, for the visitor to send.
    const handleSubmit = (e) => {
        e.preventDefault();
        const text = [
            'New review for CREATIIX',
            `Name: ${formData.name}`,
            `Company / Project: ${formData.company}`,
            `Rating: ${formData.rating}/5`,
            `Review: ${formData.review}`,
        ].join('\n');
        window.open(whatsappLink(text), '_blank', 'noopener');
        setStatus('success');
        setFormData({ name: '', company: '', rating: 5, review: '' });
        setTimeout(() => setStatus(''), 6000);
    };

    return (
        <section id="testimonials" ref={containerRef} className="py-32 bg-surface relative overflow-hidden border-t border-ink/10">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-peach/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col gap-24 relative z-10">

                {/* Header & Existing Testimonials */}
                <div>
                    <h2 className="font-drama italic text-5xl md:text-7xl text-grad mb-6">Client Experiences</h2>
                    <div className="w-24 h-px bg-peach mb-16" />

                    {/* Animated Marquee Container */}
                    <div className="testimonials-marquee-wrapper relative w-full overflow-hidden flex flex-col gap-8 py-4 group">
                        
                        {/* Fade Edges for Marquee */}
                        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

                        {/* Top Row - Scrolls Left */}
                        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
                            {[...testimonials.slice(0, 5), ...testimonials.slice(0, 5)].map((testi, i) => (
                                <div key={`row1-${i}`} className="testimonial-card w-[350px] md:w-[450px] mx-4 shrink-0 glass p-8 rounded-2xl hover:bg-ink/10 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(255,122,0,0.15)] transition-all duration-500 flex flex-col justify-between">
                                    <div>
                                        <Quote className="w-10 h-10 text-accent/40 mb-6 drop-shadow-[0_0_10px_rgba(255,122,0,0.3)]" />
                                        <p className="font-sans text-ink/90 text-lg leading-relaxed mb-8 font-light">
                                            "{testi.review}"
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(5)].map((_, idx) => (
                                                <Star key={idx} className={`w-5 h-5 drop-shadow-[0_0_8px_rgba(255,122,0,0.5)] ${idx < testi.rating ? 'text-accent fill-accent' : 'text-ink/20'}`} />
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-support p-[2px]">
                                                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                                                    <span className="font-display font-bold text-accent text-lg">{testi.name.charAt(0)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-display font-bold text-ink tracking-wide text-sm">{testi.name}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Row - Scrolls Right (using normal array, but reversed animation) */}
                        <div className="flex w-max animate-marquee-reverse group-hover:[animation-play-state:paused]">
                            {[...testimonials.slice(5, 9), ...testimonials.slice(5, 9), ...testimonials.slice(5, 9)].map((testi, i) => (
                                <div key={`row2-${i}`} className="testimonial-card w-[350px] md:w-[450px] mx-4 shrink-0 glass p-8 rounded-2xl hover:bg-ink/10 hover:border-support/50 hover:shadow-[0_0_30px_rgba(255,211,163,0.15)] transition-all duration-500 flex flex-col justify-between">
                                    <div>
                                        <Quote className="w-10 h-10 text-support/40 mb-6 drop-shadow-[0_0_10px_rgba(255,211,163,0.3)]" />
                                        <p className="font-sans text-ink/90 text-lg leading-relaxed mb-8 font-light">
                                            "{testi.review}"
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(5)].map((_, idx) => (
                                                <Star key={idx} className={`w-5 h-5 drop-shadow-[0_0_8px_rgba(255,122,0,0.5)] ${idx < testi.rating ? 'text-accent fill-accent' : 'text-ink/20'}`} />
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-support to-accent p-[2px]">
                                                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                                                    <span className="font-display font-bold text-support text-lg">{testi.name.charAt(0)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-display font-bold text-ink tracking-wide text-sm">{testi.name}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Submission Form Section */}
                <div className="testimonial-form-section glass p-8 md:p-16 flex flex-col md:flex-row gap-16 items-center">

                    <div className="w-full md:w-1/2 flex flex-col gap-6">
                        <h3 className="font-display text-3xl md:text-4xl font-bold text-ink tracking-tight">
                            Share Your <br /><span className="text-grad">Experience</span>
                        </h3>
                        <p className="font-sans text-ink/60 text-lg">
                            We value your feedback. Write a review of your experience working with CREATIIX and help us build better creative solutions.
                        </p>
                    </div>

                    <div className="w-full md:w-1/2">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-ink/60 text-[13px] font-bold uppercase tracking-widest font-mono">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="bg-ink/5 border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder-ink/20 focus:outline-none focus:border-accent transition-colors font-sans"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-ink/60 text-[13px] font-bold uppercase tracking-widest font-mono">Company / Project</label>
                                    <input
                                        type="text"
                                        name="company"
                                        required
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="bg-ink/5 border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder-ink/20 focus:outline-none focus:border-accent transition-colors font-sans"
                                        placeholder="Acme Corp"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-ink/60 text-[13px] font-bold uppercase tracking-widest font-mono">Rating (1-5)</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => handleRatingClick(star)}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star className={`w-8 h-8 ${star <= formData.rating ? 'text-accent fill-accent' : 'text-ink/20 border-ink/20'} transition-colors duration-300`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-ink/60 text-[13px] font-bold uppercase tracking-widest font-mono">Your Review</label>
                                <textarea
                                    name="review"
                                    required
                                    value={formData.review}
                                    onChange={handleChange}
                                    rows="4"
                                    className="bg-ink/5 border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder-ink/20 focus:outline-none focus:border-accent transition-colors font-sans resize-none"
                                    placeholder="Tell us what you loved about working with CREATIIX..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting' || status === 'success'}
                                className={`mt-2 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 ${status === 'success' ? 'bg-peach text-onaccent' :
                                    status === 'submitting' ? 'bg-accent/50 text-onaccent cursor-wait' :
                                        'bg-brand text-onaccent hover:brightness-110 hover:-translate-y-1'
                                    }`}
                            >
                                {status === 'submitting' ? 'Submitting...' :
                                    status === 'success' ? 'Opened in WhatsApp ✓' :
                                        'Send review on WhatsApp'}
                            </button>

                            {status === 'error' && (
                                <span className="text-red-400 text-[13px] font-mono text-center mt-1">
                                    Something went wrong. Please try again later.
                                </span>
                            )}
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
}
