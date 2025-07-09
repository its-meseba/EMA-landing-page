import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Loader2, X } from './icons/lucide-react';

type Stage = 'closed' | 'hero' | 'chat';

interface ProductCue {
    img: string;
    label: string;
}

interface EmaModalProps {
    /** Iframe source for live EMA */
    emaUrl: string;
    /** Main heading */
    title?: string;
    /** Sub-heading (supports {{brand}} template) */
    subtitle?: string;
    /** CTA button text */
    ctaLabel?: string;
    /** Brand/logo URL */
    logoSrc?: string;
    /** Brand name for dynamic copy */
    brandName?: string;
    /** Social-proof line */
    socialProof?: string;
    /** Optional product thumbnails shown in hero */
    productCues?: ProductCue[];
    /** Primary brand color (defaults to EMA blue) */
    themeColor?: string;
    /** Text for the floating button bubble */
    floatingButtonText?: string;
    /** Button position preference */
    buttonPosition?: 'auto' | 'bottom-right' | 'bottom-right-high' | 'bottom-left' | 'top-right';
}

const EmaModal = ({
    emaUrl,
    title = 'EMA – Interactive Customer Assistant',
    subtitle = 'The easiest way to find products and get answers',
    ctaLabel = 'Start EMA',
    logoSrc,
    brandName,
    socialProof = '+1,200 people used EMA today',
    productCues,
    themeColor = '#0066ff',
    floatingButtonText = '💬 Whatever you are looking for, just say it.',
    buttonPosition = 'auto',
}: EmaModalProps) => {
    const [stage, setStage] = useState<Stage>('closed');
    const [showTooltip, setShowTooltip] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [dynamicPosition, setDynamicPosition] = useState({ bottom: 'bottom-4', right: 'right-4' });

    const computedSubtitle = subtitle.replace('{{brand}}', brandName ?? '');

    // Get position classes based on admin setting and auto-detection
    const getPositionClasses = () => {
        switch (buttonPosition) {
            case 'bottom-left':
                return { bottom: 'bottom-4', right: 'left-4' };
            case 'bottom-right-high':
                return { bottom: 'bottom-[5rem]', right: 'right-4' };
            case 'top-right':
                return { bottom: 'top-4', right: 'right-4' };
            case 'bottom-right':
                return { bottom: 'bottom-4', right: 'right-4' };
            case 'auto':
            default:
                return dynamicPosition;
        }
    };

    // Auto-detect existing floating buttons and adjust position (only for 'auto' mode)
    useEffect(() => {
        if (buttonPosition !== 'auto') return;

        const detectExistingButtons = () => {
            // Common selectors for WhatsApp and other floating buttons
            const commonSelectors = [
                '[href*="wa.me"]',
                '[href*="whatsapp"]',
                '.whatsapp-button',
                '.wa-button',
                '.floating-button',
                '[style*="position: fixed"][style*="bottom"][style*="right"]',
                '.fixed.bottom-4.right-4',
                '.fixed.bottom-5.right-5'
            ];

            let hasConflict = false;
            const existingButtons = document.querySelectorAll(commonSelectors.join(', '));

            existingButtons.forEach((button) => {
                const rect = button.getBoundingClientRect();
                const styles = window.getComputedStyle(button);

                // Check if button is in bottom-right area
                if (styles.position === 'fixed' &&
                    rect.bottom > window.innerHeight - 100 &&
                    rect.right > window.innerWidth - 100) {
                    hasConflict = true;
                }
            });

            if (hasConflict) {
                // Position EMA button above other floating buttons
                setDynamicPosition({
                    bottom: 'bottom-[5rem]', // 80px from bottom instead of 16px
                    right: 'right-4'
                });
            }
        };

        detectExistingButtons();

        // Re-check after page content loads
        const timeoutId = setTimeout(detectExistingButtons, 1000);
        return () => clearTimeout(timeoutId);
    }, [buttonPosition]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setStage('closed');
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (stage === 'closed') setShowTooltip(true);
        }, 8000);
        return () => clearTimeout(timeoutId);
    }, [stage]);

    useEffect(() => {
        if (localStorage.getItem('emaAutoOpened')) return;

        const onScroll = () => {
            if ((window.scrollY + window.innerHeight) / document.body.scrollHeight > 0.75) {
                localStorage.setItem('emaAutoOpened', '1');
                setIsAnimating(true);
                setStage('chat');
                cleanup();
            }
        };

        const onLeave = (e: MouseEvent) => {
            if (e.clientY < 0) {
                localStorage.setItem('emaAutoOpened', '1');
                setIsAnimating(true);
                setStage('chat');
                cleanup();
            }
        };

        const cleanup = () => {
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('mouseleave', onLeave);
        };

        window.addEventListener('scroll', onScroll);
        document.addEventListener('mouseleave', onLeave);
        return cleanup;
    }, []);

    const handleOpen = () => {
        setShowTooltip(false);
        setIsAnimating(true);
        setStage('chat');
    };

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setStage('closed');
            setIframeLoaded(false);
        }, 300);
    };

    const startChat = () => setStage('chat');

    const open = stage !== 'closed';

    useEffect(() => {
        if (open && !isAnimating) {
            setTimeout(() => setIsAnimating(true), 10);
        }
    }, [open, isAnimating]);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';

            const viewport = document.querySelector('meta[name=viewport]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';

            const viewport = document.querySelector('meta[name=viewport]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
            }
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
        };
    }, [open]);

    const currentPosition = getPositionClasses();

    return (
        <>
            <div className={`fixed ${currentPosition.bottom} ${currentPosition.right} sm:${currentPosition.bottom} sm:${currentPosition.right} z-50 transition-all duration-200 ${open ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Persistent Text Bubble */}
                    <div className="bg-white rounded-full py-1 px-3 sm:py-2 sm:px-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
                        <p className="text-gray-700 font-medium text-xs sm:text-sm whitespace-nowrap">
                            {floatingButtonText}
                        </p>
                    </div>

                    {/* EMA Button */}
                    <Button
                        onClick={handleOpen}
                        className="relative flex h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 animate-subtle-pulse hover:animate-none"
                        style={{ backgroundColor: themeColor, color: 'white' }}
                        aria-label="EMA - Interactive Customer Assistant"
                    >
                        {logoSrc && (
                            <img
                                src={logoSrc}
                                alt="EMA"
                                className="object-contain"
                                style={{ width: '85%', height: '85%' }}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                    if (fallback) fallback.classList.remove('hidden');
                                }}
                            />
                        )}
                        <span className="hidden text-white font-bold text-lg" style={{ fontSize: '20px' }}>
                            EMA
                        </span>
                    </Button>
                </div>
            </div>

            {open && (
                <>
                    <div
                        className={`fixed inset-0 z-[9998] bg-black/10 backdrop-blur-sm transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                        onClick={handleClose}
                    />

                    <div className={`fixed inset-0 z-[9999] bg-white flex flex-col transition-all duration-500 ease-in-out origin-bottom-right ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                        {stage === 'hero' && (
                            <div className="flex flex-col items-center justify-center text-center p-8 h-full">
                                {logoSrc && <img className="h-16 mb-6" src={logoSrc} alt="Logo" />}
                                <div>
                                    <h1 className="text-3xl font-bold">{title}</h1>
                                    <p className="text-lg mt-4 text-gray-600">{computedSubtitle}</p>
                                </div>

                                {productCues?.length ? (
                                    <div className="flex justify-center gap-4 my-6 flex-wrap">
                                        {productCues.map(({ img, label }) => (
                                            <div key={label} className="flex flex-col items-center w-24">
                                                <img src={img} alt={label} className="w-16 h-16 object-cover rounded-lg shadow-md mb-2" />
                                                <span className="text-sm">{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}

                                <div className="flex flex-col items-center mt-auto">
                                    <Button
                                        onClick={startChat}
                                        size="lg"
                                        className="px-8 py-6 text-lg"
                                        style={{ backgroundColor: themeColor, color: 'white' }}
                                    >
                                        {ctaLabel}
                                    </Button>
                                    {socialProof && <p className="text-sm text-gray-500 mt-4">{socialProof}</p>}
                                </div>
                            </div>
                        )}

                        {stage === 'chat' && (
                            <div className={`relative w-full h-full flex flex-col transition-all duration-300 delay-100 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <div className={`absolute top-4 right-4 z-20 transition-all duration-300 delay-200 ${isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>
                                    <Button
                                        onClick={handleClose}
                                        variant="outline"
                                        size="icon"
                                        className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white hover:scale-110 shadow-lg transition-all duration-200"
                                        aria-label="Close EMA Chat"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                {!iframeLoaded && (
                                    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-white z-10 transition-all duration-300 delay-300 ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                                        <Loader2 className="h-12 w-12 animate-spin mb-4" style={{ color: themeColor }} />
                                        <p className="text-gray-600 text-lg font-medium">Loading EMA...</p>
                                        <p className="text-gray-400 text-sm mt-2">Please wait</p>
                                    </div>
                                )}

                                <iframe
                                    src={emaUrl}
                                    title="EMA Assistant"
                                    className={`w-full h-full border-none flex-1 transition-all duration-500 delay-400 ${isAnimating && iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    allow="microphone; speech-recognition; camera"
                                    onLoad={() => setIframeLoaded(true)}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                        overflow: 'hidden',
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export { EmaModal }; 