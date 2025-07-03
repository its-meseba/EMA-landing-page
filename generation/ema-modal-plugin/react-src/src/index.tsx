import React from 'react';
import ReactDOM from 'react-dom/client';
import EmaModal from './components/EmaModal';
import './index.css';

// Extend window type to include our props
declare global {
    interface Window {
        emaModalProps?: {
            emaUrl: string;
            themeColor?: string;
            title?: string;
            subtitle?: string;
            brandName?: string;
            ctaLabel?: string;
            socialProof?: string;
            floatingButtonText?: string;
            buttonPosition?: string;
            debugMode?: boolean;
            mobileSafePosition?: boolean;
        };
    }
}

const rootElement = document.getElementById('ema-modal-root');

if (rootElement) {
    // These props are passed from WordPress via wp_localize_script
    const props = window.emaModalProps;

    // Only render if the essential emaUrl is provided
    if (props && props.emaUrl) {
        const root = ReactDOM.createRoot(rootElement);

        // Type-safe props with proper casting for buttonPosition
        const typedProps = {
            ...props,
            buttonPosition: (props.buttonPosition as 'auto' | 'bottom-right' | 'bottom-right-high' | 'bottom-left' | 'top-right') || 'auto'
        };

        root.render(
            <React.StrictMode>
                <EmaModal {...typedProps} />
            </React.StrictMode>
        );
    } else {
        console.warn('EMA Modal: No emaUrl provided. Please configure the plugin in WordPress admin.');
    }
} 