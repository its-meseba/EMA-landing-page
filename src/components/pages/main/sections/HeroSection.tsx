'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { Button } from '@/registry/new-york-v4/ui/button';
import { Dialog, DialogContent } from '@/registry/new-york-v4/ui/dialog';
import VideoShowcase from '@/components/VideoShowcase';

import { Variants, motion, useReducedMotion } from 'framer-motion';

// Define bubble type for type safety
interface LanguageBubbleProps {
    id: string;
    text: string;
    size: number;
    x: string;
    y: string;
    color: string;
    delay: number;
}

// Rotating Words Component
const RotatingWords = ({ words, baseColor, gradientColors = false }: {
    words?: string[],
    baseColor?: string,
    gradientColors?: boolean
} = {}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('down');
    const [isAnimating, setIsAnimating] = useState(false);

    // Define word configurations with different languages and colors
    const wordConfigs = [
        { text: 'anlasın', color: 'text-blue-400', lang: 'tr' },
        { text: 'satsın', color: 'text-emerald-400', lang: 'tr' },
        { text: 'sunsun', color: 'text-purple-400', lang: 'tr' },
        { text: 'çözsün', color: 'text-orange-400', lang: 'tr' },
        { text: 'analiz etsin', color: 'text-pink-400', lang: 'tr' },
        { text: 'yardım etsin', color: 'text-cyan-400', lang: 'tr' },
        { text: 'önersin', color: 'text-yellow-400', lang: 'tr' },
        { text: 'rehberlik etsin', color: 'text-red-400', lang: 'tr' },
        { text: 'karşılasın', color: 'text-indigo-400', lang: 'tr' },
        { text: 'desteklesin', color: 'text-green-400', lang: 'tr' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection('up');
            setIsAnimating(true);

            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % wordConfigs.length);
                setDirection('down');

                // Small delay before starting the entrance animation
                setTimeout(() => {
                    setIsAnimating(false);
                }, 50);
            }, 400); // Slightly shorter exit animation

        }, 2500); // Change word every 2.5 seconds for a more dynamic feel

        return () => clearInterval(interval);
    }, [wordConfigs.length]);

    const animationClasses = isAnimating
        ? direction === 'up'
            ? 'transform -translate-y-3 opacity-0'
            : 'transform translate-y-3 opacity-0'
        : 'transform translate-y-0 opacity-100';

    const currentWord = wordConfigs[currentIndex];

    return (
        <span className="relative inline-block">
            <span
                className={`inline-block transition-all duration-400 ease-in-out ${animationClasses} ${gradientColors
                    ? 'bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent'
                    : currentWord.color
                    }`}
                style={{ minWidth: '120px', textAlign: 'left' }}
                lang={currentWord.lang}
            >
                {currentWord.text}
            </span>
        </span>
    );
};

// Define particle type for the background
interface Particle {
    id: string;
    x: string;
    y: string;
    size: number;
    opacity: number;
    delay: number;
}

// Create subtle background particles
const createParticles = (count: number): Particle[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `particle-${i}`,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.15 + 0.05,
        delay: Math.random() * 2
    }));
};

// Particle component
const Particle = ({ particle }: { particle: Particle }) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            className='absolute transform-gpu rounded-full bg-blue-300'
            style={{
                width: particle.size,
                height: particle.size,
                left: particle.x,
                top: particle.y,
                opacity: 0
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: particle.opacity,
                scale: [0.8, 1.2, 0.8],
                y: prefersReducedMotion ? 0 : [0, -15, 0]
            }}
            transition={{
                opacity: { duration: 1.5, delay: particle.delay },
                scale: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse'
                },
                y: {
                    duration: 6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: particle.delay
                }
            }}
            aria-hidden='true'
        />
    );
};

