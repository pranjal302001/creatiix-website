// Build-time renderer: turns one address into finished HTML, so search engines
// and link previews get real content without running JavaScript first.
// Used only by scripts/prerender.mjs, never in the browser.
import React from 'react';
import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppLayout } from './App.jsx';
import { renderedMeta } from './lib/usePageMeta';

export function render(url) {
    renderedMeta.current = null;
    return new Promise((resolve, reject) => {
        let html = '';
        const sink = new Writable({
            write(chunk, _enc, done) { html += chunk; done(); },
            final(done) { resolve({ html, meta: renderedMeta.current }); done(); },
        });
        const stream = renderToPipeableStream(
            <StaticRouter location={url}><AppLayout /></StaticRouter>,
            {
                // Wait for lazily loaded pages too, so the whole page is in the HTML.
                onAllReady() { stream.pipe(sink); },
                onShellError: reject,
                onError: reject,
            },
        );
    });
}
