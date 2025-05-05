import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Playfair_Display, Inter, Montserrat } from 'next/font/google';

import { ThemeProvider } from 'next-themes';

import Navbar from '@/components/Navbar';
import '@/app/globals.css';
import { Toaster } from '@/registry/new-york-v4/ui/sonner';
import '@/styles/animations.css';

// Elegant serif font for headlines and quotes
const playfair = Playfair_Display({
    subsets: ['latin', 'latin-ext'], // Latin-ext supports Turkish characters
    variable: '--font-playfair',
    display: 'swap'
});

// Modern, clean sans-serif for body text - excellent legibility
const inter = Inter({
    subsets: ['latin', 'latin-ext'],
    variable: '--font-inter',
    display: 'swap'
});

// Elegant sans-serif for secondary headings
const montserrat = Montserrat({
    subsets: ['latin', 'latin-ext'],
    variable: '--font-montserrat',
    display: 'swap'
});

// Technical monospace font for code, if needed
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    title: 'EMA | Konuşun, EMA sizi anlasın',
    description: 'Mağazada sorular canlı, cevaplar da öyle olsun. Sesi ve dili anlayan, insan gibi yanıt veren asistanınız.',
    keywords: 'EMA, yapay zeka, mağaza asistanı, konuşma tanıma, çoklu dil desteği'
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning lang='tr'>
            <body
                className={`${playfair.variable} ${inter.variable} ${montserrat.variable} ${geistMono.variable} bg-background text-foreground overscroll-none antialiased`}>
                <ThemeProvider attribute='class'>
                    <Navbar />
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;
