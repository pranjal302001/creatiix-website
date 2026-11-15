// Vercel serverless function for the chatbots: POST /api/chat
// The Gemini key is read from the GEMINI_API_KEY environment variable set in
// the Vercel project, so it never reaches the browser. The same logic runs
// locally through the dev middleware in vite.config.js.
import { handleChat } from '../server/chatCore.js';

// Simple per-instance limit: 30 messages per 10 minutes per visitor address.
// Instances are short-lived, so this only slows down bursts; it is not a hard cap.
const hits = new Map();

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

    const ip = String(req.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim();
    const recent = (hits.get(ip) || []).filter((t) => Date.now() - t < 10 * 60 * 1000);
    if (recent.length >= 30) return res.status(429).json({ error: 'busy' });
    hits.set(ip, [...recent, Date.now()]);

    const { messages, bot } = req.body || {};
    if (JSON.stringify(messages || '').length > 50_000) return res.status(413).json({ error: 'too_large' });

    const { status, body } = await handleChat(messages, {
        apiKey: process.env.GEMINI_API_KEY,
        model: process.env.GEMINI_MODEL,
        bot,
    });
    res.status(status).json(body);
}

// Gemini can take a few seconds, and the fallback models add more
export const config = { maxDuration: 30 };
