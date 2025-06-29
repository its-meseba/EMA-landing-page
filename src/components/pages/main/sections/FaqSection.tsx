import AnimatedFAQ from '@/components/AnimatedFAQ';
import { useLanguage } from '@/contexts/LanguageContext';

interface FaqSectionProps {
    setContactModalOpen: (open: boolean) => void;
}

export default function FaqSection({ setContactModalOpen }: FaqSectionProps) {
    const { t } = useLanguage();

    const title = t('faq.title');
    const titleHighlight = t('faq.titleHighlight');
    const subtitle = t('faq.subtitle');

    return (
        <section className='flex min-h-screen w-full items-center justify-center bg-white py-16 md:py-24'>
            <div className='container px-5 md:px-8'>
                <div className='mx-auto mb-10 max-w-5xl text-center md:mb-16'>
                    <h2 className='font-playfair mb-4 text-4xl leading-[1.1] font-bold tracking-tighter text-slate-900 sm:mb-6 sm:text-5xl md:text-7xl'>
                        {typeof title === 'string' ? title : ''}{' '}
                        <span className='bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent'>
                            {typeof titleHighlight === 'string' ? titleHighlight : ''}
                        </span>
                    </h2>
                    <p className='font-inter mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-xl'>
                        {typeof subtitle === 'string' ? subtitle : ''}
                    </p>
                </div>

                <AnimatedFAQ onContactClick={() => setContactModalOpen(true)} />
            </div>
        </section>
    );
} 