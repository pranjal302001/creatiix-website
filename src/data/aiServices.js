// AI & Development services: the highlighted group on the site.
// `visual` picks the illustration from components/AIVisuals.jsx.

export const aiServices = [
    {
        id: "01",
        slug: "ai-chatbots",
        title: "AI Chatbots",
        short: "Answers customers, captures leads and books appointments, 24/7.",
        tagline: "Your best salesperson, awake at 3 AM",
        desc: "A chatbot trained on your own business: your services, prices, policies and tone. It answers real questions, qualifies leads and hands over to your team only when a human is needed.",
        useCases: ["WhatsApp lead bot", "Website support assistant", "Appointment booking", "Order & delivery status"],
        features: [
            "Trained on your content: Website, PDFs, FAQs and catalogues become the bot's knowledge.",
            "Works where your customers are: Website widget, WhatsApp, Instagram DMs and Messenger.",
            "Lead capture built in: Collects name, need and contact, then sends it to your sheet or CRM.",
            "Human handover: Passes the chat to your team with full context when it should."
        ],
        stack: ["LLM APIs", "WhatsApp Business API", "Knowledge base (RAG)", "CRM / Sheets"],
        visual: "chat"
    },
    {
        id: "02",
        slug: "ai-automation",
        title: "AI Automation",
        short: "Repetitive work, connected and running by itself.",
        tagline: "Stop doing the same task twice",
        desc: "We map the manual work in your business, then connect your tools so it happens automatically: leads get followed up, invoices get sent, reports build themselves.",
        useCases: ["Lead follow-up sequences", "Invoice & payment reminders", "Daily report generation", "Social media scheduling"],
        features: [
            "Workflow audit: We find the tasks that cost you the most hours and automate those first.",
            "Tool integration: Forms, email, WhatsApp, Sheets, CRM and payment tools working as one system.",
            "AI in the loop: Read, sort, summarise and reply to messages and documents automatically.",
            "Alerts & logs: You see what ran, what failed and what needs your attention."
        ],
        stack: ["n8n", "Make", "Zapier", "Custom APIs", "Webhooks"],
        visual: "flow"
    },
    {
        id: "03",
        slug: "ai-agents",
        title: "AI Agents",
        short: "Digital team members that plan, decide and complete tasks.",
        tagline: "Give the goal, not the steps",
        desc: "An agent goes beyond chat. It uses your tools to actually finish work: researching, drafting, updating records and reporting back, with you approving the important decisions.",
        useCases: ["Inbox & email triage", "Sales research assistant", "Customer onboarding agent", "Internal knowledge assistant"],
        features: [
            "Custom-built for one job: Each agent is designed around a real role in your business.",
            "Connected to your tools: Email, calendar, documents, databases and internal software.",
            "Approval checkpoints: The agent asks before sending, paying or deleting anything.",
            "Measurable output: Clear logs of what was done and how much time it saved."
        ],
        stack: ["LLM APIs", "Tool calling", "Vector database", "Custom backends"],
        visual: "agent"
    },
    {
        id: "04",
        slug: "websites-web-apps",
        title: "Websites & Web Apps",
        short: "From landing pages to dashboards and full platforms.",
        tagline: "Fast, custom, built to convert",
        desc: "Marketing sites that sell, and web applications that run your business: booking systems, client portals, dashboards and e-commerce, designed and developed in-house.",
        useCases: ["Business & portfolio websites", "E-commerce stores", "Client portals & dashboards", "Booking & SaaS platforms"],
        features: [
            "Design and code together: One team from first wireframe to live site, no handoff gaps.",
            "Built for speed and search: Fast loading, mobile-first, SEO and AI-search ready.",
            "Easy to manage: Update content yourself through a simple admin panel.",
            "AI-ready: Chatbots, smart search and automation can plug straight in."
        ],
        stack: ["React", "Next.js", "Node.js", "Tailwind CSS", "Shopify / WordPress"],
        visual: "browser"
    },
    {
        id: "05",
        slug: "mobile-apps",
        title: "Mobile Apps",
        short: "Android and iOS apps your customers will actually keep.",
        tagline: "One codebase, both app stores",
        desc: "We design, build and publish mobile apps for Android and iOS, from the first prototype to the store listing and the updates after launch.",
        useCases: ["Customer & loyalty apps", "Booking & delivery apps", "Community & membership apps", "Internal team apps"],
        features: [
            "Cross-platform build: One app for Android and iOS, so you launch faster at lower cost.",
            "UI/UX first: Clickable prototype you can test on your phone before development starts.",
            "Backend included: Login, payments, notifications, admin panel and database.",
            "Store launch & updates: We handle Play Store and App Store submission and ongoing releases."
        ],
        stack: ["React Native", "Flutter", "Firebase", "Supabase", "Push notifications"],
        visual: "phone"
    }
];

// Example ideas, clearly labelled as concepts (not client work).
export const industryConcepts = [
    {
        industry: "Clinics & Salons",
        idea: "WhatsApp booking assistant",
        desc: "Patients book, reschedule and get reminders on WhatsApp. No-shows drop, the front desk stops answering the same questions."
    },
    {
        industry: "Real Estate",
        idea: "Lead qualifying agent",
        desc: "Every enquiry is answered in seconds, budget and location are captured, and only serious buyers reach your sales team."
    },
    {
        industry: "E-commerce",
        idea: "Order support bot + recovery automation",
        desc: "Customers track orders and returns by chat, while abandoned carts get an automatic, personal follow-up."
    },
    {
        industry: "Coaching & Education",
        idea: "Student app with AI doubt-solver",
        desc: "A branded mobile app for classes, notes and fees, with an assistant that answers student doubts from your own material."
    }
];
