'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import AnimatedFAQ from '@/components/AnimatedFAQ';
import AnimatedMetrics from '@/components/AnimatedMetrics';
import ComparisonTable from '@/components/ComparisonTable';
import { ContactModal } from '@/components/ContactModal';
import FeatureShowcase from '@/components/FeatureShowcase';
import IntegrationTimeline from '@/components/IntegrationTimeline';
import InteractiveDemo from '@/components/InteractiveDemo';
import LanguageBubblesDemoScene from '@/components/LanguageBubblesDemoScene';
import ParallaxFeature from '@/components/ParallaxFeature';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import VideoShowcase from '@/components/VideoShowcase';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent } from '@/registry/new-york-v4/ui/card';
import { Separator } from '@/registry/new-york-v4/ui/separator';

import { AnimatePresence, Variants, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, XCircle } from 'lucide-react';

// Create a Badge component since it's not available
const Badge = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}>
            {children}
        </span>
    );
};

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

// Language Bubble Component - Refined for better performance and aesthetics
const LanguageBubble = ({ bubble }: { bubble: LanguageBubbleProps }) => {
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
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(8px)' }}
            animate={{
                opacity: 0.8,
                scale: 1,
                filter: 'blur(0px)',
                y: prefersReducedMotion ? 0 : [0, -10, 0]
            }}
            transition={{
                opacity: { duration: 0.8, delay: bubble.delay },
                scale: { duration: 1, delay: bubble.delay, ease: 'easeOut' },
                filter: { duration: 1.2, delay: bubble.delay + 0.2 },
                y: {
                    duration: prefersReducedMotion ? 0 : 6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: bubble.delay + 1
                }
            }}
            whileHover={{
                scale: prefersReducedMotion ? 1 : 1.1,
                opacity: 1,
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                filter: 'blur(0px)',
                transition: { duration: 0.3 }
            }}
            aria-hidden='true' // Accessibility - decorative only
        >
            {bubble.text}
        </motion.div>
    );
};

// Create a curated set of language bubbles with purpose
const createBubbles = (): LanguageBubbleProps[] => {
    // Carefully selected phrases in 5 languages, relevant to the product
    const bubbles: LanguageBubbleProps[] = [
        {
            id: 'tr1',
            text: 'Merhaba',
            size: 100,
            x: '15%',
            y: '30%',
            color: 'rgba(59, 130, 246, 0.25)',
            delay: 0.3
        },
        {
            id: 'en1',
            text: 'Hello',
            size: 120,
            x: '75%',
            y: '65%',
            color: 'rgba(59, 130, 246, 0.2)',
            delay: 0.9
        },
        {
            id: 'ar1',
            text: 'مرحبا',
            size: 90,
            x: '25%',
            y: '70%',
            color: 'rgba(59, 130, 246, 0.3)',
            delay: 1.5
        },
        {
            id: 'ru1',
            text: 'Привет',
            size: 85,
            x: '65%',
            y: '20%',
            color: 'rgba(59, 130, 246, 0.22)',
            delay: 0.6
        },
        {
            id: 'de1',
            text: 'Hallo',
            size: 110,
            x: '50%',
            y: '85%',
            color: 'rgba(59, 130, 246, 0.18)',
            delay: 1.2
        }
    ];

    // For mobile, return fewer bubbles
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return isMobile ? bubbles.slice(0, 3) : bubbles;
};

// Animation Variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Stagger children animations
            delayChildren: 0.3 // Wait a bit before starting children
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

const taglineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.5, // Delay the tagline slightly after container appears
            staggerChildren: 0.08 // Stagger characters
        }
    }
};

const characterVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] } // Custom cubic bezier for smooth pop
    }
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

