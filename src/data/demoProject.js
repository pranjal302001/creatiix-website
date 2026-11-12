// The demo project: one fictional business, shown through every CREATIIX service.
// Urban Nest Properties does not exist. Nothing here is client work.
export const demoBrand = {
    name: 'Urban Nest Properties',
    kind: 'Property agency',
    city: 'Mumbai',
    siteUrl: '/demos/urban-nest/index.html',
    oldSiteUrl: '/demos/urban-nest/old.html',
};

// The everyday problems this kind of business has, and that the demos answer.
export const demoProblems = [
    { title: 'Enquiries go cold', text: 'Leads arrive at all hours. A reply that comes the next morning is usually too late.' },
    { title: 'Too many, too vague', text: 'Most callers are only browsing. Advisors lose hours finding the few serious buyers.' },
    { title: 'Site visits slip', text: 'Visits are fixed over phone and WhatsApp, then forgotten, moved or missed.' },
    { title: 'A website nobody uses', text: 'An old site with no search and no prices sends buyers straight to the big portals.' },
];

// status: 'live' = demo is on this page, 'work' = shown with real CREATIIX work, 'soon' = being built.
export const demoItems = [
    { slug: 'ai-chatbots', status: 'live', built: 'A chatbot that asks budget, area and size, suggests matching homes and books the visit.' },
    { slug: 'ai-automation', status: 'live', built: 'Enquiry to instant WhatsApp reply, visit reminder and follow-up, with nobody typing.' },
    { slug: 'ai-agents', status: 'live', built: 'A sales assistant that sorts the day\'s leads and says who to contact first.' },
    { slug: 'websites-web-apps', status: 'live', built: 'The agency website: search, filters, property pages and visit booking.' },
    { slug: 'mobile-apps', status: 'live', built: 'A buyer app to save homes, book visits and get alerts for new listings.' },
    { slug: 'graphic-design', status: 'work', built: 'Logo and identity work from our studio.' },
    { slug: 'website-redesign', status: 'live', built: 'The same agency\'s old website, and what it became.' },
    { slug: 'video-editing', status: 'work', built: 'Reels edited by our studio.' },
    { slug: 'content-writing', status: 'live', built: 'A buyer\'s guide article, ad copy and WhatsApp message templates.' },
    { slug: 'social-media', status: 'live', built: 'A one-month content calendar and nine ready-to-post designs.' },
];

export const demoBySlug = Object.fromEntries(demoItems.map((d) => [d.slug, d]));

// What changed in the redesign, in plain terms.
export const redesignChanges = [
    ['Search', 'None. Visitors read a list.', 'Buy / rent, area, size and budget filters.'],
    ['Prices', '"Price on request", call to ask.', 'Shown on every listing.'],
    ['Photos', 'No photos on the home page.', 'A photo and key facts for every property.'],
    ['Mobile', 'Fixed 980px layout, unreadable on phones.', 'Built for phones first.'],
    ['Contact', 'Phone during office hours, reply in 2 to 3 days.', 'Book a visit from any property page.'],
    ['Trust', 'Visitor counter, pop-up style ads, last updated 2014.', 'Clear steps, clean design, current listings.'],
];
