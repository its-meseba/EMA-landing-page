'use client';

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "@/registry/new-york-v4/ui/separator";
import { z } from "zod";

const legalLinkSchema = z.object({
    name: z.string(),
    href: z.string(),
});

const legalLinksSchema = z.array(legalLinkSchema);
const socialsSchema = z.array(z.string());

export default function FooterSection() {
    const { t } = useLanguage();

    const slogan = t('footer.slogan');
    const legal = t('footer.legal');
    const contact = t('footer.contact');
    const email = t('footer.email');
    const copyright = t('footer.copyright');

    const legalLinksData = t('footer.legalLinks');
    const legalLinksResult = legalLinksSchema.safeParse(legalLinksData);
    const legalLinks = legalLinksResult.success ? legalLinksResult.data : [];

    const socialsData = t('footer.socials');
    const socialsResult = socialsSchema.safeParse(socialsData);
    const socials = socialsResult.success ? socialsResult.data : [];

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
                            {typeof slogan === 'string' ? slogan : ''}
                        </p>
                    </div>

                    <div>
                        <h3 className='font-montserrat mb-3 text-base font-semibold sm:mb-4 sm:text-lg'>{typeof legal === 'string' ? legal : ''}</h3>
                        <ul className='font-inter space-y-2 sm:space-y-3'>
                            {legalLinks.map((link, index: number) => (
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
                            {typeof contact === 'string' ? contact : ''}
                        </h3>
                        <ul className='font-inter space-y-2 sm:space-y-3'>
                            <li className='text-sm text-slate-400 sm:text-base'>{typeof email === 'string' ? email : ''}</li>
                            <li className='flex gap-3 pt-2 sm:gap-4 sm:pt-3'>
                                {socials.map((social: string, index: number) => (
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
                    {typeof copyright === 'string' ? copyright : ''}
                </p>
            </div>
        </footer>
    )
} 