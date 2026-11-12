/** @type {import('tailwindcss').Config} */
// Theme colours come from CSS variables in src/index.css so that
// light and dark mode can swap them. Change brand colours there.
const themed = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        // ONE corner radius for the whole site (Apple-style consistency).
        // Change --radius in src/index.css to adjust every element at once.
        borderRadius: {
            none: '0', sm: 'var(--radius)', DEFAULT: 'var(--radius)', md: 'var(--radius)', lg: 'var(--radius)',
            xl: 'var(--radius)', '2xl': 'var(--radius)', '3xl': 'var(--radius)', full: '9999px',
        },
        extend: {
            backgroundImage: {
                // Brand gradient: Flameburst → logo orange → peach
                brand: 'linear-gradient(100deg, #FC5000, #FF7A00 55%, #FFD3A3)',
            },
            colors: {
                background: themed('bg'),      // page background (charcoal / ivory)
                surface: themed('surface'),    // cards and alternate sections
                ink: themed('ink'),            // main text (ivory / charcoal)
                support: themed('support'),    // secondary highlight text (peach / burnt orange)
                accent: '#FC5000',             // Flameburst: labels, numbers, small highlights
                flame: '#FF7A00',              // logo orange (middle of the brand gradient)
                peach: '#FFD3A3',              // brand peach
                onaccent: '#0B0F14',           // text placed on orange or peach
                muted: themed('muted'),
            },
            fontFamily: {
                display: ['Bricolage Grotesque', 'sans-serif'],
                body: ['Outfit', 'sans-serif'],
                mono: ['Space Mono', 'monospace'],
                drama: ['Instrument Serif', 'serif'],
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' }
                },
                'marquee-reverse': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0%)' }
                },
                'spin-slow': {
                    to: { transform: 'rotate(360deg)' }
                },
                'dash-flow': {
                    to: { strokeDashoffset: '-24' }
                },
                'typing-dot': {
                    '0%, 60%, 100%': { opacity: '0.25', transform: 'translateY(0)' },
                    '30%': { opacity: '1', transform: 'translateY(-3px)' }
                }
            },
            animation: {
                marquee: 'marquee 40s linear infinite',
                'marquee-reverse': 'marquee-reverse 40s linear infinite',
                'spin-slow': 'spin-slow 20s linear infinite',
                'dash-flow': 'dash-flow 1s linear infinite',
                'typing-dot': 'typing-dot 1.2s ease-in-out infinite',
            }
        },
    },
    plugins: [],
}
