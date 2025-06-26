'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Globe } from 'lucide-react';

import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/registry/new-york-v4/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/registry/new-york-v4/ui/dialog';

const languages = [
    {
        code: 'tr' as Language,
        name: 'Türkçe',
        flag: '/flags/turkey.svg',
    },
    {
        code: 'en' as Language,
        name: 'English',
        flag: '/flags/uk.svg',
    },
    {
        code: 'fr' as Language,
        name: 'Français',
        flag: '/flags/france.svg',
    },
];

export function LanguageSelector() {
    const { language, setLanguage, t, isLoading } = useLanguage();
    const [dialogOpen, setDialogOpen] = useState(false);

    const currentLanguage = languages.find((lang) => lang.code === language);

    const handleLanguageChange = (newLanguage: Language) => {
        setLanguage(newLanguage);
        setDialogOpen(false);
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 border-gray-300 bg-white/90 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800/90 dark:hover:bg-gray-700"
                    disabled={isLoading}
                >
                    {currentLanguage ? (
                        <>
                            <Image
                                src={currentLanguage.flag}
                                alt={currentLanguage.name}
                                width={20}
                                height={15}
                                className="h-4 w-5 object-cover"
                            />
                            <span className="hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>
                        </>
                    ) : (
                        <>
                            <Globe className="h-4 w-4" />
                            <span className="hidden sm:inline">{t('navbar.language') as string}</span>
                        </>
                    )}
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center">{t('navbar.selectLanguage') as string}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-3 py-4">
                    {languages.map((lang) => (
                        <Button
                            key={lang.code}
                            variant={language === lang.code ? 'default' : 'outline'}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`flex items-center justify-start gap-3 p-4 text-left ${language === lang.code
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                            disabled={isLoading}
                        >
                            <Image
                                src={lang.flag}
                                alt={lang.name}
                                width={24}
                                height={18}
                                className="h-5 w-6 object-cover rounded-sm"
                            />
                            <span className="font-medium">{lang.name}</span>
                            {language === lang.code && (
                                <div className="ml-auto h-2 w-2 rounded-full bg-white" />
                            )}
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
} 