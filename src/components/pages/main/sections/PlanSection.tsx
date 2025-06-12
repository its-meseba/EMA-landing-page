'use client';

import { Badge } from "@/components/ui/Badge";

export default function PlanSection() {
    return (
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
                                title: 'Veri Entegrasyonu',
                                description: 'Ürünlerinizi ve şirket bilgileriniz yükleniyor.'
                            },
                            {
                                step: '2',
                                title: 'Yapay Zeka Eğitimi',
                                description: 'Yapay Zeka Sesli Asistan sizin için eğitiliyor.'
                            },
                            {
                                step: '3',
                                title: 'Arayüz Hazırlanması',
                                description: 'Şirketinize özel EMA sayfanız hazırlanıyor.'
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

                    <div className='mt-10 text-center sm:mt-16 flex flex-col items-center gap-4'>
                        <Badge className='font-montserrat rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-base text-blue-800 sm:px-6 sm:py-3 sm:text-lg'>
                            Konuşma kolaylığında, eğitim gerektirmez.
                        </Badge>
                    </div>
                </div>
            </div>
        </section>
    )
} 