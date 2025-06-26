'use client';

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "@/registry/new-york-v4/ui/separator";

interface LegalLink {
    name: string;
    href: string;
}

export default function FooterSection() {
    const { t } = useLanguage();

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
                            {t('footer.slogan') as string}
                        </p>
                    </div>

                    <div>
                        <h3 className='font-montserrat mb-3 text-base font-semibold sm:mb-4 sm:text-lg'>{t('footer.legal') as string}</h3>
                        <ul className='font-inter space-y-2 sm:space-y-3'>
                            {(t('footer.legalLinks') as LegalLink[]).map((link: LegalLink, index: number) => (
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
                            {t('footer.contact') as string}
                        </h3>
                        <ul className='font-inter space-y-2 sm:space-y-3'>
                            <li className='text-sm text-slate-400 sm:text-base'>{t('footer.email') as string}</li>
                            <li className='flex gap-3 pt-2 sm:gap-4 sm:pt-3'>
                                {(t('footer.socials') as string[]).map((social: string, index: number) => (
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
                    {t('footer.copyright') as string}
                </p>
            </div>
        </footer>
    )
} 