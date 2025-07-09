'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/registry/new-york-v4/ui/button";
import EmaFullScreenSection from '@/components/EmaFullScreenSection';
import EmaModal from '@/components/EmaModal';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Badge } from "@/registry/new-york-v4/ui/badge";
import { Label } from '@/registry/new-york-v4/ui/label';
import { ExternalLink, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WordPressButtonPreview = ({ bubbleText }: { bubbleText: string }) => {
    return (
        <div className="relative flex items-center gap-2 sm:gap-3 transition-all duration-200 scale-75 md:scale-100">
            <div className="bg-white rounded-full px-3 py-2 sm:px-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
                <p className="text-gray-700 font-medium text-xs sm:text-sm md:text-base whitespace-nowrap">
                    {bubbleText}
                </p>
            </div>
            <Button
                onClick={(e) => e.preventDefault()} // It's just a preview
                className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 hover:scale-110 active:scale-95 md:h-24 md:w-24 animate-subtle-pulse hover:animate-none text-white"
                aria-label="EMA Preview"
            >
                <Image
                    src="/branding/ema_logo.png"
                    width={140}
                    height={140}
                    alt="EMA"
                    className="object-contain"
                />
                <span className="absolute top-1 right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </Button>
        </div>
    );
};

const IntegrationSection = () => {
    const { t, language } = useLanguage();
    const showcaseUrl = "https://live.ema.solace.com.tr/greyder";

    const [modalOpen, setModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [hasPlayedGreeting, setHasPlayedGreeting] = useState(false);

    const fullScreenHeaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasPlayedGreeting) {
                    const audio = new Audio(`/audio/greetings/common/${language}/greeting.mp3`);
                    audio.play().catch(error => {
                        console.error("Greeting audio autoplay failed:", error);
                    });
                    setHasPlayedGreeting(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        const currentRef = fullScreenHeaderRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [language, hasPlayedGreeting]);

    const handleCopy = () => {
        navigator.clipboard.writeText(showcaseUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

    const integrationOptions = [
        {
            key: 'npmPackage',
            icon: <Image src="/branding/brands/npm.png" alt="NPM logo" width={40} height={40} className="object-contain" />,
            title: t('integrationSection.npmPackage.title') as string,
            description: t('integrationSection.npmPackage.description') as string,
            component: (
                <div className="mt-4 flex flex-col items-center">
                    <p className="text-sm text-muted-foreground mb-4">{t('integrationSection.npmPackageCta') as string}</p>
                    <Button
                        onClick={() => setModalOpen(true)}
                        className="relative flex h-24 w-24 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 hover:scale-110 active:scale-95 animate-subtle-pulse hover:animate-none text-white"
                        aria-label="EMA - Ne arıyorsan, konuş yeter"
                    >
                        <Image
                            src="/branding/ema_logo.png"
                            width={120}
                            height={120}
                            alt="EMA"
                            className="object-contain"
                        />
                        <span className="absolute top-1 right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                    </Button>
                    <EmaModal
                        emaUrl={showcaseUrl}
                        themeColor="#0066ff"
                        open={modalOpen}
                        onOpenChange={setModalOpen}
                    />
                </div>
            )
        },
        {
            key: 'wordpress',
            icon: <Image src="/branding/brands/wordpress.webp" alt="WordPress logo" width={40} height={40} className="object-contain" />,
            title: t('integrationSection.wordpress.title') as string,
            description: t('integrationSection.wordpress.description') as string,
            component: <WordPressButtonPreview bubbleText={t('integrationSection.wordpressBubbleText') as string} />
        },
        {
            key: 'shopify',
            icon: <Image src="/branding/brands/shopify.png" alt="Shopify logo" width={32} height={32} className="object-contain" />,
            title: t('integrationSection.shopify.title') as string,
            description: t('integrationSection.shopify.description') as string,
            component: <div className="flex h-full items-center justify-center"><Badge variant="outline">{t('integrationSection.comingSoon') as string}</Badge></div>
        },
        {
            key: 'ikas',
            icon: <Image src="/branding/brands/ikas.png" alt="Ikas logo" width={40} height={40} className="object-contain" />,
            title: t('integrationSection.ikas.title') as string,
            description: t('integrationSection.ikas.description') as string,
            component: <div className="flex h-full items-center justify-center"><Badge variant="outline">{t('integrationSection.comingSoon') as string}</Badge></div>
        },
        {
            key: 'directLink',
            icon: <ExternalLink className="h-8 w-8 text-primary" />,
            title: t('integrationSection.directLink.title') as string,
            description: t('integrationSection.directLink.description') as string,
            component: (
                <div className="mt-4 text-center w-full">
                    <div className="p-2 bg-muted rounded-md mb-4">
                        <p className="text-sm text-muted-foreground break-all">{showcaseUrl}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center mb-4">
                        <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200">
                            <a href={showcaseUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                {t('integrationSection.directLink.openLink') as string}
                            </a>
                        </Button>
                        <Button variant="outline" onClick={handleCopy} className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200">
                            {copied ? (
                                <Check className="mr-2 h-4 w-4 text-green-500" />
                            ) : (
                                <Copy className="mr-2 h-4 w-4" />
                            )}
                            {copied ? (t('integrationSection.directLink.copied') as string) : (t('integrationSection.directLink.copyLink') as string)}
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {t('integrationSection.directLink.explanation') as string}
                    </p>
                </div>
            )
        },
    ];


    return (
        <>
            <section className="w-full py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="relative text-center mb-12">
                        {/* Subtle floating icons */}
                        <div className="absolute left-4 top-4 w-6 h-6 text-blue-400/20 animate-float">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                        <div className="absolute right-8 top-8 w-4 h-4 text-blue-400/20 animate-float-delayed">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                        </div>
                        <div className="absolute left-8 bottom-4 w-5 h-5 text-blue-400/20 animate-float-slow">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                            </svg>
                        </div>

                        <h2 className="font-playfair mb-4 text-4xl leading-[1.1] font-bold tracking-tighter text-slate-900 sm:mb-6 sm:text-5xl md:text-7xl">
                            {t('integrationSection.title') as string}{' '}
                            <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent animate-gradient-shift">
                                {t('integrationSection.titleHighlight') as string}
                            </span>{' '}
                            {t('integrationSection.titleSuffix') as string}
                        </h2>

                        <p className="font-inter mx-auto max-w-3xl text-base leading-relaxed text-slate-600 sm:text-xl">
                            {t('integrationSection.description') as string}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {integrationOptions.map((option) => (
                            <Card key={option.key} className="group flex flex-col h-full hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] border-0 bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-slate-800">
                                <CardHeader className="flex flex-col items-center text-center">
                                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-lg mb-4 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 border border-blue-100/50">
                                        {/* Glow effect */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>

                                        {/* Enhanced icon container */}
                                        <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                                            {option.icon}
                                        </div>

                                        {/* Shimmer effect */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                                    </div>
                                    <CardTitle className="group-hover:text-blue-600 transition-colors duration-300">{option.title}</CardTitle>
                                    <CardDescription className="group-hover:text-slate-600 transition-colors duration-300">{option.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col items-center justify-center p-6">
                                    {option.component}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <div ref={fullScreenHeaderRef} className="w-full py-16 md:py-24 bg-muted/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-playfair mb-4 text-4xl leading-[1.1] font-bold tracking-tighter text-slate-900 sm:mb-6 sm:text-5xl md:text-7xl">
                        {t('integrationSection.fullScreenTitle') as string}{' '}
                        <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent animate-gradient-shift">
                            {t('integrationSection.fullScreenTitleHighlight') as string}
                        </span>{' '}
                        {t('integrationSection.fullScreenTitleSuffix') as string}
                    </h2>
                    <p className="font-inter mx-auto max-w-3xl text-base leading-relaxed text-slate-600 sm:text-xl">
                        {t('integrationSection.fullScreenSubtitle') as string}
                    </p>
                </div>
            </div>

            <EmaFullScreenSection
                emaUrl={showcaseUrl}
                loadingText={t('integrationSection.fullScreenLoading') as string}
            />
        </>
    );
}

export default IntegrationSection;
