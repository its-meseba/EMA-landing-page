'use client';
import { Button } from "@/registry/new-york-v4/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SuccessSectionProps {
    setContactModalOpen: (open: boolean) => void;
}

export default function SuccessSection({ setContactModalOpen }: SuccessSectionProps) {
    return (
        <section className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-emerald-950/10 to-slate-800 py-16 text-white md:py-24'>
            {/* Animated celebratory background elements */}
            <div className='absolute inset-0'>
                {/* Gradient orbs */}
                <div className='absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-emerald-500/20 blur-3xl'></div>
                <div className='absolute right-1/3 bottom-1/3 h-80 w-80 animate-pulse rounded-full bg-blue-500/20 blur-3xl delay-700'></div>
                <div className='absolute left-1/2 top-1/2 h-64 w-64 animate-pulse rounded-full bg-green-500/20 blur-3xl delay-1000'></div>
            </div>

            {/* Floating particles */}
            <div className='absolute inset-0'>
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className='absolute h-1 w-1 rounded-full bg-emerald-400/50'
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${100 + Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, typeof window !== 'undefined' ? -window.innerHeight - 200 : -1000],
                            x: [0, (Math.random() - 0.5) * 100],
                            opacity: [0, 1, 0],
                            scale: [0, Math.random() * 2 + 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: 'linear',
                        }}
                    />
                ))}
            </div>

            <div className='container relative z-10 px-5 md:px-8'>
                <div className='mx-auto max-w-5xl'>
                    {/* Success Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='mb-8 text-center'>
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            className='mb-4 inline-flex items-center gap-2 rounded-full border-2 border-emerald-400 bg-emerald-950/90 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-emerald-300 shadow-lg shadow-emerald-500/20'>
                            <motion.span
                                className='text-lg'
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                                ✨
                            </motion.span>
                            BAŞARI GARANTİSİ
                            <motion.span
                                className='text-lg'
                                animate={{ rotate: [0, -360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                                ✨
                            </motion.span>
                        </motion.div>
                    </motion.div>

                    {/* Main Title with Glow Effect */}
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className='font-playfair relative mb-16 text-center text-5xl font-bold tracking-tighter sm:text-6xl md:text-8xl'>
                        <span className='relative text-white drop-shadow-lg'>
                            EMA ile{' '}
                            <motion.span
                                className='relative inline-block bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(52,211,153,0.9)]'
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                style={{
                                    backgroundSize: '200% 200%',
                                    textShadow: '0 0 30px rgba(52,211,153,0.8)'
                                }}>
                                KAZANIN
                            </motion.span>
                        </span>
                    </motion.h2>

                    {/* Success Cards Grid */}
                    <div className='mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8'>
                        {[
                            {
                                icon: '🎯',
                                title: 'Memnun Müşteri',
                                description: 'Her müşteri aradığını bulur, memnun ayrılır',
                                benefit: '%95 müşteri memnuniyeti',
                                value: '+₺2,500 günlük ek satış',
                                animation: 'pulse',
                                delay: 0.1,
                            },
                            {
                                icon: '💪',
                                title: 'Mutlu Personel',
                                description: 'Çalışanlar rutin sorulardan kurtulur, değer katar',
                                benefit: '%80 verimlilik artışı',
                                value: '₺20,000 tasarruf/ay',
                                animation: 'bounce',
                                delay: 0.2,
                            },
                            {
                                icon: '📊',
                                title: 'Artan Satışlar',
                                description: 'Her konuşma bir satış fırsatına dönüşür',
                                benefit: '%35 satış artışı',
                                value: '+₺350,000 yıllık gelir',
                                animation: 'scale',
                                delay: 0.3,
                            },
                            {
                                icon: '🏆',
                                title: 'Rekabet Avantajı',
                                description: 'Rakiplerinizden bir adım önde olun',
                                benefit: '5 dilde 7/24 hizmet',
                                value: '∞ büyüme potansiyeli',
                                animation: 'rotate',
                                delay: 0.4,
                            },
                        ].map((success, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: success.delay, duration: 0.6 }}
                                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                className='group relative overflow-hidden rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-950/90 to-slate-900/90 p-6 shadow-xl backdrop-blur-sm transition-all hover:border-emerald-400/50 hover:shadow-emerald-500/20 sm:p-8'>

                                {/* Shimmering overlay */}
                                <motion.div
                                    className='absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent'
                                    animate={{
                                        x: ['-100%', '100%'],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatDelay: 2,
                                    }}
                                />

                                {/* Success glow */}
                                <div className='absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl transition-all group-hover:bg-emerald-400/30'></div>

                                <div className='relative z-10'>
                                    {/* Icon container */}
                                    <motion.div
                                        className='mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm'
                                        animate={
                                            success.animation === 'pulse' ? {
                                                scale: [1, 1.1, 1],
                                            } : success.animation === 'bounce' ? {
                                                y: [0, -10, 0],
                                            } : success.animation === 'scale' ? {
                                                scale: [0.9, 1.1, 0.9],
                                            } : {
                                                rotate: [0, 5, -5, 0],
                                            }
                                        }
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}>
                                        <span className='text-4xl'>{success.icon}</span>
                                    </motion.div>

                                    <h3 className='mb-2 text-2xl font-bold text-emerald-300'>
                                        {success.title}
                                    </h3>
                                    <p className='mb-4 text-lg leading-relaxed text-gray-300'>
                                        {success.description}
                                    </p>

                                    {/* Benefits */}
                                    <div className='flex flex-wrap gap-3'>
                                        <motion.div
                                            className='rounded-lg border-2 border-emerald-600/50 bg-emerald-950/80 px-4 py-2 backdrop-blur-sm'
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.2 }}>
                                            <p className='text-sm font-semibold text-emerald-200'>
                                                {success.benefit}
                                            </p>
                                        </motion.div>
                                        <motion.div
                                            className='rounded-lg border-2 border-green-500/50 bg-green-950/80 px-4 py-2 backdrop-blur-sm'
                                            animate={{
                                                borderColor: ['rgba(34, 197, 94, 0.5)', 'rgba(34, 197, 94, 0.8)', 'rgba(34, 197, 94, 0.5)'],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                            }}>
                                            <p className='text-sm font-bold text-white'>
                                                {success.value}
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Central Success Summary */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className='relative overflow-hidden rounded-2xl border-2 border-emerald-400/50 bg-gradient-to-b from-emerald-950/90 to-slate-900/90 p-8 text-center shadow-2xl backdrop-blur-md'>

                        {/* Animated background pattern */}
                        <div className='absolute inset-0'>
                            <motion.div
                                className='h-full w-full opacity-10'
                                style={{
                                    backgroundImage: 'radial-gradient(circle at 2px 2px, emerald 1px, transparent 1px)',
                                    backgroundSize: '40px 40px',
                                }}
                                animate={{
                                    backgroundPosition: ['0px 0px', '40px 40px'],
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                            />
                        </div>

                        {/* Success Icon */}
                        <motion.div
                            className='relative z-10 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-emerald-400/70 bg-emerald-950/80 backdrop-blur-sm'
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 360],
                            }}
                            transition={{
                                scale: { duration: 2, repeat: Infinity },
                                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                            }}>
                            <span className='text-5xl'>🚀</span>
                        </motion.div>

                        <h3 className='font-montserrat relative z-10 mb-4 text-2xl font-bold uppercase tracking-wider text-emerald-300'>
                            TOPLAM KAZANÇ
                        </h3>

                        <p className='relative z-10 mb-6 text-xl leading-relaxed text-gray-100'>
                            Her <span className='font-bold text-emerald-300'>yatırım</span>,{' '}
                            <span className='font-bold text-emerald-300'>katlanarak döner</span>.
                        </p>

                        <div className='relative z-10 mx-auto max-w-md space-y-4 rounded-lg bg-black/50 p-6 backdrop-blur-sm'>
                            <motion.div
                                className='relative'
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}>
                                <motion.div
                                    className='absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/30 via-green-400/30 to-emerald-400/30 blur-xl'
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 0.8, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />
                                <p className='relative font-mono text-xl text-emerald-100'>
                                    Yıllık Kazanç:{' '}
                                    <motion.span
                                        className='block text-3xl font-black text-transparent bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300 bg-clip-text sm:text-4xl md:text-5xl mt-2'
                                        animate={{
                                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: 'linear',
                                        }}
                                        style={{
                                            backgroundSize: '200% 200%',
                                            filter: 'drop-shadow(0 0 20px rgba(52, 211, 153, 0.5))',
                                        }}>
                                        ₺2,190,000+
                                    </motion.span>
                                </p>
                            </motion.div>

                            <motion.p
                                className='font-mono text-base text-emerald-300/90'
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}>
                                ROI: <span className='font-bold text-green-400'>%380</span> ilk yıl
                            </motion.p>

                            <motion.div
                                className='relative mt-6 pt-6 border-t border-emerald-500/30'
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}>
                                <motion.div
                                    className='absolute -left-2 -top-2'
                                    animate={{
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}>
                                    <span className='text-2xl'>✨</span>
                                </motion.div>
                                <motion.div
                                    className='absolute -right-2 -bottom-2'
                                    animate={{
                                        rotate: [360, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}>
                                    <span className='text-2xl'>✨</span>
                                </motion.div>
                                <motion.p
                                    className='relative text-lg font-medium text-emerald-200 italic text-center px-4'
                                    animate={{
                                        scale: [1, 1.02, 1],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}>
                                    <span className='text-3xl text-emerald-400/50 absolute -left-2 -top-2'>"</span>
                                    <span className='bg-gradient-to-r from-emerald-300 via-white to-emerald-300 bg-clip-text text-transparent font-bold text-xl sm:text-2xl'>
                                        Teknoloji artık gerçekten yardımcı.
                                    </span>
                                    <span className='text-3xl text-emerald-400/50 absolute -right-2 -bottom-2'>"</span>
                                </motion.p>
                            </motion.div>
                        </div>

                        {/* Action CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className='mt-12 text-center'>

                            {/* Success invitation container */}
                            <motion.div
                                className='relative mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-emerald-950/50 via-green-950/30 to-emerald-950/50 p-8 backdrop-blur-md'
                                animate={{
                                    boxShadow: [
                                        '0 0 30px rgba(52, 211, 153, 0.3)',
                                        '0 0 60px rgba(52, 211, 153, 0.5)',
                                        '0 0 30px rgba(52, 211, 153, 0.3)',
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}>

                                {/* Success glow effect */}
                                <motion.div
                                    className='absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-green-500/30 to-emerald-500/20 blur-xl'
                                    animate={{
                                        opacity: [0.4, 0.7, 0.4],
                                        scale: [0.95, 1.05, 0.95],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />

                                <div className='relative z-10'>
                                    {/* Success icon */}
                                    <motion.div
                                        className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/40 to-green-500/40 backdrop-blur-sm'
                                        animate={{
                                            scale: [1, 1.15, 1],
                                            rotate: [0, 360],
                                        }}
                                        transition={{
                                            scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                                            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                                        }}>
                                        <span className='text-3xl'>🎯</span>
                                    </motion.div>

                                    <p className='mb-6 text-xl font-medium text-gray-100 sm:text-2xl'>
                                        Bu başarıya{' '}
                                        <span className='bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-300 bg-clip-text text-transparent font-bold'>
                                            ortak olmak için:
                                        </span>
                                    </p>

                                    {/* Success CTA Button */}
                                    <Button
                                        size='lg'
                                        onClick={() => setContactModalOpen(true)}
                                        className='group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-10 py-7 text-xl font-bold text-white shadow-lg shadow-emerald-500/40 transition-all hover:scale-105 hover:shadow-emerald-500/60 sm:px-12 sm:py-8 sm:text-2xl'>

                                        {/* Success particles on hover */}
                                        <motion.div
                                            className='absolute inset-0 rounded-full'
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}>
                                            {[...Array(6)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className='absolute h-1 w-1 rounded-full bg-white/60'
                                                    style={{
                                                        left: '50%',
                                                        top: '50%',
                                                    }}
                                                    animate={{
                                                        x: [0, (Math.random() - 0.5) * 100],
                                                        y: [0, (Math.random() - 0.5) * 100],
                                                        opacity: [0, 1, 0],
                                                        scale: [0, 2, 0],
                                                    }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        delay: i * 0.1,
                                                    }}
                                                />
                                            ))}
                                        </motion.div>

                                        <span className='relative z-10 flex items-center gap-3'>
                                            <motion.span
                                                animate={{
                                                    scale: [1, 1.3, 1],
                                                    rotate: [0, 10, -10, 0],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                }}>
                                                🚀
                                            </motion.span>
                                            EMA ile Başlayın
                                            <motion.span
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}>
                                                <ArrowRight className='h-6 w-6' />
                                            </motion.span>
                                        </span>

                                        <motion.div
                                            className='absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400'
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </Button>

                                    {/* Success promise text */}
                                    <p className='mt-4 text-sm text-emerald-300/90 sm:text-base'>
                                        Başarı sizi bekliyor. Hemen başlayın!
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
} 