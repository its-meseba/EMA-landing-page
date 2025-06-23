"use client";
import {
    useState,
    useEffect,
    ReactNode,
    CSSProperties,
} from 'react';
import { Button } from "@/registry/new-york-v4/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/registry/new-york-v4/ui/tooltip";
import { Loader2, X } from "lucide-react";
import Image from 'next/image';




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
    /** Primary brand color (defaults to WhatsApp green) */
    themeColor?: string;
}

const EmaModal = ({
    emaUrl,
    title = 'EMA – Etkileşimli Müşteri Asistanı',
    subtitle = 'Ürünleri bulmanın, sorularınızı sormanın en kolay yolu',
    ctaLabel = 'EMA yı Başlat',
    logoSrc,
    brandName,
    socialProof = '+1 200 kişi bugün EMA yı kullandı',
    productCues,
    themeColor = '#0066ff',
}: EmaModalProps) => {
    const [stage, setStage] = useState<Stage>('closed');
    const [showTooltip, setShowTooltip] = useState(false);
    const [showBadge, setShowBadge] = useState(true);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const computedSubtitle = subtitle.replace('{{brand}}', brandName ?? '');



    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setStage('closed');
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        const id = setTimeout(() => {
            if (stage === 'closed') {
                setShowTooltip(true);
            }
        }, 8000);
        return () => clearTimeout(id);
    }, [stage]);

    useEffect(() => {
        const opened = localStorage.getItem('emaAutoOpened');
        if (opened) return;

        const onScroll = () => {
            const scrolled = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
            if (scrolled > 0.75) {
                localStorage.setItem('emaAutoOpened', '1');
                setIsAnimating(true);
                setStage('chat'); // Skip hero and go directly to chat
                cleanup();
            }
        };

        const onLeave = (e: MouseEvent) => {
            if (e.clientY < 0) {
                localStorage.setItem('emaAutoOpened', '1');
                setIsAnimating(true);
                setStage('chat'); // Skip hero and go directly to chat
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
        setShowBadge(false);
        setIsAnimating(true);
        setStage('chat'); // Skip hero stage and go directly to chat
    };

    const handleClose = () => {
        setIsAnimating(false);
        // Delay the actual close to allow exit animation
        setTimeout(() => {
            setStage('closed');
            setIframeLoaded(false);
        }, 300);
    }

    const startChat = () => setStage('chat');

    const open = stage !== 'closed';

    // Trigger enter animation after opening
    useEffect(() => {
        if (open && !isAnimating) {
            // Small delay to ensure DOM is ready
            setTimeout(() => setIsAnimating(true), 10);
        }
    }, [open, isAnimating]);

    // Handle viewport and mobile optimization
    useEffect(() => {
        if (open) {
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';

            // Handle mobile viewport
            const viewport = document.querySelector('meta[name=viewport]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
        } else {
            // Restore body scroll
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';

            // Restore viewport
            const viewport = document.querySelector('meta[name=viewport]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
            }
        }

        return () => {
            // Cleanup on unmount
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
        };
    }, [open]);

    return (
        <>
            <TooltipProvider delayDuration={200}>
                <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
                    <TooltipTrigger asChild>
                        <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50">
                            {/* Persistent Text - Responsive Design */}
                            <div className={`flex items-center gap-2 sm:gap-3 transition-all duration-200 ${open ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                                }`}>
                                {/* Text positioned to the left of button */}
                                <div className="bg-white rounded-full px-3 py-2 sm:px-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
                                    <p className="text-gray-700 font-medium text-xs sm:text-sm md:text-base whitespace-nowrap">
                                        💬 Ne arıyorsan, konuş yeter.
                                    </p>
                                </div>

                                {/* EMA Button */}
                                <Button
                                    onClick={handleOpen}
                                    className="relative flex h-20 w-20 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 md:h-32 md:w-32 animate-subtle-pulse hover:animate-none"
                                    style={{ backgroundColor: themeColor, color: 'white' } as CSSProperties}
                                    aria-label="EMA - Ne arıyorsan, konuş yeter"
                                >
                                    <Image
                                        src="/branding/ema_logo.png"
                                        width={140}
                                        height={140}
                                        alt="EMA"
                                        className="object-contain"
                                    />
                                    {showBadge && (
                                        <span className="absolute top-1 right-1 flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </TooltipTrigger>
                </Tooltip>
            </TooltipProvider>

            {/* Custom Full-Screen Modal */}
            {open && (
                <>
                    {/* Backdrop */}
                    <div
                        className={`fixed inset-0 z-[9998] bg-black/10 backdrop-blur-sm transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'
                            }`}
                        onClick={handleClose}
                    />

                    {/* Modal Content */}
                    <div
                        className={`fixed inset-0 z-[9999] bg-white flex flex-col transition-all duration-500 ease-in-out origin-bottom-right ${isAnimating
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-0'
                            }`}
                    >
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
                                        style={{ backgroundColor: themeColor, color: 'white' } as CSSProperties}
                                    >
                                        {ctaLabel}
                                    </Button>
                                    {socialProof && <p className="text-sm text-gray-500 mt-4">{socialProof}</p>}
                                </div>
                            </div>
                        )}

                        {stage === 'chat' && (
                            <div className={`relative w-full h-full flex flex-col transition-all duration-300 delay-100 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                }`}>
                                {/* Close Button */}
                                <div className={`absolute top-4 right-4 z-20 transition-all duration-300 delay-200 ${isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                                    }`}>
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

                                {/* Loading State */}
                                {!iframeLoaded && (
                                    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-white z-10 transition-all duration-300 delay-300 ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                        }`}>
                                        <Loader2 className="h-12 w-12 animate-spin mb-4" style={{ color: themeColor }} />
                                        <p className="text-gray-600 text-lg font-medium">EMA yükleniyor...</p>
                                        <p className="text-gray-400 text-sm mt-2">Lütfen bekleyin</p>
                                    </div>
                                )}

                                {/* EMA Chat Interface */}
                                <iframe
                                    src={emaUrl}
                                    title="EMA Assistant"
                                    className={`w-full h-full border-none flex-1 transition-all duration-500 delay-400 ${isAnimating && iframeLoaded ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    allow="microphone; speech-recognition; camera"
                                    onLoad={() => setIframeLoaded(true)}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                        overflow: 'hidden'
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

export default EmaModal; 