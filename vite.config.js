import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleChat } from './server/chatCore.js'

// Local stand-in for the hosted /api/chat function. It runs inside the Vite
// dev/preview server, so GEMINI_API_KEY (from .env, no VITE_ prefix) stays on
// this machine and is never sent to the browser.
function chatApi(env) {
    const hits = new Map(); // ip -> timestamps, a simple "30 messages per 10 minutes" limit

    const middleware = async (req, res, next) => {
        if (!req.url.startsWith('/api/chat')) return next();
        const send = (status, body) => {
            res.statusCode = status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(body));
        };
        if (req.method !== 'POST') return send(405, { error: 'method_not_allowed' });

        const ip = req.socket.remoteAddress || 'local';
        const recent = (hits.get(ip) || []).filter((t) => Date.now() - t < 10 * 60 * 1000);
        if (recent.length >= 30) return send(429, { error: 'busy' });
        hits.set(ip, [...recent, Date.now()]);

        let raw = '';
        for await (const chunk of req) {
            raw += chunk;
            if (raw.length > 50_000) return send(413, { error: 'too_large' });
        }
        let messages, bot;
        try { ({ messages, bot } = JSON.parse(raw)); } catch { return send(400, { error: 'bad_request' }); }

        const { status, body } = await handleChat(messages, { apiKey: env.GEMINI_API_KEY, model: env.GEMINI_MODEL, bot });
        send(status, body);
    };

    return {
        name: 'creatiix-chat-api',
        configureServer(server) { server.middlewares.use(middleware); },
        configurePreviewServer(server) { server.middlewares.use(middleware); },
    };
}

// Google Tag Manager, added to the page only in the production build, so visits
// made on this computer while developing are never counted. The snippet is
// Google's standard one, unmodified (Search Console verification relies on that).
const GTM_ID = 'GTM-WH344X3V';
function tagManager() {
    return {
        name: 'creatiix-tag-manager',
        apply: 'build',
        transformIndexHtml(html) {
            const head = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');</script>
<!-- End Google Tag Manager -->`;
            const body = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;
            return html
                .replace('<head>', `<head>\n${head}`)
                .replace(/(<body[^>]*>)/, `$1\n${body}`);
        },
    };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), ''); // '' = also read keys without the VITE_ prefix
    return {
        plugins: [react(), chatApi(env), tagManager()],
        build: {
            rollupOptions: {
                output: {
                    // Big libraries in their own files, so they cache separately from page code
                    manualChunks: {
                        three: ['three'],
                        motion: ['gsap', '@studio-freight/lenis'],
                        react: ['react', 'react-dom', 'react-router-dom'],
                    },
                },
            },
        },
    };
})
