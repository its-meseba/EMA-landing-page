'use client';

import { Card, CardContent } from '@/registry/new-york-v4/ui/card';
import { XCircle } from 'lucide-react';

export default function ProblemSection() {
    return (
        <section className='flex min-h-screen w-full items-center justify-center bg-slate-900 py-16 text-white md:py-24'>
            <div className='container px-5 md:px-8'>
                <div className='mx-auto max-w-4xl'>
                    <h2 className='font-playfair mx-auto mb-10 max-w-4xl text-4xl leading-[1.1] font-bold tracking-tighter sm:text-5xl md:mb-16 md:text-7xl'>
                        Alışverişin zahmetli, yavaş ve kişisel olmayan yapısı <span className='text-red-400'>satışları düşürüyor.</span>
                    </h2>

                    <div className='mb-10 grid grid-cols-1 gap-6 md:mb-16 md:grid-cols-3 md:gap-8'>
                        {[
                            'Dil engeli nedeniyle müşteriler kaçıyor.',
                            'Yavaş ve kesintili yanıtlar müşterileri başkalarına itiyor.',
                            'Kafası karışan müşteriler pes ediyor.'
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
                        <p className='font-playfair text-center text-xl text-slate-300 italic sm:text-2xl md:text-3xl relative z-10 py-2'>
                            <span className="bg-gradient-to-r from-blue-400 via-slate-300 to-blue-400 bg-clip-text text-transparent font-medium animate-pulse">
                                Alışverişi ne kadar kolay ve doğal hale getirirseniz, satış başarınız o kadar artar.
                            </span>
                        </p>
                        <div className='absolute -right-3 bottom-5 text-4xl text-slate-700 sm:text-5xl'>"</div>
                    </div>
                </div>
            </div>
        </section>
    )
} 