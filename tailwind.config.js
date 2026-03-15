/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#353B4E', // Dark slate blue from logo background
                primary: '#F5DF77', // Soft yellow from logo text
                accent: '#7CC159', // Green from logo gradient
                contrast: '#232838', // Darker shade for cards/contrast
                muted: '#9CA3AF'
            },
            fontFamily: {
                display: ['Bricolage Grotesque', 'sans-serif'],
                body: ['Outfit', 'sans-serif'],
                mono: ['Space Mono', 'monospace'],
                drama: ['Instrument Serif', 'serif'], // Fallback serif for drama quotes
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' }
                },
                'marquee-reverse': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0%)' }
                }
            },
            animation: {
                marquee: 'marquee 40s linear infinite',
                'marquee-reverse': 'marquee-reverse 40s linear infinite',
            }
        },
    },
    plugins: [],
}
