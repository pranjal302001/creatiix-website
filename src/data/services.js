// One list of every service, in one shape, so the whole site renders them identically.
// AI & Development comes first and carries the "Core focus" badge; nothing else differs.
import { aiServices } from './aiServices';
import { servicesCategories } from './servicesCategories';

// Extra fields the creative categories need to match the AI services.
const creativeMeta = {
    "Graphic Design": { slug: "graphic-design", visual: "design", tagline: "A brand people recognise at a glance", short: "Brand identity, marketing assets, packaging and print." },
    "Website Redesign": { slug: "website-redesign", visual: "browser", tagline: "Your old website, rebuilt to convert", short: "A fresh look, better UI/UX and faster pages for the website you already have." },
    "Video Editing": { slug: "video-editing", visual: "video", tagline: "Edits that hold attention to the last second", short: "Reels, YouTube, ads and full post-production." },
    "Content Writing": { slug: "content-writing", visual: "writing", tagline: "Words that rank, and words that sell", short: "SEO content, sales copy, scripts and thought leadership." },
    "Social Media Management": { slug: "social-media", visual: "social", tagline: "Show up every day, without doing it yourself", short: "Strategy, content, community and reporting." },
};

const label = (feature) => feature.split(': ')[0];

const ai = aiServices.map((s) => ({
    ...s,
    group: 'ai',
    // A single tab keeps the layout identical to services that have several.
    tabs: [{ title: 'Overview', subtitle: null, desc: s.desc, features: s.features }],
}));

const creative = servicesCategories.map((c) => ({
    ...creativeMeta[c.title],
    title: c.title,
    group: 'creative',
    tabs: c.services.map((sub) => ({ title: sub.title, subtitle: sub.subtitle, desc: sub.desc, features: sub.features })),
    // "Popular uses" chips: the first deliverable of each sub-service.
    useCases: c.services.map((sub) => label(sub.features[0])),
}));

export const allServices = [...ai, ...creative].map((s, i) => ({ ...s, id: String(i + 1).padStart(2, '0') }));

export const serviceGroups = [
    { key: 'all', label: 'All services' },
    { key: 'ai', label: 'AI & Development' },
    { key: 'creative', label: 'Creative & Marketing' },
];
