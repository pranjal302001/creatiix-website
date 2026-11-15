import { usePageMeta } from '../lib/usePageMeta';
import React from 'react';
import Hero from '../components/Hero';
import SocialProofBar from '../components/SocialProofBar';
import ServicesGrid from '../components/ServicesGrid';
import AboutUs from '../components/AboutUs';
import Founder from '../components/Founder';
import Portfolio from '../components/Portfolio';
import Philosophy from '../components/Philosophy';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
    usePageMeta(null, "CREATIIX builds AI chatbots, AI automation and agents, websites and mobile apps, backed by the design and marketing that makes them sell.");
    return (
        // A real wrapper element (not a fragment): GSAP re-parents pinned sections,
        // and React can only remove this page cleanly if its own root stays in place.
        <div>
            <Hero />
            <SocialProofBar />
            <ServicesGrid />
            <AboutUs />
            <Founder />
            <Philosophy />
            <Process />
            <Portfolio />
            <Testimonials />
            <FAQ />
            <FinalCTA />
        </div>
    );
}
