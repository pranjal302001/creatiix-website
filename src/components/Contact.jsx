import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Contact() {
    const marqueeRef = useRef(null);
    const [status, setStatus] = useState(''); // 'submitting', 'success', 'error', or ''
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    useEffect(() => {
        // Endless marquee animation
        gsap.to(marqueeRef.current, {
            xPercent: -50,
            ease: "none",
            duration: 20,
            repeat: -1
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const submissionData = new FormData();
        // REPLACE THE STRING BELOW WITH YOUR WEB3FORMS ACCESS KEY
        submissionData.append("access_key", "YOUR_ACCESS_KEY_HERE");
        submissionData.append("name", formData.name);
        submissionData.append("email", formData.email);
        submissionData.append("phone", formData.phone);
        submissionData.append("message", formData.message);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: submissionData
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
                // Reset success message after 5 seconds
                setTimeout(() => setStatus(''), 5000);
            } else {
                console.error("Error from Web3Forms", data);
                setStatus('error');
            }
        } catch (error) {
            console.error("Submission Error", error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="fixed bottom-0 left-0 w-full h-[80vh] bg-[#7CC159] text-[#353B4E] z-0 flex flex-col justify-between overflow-hidden">
            {/* Background kinetic typography */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200vw] pointer-events-none opacity-20 flex">
                <h2 ref={marqueeRef} className="font-display font-black text-[25vw] leading-none tracking-tighter uppercase whitespace-nowrap">
                    LET'S TALK — LET'S TALK — LET'S TALK —
                </h2>
            </div>

            <div className="relative z-10 p-6 md:px-16 md:py-12 h-full flex flex-col md:flex-row gap-8 justify-between pt-20">

                {/* Left Side: Headline & Direct Info */}
                <div className="flex flex-col justify-between h-full w-full md:w-1/2">
                    <h2 className="font-drama italic text-5xl md:text-7xl lg:text-[7vw] leading-none max-w-2xl text-[#353B4E] mix-blend-multiply mb-8">
                        Ready to scale your brand?
                    </h2>

                    <div className="flex flex-col gap-6 border-t border-[#353B4E]/20 pt-8 mt-auto">
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#353B4E]/60">Direct Email</span>
                            <a href="mailto:creatiixofficial@creatiix.com" className="text-xl md:text-2xl font-bold font-display tracking-tight hover:text-white transition-colors duration-300">
                                creatiixofficial@creatiix.com
                            </a>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#353B4E]/60">Call Us</span>
                            <a href="tel:+917023454023" className="text-xl md:text-2xl font-bold font-display tracking-tight hover:text-white transition-colors duration-300">
                                +91 7023454023
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Side: The Form */}
                <div className="w-full md:w-[45%] h-full flex items-end">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full bg-[#353B4E] rounded-3xl p-8 shadow-2xl flex flex-col gap-4 max-h-[60vh] overflow-y-auto"
                    >
                        <h3 className="text-white font-display text-2xl mb-2 font-bold uppercase tracking-wide">
                            Send us a message
                        </h3>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-white/60 text-xs font-bold uppercase tracking-widest font-mono">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#F5DF77] transition-colors font-sans"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-white/60 text-xs font-bold uppercase tracking-widest font-mono">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#F5DF77] transition-colors font-sans"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone" className="text-white/60 text-xs font-bold uppercase tracking-widest font-mono">Contact Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#F5DF77] transition-colors font-sans"
                                placeholder="+1 234 567 8900"
                            />
                        </div>

                        <div className="flex flex-col gap-2 flex-grow">
                            <label htmlFor="message" className="text-white/60 text-xs font-bold uppercase tracking-widest font-mono">Project Details</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                rows="3"
                                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#F5DF77] transition-colors font-sans resize-none h-full"
                                placeholder="Tell us about what you want to build..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'submitting' || status === 'success'}
                            className={`mt-4 w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 ${status === 'success' ? 'bg-[#7CC159] text-[#353B4E]' :
                                status === 'submitting' ? 'bg-[#F5DF77]/50 text-[#353B4E] cursor-wait' :
                                    'bg-[#F5DF77] text-[#353B4E] hover:bg-white hover:-translate-y-1'
                                }`}
                        >
                            {status === 'submitting' ? 'Sending...' :
                                status === 'success' ? 'Message Sent! ✓' :
                                    'Submit Inquiry'}
                        </button>

                        {status === 'error' && (
                            <span className="text-red-400 text-xs font-mono text-center mt-2">
                                Something went wrong. Please try emailing us directly.
                            </span>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
