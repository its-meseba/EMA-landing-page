import type { Metadata } from 'next';

import LandingPage from '@/components/pages/main/MainPage';

export const metadata: Metadata = {
    title: 'EMA - Konuşun, EMA sizi anlasın',
    description: 'Mağazada sorular canlı, cevaplar da öyle olsun. Teknolojiyi konuşma kolaylığında sunuyoruz.',
    keywords: ['EMA', 'konuşma', 'mağaza asistanı', 'sesli asistan', 'yapay zeka', 'AI'],
    authors: [{ name: 'EMA Team' }],
    openGraph: {
        title: 'EMA - Konuşun, EMA sizi anlasın',
        description: 'Mağazada sorular canlı, cevaplar da öyle olsun. Teknolojiyi konuşma kolaylığında sunuyoruz.',
        images: ['/branding/logo_big.png']
    },
    twitter: {
        title: 'EMA - Konuşun, EMA sizi anlasın',
        description: 'Mağazada sorular canlı, cevaplar da öyle olsun. Teknolojiyi konuşma kolaylığında sunuyoruz.',
        images: ['/branding/logo_big.png'],
        card: 'summary_large_image'
    },
    icons: {
        icon: '/branding/logo_big.png',
        apple: '/branding/logo_big.png'
    }
};

export default function Home() {
    return <LandingPage />;
}
