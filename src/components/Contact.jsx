import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MessageCircle, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT, whatsappLink } from '../lib/site';
import { allServices } from '../data/services';

const field = "bg-ink/10 border border-ink/20 rounded-xl px-4 py-2.5 text-ink placeholder-ink/30 focus:outline-none focus:border-accent transition-colors font-sans";
const label = "text-ink/60 text-[13px] font-bold uppercase tracking-widest font-mono";
const empty = { name: '', phone: '', service: '', message: '' };

// Contact panel. The form does not email anything: on submit it opens WhatsApp
// with the enquiry already typed, addressed to the studio's number.
export default function Contact() {
    const marqueeRef = useRef(null);
    const [sent, setSent] = useState(false);
    const [formData, setFormData] = useState(empty);

    useEffect(() => {
        const tween = gsap.to(marqueeRef.current, { xPercent: -50, ease: "none", duration: 20, repeat: -1 });
        return () => tween.kill();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = [
            'New enquiry from the CREATIIX website',
            `Name: ${formData.name}`,
            `Phone: ${formData.phone}`,
            `Interested in: ${formData.service || 'Not sure yet'}`,
            `Project details: ${formData.message}`,
        ].join('\n');
        window.open(whatsappLink(text), '_blank', 'noopener');
        setSent(true);
        setFormData(empty);
        setTimeout(() => setSent(false), 6000);
    };

    return (
        <section id="contact" className="relative md:fixed md:bottom-0 md:left-0 w-full md:h-[80vh] bg-brand text-onaccent z-0 flex flex-col justify-between overflow-hidden">
            {/* Background kinetic typography */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200vw] pointer-events-none opacity-20 flex">
                <h2 ref={marqueeRef} className="font-display font-black text-[25vw] leading-none tracking-tighter uppercase whitespace-nowrap">
                    LET'S TALK — LET'S TALK — LET'S TALK —
                </h2>
            </div>

            <div className="relative z-10 p-6 md:px-16 md:py-10 h-full flex flex-col md:flex-row gap-8 justify-between pt-16 pb-10">

                {/* Left: headline and direct contact */}
                <div className="flex flex-col justify-between h-full w-full md:w-1/2">
                    <h2 className="font-drama italic text-5xl md:text-7xl lg:text-[6vw] leading-none max-w-2xl text-onaccent mb-8">
                        Tell us what you want to build.
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 border-t border-onaccent/20 pt-8 mt-auto">
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-[13px] font-bold uppercase tracking-widest text-onaccent/60">Email</span>
                            <a href={`mailto:${CONTACT.email}`} className="text-xl md:text-2xl font-bold font-display tracking-tight hover:text-white transition-colors duration-300">
                                {CONTACT.email}
                            </a>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-[13px] font-bold uppercase tracking-widest text-onaccent/60">WhatsApp</span>
                            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-bold font-display tracking-tight hover:text-white transition-colors duration-300">
                                {CONTACT.whatsappDisplay}
                            </a>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-[13px] font-bold uppercase tracking-widest text-onaccent/60">Instagram</span>
                            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-xl md:text-2xl font-bold font-display tracking-tight hover:text-white transition-colors duration-300">
                                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                                {CONTACT.instagramHandle}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right: the form */}
                <div className="w-full md:w-[45%] h-full flex items-end">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full bg-background rounded-2xl p-6 md:p-7 shadow-2xl flex flex-col gap-3 md:max-h-[66vh] md:overflow-y-auto"
                        data-lenis-prevent
                    >
                        <h3 className="text-ink font-display text-2xl font-bold tracking-wide">Send us a message</h3>
                        <p className="text-ink/50 text-sm -mt-2 mb-1">Fill this in and it opens in WhatsApp, ready to send.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className={label}>Your name</label>
                                <input type="text" id="name" name="name" required autoComplete="name" value={formData.name} onChange={handleChange} className={field} placeholder="Your name" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="phone" className={label}>Phone number</label>
                                <input type="tel" id="phone" name="phone" required autoComplete="tel" value={formData.phone} onChange={handleChange} className={field} placeholder="+91 98765 43210" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="service" className={label}>Interested in</label>
                            <select id="service" name="service" value={formData.service} onChange={handleChange} className={`${field} appearance-none`}>
                                <option value="">Not sure yet</option>
                                {allServices.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 flex-grow">
                            <label htmlFor="message" className={label}>Project details</label>
                            <textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows="3" className={`${field} resize-none h-full`} placeholder="Tell us what you want to build..."></textarea>
                        </div>

                        <button type="submit" className="mt-2 w-full py-3.5 shrink-0 rounded-xl font-bold uppercase tracking-widest text-sm bg-brand text-onaccent hover:brightness-110 transition flex items-center justify-center gap-3">
                            <MessageCircle className="w-4 h-4" />
                            {sent ? 'Opened in WhatsApp ✓' : 'Send on WhatsApp'}
                        </button>
                        <p className="text-ink/40 text-[13px] text-center shrink-0">
                            Nothing is sent until you press send in WhatsApp. <Link to="/privacy" className="underline underline-offset-4 hover:text-accent transition-colors">Privacy Policy</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
