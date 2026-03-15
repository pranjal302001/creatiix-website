import React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-contrast pt-20 pb-10 px-6 md:px-16 rounded-t-[3.5rem] mt-32 border-t border-accent/20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between pb-16 border-b border-contrast/10 gap-12">
                {/* Brand */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex items-center gap-4 mb-6">
                        <img src="/logo-icon.png" alt="CREATIIX Icon" className="h-16 md:h-20 object-contain" />
                        <span className="font-display font-black text-3xl md:text-5xl tracking-widest uppercase text-white">CREATIIX</span>
                    </div>
                    <p className="font-body text-muted text-sm uppercase tracking-wide leading-relaxed">
                        Full-service creative & marketing agency building brands through strategic design.
                    </p>
                </div>

                {/* Links */}
                <div className="flex gap-16 font-body text-sm font-bold uppercase tracking-widest">
                    <div className="flex flex-col gap-4">
                        <span className="text-muted mb-2">Services</span>
                        <a href="#" className="hover:text-accent transition-colors">Design</a>
                        <a href="#" className="hover:text-accent transition-colors">Motion</a>
                        <a href="#" className="hover:text-accent transition-colors">Web</a>
                        <a href="#" className="hover:text-accent transition-colors">Marketing</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-muted mb-2">Company</span>
                        <a href="#" className="hover:text-accent transition-colors">About</a>
                        <a href="#" className="hover:text-accent transition-colors">Work</a>
                        <a href="#" className="hover:text-accent transition-colors">Contact</a>
                    </div>
                </div>

                {/* Status */}
                <div className="flex flex-col items-start md:items-end justify-between font-mono text-xs uppercase text-muted tracking-widest">
                    <div className="flex gap-8 mb-8 md:mb-0">
                        <a href="#" className="hover:text-accent transition">Twitter</a>
                        <a href="#" className="hover:text-accent transition">Insta</a>
                        <a href="#" className="hover:text-accent transition">Behance</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                        <span>Systems online</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex justify-between items-center pt-8 font-mono text-[10px] text-muted tracking-widest uppercase">
                <span>© {currentYear} CREATIIX. All rights reserved.</span>
                <span>A Premium Digital Instrument.</span>
            </div>
        </footer>
    );
}