// Interactive bubble component for desktop
const InteractiveBubble = ({ bubble }: { bubble: LanguageBubbleProps }) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            className='absolute flex transform-gpu items-center justify-center rounded-full font-medium text-white shadow-lg backdrop-blur-sm'
            style={{
                width: bubble.size,
                height: bubble.size,
                backgroundColor: bubble.color,
                left: bubble.x,
                top: bubble.y,
                fontSize: bubble.size * 0.33,
                textAlign: 'center'
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: 0.8,
                scale: 1,
                y: prefersReducedMotion ? 0 : [0, -8, 0],
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)'
            }}
            transition={{
                opacity: { duration: 0.8, delay: bubble.delay },
                scale: { duration: 1, delay: bubble.delay, ease: 'easeOut' },
                y: {
                    duration: prefersReducedMotion ? 0 : 6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }
            }}
            whileHover={{
                scale: 1.1,
                opacity: 1,
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                transition: { duration: 0.3 }
            }}
            aria-hidden='true'>
            {bubble.text}
        </motion.div>
    );
};


interface HeroSectionProps {
    isMobile: boolean;
    setContactModalOpen: (open: boolean) => void;
}

export default function HeroSection({ isMobile, setContactModalOpen }: HeroSectionProps) {
    const heroSectionRef = useRef<HTMLElement>(null);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [bubbles, setBubbles] = useState<LanguageBubbleProps[]>([]);
    const [videoDialogOpen, setVideoDialogOpen] = useState(false);

    useEffect(() => {
        setParticles(createParticles(isMobile ? 0 : 30));
    }, [isMobile]);

    return (
        <section
            ref={heroSectionRef}
            className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#0e0f1a] to-[#1a2333] py-12 text-white md:py-0'>
            {/* Background elements - only show on desktop */}
            {!isMobile && (
                <>
                    {/* Background particles for desktop */}
                    <div className='pointer-events-none absolute inset-0 z-0 overflow-hidden'>
                        {particles.map((particle) => (
                            <Particle key={particle.id} particle={particle} />
                        ))}
                    </div>

                    {/* Language Bubbles for desktop */}
                    <div className='absolute inset-0 z-1 overflow-hidden'>
                        {bubbles.map((bubble) => (
                            <InteractiveBubble key={bubble.id} bubble={bubble} />
                        ))}
                    </div>

                    {/* Gradient overlay for desktop */}
                    <div className='bg-gradient-radial absolute inset-0 z-0 from-blue-900/0 to-[#0e0f1a]/30' />

                    {/* Subtle light effect for desktop */}
                    <div className='absolute inset-0 z-0 overflow-hidden'>
                        <div className='absolute -top-[100px] -left-[100px] h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-3xl'></div>
                        <div className='absolute -right-[100px] -bottom-[100px] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl'></div>
                    </div>
                </>
            )}

            {/* Mobile-specific background with language bubbles */}
            {isMobile && (
                <div className='absolute inset-0 z-0'>
                    {/* Static language bubbles that match the shown design - REMOVED */}
                </div>
            )}

            {/* Content container */}
            <div className='relative z-30 container mt-16 flex flex-col px-5 py-12 md:py-16'>
                {isMobile ? (
                    // Mobile-specific clean layout matching screenshot
                    <div className='flex flex-col items-center'>
                        {/* EMA Logo now at the top */}
                        <div className='relative mb-8 flex items-center justify-center'>
                            <div className='absolute h-64 w-64 rounded-full bg-blue-900/40'></div>
                            <div className='relative z-10 h-48 w-48'>
                                <Image
                                    src='/branding/logo_big.png'
                                    alt='EMA Logo'
                                    fill
                                    className='object-contain'
                                    priority
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <div className='font-playfair mb-6 text-center text-4xl leading-tight font-bold tracking-tighter'>
                            <div className='mb-2 text-white'>
                                Müşteriniz konuşsun,
                            </div>
                            <div className='flex items-baseline justify-start gap-2 text-blue-400'>
                                <span>EMA</span>
                                <RotatingWords />
                            </div>
                        </div>

                        {/* Description text */}
                        <p className='mb-8 max-w-xl text-center text-lg text-slate-300'>
                            Müşteriniz ihtiyacını istediği dilde söylesin, ürünlerinizden en uygun olanları EMA
                            göstersin.
                        </p>

                        {/* CTA button */}
                        <Button
                            size='lg'
                            onClick={() => setContactModalOpen(true)}
                            className='w-full rounded-full bg-blue-500 py-6 text-base font-medium'>
                            Pilot Kuruluma Başvur
                        </Button>

                        {/* Mobile Video Thumbnail */}
                        <div className='mt-12 w-full'>
                            <div className='relative w-full' style={{ paddingTop: '58.23%' }}>
                                <iframe
                                    src='https://player.vimeo.com/video/1088087618?h=056b598bef&badge=0&autopause=0&player_id=0&app_id=58479'
                                    frameBorder='0'
                                    allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media'
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '1rem'
                                    }}
                                    title='EMA Tanıtım Videosu'
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    // Desktop layout - with higher logo position
                    <div className='space-y-16'>
                        <div className='grid grid-cols-1 items-center gap-8 md:grid-cols-12'>
                            {/* Text content on left side */}
                            <div className='order-1 md:col-span-7'>
                                <h1 className='font-playfair mb-6 text-4xl leading-[1.1] font-bold tracking-tighter md:mb-6 md:text-7xl lg:text-8xl'>
                                    <span className='block text-shadow-lg'>Müşteriniz konuşsun,</span>
                                    <span className='animate-gradient-shift mt-2 flex items-baseline bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent'>
                                        <span className="mr-1 md:mr-2 lg:mr-3">EMA</span>
                                        <RotatingWords />
                                    </span>
                                </h1>

                                <p className='font-inter max-w-2xl text-xl leading-relaxed font-light text-slate-300 md:text-2xl'>
                                    Müşteriniz ihtiyacını istediği dilde söylesin, ürünlerinizden en uygun olanları
                                    EMA göstersin.
                                </p>

                                <div className='mt-8'>
                                    <Button
                                        size='lg'
                                        onClick={() => setContactModalOpen(true)}
                                        className='font-montserrat rounded-full bg-blue-500 px-6 py-5 text-base text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-600 hover:shadow-blue-500/50 sm:px-8 sm:py-6 sm:text-lg'>
                                        Pilot Kurulumu İçin Başvurun
                                    </Button>
                                </div>
                            </div>

                            {/* Logo positioned higher on right side (eye level) */}
                            <div className='order-2 flex justify-center md:col-span-5 md:justify-end'>
                                <div className='relative -mt-12 h-[300px] w-[300px] md:-mt-24 lg:-mt-32'>
                                    <div className='absolute inset-0 rounded-full bg-blue-500/10 blur-3xl'></div>
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <div className='flex h-72 w-72 items-center justify-center rounded-full bg-blue-600/20 p-4'>
                                            <Image
                                                src='/branding/logo_big.png'
                                                alt='EMA Logo'
                                                fill
                                                sizes='(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 384px'
                                                className='object-contain'
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Video Section - Integrated into Hero */}
                        <div className='mx-auto mt-16 max-w-4xl'>
                            <div className='relative w-full' style={{ paddingTop: '58.23%' }}>
                                <iframe
                                    src='https://player.vimeo.com/video/1088087618?h=056b598bef&badge=0&autopause=0&player_id=0&app_id=58479'
                                    frameBorder='0'
                                    allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media'
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '1.5rem'
                                    }}
                                    title='EMA Tanıtım Videosu'
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Video Dialog */}
            <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
                <DialogContent className='flex w-full max-w-3xl items-center justify-center bg-transparent p-0 shadow-none'>
                    <div className='w-full'>
                        <VideoShowcase
                            title='EMA Tanıtım Videosu'
                            description="EMA'nın mağaza içi deneyimini ve doğal konuşma özelliklerini kısa videoda izleyin."
                            videoSrc='/videos/ema-demo.mp4'
                            posterSrc='/videos/ema-poster.jpg'
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
} 