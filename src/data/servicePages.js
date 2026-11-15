// Full pages for single services (/services/<slug>). Each entry adds the longer
// copy that the short panel on /services does not have room for. The service's
// name, tagline, features, use cases and tools still come from data/services.js.
// A service gets its own page only once it has an entry here.

export const servicePages = {
    'ai-chatbots': {
        // Shown in Google and in the browser tab (" | CREATIIX" is added automatically).
        seoTitle: 'AI Chatbot Development Company in India',
        seoDescription: 'CREATIIX builds AI chatbots for websites, WhatsApp and Instagram, trained on your own business. Based in Mumbai, working with businesses across India. Try a live demo.',
        heading: 'AI chatbot development',
        headingAccent: 'for businesses that cannot afford a missed enquiry.',
        intro: 'We design and build AI chatbots that answer customers from your own content, capture leads and book appointments, on your website, WhatsApp and Instagram. We are a Mumbai studio working with businesses across India.',
        audiences: [
            { who: 'Real estate and property', need: 'Enquiries arrive at night and go cold by morning. The bot asks budget, area and size, suggests matching homes and books the visit.' },
            { who: 'Clinics and salons', need: 'The phone rings while you are with a customer. The bot answers timings and services and books the appointment for you.' },
            { who: 'Online stores and D2C brands', need: 'The same questions about delivery, returns and sizes, all day. The bot answers them and shares order status.' },
            { who: 'Coaching and education', need: 'Parents and students ask about fees, batches and results. The bot answers, collects details and passes on serious enquiries.' },
        ],
        buildIntro: 'Every chatbot is built around one business. It learns your services, policies and tone, then works on the channels your customers already use.',
        steps: [
            { title: 'Discover', desc: 'We list the questions your customers ask most, and decide what the bot should answer, collect and hand over.' },
            { title: 'Design', desc: 'You see the conversation before we build it: the greeting, the questions it asks and where a human steps in.' },
            { title: 'Develop', desc: 'We train the bot on your website, PDFs, FAQs and catalogues, and connect it to your sheet or CRM.' },
            { title: 'Launch', desc: 'We test it with real questions, then switch it on for your website, WhatsApp or Instagram.' },
            { title: 'Support', desc: 'We read what customers actually ask, fill the gaps and keep the answers up to date.' },
        ],
        demoNote: 'Urban Nest Properties is a fictional Mumbai property agency we built to show our work. Its chatbot is live: ask it for a 2 BHK in your budget and book a visit.',
        faqs: [
            { q: 'What does an AI chatbot development company actually build?', a: 'A chatbot that knows your business. We train it on your own content, set what it should ask and answer, connect it to your website, WhatsApp or Instagram, and send every lead to your sheet or CRM. You get a working assistant, not a tool you have to set up yourself.' },
            { q: 'Can the chatbot work on WhatsApp?', a: 'Yes. It runs on the WhatsApp Business API, so customers chat with your business number as usual. The same bot can also work as a widget on your website and in Instagram DMs and Messenger.' },
            { q: 'Will it reply in Hindi or Hinglish?', a: 'Yes. The bot can reply in English, Hindi or Hinglish, in the language the customer writes in. We test it in the languages your customers actually use before it goes live.' },
            { q: 'What happens when the bot cannot answer?', a: 'It says so and hands the chat to your team with the full conversation, so the customer never has to repeat themselves. You decide which topics always go to a human.' },
            { q: 'Do I need a new website to add a chatbot?', a: 'No. The chatbot is added to the website you already have. If you do not have a website, it can work on WhatsApp alone.' },
            { q: 'How long does it take and what does it cost?', a: 'Both depend on your requirement: how much content the bot must learn and which channels and tools it connects to. Tell us what you need on WhatsApp and you get a clear scope and timeline before we start.' },
        ],
    },
};

export const servicePageSlugs = Object.keys(servicePages);
