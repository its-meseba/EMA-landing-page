import ComparisonTable from '@/components/ComparisonTable';

export default function ComparisonSection() {
    return (
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
    );
} 