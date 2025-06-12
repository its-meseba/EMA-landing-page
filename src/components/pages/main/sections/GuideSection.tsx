'use client';

import { Card, CardContent } from '@/registry/new-york-v4/ui/card';

export default function GuideSection() {
    return (
        <section className='flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 py-16 text-white md:py-24'>
            <div className='container px-5 md:px-8'>
                <div className='mx-auto mb-10 max-w-5xl text-center md:mb-16'>
                    <h2 className='font-playfair mb-4 text-4xl leading-[1.1] font-bold tracking-tighter sm:mb-6 sm:text-5xl md:text-7xl'>
                        Sistemi Kullanmak,{' '}
                        <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>
                            Konuşma
                        </span>{' '}
                        Kolaylığında
                    </h2>
                    <p className='font-inter mx-auto max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl'>
                        EMA, her müşterinin ihtiyacını doğal bir diyalogla karşılar.
                    </p>
                </div>

                <div className='mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:mb-12 md:grid-cols-4'>
                    {[
                        {
                            title: 'Hiç Sıkılmayan',
                            description: '7/24 müsait, yorulmaz.',
                            icon: '⏰'
                        },
                        {
                            title: 'Sabrı Bitmeyen',
                            description: 'Her soruya sabırla cevap verir.',
                            icon: '🤗'
                        },
                        {
                            title: 'Tüm Ürünleri Bilen',
                            description: 'Kapsamlı ürün bilgisi, stok ve fiyat.',
                            icon: '📦'
                        },
                        {
                            title: 'Tüm Detaylara Hakim',
                            description: 'Teknik özelliklere kadar hakim.',
                            icon: '🔍'
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
            </div>
        </section>
    )
} 