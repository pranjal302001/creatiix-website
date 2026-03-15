import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import gsap from 'gsap';

// Initialize the Gemini API (Requires User Key)
// Add your VITE_GEMINI_API_KEY to the .env file in the root of your project
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export default function AIBrainstormer() {
    const [businessData, setBusinessData] = useState({
        description: '',
        goal: ''
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [strategy, setStrategy] = useState('');

    const generatePrompt = (desc, goal) => `
You are the elite Creative Director for "CREATIIX", a premium, aggressive, and highly modern creative agency that focuses on bold 3D motion, stark brutalism, and high-end design.
A potential client has just described their business to you:
"My business is: ${desc}. Our main goal right now is: ${goal}."

Provide a short, punchy, customized 3-step creative strategy for their brand.
Format the output in clean Markdown.
Do NOT use generic marketing speak. Be bold, innovative, and sound like a high-end designer advising them.
Outline 3 distinct phases, giving each phase a catchy name and 2-3 sentences of what CREATIIX would do for them. 
Finish with a powerful 1-sentence closing statement telling them to reach out.
`;

    const handleBrainstorm = async (e) => {
        e.preventDefault();

        if (!businessData.description) return;

        setStatus('loading');
        setStrategy('');

        try {
            // Check if API key is actually set to prevent nasty crashes
            if (!apiKey || apiKey === "your_api_key_here") {
                throw new Error("API Key not configured. Please add your VITE_GEMINI_API_KEY in the .env file.");
            }

            // Using the recommended default model
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = generatePrompt(businessData.description, businessData.goal);

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();

            setStrategy(responseText);
            setStatus('success');

            // Animate results in
            setTimeout(() => {
                gsap.fromTo('.strategy-result',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
                );
            }, 100);

        } catch (error) {
            console.error("Brainstorm Error:", error);
            setStrategy(`Error generating strategy: ${error.message}\n\nPlease check your API key configuration or try again later.`);
            setStatus('error');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white/5 border border-[#F5DF77]/20 rounded-[2rem] p-8 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden mt-24 mb-32 z-50">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7CC159]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5DF77]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#F5DF77] text-[#353B4E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">Experimental Tool</span>
                    <span className="text-white/50 text-xs font-mono tracking-widest uppercase">Powered by Gemini AI</span>
                </div>

                <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight mb-4">
                    Instant Strategy Generator
                </h2>
                <p className="font-sans text-white/70 text-lg max-w-2xl mb-10">
                    Not sure where to start? Describe your brand below, and our AI Creative Director will map out an aggressive 3-step growth and design strategy tailored specifically for you.
                </p>

                {status === 'idle' || status === 'error' ? (
                    <form onSubmit={handleBrainstorm} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[#F5DF77] font-mono text-xs uppercase tracking-widest font-bold">What is your business?</label>
                            <input
                                type="text"
                                required
                                value={businessData.description}
                                onChange={(e) => setBusinessData({ ...businessData, description: e.target.value })}
                                placeholder="e.g. A sustainable luxury watch brand launching in Europe."
                                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#F5DF77] transition-colors font-sans w-full"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[#F5DF77] font-mono text-xs uppercase tracking-widest font-bold">What is your biggest creative challenge/goal?</label>
                            <input
                                type="text"
                                required
                                value={businessData.goal}
                                onChange={(e) => setBusinessData({ ...businessData, goal: e.target.value })}
                                placeholder="e.g. We need a website that looks ultra-premium but loads instantly."
                                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#F5DF77] transition-colors font-sans w-full"
                            />
                        </div>

                        {status === 'error' && (
                            <div className="text-red-400 text-sm font-sans mt-2 bg-red-400/10 p-4 rounded-xl border border-red-400/20 whitespace-pre-line">
                                {strategy}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="mt-4 bg-white text-[#353B4E] font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-[#F5DF77] transition-colors duration-300 transform hover:-translate-y-1 w-full md:w-auto md:px-12 md:self-end"
                        >
                            Generate Strategy
                        </button>
                    </form>
                ) : status === 'loading' ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="w-16 h-16 border-4 border-white/10 border-t-[#F5DF77] rounded-full animate-spin mb-6"></div>
                        <h3 className="font-display text-2xl text-white uppercase tracking-widest animate-pulse">Analyzing Brand DNA...</h3>
                        <p className="text-white/50 font-mono text-sm mt-2">Connecting to our AI Creative Director...</p>
                    </div>
                ) : (
                    <div className="strategy-result opacity-0">
                        <div className="bg-[#1A1E29] rounded-2xl p-6 md:p-10 border border-white/5">
                            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                                <h3 className="font-display text-2xl text-[#F5DF77] uppercase tracking-wide">Your Tailored Strategy</h3>
                                <button
                                    onClick={() => { setStatus('idle'); setStrategy(''); }}
                                    className="text-white/50 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors cursor-none"
                                >
                                    Start Over ⟲
                                </button>
                            </div>

                            <div className="prose prose-invert prose-yellow max-w-none font-sans text-white/80 leading-relaxed whitespace-pre-line">
                                {strategy}
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <p className="font-mono text-sm text-white/50 uppercase tracking-widest text-center md:text-left">
                                    Ready to execute this?
                                </p>
                                <a href="#contact" className="bg-[#7CC159] text-[#353B4E] font-bold uppercase tracking-widest px-8 py-3 rounded-full hover:bg-white transition-colors duration-300">
                                    Let's Talk
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
