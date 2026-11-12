import React, { useState } from 'react';
import { Bot, MessageCircle, X } from 'lucide-react';
import { whatsappLink } from '../lib/site';
import { useChat } from '../lib/useChat';
import ChatThread from './ChatThread';

const GREETING = "Hi! I'm the CREATIIX assistant. Ask me about AI chatbots, automation, websites, apps, design or marketing.";
const SUGGESTIONS = ['What can an AI chatbot do for me?', 'I need a website', 'Do you build mobile apps?'];

// Floating assistant on every page.
export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const chat = useChat({ bot: 'creatiix', greeting: GREETING });

    // Hand the conversation over to a human, with the visitor's questions included.
    const transcript = chat.messages.filter((m) => m.role === 'user').map((m) => `- ${m.text}`).join('\n');
    const handover = whatsappLink(transcript ? `Hi CREATIIX, I was chatting with your website assistant about:\n${transcript}` : undefined);

    return (
        <div className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[95] flex flex-col items-end gap-3">
            {open && (
                <div className="glass !bg-background/85 w-[calc(100vw-2.5rem)] sm:w-[380px] h-[min(560px,calc(100dvh-8rem))] flex flex-col overflow-hidden" role="dialog" aria-label="Chat with CREATIIX">
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-ink/10">
                        <span className="w-9 h-9 rounded-full bg-brand flex items-center justify-center shrink-0"><Bot className="w-4 h-4 text-onaccent" /></span>
                        <div className="mr-auto">
                            <p className="font-display font-bold text-ink leading-none">CREATIIX Assistant</p>
                            <p className="font-mono text-xs uppercase tracking-wider text-accent mt-1">AI · replies instantly</p>
                        </div>
                        <button onClick={() => setOpen(false)} aria-label="Close chat" className="w-9 h-9 rounded-2xl flex items-center justify-center text-ink/60 hover:text-ink hover:bg-ink/10 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <ChatThread chat={chat} suggestions={SUGGESTIONS} autoFocus />

                    <a href={handover} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-ink/60 hover:text-accent transition-colors pb-3">
                        <MessageCircle className="w-3.5 h-3.5" /> Continue on WhatsApp
                    </a>
                </div>
            )}

            <button
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? 'Close chat' : 'Chat with us'}
                aria-expanded={open}
                className="w-14 h-14 rounded-full bg-brand text-onaccent flex items-center justify-center shadow-[0_10px_30px_rgba(252,80,0,0.45)] hover:scale-105 transition-transform"
            >
                {open ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
            </button>
        </div>
    );
}
