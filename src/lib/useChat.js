import { useState } from 'react';

const ERRORS = {
    not_configured: 'The chat is being set up. Please message us on WhatsApp for now.',
    busy: 'Lots of questions right now. Please try again in a minute.',
    default: "Sorry, I couldn't answer that just now. Please try again.",
};

// Conversation state for a chatbot that talks to /api/chat (a server function,
// so the AI key is never in the browser). `bot` picks the persona on the server.
export function useChat({ bot = 'creatiix', greeting }) {
    const [messages, setMessages] = useState([{ role: 'assistant', text: greeting }]);
    const [busy, setBusy] = useState(false);

    const send = async (text) => {
        const question = text.trim();
        if (!question || busy) return;
        const next = [...messages, { role: 'user', text: question }];
        setMessages(next);
        setBusy(true);
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // The greeting is ours, not the model's, so it is left out of the history.
                body: JSON.stringify({ bot, messages: next.slice(1).filter((m) => !m.failed) }),
            });
            const data = await res.json().catch(() => ({}));
            const reply = res.ok && data.reply ? data.reply : (ERRORS[data.error] || ERRORS.default);
            setMessages((m) => [...m, { role: 'assistant', text: reply, failed: !res.ok }]);
        } catch {
            setMessages((m) => [...m, { role: 'assistant', text: ERRORS.default, failed: true }]);
        } finally {
            setBusy(false);
        }
    };

    const reset = () => setMessages([{ role: 'assistant', text: greeting }]);

    return { messages, busy, send, reset };
}
