'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

// Define sample phrases in multiple languages with translations
const languagePhrases = [
    { text: 'Merhaba', language: 'tr', translation: 'Hello', color: 'rgba(59, 130, 246, 0.85)' },
    { text: 'Hello', language: 'en', translation: 'Merhaba', color: 'rgba(99, 102, 241, 0.85)' },
    { text: 'مرحبا', language: 'ar', translation: 'Hello', color: 'rgba(139, 92, 246, 0.85)' },
    { text: 'Привет', language: 'ru', translation: 'Hello', color: 'rgba(236, 72, 153, 0.85)' },
    { text: 'Hallo', language: 'de', translation: 'Hello', color: 'rgba(16, 185, 129, 0.85)' },

    { text: 'Yardım', language: 'tr', translation: 'Help', color: 'rgba(59, 130, 246, 0.85)' },
    { text: 'Help', language: 'en', translation: 'Yardım', color: 'rgba(99, 102, 241, 0.85)' },
    { text: 'مساعدة', language: 'ar', translation: 'Help', color: 'rgba(139, 92, 246, 0.85)' },
    { text: 'Помощь', language: 'ru', translation: 'Help', color: 'rgba(236, 72, 153, 0.85)' },
    { text: 'Hilfe', language: 'de', translation: 'Help', color: 'rgba(16, 185, 129, 0.85)' },

    { text: 'Ürünler', language: 'tr', translation: 'Products', color: 'rgba(59, 130, 246, 0.85)' },
    { text: 'Products', language: 'en', translation: 'Ürünler', color: 'rgba(99, 102, 241, 0.85)' },
    { text: 'منتجات', language: 'ar', translation: 'Products', color: 'rgba(139, 92, 246, 0.85)' },
    { text: 'Продукты', language: 'ru', translation: 'Products', color: 'rgba(236, 72, 153, 0.85)' },
    { text: 'Produkte', language: 'de', translation: 'Products', color: 'rgba(16, 185, 129, 0.85)' }
];

// Flag images for languages
const languageFlags = {
    tr: '/flags/turkey.svg',
    en: '/flags/uk.svg',
    ar: '/flags/saudi-arabia.svg',
    ru: '/flags/russia.svg',
    de: '/flags/germany.svg'
};

// Language names for display
const languageNames = {
    tr: 'Türkçe',
    en: 'English',
    ar: 'العربية',
    ru: 'Русский',
    de: 'Deutsch'
};

interface PhraseWithPosition {
    id: string;
    text: string;
    language: string;
    translation: string;
    color: string;
    position: {
        x: number;
        y: number;
        rotation: number;
    };
    isHighlighted: boolean;
}

