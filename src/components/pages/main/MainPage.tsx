'use client';

import { useEffect, useState } from 'react';

import { ContactModal } from '@/components/ContactModal';
import CtaSection from './sections/CtaSection';
import ComparisonSection from './sections/ComparisonSection';
import FaqSection from './sections/FaqSection';
import FeatureShowcaseSection from './sections/FeatureShowcaseSection';
import FooterSection from './sections/FooterSection';
import GuideSection from './sections/GuideSection';
import HeroSection from './sections/HeroSection';
import LossSection from './sections/LossSection';
import PartnersSection from './sections/PartnersSection';
import PlanSection from './sections/PlanSection';
import ProblemSection from './sections/ProblemSection';
import SuccessSection from './sections/SuccessSection';
import IntegrationSection from './sections/IntegrationSection';

export default function MainPage() {
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <main className='flex flex-col items-center'>
            <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
            <HeroSection isMobile={isMobile} setContactModalOpen={setContactModalOpen} />
            <ProblemSection />
            <GuideSection />
            {/* <LossSection setContactModalOpen={setContactModalOpen} /> */}
            {/* <SuccessSection setContactModalOpen={setContactModalOpen} /> */}
            <PlanSection />
            <PartnersSection />
            <FeatureShowcaseSection />
            <IntegrationSection />
            <ComparisonSection />
            <FaqSection setContactModalOpen={setContactModalOpen} />
            <CtaSection setContactModalOpen={setContactModalOpen} />
            <FooterSection />
        </main>
    );
}
