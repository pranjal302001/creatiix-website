import React from 'react';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Portfolio from '../components/Portfolio';
import SocialProofBar from '../components/SocialProofBar';
import Philosophy from '../components/Philosophy';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';
import Testimonials from '../components/Testimonials';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
    return (
        <>
            <Hero />
            <AboutUs />
            <Portfolio />
            <SocialProofBar />
            <Philosophy />
            <Features />
            <HowItWorks />
            <FAQ />
            <Testimonials />
            <FinalCTA />
        </>
    );
}