const LanguageBubblesDemoScene = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [phrases, setPhrases] = useState<PhraseWithPosition[]>([]);
    const [activePhraseId, setActivePhraseId] = useState<string | null>(null);
    const [recognizedCount, setRecognizedCount] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isRestarting, setIsRestarting] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const targetScale = useMotionValue(1);
    const scale = useSpring(targetScale, { damping: 15 });

    // Track container dimensions
    useEffect(() => {
        if (!containerRef.current) return;

        const updateDimensions = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
                setHeight(containerRef.current.offsetHeight);
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            }
        };

        const handleMouseEnter = () => {
            targetScale.set(1.02);
        };

        const handleMouseLeave = () => {
            targetScale.set(1);
        };

        window.addEventListener('mousemove', handleMouseMove);
        containerRef.current?.addEventListener('mouseenter', handleMouseEnter);
        containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
            containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [mouseX, mouseY, targetScale]);

    // Initialize phrases
    useEffect(() => {
        if (width === 0 || height === 0) return;

        // Select 7 random phrases from the list
        const shuffled = [...languagePhrases].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 7);

        // Position phrases in a more organized manner
        const positionedPhrases = selected.map((phrase, index) => {
            // Calculate positions in a circular pattern
            const angle = (index / selected.length) * Math.PI * 2;
            const radius = Math.min(width, height) * 0.35;

            // Add some random variation to avoid perfect circle
            const variationX = (Math.random() - 0.5) * 50;
            const variationY = (Math.random() - 0.5) * 50;

            return {
                id: `phrase-${index}`,
                text: phrase.text,
                language: phrase.language,
                translation: phrase.translation,
                color: phrase.color,
                position: {
                    x: width / 2 + Math.cos(angle) * radius + variationX,
                    y: height / 2 + Math.sin(angle) * radius + variationY,
                    rotation: Math.random() * 10 - 5
                },
                isHighlighted: false
            };
        });

        setPhrases(positionedPhrases);
        setRecognizedCount(0);
        setIsComplete(false);
    }, [width, height, isRestarting]);

    const handlePhraseClick = (id: string) => {
        // Find the clicked phrase
        const clickedPhrase = phrases.find((p) => p.id === id);
        if (!clickedPhrase || clickedPhrase.isHighlighted) return;

        // Update state
        setPhrases((prev) => prev.map((phrase) => (phrase.id === id ? { ...phrase, isHighlighted: true } : phrase)));

        setActivePhraseId(id);

        // Update count and check for completion
        const newCount = recognizedCount + 1;
        setRecognizedCount(newCount);

        if (newCount >= 5 && !isComplete) {
            setTimeout(() => {
                setIsComplete(true);
            }, 800);
        }
    };

    const resetDemo = () => {
        setIsRestarting(true);
        setActivePhraseId(null);

        setTimeout(() => {
            setIsRestarting(false);
        }, 300);
    };

    // Get active phrase details
    const activePhrase = activePhraseId ? phrases.find((p) => p.id === activePhraseId) : null;

    return (
        <div className='mx-auto w-full max-w-5xl'>
            <motion.div
                ref={containerRef}
                className='relative h-[450px] w-full overflow-hidden rounded-xl border border-slate-700/50 bg-gradient-to-b from-[#0c1429] to-[#1a2947] shadow-2xl sm:h-[500px]'
                style={{ scale }}>
                {/* Ambient background elements */}
                <div className='absolute inset-0 z-0'>
                    <div className='absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-blue-500/5 blur-3xl'></div>
                    <div className='absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-3xl'></div>
                    <div className='absolute -bottom-20 -left-20 h-[250px] w-[250px] rounded-full bg-cyan-500/5 blur-3xl'></div>
                </div>

                {/* Center console - EMA's "brain" */}
                <motion.div
                    className='absolute top-1/2 left-1/2 z-10 flex h-32 w-32 items-center justify-center rounded-full border border-blue-400/20 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-md'
                    animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: isComplete
                            ? [
                                  '0 0 20px rgba(59, 130, 246, 0.3)',
                                  '0 0 35px rgba(59, 130, 246, 0.5)',
                                  '0 0 20px rgba(59, 130, 246, 0.3)'
                              ]
                            : [
                                  '0 0 15px rgba(59, 130, 246, 0.2)',
                                  '0 0 25px rgba(59, 130, 246, 0.3)',
                                  '0 0 15px rgba(59, 130, 246, 0.2)'
                              ]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }}
                    style={{
                        transform: 'translate(-50%, -50%)'
                    }}>
                    <Image
                        src='/branding/logo.png'
                        alt='EMA'
                        width={64}
                        height={64}
                        className='object-contain opacity-80'
                    />
                </motion.div>

                {/* Phrases */}
                <AnimatePresence mode='sync'>
                    {phrases.map((phrase) => (
                        <motion.div
                            key={phrase.id}
                            className={`absolute flex transform-gpu cursor-pointer flex-col items-center justify-center rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 ${
                                phrase.isHighlighted
                                    ? 'border-white/30 bg-gradient-to-r from-blue-600/80 to-indigo-700/80 text-white shadow-blue-900/50'
                                    : 'border-slate-700/40 bg-slate-800/40 text-slate-300 hover:bg-slate-800/60 hover:text-white hover:shadow-lg'
                            } `}
                            style={{
                                width: 120,
                                height: 110,
                                left: phrase.position.x - 60, // Center the div on position
                                top: phrase.position.y - 55,
                                rotate: phrase.position.rotation
                            }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{
                                opacity: 1,
                                scale: phrase.isHighlighted ? 1.1 : 1,
                                boxShadow: phrase.isHighlighted
                                    ? '0 10px 25px rgba(30, 64, 175, 0.4)'
                                    : '0 4px 12px rgba(0, 0, 0, 0.1)'
                            }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 20
                            }}
                            onClick={() => handlePhraseClick(phrase.id)}
                            whileHover={{
                                scale: phrase.isHighlighted ? 1.1 : 1.05,
                                transition: { duration: 0.2 }
                            }}>
                            <div className='mb-1 text-lg font-medium'>{phrase.text}</div>
                            <div className='flex items-center gap-1 text-xs opacity-70'>
                                {phrase.language && (
                                    <>
                                        {languageFlags[phrase.language as keyof typeof languageFlags] && (
                                            <div className='relative h-3 w-3 overflow-hidden rounded-full'>
                                                <Image
                                                    src={languageFlags[phrase.language as keyof typeof languageFlags]}
                                                    alt={phrase.language}
                                                    width={12}
                                                    height={12}
                                                    className='object-cover'
                                                />
                                            </div>
                                        )}
                                        <span>{languageNames[phrase.language as keyof typeof languageNames]}</span>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Connection lines between recognized phrases and center */}
                <svg className='pointer-events-none absolute inset-0 z-5 h-full w-full'>
                    <defs>
                        <linearGradient id='lineGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                            <stop offset='0%' stopColor='rgba(59, 130, 246, 0.6)' />
                            <stop offset='100%' stopColor='rgba(99, 102, 241, 0.6)' />
                        </linearGradient>
                    </defs>
                    {phrases
                        .filter((p) => p.isHighlighted)
                        .map((phrase) => (
                            <motion.line
                                key={`line-${phrase.id}`}
                                x1={phrase.position.x}
                                y1={phrase.position.y}
                                x2={width / 2}
                                y2={height / 2}
                                stroke='url(#lineGradient)'
                                strokeWidth={2}
                                strokeDasharray='5,5'
                                initial={{ opacity: 0, pathLength: 0 }}
                                animate={{ opacity: 0.7, pathLength: 1 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                        ))}
                </svg>

                {/* Active phrase translation popup */}
                <AnimatePresence>
                    {activePhrase && (
                        <motion.div
                            className='absolute bottom-20 left-1/2 z-20 w-64 -translate-x-1/2 transform rounded-lg border border-white/20 bg-white/10 p-4 text-center shadow-xl backdrop-blur-xl'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ type: 'spring', damping: 20 }}>
                            <div className='mb-1 text-sm font-light text-white'>EMA Tanıdı</div>
                            <div className='mb-1 text-xl font-medium text-white'>{activePhrase.text}</div>
                            <div className='text-sm text-blue-300'>{activePhrase.translation}</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Status bar */}
                <div className='absolute right-0 bottom-0 left-0 flex items-center justify-between border-t border-slate-700/50 bg-slate-900/80 px-4 py-3 backdrop-blur-md'>
                    <div className='flex items-center gap-2'>
                        <div className='flex space-x-1'>
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className='flex h-5 w-5 items-center justify-center rounded-full'
                                    initial={{ backgroundColor: 'rgba(51, 65, 85, 0.5)' }}
                                    animate={{
                                        backgroundColor:
                                            i < recognizedCount ? 'rgba(59, 130, 246, 0.8)' : 'rgba(51, 65, 85, 0.5)',
                                        scale: i === recognizedCount - 1 ? [1, 1.2, 1] : 1
                                    }}
                                    transition={{
                                        scale: { duration: 0.5 },
                                        backgroundColor: { duration: 0.3 }
                                    }}>
                                    {i < recognizedCount && (
                                        <svg className='h-3 w-3 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                            <path
                                                fillRule='evenodd'
                                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                        <span className='text-sm text-white/70'>
                            {isComplete ? 'EMA dil algılama tamamlandı!' : `${recognizedCount}/5 kelime algılandı`}
                        </span>
                    </div>

                    <motion.button
                        onClick={resetDemo}
                        className='rounded-md bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        Yeniden Başlat
                    </motion.button>
                </div>

                {/* Success overlay */}
                <AnimatePresence>
                    {isComplete && (
                        <motion.div
                            className='absolute inset-0 z-30 flex items-center justify-center bg-blue-900/20 backdrop-blur-sm'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}>
                            <motion.div
                                className='max-w-md rounded-xl border border-white/20 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center text-white shadow-2xl'
                                initial={{ scale: 0.8, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.8, y: 20 }}
                                transition={{ type: 'spring', damping: 20, delay: 0.2 }}>
                                <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20'>
                                    <svg
                                        className='h-10 w-10 text-white'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M5 13l4 4L19 7'
                                        />
                                    </svg>
                                </div>
                                <h3 className='mb-2 text-2xl font-bold'>Mükemmel!</h3>
                                <p className='mb-4 text-white/80'>
                                    EMA farklı dillerdeki kelimeleri başarıyla algıladı ve işledi. Gerçek zamanlı dil
                                    algılama özelliği, mağazanızda tüm müşterilerinizle sorunsuz iletişim kurmanızı
                                    sağlar.
                                </p>
                                <motion.button
                                    onClick={resetDemo}
                                    className='rounded-md bg-white px-5 py-2 font-medium text-blue-700 transition-colors hover:bg-blue-50'
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}>
                                    Tekrar Deneyin
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div className='mx-auto mt-4 max-w-lg text-center text-sm text-slate-400'>
                Fare imlecini hareket ettirerek ve kelime balonlarına tıklayarak EMA'nın farklı dillerdeki kelimeleri
                nasıl algıladığını deneyimleyin.
            </div>
        </div>
    );
};

export default LanguageBubblesDemoScene;
