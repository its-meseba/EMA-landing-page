import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LanguageProvider } from '@/contexts/LanguageContext';
import MainPage from '@/components/pages/main/MainPage';

// Define supported languages
const supportedLanguages = ['tr', 'en', 'fr'] as const;
type SupportedLanguage = typeof supportedLanguages[number];

interface PageProps {
    params: Promise<{
        lang: string;
    }>;
}

export async function generateStaticParams() {
    return supportedLanguages.map((lang) => ({
        lang: lang,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const language = lang as SupportedLanguage;

    const titles = {
        tr: 'EMA - Konuşun, EMA sizi anlasın',
        en: 'EMA - Speak, EMA understands you',
        fr: 'EMA - Parlez, EMA vous comprend'
    };

    const descriptions = {
        tr: 'Mağazada sorular canlı, cevaplar da öyle olsun. Teknolojiyi konuşma kolaylığında sunuyoruz.',
        en: 'Let questions in the store be lively, and so should the answers. We deliver technology with the ease of conversation.',
        fr: 'Que les questions en magasin soient vivantes, et que les réponses le soient aussi. Nous livrons la technologie avec la facilité de la conversation.'
    };

    return {
        title: titles[language] || titles.tr,
        description: descriptions[language] || descriptions.tr,
        openGraph: {
            title: titles[language] || titles.tr,
            description: descriptions[language] || descriptions.tr,
            images: ['/branding/logo_big.png']
        },
        twitter: {
            title: titles[language] || titles.tr,
            description: descriptions[language] || descriptions.tr,
            images: ['/branding/logo_big.png'],
            card: 'summary_large_image'
        },
    };
}

export default async function LocalizedPage({ params }: PageProps) {
    const { lang } = await params;

    // Validate language
    if (!supportedLanguages.includes(lang as SupportedLanguage)) {
        notFound();
    }

    return <MainPage />;
} 