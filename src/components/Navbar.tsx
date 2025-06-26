'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ContactModal } from '@/components/ContactModal';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/registry/new-york-v4/ui/button';

const Navbar = () => {
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const { t } = useLanguage();

    return (
        <>
            <nav className='fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/90'>
                <div className='container mx-auto flex items-center justify-between px-4 py-3'>
                    <Link href='/' className='flex items-center'>
                        <Image
                            src='/branding/logo.png'
                            alt='EMA Logo'
                            width={120}
                            height={40}
                            className='h-10 w-auto'
                        />
                    </Link>
                    <div className='flex items-center space-x-3'>
                        <LanguageSelector />
                        <Button
                            onClick={() => setContactModalOpen(true)}
                            className='bg-blue-600 text-white hover:bg-blue-700'>
                            <span className='hidden sm:inline'>{t('navbar.contact') as string}</span>
                            <span className='sm:hidden'>{t('navbar.contact') as string}</span>
                        </Button>
                        {/* <a href='https://app.ema.solace.com.tr' target='_blank' rel='noopener noreferrer'>
                            <Button
                                variant='outline'
                                className='border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950'>
                                Uygulamayı Kullan
                            </Button>
                        </a> */}
                    </div>
                </div>
            </nav>

            <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
        </>
    );
};

export default Navbar;
