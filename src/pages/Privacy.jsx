import React from 'react';
import { usePageMeta } from '../lib/usePageMeta';
import PageHeader from '../components/PageHeader';
import { CONTACT, GA_ID } from '../lib/site';

const UPDATED = '15 November 2026';

// Each section: a heading and its paragraphs or bullet points, in plain words.
const sections = [
    {
        title: 'The short version',
        points: [
            'We only receive what you choose to send us.',
            'We do not sell or rent your details to anyone.',
            'We do not run advertising trackers on this website.',
            'You can ask us to show, correct or delete your details at any time.',
        ],
    },
    {
        title: 'Contact and review forms',
        body: [
            'The contact form and the review form do not send anything to our servers. When you press the button, WhatsApp opens on your device with your message already typed. Nothing reaches us until you press send inside WhatsApp.',
            'If you do send it, we receive your name, phone number, the service you are interested in and your message through WhatsApp, and WhatsApp\'s own privacy policy applies to that conversation.',
        ],
    },
    {
        title: 'The chat assistant',
        body: [
            'When you type in the chat on this site or on the demo page, your messages are sent to our server and then to Google\'s Gemini AI service, which writes the reply. We do not save chat conversations, and they are gone when you close or reload the page.',
            'To stop misuse, our server briefly remembers the internet address (IP) of recent chat requests. Please do not type passwords, payment details or other sensitive information into the chat.',
        ],
    },
    {
        title: 'Email and WhatsApp conversations',
        body: [
            'If you email or message us, we keep that conversation so we can reply, prepare a proposal and deliver your project. We keep it only as long as it is useful for that work or as the law requires.',
        ],
    },
    {
        title: 'What is stored in your browser',
        body: [
            'Two small settings are saved in your own browser: whether you chose light or dark mode, and whether you have already seen the opening logo animation. They never leave your device and do not identify you.',
        ],
    },
    ...(GA_ID ? [{
        title: 'Visitor statistics',
        body: [
            'We use Google Analytics, loaded through Google Tag Manager, to understand how many people visit and which pages they read. It uses cookies and collects general information such as your approximate location, device type and the pages you open. We use it only to improve the site, never for advertising.',
        ],
    }] : []),
    {
        title: 'Services that help run this site',
        points: [
            'Vercel hosts the website and keeps standard server logs (IP address, browser and time of visit).',
            'Google Fonts supplies the typefaces, so your browser contacts Google to load them.',
            'Google Gemini writes the chat assistant\'s replies.',
            'WhatsApp and Instagram links open those services, which follow their own privacy policies.',
        ],
    },
    {
        title: 'The demo project',
        body: [
            'Urban Nest Properties on the Demo page is a fictional business that we created to show our work. Forms and bookings inside the demo are not saved or sent to anyone. Only the demo chat assistant sends messages to the AI service, exactly as described above.',
        ],
    },
    {
        title: 'Your choices',
        body: [
            `You can ask us what details of yours we hold, ask us to correct them, or ask us to delete them. Write to ${CONTACT.email} and we will respond as soon as we reasonably can.`,
            'This website is meant for businesses and adults. We do not knowingly collect details from children.',
        ],
    },
    {
        title: 'Changes to this policy',
        body: [
            'If we change how we handle your details, we will update this page and the date at the top.',
        ],
    },
];

export default function Privacy() {
    usePageMeta('Privacy Policy', 'What details CREATIIX receives through this website, how they are used, and how to ask us to remove them.');

    return (
        <div className="relative min-h-screen bg-background text-ink pt-36 pb-24 px-6 md:px-16 overflow-hidden">
            <PageHeader
                label="Privacy Policy"
                title="Your details,"
                highlight="handled with care."
                intro="A plain-language note on what this website receives from you and what we do with it."
            />

            <i className="glow glow-orange w-[30rem] h-[30rem] -right-60 top-1/2" />

            <div className="relative max-w-7xl mx-auto">
            <article className="glass p-6 md:p-12 max-w-3xl">
                <p className="font-mono text-[13px] uppercase tracking-widest text-ink/50 mb-10">Last updated: {UPDATED}</p>

                <div className="flex flex-col gap-10">
                    {sections.map((s, i) => (
                        <section key={s.title}>
                            <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight leading-tight mb-4 flex items-baseline gap-4">
                                <span className="font-mono text-[13px] text-accent font-bold shrink-0">{String(i + 1).padStart(2, '0')}</span>
                                {s.title}
                            </h2>
                            {s.body?.map((p) => (
                                <p key={p} className="text-ink/70 text-lg font-light leading-relaxed mb-4 last:mb-0">{p}</p>
                            ))}
                            {s.points && (
                                <ul className="space-y-3">
                                    {s.points.map((p) => (
                                        <li key={p} className="flex items-start gap-4 text-ink/70 text-lg font-light leading-relaxed">
                                            <span className="mt-3 h-1.5 w-1.5 rounded-2xl bg-accent shrink-0" />
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-ink/10">
                    <p className="font-mono text-[13px] uppercase tracking-widest text-ink/50 mb-2">Questions about this policy</p>
                    <a href={`mailto:${CONTACT.email}`} className="font-display font-bold text-2xl tracking-tight text-ink hover:text-accent transition-colors">{CONTACT.email}</a>
                </div>
            </article>
            </div>
        </div>
    );
}
