'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/registry/new-york-v4/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { z } from "zod";

const emaBenefitSchema = z.object({
    badge: z.string(),
    title: z.string(),
    problems: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
});

const finalMessagePartsSchema = z.object({
    customer: z.string(),
    ema: z.string(),
    you: z.string(),
});

const referencesSchema = z.array(z.string());
const advantagesSchema = z.array(z.string());

interface CtaSectionProps {
    setContactModalOpen: (open: boolean) => void;
}

export default function CtaSection({ setContactModalOpen }: CtaSectionProps) {
    const { t } = useLanguage();

    const withoutEmaResult = emaBenefitSchema.safeParse(t('cta.withoutEma'));
    const withEmaResult = emaBenefitSchema.safeParse(t('cta.withEma'));
    const referencesResult = referencesSchema.safeParse(t('cta.references'));
    const finalMessagePartsResult = finalMessagePartsSchema.safeParse(t('cta.finalMessageParts'));
    const advantagesResult = advantagesSchema.safeParse(t('cta.advantages'));

    const withoutEma = withoutEmaResult.success ? withoutEmaResult.data : { badge: '', title: '', problems: [] };
    const withEma = withEmaResult.success ? withEmaResult.data : { badge: '', title: '', benefits: [] };
    const references = referencesResult.success ? referencesResult.data : [];
    const finalMessageParts = finalMessagePartsResult.success ? finalMessagePartsResult.data : { customer: '', ema: '', you: '' };
    const advantages = advantagesResult.success ? advantagesResult.data : [];

    const urgencyBadge = t('cta.urgencyBadge');
    const title = t('cta.title');
    const titleHighlight = t('cta.titleHighlight');
    const subtitle = t('cta.subtitle');
    const advantagesTitle = t('cta.advantagesTitle');
    const cta = t('cta.cta');
    const ctaSubtext = t('cta.ctaSubtext');
    const referencesTitle = t('cta.referencesTitle');

    return (
        <section className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a2333] to-[#0e0f1a] py-16 text-white md:py-24'>
            {/* Animated background elements */}
            <div className='absolute inset-0'>
                <motion.div
                    className='absolute -left-40 -top-40 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl'
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className='absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl'
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                    }}
                />
            </div>

            <div className='container relative z-10 px-5 md:px-8'>
                <div className='mx-auto max-w-4xl'>
                    {/* Transformation Journey */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className='mb-12 text-center'>

                        {/* Before/After Comparison */}
                        <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-2'>
                            {/* Without EMA - The Pain */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className='relative rounded-2xl border-2 border-red-500/20 bg-gradient-to-br from-red-950/20 to-slate-900/50 p-6 backdrop-blur-sm'>
                                <div className='absolute -left-3 -top-3 rounded-full bg-red-500 px-4 py-1 text-sm font-bold'>
                                    {withoutEma.badge}
                                </div>
                                <h3 className='mb-4 mt-2 text-xl font-bold text-red-300'>{withoutEma.title}</h3>
                                <ul className='space-y-3 text-left text-slate-300'>
                                    {withoutEma.problems?.map((problem: string, index: number) => (
                                        <li key={index} className='flex items-start gap-2'>
                                            <span className='text-red-400'>✗</span>
                                            <span className='text-sm'>{problem}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* With EMA - The Transformation */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className='relative rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 to-slate-900/50 p-6 backdrop-blur-sm'>
                                <div className='absolute -left-3 -top-3 rounded-full bg-emerald-500 px-4 py-1 text-sm font-bold'>
                                    {withEma.badge}
                                </div>
                                <h3 className='mb-4 mt-2 text-xl font-bold text-emerald-300'>{withEma.title}</h3>
                                <ul className='space-y-3 text-left text-slate-300'>
                                    {withEma.benefits?.map((benefit: string, index: number) => (
                                        <li key={index} className='flex items-start gap-2'>
                                            <span className='text-emerald-400'>✓</span>
                                            <span className='text-sm'>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        {/* Urgency Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, type: 'spring' }}
                            className='mb-8 inline-block'>
                            <Badge className='font-montserrat rounded-full border-2 border-amber-500/50 bg-gradient-to-r from-amber-600/30 to-orange-600/30 px-6 py-3 text-base tracking-wider text-amber-300 uppercase backdrop-blur-sm shadow-lg shadow-amber-500/20'>
                                <motion.span
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                    }}
                                    className='mr-2 inline-block'>
                                    ⏰
                                </motion.span>
                                {typeof urgencyBadge === 'string' ? urgencyBadge : ''}
                            </Badge>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className='font-playfair mb-6 text-5xl leading-[1.1] font-bold tracking-tighter sm:text-6xl md:text-7xl'>
                            <span className='block text-white'>{typeof title === 'string' ? title : ''}</span>
                            <span className='bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent'>
                                {typeof titleHighlight === 'string' ? titleHighlight : ''}
                            </span>
                        </motion.h2>

                        {/* Value Proposition */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            className='mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-slate-300'>
                            {typeof subtitle === 'string' ? subtitle : ''}
                        </motion.p>

                        {/* Risk Reversal */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                            className='mb-10 space-y-4'>
                            <div className='mx-auto max-w-xl rounded-xl bg-slate-800/50 p-6 backdrop-blur-sm'>
                                <h3 className='mb-4 text-lg font-bold text-emerald-300 text-center'>
                                    {typeof advantagesTitle === 'string' ? advantagesTitle : ''}
                                </h3>
                                <ul className='space-y-2 text-sm text-slate-300'>
                                    {advantages.map((advantage: string, index: number) => (
                                        <li key={index} className='flex items-center justify-center gap-2'>
                                            <span className='text-emerald-400'>✓</span>
                                            <span>{advantage}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* CTA Button with Animation */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.9, type: 'spring' }}
                            className='relative'>

                            {/* Pulsing glow effect */}
                            <motion.div
                                className='absolute inset-0 mx-auto h-20 w-80 rounded-full bg-amber-500/30 blur-3xl'
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            />

                            <Button
                                size='lg'
                                onClick={() => setContactModalOpen(true)}
                                className='font-montserrat group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-12 py-8 text-xl font-bold text-white shadow-2xl shadow-amber-500/40 transition-all hover:scale-105 hover:shadow-amber-500/60'>

                                {/* Shine effect on hover */}
                                <motion.div
                                    className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent'
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.6 }}
                                />

                                <span className='relative z-10 flex items-center gap-3'>
                                    <Sparkles className='h-6 w-6' />
                                    <span className='flex flex-col items-center'>
                                        <span>{typeof cta === 'string' ? cta : ''}</span>
                                        <span>{typeof ctaSubtext === 'string' ? ctaSubtext : ''}</span>
                                    </span>
                                    <ArrowRight className='h-6 w-6 transition-transform group-hover:translate-x-2' />
                                </span>
                            </Button>
                        </motion.div>

                        {/* Social Proof */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.1 }}
                            className='mt-12'>
                            <p className='mb-4 text-sm uppercase tracking-wider text-slate-400'>
                                {typeof referencesTitle === 'string' ? referencesTitle : ''}
                            </p>
                            <div className='flex flex-wrap justify-center gap-4'>
                                {references.map((brand, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 1.2 + index * 0.1 }}
                                        className='rounded-lg bg-slate-800/30 px-4 py-2 text-sm text-slate-300'>
                                        {brand}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Final Reminder */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.5 }}
                            className='font-inter mt-8 text-lg text-slate-400'>
                            <span className='font-semibold text-white'>{finalMessageParts.customer}</span>{' '}
                            <span className='font-semibold text-blue-400'>{finalMessageParts.ema}</span>{' '}
                            <span className='font-semibold text-emerald-400'>{finalMessageParts.you}</span>
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
} 