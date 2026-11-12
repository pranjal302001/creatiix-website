import React, { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';

// Message list + suggestions + input, shared by the site assistant and the demo chatbot.
export default function ChatThread({ chat, suggestions = [], placeholder = 'Type your question...', autoFocus = false }) {
    const { messages, busy, send } = chat;
    const [input, setInput] = useState('');
    const listRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, busy]);

    useEffect(() => { if (autoFocus) inputRef.current?.focus(); }, [autoFocus]);

    const submit = (text) => { send(text); setInput(''); };

    return (
        <>
            <div ref={listRef} data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-2.5" aria-live="polite">
                {messages.map((m, i) => (
                    <div key={i} className={`max-w-[85%] px-3.5 py-2.5 text-[15px] leading-snug rounded-2xl whitespace-pre-line ${m.role === 'user'
                        ? 'self-end bg-brand text-onaccent'
                        : `self-start text-ink ${m.failed ? 'bg-accent/15 border border-accent/30' : 'bg-ink/10'}`}`}>
                        {m.text}
                    </div>
                ))}
                {busy && (
                    <div className="self-start px-3.5 py-3 rounded-2xl bg-ink/10 flex gap-1" aria-label="Assistant is typing">
                        {[0, 1, 2].map((d) => <span key={d} className="w-1.5 h-1.5 rounded-full bg-ink animate-typing-dot" style={{ animationDelay: `${d * 0.15}s` }} />)}
                    </div>
                )}
                {messages.length === 1 && suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {suggestions.map((s) => (
                            <button key={s} onClick={() => submit(s)} className="text-sm text-left text-ink border border-ink/20 rounded-2xl px-3 py-1.5 hover:border-accent hover:text-accent transition-colors">{s}</button>
                        ))}
                    </div>
                )}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); submit(input); }} className="p-3 border-t border-ink/10 flex gap-2">
                <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    maxLength={1000}
                    placeholder={placeholder}
                    aria-label="Your message"
                    className="flex-1 min-w-0 bg-ink/10 border border-ink/15 rounded-2xl px-4 py-2.5 text-ink placeholder-ink/40 focus:outline-none focus:border-accent"
                />
                <button type="submit" disabled={busy || !input.trim()} aria-label="Send" className="w-11 h-11 shrink-0 rounded-2xl bg-brand text-onaccent flex items-center justify-center disabled:opacity-40 transition-opacity">
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </>
    );
}
