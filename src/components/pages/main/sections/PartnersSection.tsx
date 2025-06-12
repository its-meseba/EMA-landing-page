'use client';

import Image from "next/image";

export default function PartnersSection() {
    return (
        <section className='w-full bg-slate-100 py-10 overflow-x-auto'>
            <div className='container mx-auto flex flex-row items-center justify-center gap-8 md:gap-16' style={{ minWidth: 'max-content' }}>
                <div className='flex flex-1 flex-col items-center justify-center bg-slate-900 p-8 rounded-xl shadow-lg'>
                    <a
                        href='https://www.afextr.com/tr'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group cursor-pointer rounded-lg transition-transform duration-300 hover:scale-110'>
                        <Image
                            src='/branding/afex_logo.avif'
                            alt='Afex Logo'
                            width={240}
                            height={120}
                            className='h-20 w-auto object-contain md:h-28 lg:h-32'
                            style={{ maxWidth: '300px' }}
                        />
                    </a>
                    <span className='mt-3 font-medium text-white text-base tracking-wide'>AFEX İstanbul</span>
                </div>
                <div className='flex flex-1 flex-col items-center justify-center bg-slate-900 p-8 rounded-xl shadow-lg'>
                    <a
                        href='https://www.greyder.com.tr/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group cursor-pointer rounded-lg transition-transform duration-300 hover:scale-110'>
                        <Image
                            src='/branding/greyder_logo.webp'
                            alt='Greyder Logo'
                            width={240}
                            height={120}
                            className='h-20 w-auto object-contain md:h-28 lg:h-32 rounded-lg'
                            style={{ maxWidth: '300px' }}
                        />
                    </a>
                    <span className='mt-3 font-medium text-white text-base tracking-wide'>Greyder</span>
                </div>
                <div className='flex flex-1 flex-col items-center justify-center bg-slate-900 p-8 rounded-xl shadow-lg'>
                    <a
                        href='https://tr.integralgroup.com.tr/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group cursor-pointer rounded-lg transition-transform duration-300 hover:scale-110'>
                        <Image
                            src='/branding/integral_logo.webp'
                            alt='Integral Logo'
                            width={240}
                            height={120}
                            className='h-20 w-auto object-contain md:h-28 lg:h-32 rounded-lg'
                            style={{ maxWidth: '300px' }}
                        />
                    </a>
                    <span className='mt-3 font-medium text-white text-base tracking-wide'>İntegral Group</span>
                </div>
            </div>
        </section>
    )
} 