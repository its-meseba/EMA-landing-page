"use client";

import { useState, useRef, useEffect, CSSProperties } from 'react';
import { Loader2 } from "lucide-react";

interface EmaFullScreenSectionProps {
    /** Iframe source for live EMA */
    emaUrl: string;
    /** Primary brand color for loader */
    themeColor?: string;
    /** Optional className for container */
    className?: string;
    /** Optional placeholder text while loading */
    loadingText?: string;
    /** Optional sub-text while loading */
    loadingSubtext?: string;
}

const EmaFullScreenSection = ({
    emaUrl,
    themeColor = '#0066ff',
    className = '',
    loadingText = 'EMA yükleniyor...',
    loadingSubtext = 'Lütfen bekleyin',
}: EmaFullScreenSectionProps) => {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // Lazy loading with Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Load iframe when section is 50% visible (before user reaches it)
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    setShouldLoad(true);
                    observer.disconnect(); // Stop observing once loaded
                }
            },
            {
                threshold: 0.5,
                rootMargin: '100px' // Start loading 100px before it comes into view
            }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className={`relative w-full h-screen flex flex-col ${className}`}>
            {/* Loading State */}
            {(!iframeLoaded || !shouldLoad) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10 transition-opacity duration-300">
                    <Loader2 className="h-12 w-12 animate-spin mb-4" style={{ color: themeColor }} />
                    <p className="text-muted-foreground text-lg font-medium">{loadingText}</p>
                    <p className="text-muted-foreground/70 text-sm mt-2">{loadingSubtext}</p>
                </div>
            )}

            {/* EMA Chat Interface - Only render when shouldLoad is true */}
            {shouldLoad && (
                <iframe
                    src={emaUrl}
                    title="EMA Assistant"
                    className={`w-full h-full border-none flex-1 transition-opacity duration-500 delay-200 ${iframeLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    allow="microphone; speech-recognition; camera"
                    onLoad={() => setIframeLoaded(true)}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        overflow: 'hidden',
                    }}
                />
            )}
        </section>
    );
};

export default EmaFullScreenSection;
