import AnimatedFAQ from '@/components/AnimatedFAQ';

export default function FaqSection() {
    return (
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
    );
} 