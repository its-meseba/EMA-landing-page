'use client';

import { Button } from "@/registry/new-york-v4/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, XCircle } from "lucide-react";

interface LossSectionProps {
    setContactModalOpen: (open: boolean) => void;
}

export default function LossSection({ setContactModalOpen }: LossSectionProps) {
    return (
        <section className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-red-950/20 to-black py-16 text-white md:py-24'>
            {/* Animated dark background elements */}
            <div className='absolute inset-0 opacity-30'>
                <div className='absolute -left-20 top-20 h-96 w-96 animate-pulse rounded-full bg-red-900/40 blur-3xl'></div>
                <div className='absolute -right-40 bottom-40 h-80 w-80 animate-pulse rounded-full bg-red-800/30 blur-3xl delay-700'></div>
            </div>

            {/* Glitch effect overlay */}
            <motion.div
                className='absolute inset-0 bg-red-500/5'
                animate={{
                    opacity: [0, 0.1, 0, 0.05, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 4,
                }}
            />

            <div className='container relative z-10 px-5 md:px-8'>
                <div className='mx-auto max-w-5xl'>
                    {/* Warning Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='mb-8 text-center'>
                        <motion.div
                            animate={{
                                opacity: [1, 0.5, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            className='mb-4 inline-flex items-center gap-2 rounded-full border-2 border-red-500 bg-red-950/90 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-red-300 shadow-lg shadow-red-500/20'>
                            <span className='h-2 w-2 animate-pulse rounded-full bg-red-400'></span>
                            UYARI
                            <span className='h-2 w-2 animate-pulse rounded-full bg-red-400'></span>
                        </motion.div>
                    </motion.div>

                    {/* Main Title with Glitch Effect */}
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className='font-playfair relative mb-16 text-center text-5xl font-bold tracking-tighter sm:text-6xl md:text-8xl'>
                        <span className='relative text-white drop-shadow-lg'>
                            EMA Olmazsa{' '}
                            <motion.span
                                className='relative inline-block text-red-400 drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]'
                                animate={{
                                    textShadow: [
                                        '0 0 0px rgba(239, 68, 68, 0)',
                                        '0 0 30px rgba(239, 68, 68, 1)',
                                        '0 0 60px rgba(239, 68, 68, 0.8)',
                                        '0 0 30px rgba(239, 68, 68, 1)',
                                        '0 0 0px rgba(239, 68, 68, 0)',
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                }}>
                                KAOS
                            </motion.span>
                            {' '}Başlar
                        </span>
                    </motion.h2>

                    {/* Horror Cards Grid */}
                    <div className='mb-16 space-y-8'>
                        {[
                            {
                                icon: '😤',
                                title: 'Sinirli Müşteri',
                                description: 'Ürünü bulamayan müşteri sinirlenip bağırır',
                                stats: '3 dakika arama = 1 kayıp müşteri',
                                loss: '₺850 kayıp satış',
                                color: 'from-red-950 to-slate-900',
                                delay: 0.1,
                            },
                            {
                                icon: '🌍',
                                title: 'Dil Bariyeri',
                                description: 'Yabancı turistler anlaşılamadığı için vazgeçer',
                                stats: '%40 turist müşteri kaybı',
                                loss: '₺2,400 günlük kayıp',
                                color: 'from-orange-950 to-slate-900',
                                delay: 0.2,
                            },
                            {
                                icon: '😩',
                                title: 'Yorgun Personel',
                                description: 'Aynı soruları 100 kez cevaplayan çalışan tükenir',
                                stats: '%65 personel devir hızı',
                                loss: '₺15,000 eğitim maliyeti',
                                color: 'from-amber-950 to-slate-900',
                                delay: 0.3,
                            },
                            {
                                icon: '📉',
                                title: 'Düşen Satışlar',
                                description: 'Müşteri deneyimi kötüleşir, satışlar düşer',
                                stats: '%25 ciro kaybı',
                                loss: '₺180,000 yıllık kayıp',
                                color: 'from-red-950 to-black',
                                delay: 0.4,
                            },
                        ].map((loss, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: loss.delay, duration: 0.6 }}
                                className='group relative overflow-hidden rounded-2xl border-2 border-red-500/30 bg-gradient-to-r p-6 shadow-2xl backdrop-blur-sm transition-all hover:border-red-400/50 hover:shadow-red-500/20 sm:p-8'
                                style={{
                                    backgroundImage: `linear-gradient(135deg, ${loss.color})`,
                                }}>

                                {/* Dark overlay for better contrast */}
                                <div className='absolute inset-0 bg-black/40'></div>

                                {/* Animated Background Pattern */}
                                <div className='absolute inset-0 opacity-20'>
                                    <motion.div
                                        className='h-full w-full'
                                        style={{
                                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,0,0,0.2) 35px, rgba(255,0,0,0.2) 70px)',
                                        }}
                                        animate={{
                                            x: [0, 35],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: 'linear',
                                        }}
                                    />
                                </div>

                                <div className='relative z-10 flex items-start gap-6'>
                                    {/* Icon with Shake Animation */}
                                    <motion.div
                                        className='flex h-16 w-16 items-center justify-center rounded-2xl bg-black/50 text-5xl backdrop-blur-sm'
                                        animate={{
                                            rotate: [0, -5, 5, -5, 0],
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            repeat: Infinity,
                                            repeatDelay: 3,
                                        }}>
                                        {loss.icon}
                                    </motion.div>

                                    <div className='flex-1'>
                                        <h3 className='mb-2 text-2xl font-bold text-red-300'>
                                            {loss.title}
                                        </h3>
                                        <p className='mb-4 text-lg leading-relaxed text-gray-200'>
                                            {loss.description}
                                        </p>

                                        {/* Stats and Loss */}
                                        <div className='flex flex-wrap gap-4'>
                                            <div className='rounded-lg border-2 border-red-700/50 bg-red-950/80 px-4 py-2 backdrop-blur-sm'>
                                                <p className='text-sm font-semibold text-red-200'>
                                                    {loss.stats}
                                                </p>
                                            </div>
                                            <motion.div
                                                className='rounded-lg border-2 border-red-500/50 bg-red-900/80 px-4 py-2 backdrop-blur-sm'
                                                animate={{
                                                    scale: [1, 1.05, 1],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                }}>
                                                <p className='text-sm font-bold text-white'>
                                                    {loss.loss}
                                                </p>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Warning Icon */}
                                    <motion.div
                                        className='absolute -right-2 -top-2 text-red-400'
                                        animate={{
                                            opacity: [0.5, 1, 0.5],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                        }}>
                                        <XCircle className='h-12 w-12 drop-shadow-lg' />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Final Warning Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className='relative overflow-hidden rounded-2xl border-2 border-red-400/50 bg-gradient-to-b from-red-950/90 to-black/90 p-8 text-center shadow-2xl backdrop-blur-md'>

                        {/* Pulsing Background */}
                        <motion.div
                            className='absolute inset-0 bg-red-500/20'
                            animate={{
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        />

                        {/* Alert Icon */}
                        <motion.div
                            className='relative z-10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-red-400/70 bg-red-950/80 backdrop-blur-sm'
                            animate={{
                                scale: [1, 1.1, 1],
                                borderColor: ['rgba(248, 113, 113, 0.7)', 'rgba(248, 113, 113, 1)', 'rgba(248, 113, 113, 0.7)'],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                            }}>
                            <span className='text-4xl'>⚠️</span>
                        </motion.div>

                        <h3 className='font-montserrat relative z-10 mb-4 text-2xl font-bold uppercase tracking-wider text-red-300'>
                            Kritik Gerçek
                        </h3>

                        <motion.div
                            className='relative z-10 mb-8 mx-auto max-w-2xl'
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}>
                            <motion.p
                                className='relative text-2xl sm:text-3xl font-bold leading-relaxed text-center text-white'
                                animate={{
                                    filter: [
                                        'brightness(1) contrast(1)',
                                        'brightness(1.2) contrast(1.1)',
                                        'brightness(1) contrast(1)',
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}>
                                Her{' '}
                                <motion.span
                                    className='inline-block text-red-400 font-black'
                                    animate={{
                                        color: ['#f87171', '#ef4444', '#dc2626', '#ef4444', '#f87171'],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}>
                                    kaybedilen soru
                                </motion.span>
                                ,{' '}
                                <br className='sm:hidden' />
                                <motion.span
                                    className='inline-block text-red-400 font-black'
                                    animate={{
                                        color: ['#f87171', '#ef4444', '#dc2626', '#ef4444', '#f87171'],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: 0.5,
                                    }}>
                                    kaybedilen müşteri
                                </motion.span>{' '}
                                demektir.
                            </motion.p>
                            <motion.div
                                className='absolute inset-0 pointer-events-none'
                                animate={{
                                    boxShadow: [
                                        'inset 0 0 0px rgba(239, 68, 68, 0)',
                                        'inset 0 0 80px rgba(239, 68, 68, 0.2)',
                                        'inset 0 0 0px rgba(239, 68, 68, 0)',
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        </motion.div>

                        <motion.div
                            className='relative z-10 mx-auto max-w-lg'
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}>

                            {/* Financial Loss Box */}
                            <div className='relative overflow-hidden rounded-2xl bg-gradient-to-b from-black/80 to-red-950/30 p-8 backdrop-blur-md border border-red-500/30'>
                                {/* Animated border glow */}
                                <motion.div
                                    className='absolute inset-0 opacity-50'
                                    animate={{
                                        background: [
                                            'radial-gradient(circle at 50% 50%, transparent 30%, rgba(239, 68, 68, 0.3) 70%)',
                                            'radial-gradient(circle at 50% 50%, transparent 20%, rgba(239, 68, 68, 0.5) 70%)',
                                            'radial-gradient(circle at 50% 50%, transparent 30%, rgba(239, 68, 68, 0.3) 70%)',
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                    className='relative space-y-6'>

                                    {/* Daily Loss */}
                                    <div className='text-center'>
                                        <p className='font-mono text-sm uppercase tracking-wider text-red-400/80 mb-1'>
                                            Günlük Kayıp
                                        </p>
                                        <p className='font-mono text-xl text-red-200'>
                                            50 soru × ₺100 = <span className='font-bold text-2xl text-red-300'>₺5,000</span>
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <div className='flex items-center gap-4'>
                                        <div className='flex-1 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent'></div>
                                        <motion.div
                                            animate={{
                                                rotate: 360,
                                            }}
                                            transition={{
                                                duration: 10,
                                                repeat: Infinity,
                                                ease: 'linear',
                                            }}>
                                            <XCircle className='h-5 w-5 text-red-500/50' />
                                        </motion.div>
                                        <div className='flex-1 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent'></div>
                                    </div>

                                    {/* Annual Loss - Main Focus */}
                                    <motion.div
                                        className='text-center'
                                        animate={{
                                            scale: [1, 1.02, 1],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}>
                                        <p className='font-mono text-sm uppercase tracking-wider text-red-400/80 mb-2'>
                                            Yıllık Toplam Kayıp
                                        </p>
                                        <motion.div
                                            className='relative inline-block'
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.2 }}>
                                            <motion.p
                                                className='font-mono text-5xl sm:text-6xl md:text-7xl font-black text-red-500'
                                                style={{
                                                    textShadow: '0 0 40px rgba(239, 68, 68, 0.6), 0 0 80px rgba(239, 68, 68, 0.3)',
                                                }}
                                                animate={{
                                                    textShadow: [
                                                        '0 0 40px rgba(239, 68, 68, 0.6), 0 0 80px rgba(239, 68, 68, 0.3)',
                                                        '0 0 60px rgba(239, 68, 68, 0.8), 0 0 120px rgba(239, 68, 68, 0.4)',
                                                        '0 0 40px rgba(239, 68, 68, 0.6), 0 0 80px rgba(239, 68, 68, 0.3)',
                                                    ],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                }}>
                                                ₺1,825,000
                                            </motion.p>
                                            {/* Subtle underline effect */}
                                            <motion.div
                                                className='absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent'
                                                animate={{
                                                    scaleX: [0.5, 1, 0.5],
                                                    opacity: [0.5, 1, 0.5],
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                }}
                                            />
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Horror Escape CTA - Relief from Nightmare */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className='mt-16 text-center'>

                            {/* Relief container with calming gradient */}
                            <motion.div
                                className='relative mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-slate-900/90 via-blue-950/50 to-slate-900/90 p-8 backdrop-blur-md'
                                animate={{
                                    boxShadow: [
                                        '0 0 20px rgba(59, 130, 246, 0.2)',
                                        '0 0 40px rgba(59, 130, 246, 0.4)',
                                        '0 0 20px rgba(59, 130, 246, 0.2)',
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}>

                                {/* Calming light effect */}
                                <motion.div
                                    className='absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-xl'
                                    animate={{
                                        opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />

                                <div className='relative z-10'>
                                    {/* Relief icon */}
                                    <motion.div
                                        className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-sm'
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 5, -5, 0],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}>
                                        <span className='text-3xl'>🛡️</span>
                                    </motion.div>

                                    <p className='mb-6 text-xl font-medium text-gray-200 sm:text-2xl'>
                                        Bu kabustan kurtulmak için{' '}
                                        <span className='bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-bold'>
                                            tek bir çözüm var:
                                        </span>
                                    </p>

                                    {/* Relief CTA Button */}
                                    <Button
                                        size='lg'
                                        onClick={() => setContactModalOpen(true)}
                                        className='group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-10 py-7 text-xl font-bold text-white shadow-lg shadow-blue-500/40 transition-all hover:scale-105 hover:shadow-blue-500/60 sm:px-12 sm:py-8 sm:text-2xl'>

                                        {/* Pulse effect on hover */}
                                        <motion.div
                                            className='absolute inset-0 rounded-full bg-white/20'
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileHover={{ scale: 2, opacity: 0 }}
                                            transition={{ duration: 0.6 }}
                                        />

                                        <span className='relative z-10 flex items-center gap-3'>
                                            <motion.span
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                }}>
                                                💡
                                            </motion.span>
                                            EMA ile Kurtulun
                                            <ArrowRight className='h-6 w-6 transition-transform group-hover:translate-x-2' />
                                        </span>

                                        <motion.div
                                            className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400'
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </Button>

                                    {/* Reassurance text */}
                                    <p className='mt-4 text-sm text-blue-300/80 sm:text-base'>
                                        Huzura kavuşun. Teknoloji artık yanınızda.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
} 