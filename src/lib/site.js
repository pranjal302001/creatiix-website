// Shared site helpers: contact details, intro timing, smooth-scroll helpers.

// Public address of the live site. Used for canonical links and the sitemap.
// TODO(owner): change this if the site goes live on a different domain.
export const SITE_URL = 'https://creatiix.in';

export const CONTACT = {
    email: 'hello@creatiix.in',
    // WhatsApp only (no voice-call option on the site for now). Digits with country code, no "+".
    whatsappNumber: '917045402332',
    whatsappDisplay: '+91 70454 02332',
    instagram: 'https://www.instagram.com/creatiix.in',
    instagramHandle: '@creatiix.in',
};

// Google Analytics property that counts visits. It is loaded through Google Tag
// Manager (container GTM-WH344X3V, added at build time in vite.config.js), not
// from here. This value only switches on the statistics section of the Privacy Policy.
export const GA_ID = 'G-WGGKRMQRYG';

// Opens a WhatsApp chat with the studio, with `text` already typed in.
export const whatsappLink = (text = "Hi CREATIIX, I'd like to talk about a project.") =>
    `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;

// Blog is built but hidden for now. Set to true to show the navbar link and the /blogs pages again.
export const SHOW_BLOG = false;

// The logo intro plays once per browser session.
let firstVisit = false;
try {
    firstVisit = !sessionStorage.getItem('creatiix-intro');
} catch (e) { /* storage blocked: skip intro */ }
export const SHOW_INTRO = firstVisit;

// Entrance animations (navbar, hero) wait for the intro to lift, however it ends:
// video finished, visitor skipped it, or the fallback ran.
let introDone = !firstVisit;
const waiting = [];
export function whenIntroDone(fn) {
    if (introDone) fn();
    else waiting.push(fn);
}
export function finishIntro() {
    if (introDone) return;
    introDone = true;
    waiting.splice(0).forEach((fn) => fn());
}

export function markIntroSeen() {
    try { sessionStorage.setItem('creatiix-intro', '1'); } catch (e) { /* ignore */ }
}

// Lenis instance is registered by App so any component can scroll smoothly.
let lenis = null;
export const setLenis = (instance) => { lenis = instance; };

export function scrollToTop(immediate = true) {
    if (lenis) lenis.scrollTo(0, { immediate });
    else window.scrollTo(0, 0);
}

// The contact section is a fixed panel revealed at the very end of the page,
// so "go to contact" means "scroll to the bottom".
export function scrollToContact() {
    // On phones the contact section sits in the normal page flow.
    const el = document.getElementById('contact');
    if (el && getComputedStyle(el).position !== 'fixed') {
        if (lenis) lenis.scrollTo(el, { duration: 1.4 });
        else el.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    const bottom = document.documentElement.scrollHeight;
    if (lenis) lenis.scrollTo(bottom, { duration: 1.6 });
    else window.scrollTo({ top: bottom, behavior: 'smooth' });
}

export function scrollToId(id) {
    if (id === 'contact') return scrollToContact();
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -90, duration: 1.4 });
    else el.scrollIntoView({ behavior: 'smooth' });
}

// Every "Let's talk" button leads to the contact form.
export const goToContact = scrollToContact;
