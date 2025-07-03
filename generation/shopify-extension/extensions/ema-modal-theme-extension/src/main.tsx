import React from 'react';
import { createRoot } from 'react-dom/client';
import { EmaModal } from './components/EmaModal';
import './index.css';

// Declare global interface for window.emaModalConfig
declare global {
    interface Window {
        emaModalConfig?: {
            emaUrl: string;
            themeColor?: string;
            title?: string;
            subtitle?: string;
            brandName?: string;
            ctaLabel?: string;
            buttonPosition?: string;
            autoTrigger?: boolean;
            locale?: string;
            shopName?: string;
        };
    }
}

// Localized floating button texts
const getLocalizedText = (locale: string): string => {
    const texts: Record<string, string> = {
        'en': '💬 Whatever you are looking for, just say it.',
        'tr': '💬 Ne arıyorsan, konuş yeter.',
        'de': '💬 Was auch immer Sie suchen, sagen Sie es einfach.',
        'ar': '💬 مهما كان ما تبحث عنه ، فقط قله.',
        'ru': '💬 Что бы вы ни искали, просто скажите это.',
        'fr': '💬 Quoi que vous cherchiez, dites-le simplement.',
        'es': '💬 Lo que sea que estés buscando, solo dilo.',
        'it': '💬 Qualunque cosa tu stia cercando, basta dirlo.',
        'pt': '💬 O que você estiver procurando, apenas diga.',
        'nl': '💬 Wat je ook zoekt, zeg het gewoon.',
        'ja': '💬 何を探していても、ただ言ってください。',
        'ko': '💬 무엇을 찾든 그냥 말하세요.',
        'zh': '💬 无论您要寻找什么，只需说出来。'
    };

    return texts[locale] || texts['en'];
};

// Get logo URL for Shopify CDN
const getLogoUrl = (): string => {
    // In a real implementation, this would be uploaded to Shopify CDN
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwMDY2ZmYiLz4KPHRLEHS0B4PSIxMiIgeT0iMTQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMiIgZmlsbD0id2hpdGUiIHJ4PSIyIi8+CjxyZWN0IHg9IjE0IiB5PSIxOCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDY2ZmYiLz4KPC9zdmc+';
};

// Initialize EMA Modal when DOM is ready
const initializeEmaModal = () => {
    const rootElement = document.getElementById('ema-modal-root');

    if (!rootElement) {
        console.warn('EMA Modal: Root element not found');
        return;
    }

    // Get configuration from global window object (set by Liquid template)
    const config = window.emaModalConfig;

    if (!config?.emaUrl) {
        console.warn('EMA Modal: No configuration found or EMA URL missing');
        return;
    }

    // Prepare props for React component
    const props = {
        emaUrl: config.emaUrl,
        themeColor: config.themeColor || '#0066ff',
        title: config.title || 'EMA – Interactive Customer Assistant',
        subtitle: config.subtitle || 'The easiest way to find products and get answers',
        brandName: config.brandName || config.shopName || '',
        ctaLabel: config.ctaLabel || 'Start EMA',
        buttonPosition: (config.buttonPosition as any) || 'auto',
        floatingButtonText: getLocalizedText(config.locale || 'en'),
        logoSrc: getLogoUrl(),
        socialProof: '+1,200 people used EMA today'
    };

    try {
        const root = createRoot(rootElement);
        root.render(
            <React.StrictMode>
                <EmaModal {...props} />
            </React.StrictMode>
        );

        console.log('EMA Modal initialized successfully');
    } catch (error) {
        console.error('EMA Modal initialization failed:', error);
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEmaModal);
} else {
    initializeEmaModal();
} 