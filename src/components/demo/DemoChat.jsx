import React from 'react';
import { Home, RotateCcw } from 'lucide-react';
import { useChat } from '../../lib/useChat';
import ChatThread from '../ChatThread';

const GREETING = 'Hi, welcome to Urban Nest Properties! Are you looking to buy or rent in Mumbai?';
const SUGGESTIONS = ['2 BHK to buy in Andheri West, budget ₹2.5 Cr', 'Furnished flat on rent near Powai', 'Mujhe Thane me ghar chahiye'];

// The demo agency's chatbot, live. It only knows the nine demo listings.
export default function DemoChat() {
    const chat = useChat({ bot: 'urban-nest', greeting: GREETING });

    return (
        <div className="glass !bg-background/70 h-[560px] flex flex-col overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-ink/10">
                <span className="w-9 h-9 rounded-full bg-[#0F3D3E] flex items-center justify-center shrink-0"><Home className="w-4 h-4 text-[#C8963E]" /></span>
                <div className="mr-auto">
                    <p className="font-display font-bold text-ink leading-none">Urban Nest Assistant</p>
                    <p className="font-mono text-xs uppercase tracking-wider text-accent mt-1">Live AI demo</p>
                </div>
                <button onClick={chat.reset} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink/60 hover:text-accent transition-colors">
                    <RotateCcw className="w-3.5 h-3.5" /> Restart
                </button>
            </div>
            <ChatThread chat={chat} suggestions={SUGGESTIONS} placeholder="Tell it what you are looking for..." />
        </div>
    );
}
