'use client';

import Link from "next/link";
import { Separator } from "@/registry/new-york-v4/ui/separator";

export default function FooterSection() {
    return (
        <footer className='w-full bg-[#0e0f1a] py-12 text-white sm:py-16'>
            <div className='container px-5 md:px-8'>
                <div className='mb-10 grid grid-cols-1 gap-8 sm:mb-12 sm:grid-cols-2 sm:gap-12 md:grid-cols-3'>
                    <div>
                        <div className='mb-4 sm:mb-6'>
                            <span className='font-playfair bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl'>
                                EMA
                            </span>
                        </div>
                        <p className='font-inter max-w-xs text-sm leading-relaxed text-slate-400 sm:text-base'>
                            Teknolojiyi Konuşma Kolaylığında Sunuyoruz.
                        </p>
                    </div>

                    <div>
                        <h3 className='font-montserrat mb-3 text-base font-semibold sm:mb-4 sm:text-lg'>Yasal</h3>
                        <ul className='font-inter space-y-2 sm:space-y-3'>
                            {[
                                { name: 'KVKK', href: '/legal/data-protection' },
                                { name: 'Gizlilik Politikası', href: '/legal/privacy-policy' },
                                { name: 'Çerez Politikası', href: '/legal/cookie-policy' }
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className='text-sm text-slate-400 transition-colors hover:text-white sm:text-base'>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className='font-montserrat mb-3 text-base font-semibold sm:mb-4 sm:text-lg'>
                            İletişim
                        </h3>
                        <ul className='font-inter space-y-2 sm:space-y-3'>
                            <li className='text-sm text-slate-400 sm:text-base'>info-ema@solace.com.tr</li>
                            <li className='flex gap-3 pt-2 sm:gap-4 sm:pt-3'>
                                {['LinkedIn', 'Instagram', 'YouTube'].map((social, index) => (
                                    <Link
                                        key={index}
                                        href='#'
                                        className='text-sm text-slate-400 transition-colors hover:text-white sm:text-base'>
                                        {social}
                                    </Link>
                                ))}
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className='mb-6 bg-slate-800 sm:mb-8' />

                <p className='font-inter text-center text-xs text-slate-500 sm:text-sm'>
                    © 2025 EMA, Solace Teknoloji. Tüm hakları saklıdır.
                </p>
            </div>
        </footer>
    )
} 