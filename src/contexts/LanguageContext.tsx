'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Import translation files
import trTranslations from '@/configs/locales/tr.json';
import enTranslations from '@/configs/locales/en.json';
import frTranslations from '@/configs/locales/fr.json';

export type Language = 'tr' | 'en' | 'fr';

export type Translations = {
    [key: string]: any;
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => unknown;
    isLoading: boolean;
}

const translations: Record<Language, Translations> = {
    tr: trTranslations,
    en: enTranslations,
    fr: frTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
    initialLanguage?: Language;
}

export function LanguageProvider({ children, initialLanguage = 'tr' }: LanguageProviderProps) {
    const [language, setLanguageState] = useState<Language>(initialLanguage);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Get translation function
    const t = (key: string): unknown => {
        const keys = key.split('.');
        let result: any = translations[language];

        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                // Fallback to Turkish if key not found
                result = translations.tr;
                for (const fallbackK of keys) {
                    if (result && typeof result === 'object' && fallbackK in result) {
                        result = result[fallbackK];
                    } else {
                        return key; // Return the key itself if not found
                    }
                }
                break;
            }
        }

        return result ?? key;
    };

    // Set language and update URL
    const setLanguage = (newLanguage: Language) => {
        setIsLoading(true);
        setLanguageState(newLanguage);

        // Remove current language from pathname if it exists
        const pathWithoutLang = pathname.replace(/^\/(tr|en|fr)/, '') || '/';

        // Navigate to new language route
        router.push(`/${newLanguage}${pathWithoutLang}`);

        // Store in localStorage
        localStorage.setItem('preferred-language', newLanguage);

        setTimeout(() => setIsLoading(false), 300);
    };

    // Initialize language from URL or localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const pathLang = pathname.split('/')[1] as Language;
            if (['tr', 'en', 'fr'].includes(pathLang)) {
                setLanguageState(pathLang);
            } else {
                // Check localStorage
                const storedLang = localStorage.getItem('preferred-language') as Language;
                if (storedLang && ['tr', 'en', 'fr'].includes(storedLang)) {
                    setLanguageState(storedLang);
                }
            }
        }
    }, [pathname]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }

    return context;
}