export default function LandingPage() {
    const [transform, setTransform] = useState({ x: 0, y: 0 });
    const logoContainerRef = useRef<HTMLDivElement>(null);
    const heroSectionRef = useRef<HTMLElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState<Particle[]>([]);
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if the device is mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initialize
        checkMobile();

        // Create background particles - none for mobile
        setParticles(createParticles(isMobile ? 0 : 30));

        // Handle resize events
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [isMobile]);

    // Generate bubbles (memoized to avoid re-creation on each render)
    const [bubbles, setBubbles] = useState<LanguageBubbleProps[]>([]);

    useEffect(() => {
        // Only create bubbles for desktop
        setBubbles(isMobile ? [] : createBubbles());

        // Regenerate bubbles when window is resized
        const handleResize = () => {
            const isCurrentlyMobile = window.innerWidth < 768;
            setBubbles(isCurrentlyMobile ? [] : createBubbles());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]);

    // Split the second tagline for character animation
    const tagline2 = 'EMA sizi anlasın.';
    const taglineChars = tagline2.split('');

    // More performant simple bubble for mobile
    const SimpleBubble = ({ bubble }: { bubble: LanguageBubbleProps }) => {
        return (
            <div
                className='absolute flex items-center justify-center rounded-full font-medium text-white shadow-lg'
                style={{
                    width: bubble.size,
                    height: bubble.size,
                    backgroundColor: bubble.color,
                    left: bubble.x,
                    top: bubble.y,
                    fontSize: bubble.size * 0.33,
                    textAlign: 'center',
                    opacity: 0.8
                }}
                aria-hidden='true'>
                {bubble.text}
            </div>
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
                        ease: 'easeInOut',
                        delay: bubble.delay + 1
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

    return (
        <main className='flex flex-col items-center'>
            {/* ContactModal - available globally for all CTA buttons */}
            <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />

            {/* Hero Section - Mobile-optimized with cleaner background */}
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
                                <div className='mb-1'>
                                    <div className='text-white'>Konuşun,</div>
                                </div>
                                <div className='text-blue-400'>EMA sizi anlasın.</div>
                            </div>

                            {/* Description text */}
                            <p className='mb-8 max-w-xl text-center text-lg text-slate-300'>
                                Mağazada sorular canlı, cevaplar da öyle olsun. Sesi ve dili anlayan, insan gibi yanıt
                                veren asistanınız.
                            </p>

                            {/* CTA button */}
                            <Button
                                size='lg'
                                onClick={() => setContactModalOpen(true)}
                                className='w-full rounded-full bg-blue-500 py-6 text-base font-medium'>
                                Pilot Kuruluma Başvur
                            </Button>
                        </div>
                    ) : (
                        // Desktop layout - with higher logo position
                        <div className='grid grid-cols-1 items-center gap-8 md:grid-cols-12'>
                            {/* Text content on left side */}
                            <div className='order-1 md:col-span-7'>
                                <h1 className='font-playfair mb-6 text-4xl leading-[1.1] font-bold tracking-tighter md:mb-6 md:text-7xl lg:text-8xl'>
                                    <span className='block text-shadow-lg'>Konuşun,</span>
                                    <span className='animate-gradient-shift mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent'>
                                        EMA sizi anlasın.
                                    </span>
                                </h1>

                                <p className='font-inter max-w-2xl text-xl leading-relaxed font-light text-slate-300 md:text-2xl'>
                                    Mağazada sorular canlı, cevaplar da öyle olsun. Sesi ve dili anlayan, insan gibi
                                    yanıt veren asistanınız.
                                </p>

                                <div className='mt-8'>
                                    <Button
                                        size='lg'
                                        onClick={() => setContactModalOpen(true)}
                                        className='font-montserrat rounded-full bg-blue-500 px-6 py-5 text-base text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-600 hover:shadow-blue-500/50 sm:px-8 sm:py-6 sm:text-lg'>
                                        Pilot Kuruluma Başvur
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
                    )}
                </div>
            </section>

            {/* Problem Section */}
            <section className='flex min-h-screen w-full items-center justify-center bg-slate-900 py-16 text-white md:py-24'>
                <div className='container px-5 md:px-8'>
                    <div className='mx-auto max-w-4xl'>
                        <h2 className='font-playfair mx-auto mb-10 max-w-4xl text-4xl leading-[1.1] font-bold tracking-tighter sm:text-5xl md:mb-16 md:text-7xl'>
                            Müşteriler arıyor, <span className='text-red-400'>dokunmatik ekranlar</span> yetmiyor.
                        </h2>

                        <div className='mb-10 grid grid-cols-1 gap-6 md:mb-16 md:grid-cols-3 md:gap-8'>
                            {[
                                'Yazmakla uğraşmak istemeyen müşteriler...',
                                'Kalabalıkta sesini duyuramayan satış ekibi...',
                                'Farklı diller, sınırlı zaman...'
                            ].map((problem, index) => (
                                <Card
                                    key={index}
                                    className='group border-slate-700 bg-slate-800 transition-all hover:border-blue-500/50'>
                                    <CardContent className='p-4 sm:p-6'>
                                        <div className='mb-4 transform text-red-400 transition-transform group-hover:scale-110'>
                                            <XCircle className='h-7 w-7 sm:h-8 sm:w-8' />
                                        </div>
                                        <p className='font-inter text-base text-slate-300 sm:text-lg'>{problem}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className='relative rounded-xl border border-slate-700 bg-gradient-to-r from-slate-800 to-slate-800/50 px-6 py-8 sm:px-8 sm:py-10'>
                            <div className='absolute top-1/2 -left-3 -translate-y-1/2 text-4xl text-slate-700 sm:text-5xl'>
                                "
                            </div>
                            <p className='font-playfair text-center text-xl text-slate-300 italic sm:text-2xl md:text-3xl'>
                                Teknoloji konuştuğumu anlayamıyorsa, kimin için var?
                            </p>
                            <div className='absolute -right-3 bottom-5 text-4xl text-slate-700 sm:text-5xl'>"</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION: Interactive Language Demo Scene */}
            <section className='flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 py-16 text-white md:py-24'>
                <div className='container px-5 md:px-8'>
                    <div className='mx-auto mb-10 max-w-5xl text-center md:mb-16'>
                        <h2 className='font-playfair mb-4 text-4xl leading-[1.1] font-bold tracking-tighter sm:mb-6 sm:text-5xl md:text-7xl'>
                            Dillerarası{' '}
                            <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>
                                Etkileşim
                            </span>{' '}
                            Deneyimi
                        </h2>
                        <p className='font-inter mx-auto max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl'>
                            EMA'nın farklı dillerdeki kelimeleri algılama yeteneğini interaktif olarak keşfedin.
                        </p>
                    </div>

                    <LanguageBubblesDemoScene />
                </div>
            </section>

            {/* Guide Section */}
            <section className='flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 py-16 text-white md:py-24'>
                <div className='container px-5 md:px-8'>
                    <div className='mx-auto mb-10 max-w-5xl text-center md:mb-16'>
                        <h2 className='font-playfair mb-4 text-4xl leading-[1.1] font-bold tracking-tighter sm:mb-6 sm:text-5xl md:text-7xl'>
                            Konuşan, dinleyen,{' '}
                            <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>
                                anlayan
                            </span>{' '}
                            asistan.
                        </h2>
                        <p className='font-inter mx-auto max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl'>
                            EMA, her müşterinin ihtiyacını doğal bir diyalogla karşılar.
                        </p>
                    </div>

                    <div className='mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:mb-12 md:grid-cols-3'>
                        {[
                            {
                                title: '5 Dil',
                                description: 'Türkçe, İngilizce, Arapça, Rusça, Almanca',
                                icon: '🌐'
                            },
                            {
                                title: 'Doğal Konuşma',
                                description: 'Yazma yok, dokunma yok. Sadece konuşun.',
                                icon: '🗣️'
                            },
                            {
                                title: 'Bağlamsal Zekâ',
                                description: 'Tutarlı cevaplar, akıllı öneriler, öğrenen sistem.',
                                icon: '🧠'
                            }
                        ].map((feature, index) => (
                            <Card
                                key={index}
                                className='group overflow-hidden border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 transition-all hover:border-blue-500/50'>
                                <CardContent className='relative p-6 sm:p-8'>
                                    <div className='absolute top-0 right-0 -mt-10 -mr-10 h-20 w-20 rounded-full bg-blue-500/10 transition-colors group-hover:bg-blue-500/20 sm:h-24 sm:w-24'></div>
                                    <div className='mb-4 text-3xl sm:text-4xl'>{feature.icon}</div>
                                    <h3 className='font-montserrat mb-2 text-xl font-bold text-white sm:mb-3 sm:text-2xl'>
                                        {feature.title}
                                    </h3>
                                    <p className='font-inter text-sm text-slate-300 sm:text-base'>
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <p className='font-playfair text-center text-base text-blue-400 italic sm:text-lg'>
                        Sizi ve müşterinizi anlıyoruz.
                    </p>
                </div>
            </section>

            {/* NEW SECTION: Parallax Feature */}
            <ParallaxFeature />

            {/* Plan Section */}
            <section className='flex min-h-screen w-full items-center justify-center bg-white py-16 md:py-24'>
                <div className='container px-5 md:px-8'>
                    <div className='mx-auto max-w-5xl'>
                        <h2 className='font-playfair mb-10 text-center text-4xl leading-[1.1] font-bold tracking-tighter text-slate-900 sm:text-5xl md:mb-16 md:text-7xl'>
                            3 Kolay Adım
                        </h2>

                        <div className='relative'>
                            <div className='absolute left-1/2 hidden h-full w-1 -translate-x-1/2 bg-blue-100 md:block'></div>

                            {[
                                {
                                    step: '1',
                                    title: "EMA'yı Kurun",
                                    description: 'Dakikalar içinde aktif.'
                                },
                                {
                                    step: '2',
                                    title: 'Müşteriniz Konuşsun',
                                    description: '"Merhaba, kırmızı mont var mı?"'
                                },
                                {
                                    step: '3',
                                    title: 'Bilgiler Ekrana Gelsin',
                                    description: 'Stok, fiyat, yön tarifleri anında.'
                                }
                            ].map((step, index) => (
                                <div
                                    key={index}
                                    className='relative mb-10 flex flex-col items-center gap-4 last:mb-0 sm:mb-16 sm:gap-6 md:flex-row md:gap-12'>
                                    <div className='order-2 text-center md:order-1 md:w-1/2 md:text-right'>
                                        {index % 2 === 0 ? (
                                            <>
                                                <h3 className='font-montserrat mb-1 text-xl font-bold text-slate-900 sm:mb-2 sm:text-2xl'>
                                                    {step.title}
                                                </h3>
                                                <p className='font-inter text-sm leading-relaxed text-slate-600 sm:text-base'>
                                                    {step.description}
                                                </p>
                                            </>
                                        ) : (
                                            <div className='md:h-24'></div>
                                        )}
                                    </div>

                                    <div className='z-10 order-1 flex items-center justify-center md:order-2'>
                                        <div className='font-montserrat flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-xl font-bold text-white shadow-lg sm:h-16 sm:w-16 sm:text-2xl'>
                                            {step.step}
                                        </div>
                                    </div>

                                    <div className='order-3 text-center md:w-1/2 md:text-left'>
                                        {index % 2 === 1 ? (
                                            <>
                                                <h3 className='font-montserrat mb-1 text-xl font-bold text-slate-900 sm:mb-2 sm:text-2xl'>
                                                    {step.title}
                                                </h3>
                                                <p className='font-inter text-sm leading-relaxed text-slate-600 sm:text-base'>
                                                    {step.description}
                                                </p>
                                            </>
                                        ) : (
                                            <div className='md:h-24'></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='mt-10 text-center sm:mt-16'>
                            <Badge className='font-montserrat rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-base text-blue-800 sm:px-6 sm:py-3 sm:text-lg'>
                                Sade kurulum, eğitim gerekmez.
                            </Badge>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION: Video Showcase */}
            <section className='w-full bg-gradient-to-b from-slate-100 to-white py-14 sm:py-20'>
                <div className='container mx-auto px-5 md:px-8'>
                    <div className='mb-8 text-center sm:mb-12'>
                        <h2 className='font-playfair mb-3 text-3xl leading-[1.1] font-bold tracking-tighter text-slate-900 sm:mb-4 sm:text-4xl md:text-6xl'>
                            EMA Nasıl Çalışır?
                        </h2>
                        <p className='font-inter mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg'>
                            Gelişmiş yapay zeka asistanımızın müşterilerle doğal dilde nasıl etkileşim kurduğunu görmek
                            için videoyu izleyin.
                        </p>
                    </div>

                    <VideoShowcase
                        title='EMA Yapay Zeka Asistanı'
                        description='5 dilde müşterilerle doğal konuşma akışında iletişim kurar'
                        videoSrc='/videos/ema-demo.mp4'
                        posterSrc='/videos/ema-poster.jpg'
                    />
                </div>
            </section>

            {/* Add animated metrics section */}
            <section className='w-full bg-white py-12 sm:py-16'>
                <div className='container mx-auto px-5 md:px-8'>
                    <div className='mb-8 text-center sm:mb-12'>
                        <h2 className='font-playfair mb-3 text-3xl leading-[1.1] font-bold tracking-tighter text-slate-900 sm:mb-4 sm:text-4xl md:text-6xl'>
                            Rakamlarla EMA
                        </h2>
                        <p className='font-inter mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg'>
                            Her geçen gün daha fazla mağaza ve müşteriye hizmet veriyoruz
                        </p>
                    </div>

                    <AnimatedMetrics />
                </div>
            </section>

            {/* Integration timeline section */}
            <section className='w-full bg-slate-50 py-16'>
                <IntegrationTimeline />
            </section>

            {/* Enhanced testimonials section */}
            <section className='w-full bg-white py-14 sm:py-20'>
                <div className='container mx-auto px-5 md:px-8'>
                    <div className='mb-8 text-center sm:mb-12'>
                        <h2 className='font-playfair mb-3 text-3xl leading-[1.1] font-bold tracking-tighter text-slate-900 sm:mb-4 sm:text-4xl md:text-6xl'>
                            Müşterilerimiz Ne Diyor?
                        </h2>
                        <p className='font-inter mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg'>
                            EMA'yı mağazalarında kullanan iş ortaklarımızın deneyimleri
                        </p>
                    </div>

                    <TestimonialCarousel />
                </div>
            </section>

            {/* NEW SECTION: Feature Showcase */}
            <section className='flex min-h-screen w-full items-center justify-center bg-slate-100 py-24'>
                <div className='container px-4'>
                    <FeatureShowcase />
                </div>
            </section>

            {/* Loss Section */}
            <section className='flex min-h-screen w-full items-center justify-center bg-slate-900 py-16 text-white md:py-24'>
                <div className='container px-5 md:px-8'>
                    <div className='mx-auto max-w-4xl'>
                        <h2 className='font-playfair mb-10 text-center text-4xl leading-[1.1] font-bold tracking-tighter sm:text-5xl md:mb-16 md:text-7xl'>
                            Olmazsa <span className='text-red-400'>Ne Olur?</span>
                        </h2>

                        <div className='mb-10 space-y-6 sm:space-y-10 md:mb-16'>
                            {[
                                'Müşteri ürünü bulamadan mağazayı terk eder.',
                                'Yabancı müşteriyle iletişim kopar.',
                                'Satış potansiyeli boşa gider.'
                            ].map((loss, index) => (
                                <div
                                    key={index}
                                    className='flex items-start gap-4 rounded-xl border border-red-900/30 bg-gradient-to-r from-red-900/30 to-slate-800 p-4 sm:gap-6 sm:p-6'>
                                    <div className='shrink-0 text-red-500'>
                                        <XCircle className='h-6 w-6 sm:h-8 sm:w-8' />
                                    </div>
                                    <p className='font-inter text-base leading-relaxed text-slate-300 sm:text-xl'>
                                        {loss}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className='rounded-xl border border-red-900/30 bg-red-900/20 p-4 text-center sm:p-6'>
                            <p className='font-montserrat text-base text-red-300 sm:text-lg'>
                                Her kaybedilen soru, kaybedilen ciro demektir.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Section */}
            <section className='flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 py-16 text-white md:py-24'>
                <div className='container px-5 md:px-8'>
                    <div className='mx-auto max-w-5xl'>
                        <h2 className='font-playfair mb-10 text-center text-4xl leading-[1.1] font-bold tracking-tighter sm:text-5xl md:mb-16 md:text-7xl'>
                            Olursa <span className='text-emerald-400'>Ne Kazanırsınız?</span>
                        </h2>

                        <div className='mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8 md:mb-16'>
                            {[
                                'Müşteri memnun, mağaza verimli',
                                'Çalışan huzurlu, sorular azalır',
                                'Her konuşma içgörüye dönüşür',
                                'Satış artışı somutlaşır'
                            ].map((gain, index) => (
                                <Card
                                    key={index}
                                    className='group border-emerald-900/20 bg-gradient-to-br from-emerald-900/40 to-slate-800 transition-all hover:border-emerald-500/50'>
                                    <CardContent className='flex items-start gap-4 p-4 sm:gap-6 sm:p-8'>
                                        <div className='shrink-0 transform text-emerald-400 transition-transform group-hover:scale-110'>
                                            <Sparkles className='h-6 w-6 sm:h-8 sm:w-8' />
                                        </div>
                                        <p className='font-inter text-base leading-relaxed text-slate-300 sm:text-xl'>
                                            {gain}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <p className='font-playfair text-center text-base text-emerald-400 italic sm:text-lg'>
                            Teknoloji artık gerçekten yardımcı.
                        </p>
                    </div>
                </div>
            </section>

            {/* NEW SECTION: Comparison Table */}
            <section className='flex min-h-screen w-full items-center justify-center bg-slate-50 py-16 md:py-24'>
                <div className='container px-5 md:px-8'>
                    <div className='mx-auto mb-10 max-w-5xl text-center md:mb-16'>
                        <h2 className='font-playfair mb-4 text-4xl leading-[1.1] font-bold tracking-tighter text-slate-900 sm:mb-6 sm:text-5xl md:text-7xl'>
                            Çözüm{' '}
                            <span className='bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent'>
                                Karşılaştırması
                            </span>
                        </h2>
                        <p className='font-inter mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-xl'>
                            EMA'nın geleneksel yöntemlere göre sunduğu avantajları keşfedin.
                        </p>
                    </div>

                    <ComparisonTable />
                </div>
            </section>

            {/* Social Proof Section */}
            <section className='flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-slate-100 to-white py-16 md:py-24'>
                <div className='container px-5 md:px-8'>
                    <div className='mx-auto max-w-5xl'>
                        <h2 className='font-playfair mb-10 text-center text-4xl leading-[1.1] font-bold tracking-tighter text-slate-900 sm:text-5xl md:mb-16 md:text-7xl'>
                            Onlar Ne <span className='text-blue-600'>Diyor?</span>
                        </h2>

                        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3'>
                            {[
                                {
                                    quote: 'EMA sayesinde yabancı müşterilerle %30 daha fazla satış yaptık.',
                                    author: 'GiyimMarket',
                                    location: 'İstanbul'
                                },
                                {
                                    quote: 'Ekrana dokunmak yerine konuşmak, özellikle yaşlı müşterilerimizi rahatlattı.',
                                    author: 'Teknoshop',
                                    location: 'Ankara'
                                },
                                {
                                    quote: 'Kurulum 20 dakika sürdü, ilk gün 120 ürün sorgusu aldık.',
                                    author: 'Outlet 44',
                                    location: 'İzmir'
                                }
                            ].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className='flex h-full transform flex-col rounded-xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200 transition-transform hover:translate-y-[-5px] sm:p-8'>
                                    <div className='font-playfair mb-4 text-xl text-blue-500 sm:mb-6 sm:text-2xl'>
                                        "
                                    </div>
                                    <p className='font-inter mb-6 flex-grow text-base leading-relaxed text-slate-700 sm:mb-8 sm:text-lg'>
                                        {testimonial.quote}
                                    </p>
                                    <div>
                                        <p className='font-montserrat font-bold text-slate-900'>{testimonial.author}</p>
                                        <p className='font-inter text-slate-500'>{testimonial.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION: Animated FAQ */}
            <section className='flex min-h-screen w-full items-center justify-center bg-white py-16 md:py-24'>
                <div className='container px-5 md:px-8'>
                    <div className='mx-auto mb-10 max-w-5xl text-center md:mb-16'>
                        <h2 className='font-playfair mb-4 text-4xl leading-[1.1] font-bold tracking-tighter text-slate-900 sm:mb-6 sm:text-5xl md:text-7xl'>
                            Merak{' '}
                            <span className='bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent'>
                                Ettikleriniz
                            </span>
                        </h2>
                        <p className='font-inter mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-xl'>
                            EMA hakkında sıkça sorulan soruları ve cevaplarını bulun.
                        </p>
                    </div>

                    <AnimatedFAQ />
                </div>
            </section>

            {/* CTA Section (Primary) */}
            <section className='flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#1a2333] to-[#0e0f1a] py-16 text-white md:py-24'>
                <div className='container px-5 md:px-8'>
                    <div className='mx-auto max-w-3xl text-center'>
                        <Badge className='font-montserrat mb-6 rounded-full border-amber-500/20 bg-amber-500/20 px-3 py-1 text-xs tracking-wider text-amber-300 uppercase sm:mb-8 sm:px-4 sm:text-sm'>
                            İlk 50 Mağaza
                        </Badge>

                        <h2 className='font-playfair mb-8 text-4xl leading-[1.1] font-bold tracking-tighter sm:mb-12 sm:text-5xl md:text-7xl'>
                            <span className='bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent'>
                                Fırsatı
                            </span>{' '}
                            Kaçırmayın
                        </h2>

                        <Button
                            size='lg'
                            onClick={() => setContactModalOpen(true)}
                            className='font-montserrat w-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-6 text-lg text-white shadow-lg shadow-amber-500/30 transition-all hover:translate-y-[-2px] hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-500/50 sm:w-auto sm:px-12 sm:py-8 sm:text-xl'>
                            Pilot Kuruluma Başvur
                        </Button>

                        <p className='font-inter mt-4 text-sm text-slate-400 sm:mt-6 sm:text-base'>
                            İlk 50 mağazaya özel lansman indirimi.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className='w-full bg-[#0e0f1a] py-12 text-white sm:py-16'>
                <div className='container px-5 md:px-8'>
                    <div className='mb-10 grid grid-cols-1 gap-8 sm:mb-12 sm:grid-cols-2 sm:gap-12 md:grid-cols-3'>
                        <div>
                            <div className='mb-4 sm:mb-6'>
                                <span className='font-playfair bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl'>
                                    EMA
                                </span>
                            </div>
                            <p className='font-inter max-w-xs text-sm leading-relaxed text-slate-400 sm:text-base'>
                                Teknolojiyi Konuşma Kolaylığında Sunuyoruz.
                            </p>
                        </div>

                        <div>
                            <h3 className='font-montserrat mb-3 text-base font-semibold sm:mb-4 sm:text-lg'>Yasal</h3>
                            <ul className='font-inter space-y-2 sm:space-y-3'>
                                {['KVKK', 'Gizlilik Politikası', 'Çerez Politikası'].map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href='#'
                                            className='text-sm text-slate-400 transition-colors hover:text-white sm:text-base'>
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className='font-montserrat mb-3 text-base font-semibold sm:mb-4 sm:text-lg'>
                                İletişim
                            </h3>
                            <ul className='font-inter space-y-2 sm:space-y-3'>
                                <li className='text-sm text-slate-400 sm:text-base'>info@ema.ai</li>
                                <li className='text-sm text-slate-400 sm:text-base'>+90 212 000 00 00</li>
                                <li className='flex gap-3 pt-2 sm:gap-4 sm:pt-3'>
                                    {['LinkedIn', 'Instagram', 'YouTube'].map((social, index) => (
                                        <Link
                                            key={index}
                                            href='#'
                                            className='text-sm text-slate-400 transition-colors hover:text-white sm:text-base'>
                                            {social}
                                        </Link>
                                    ))}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Separator className='mb-6 bg-slate-800 sm:mb-8' />

                    <p className='font-inter text-center text-xs text-slate-500 sm:text-sm'>
                        © 2025 EMA. Tüm hakları saklıdır.
                    </p>
                </div>
            </footer>
        </main>
    );
}
