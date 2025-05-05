"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Demo conversation data
const demoConversation = [
  { speaker: 'customer', text: 'Merhaba, kırmızı mont var mı?', language: 'tr' },
  { speaker: 'ema', text: 'Evet, farklı modellerde kırmızı montlarımız mevcut. Hangi beden ilginizi çekiyor?', language: 'tr' },
  { speaker: 'customer', text: 'Medium beden olsun. Fiyat aralığı nedir?', language: 'tr' },
  { speaker: 'ema', text: 'Medium beden kırmızı montlarımız 1.200₺ ile 2.500₺ arasında değişiyor. Size özel indirimli ürünlerimiz de mevcut.', language: 'tr' },
  { speaker: 'customer', text: 'Do you have red jackets?', language: 'en' },
  { speaker: 'ema', text: 'Yes, we have red jackets in different styles. What size are you looking for?', language: 'en' },
];

const InteractiveDemo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'tr' | 'en'>('tr');
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to the bottom of the conversation
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [activeIndex]);

  const startDemo = (language: 'tr' | 'en') => {
    setCurrentLanguage(language);
    setActiveIndex(language === 'tr' ? 0 : 4); // Start at the first message of the selected language
    setIsPlaying(true);
  };

  const advanceConversation = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const nextIndex = activeIndex + 1;
    // Check if we've reached the end of the current language conversation
    const isEnd = 
      (currentLanguage === 'tr' && nextIndex > 3) || 
      (currentLanguage === 'en' && nextIndex > 5);

    if (!isEnd) {
      setActiveIndex(nextIndex);
      // Set next message to appear after a delay
      timeoutRef.current = setTimeout(() => {
        advanceConversation();
      }, 3000);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      // Start the conversation advance after a delay
      timeoutRef.current = setTimeout(() => {
        advanceConversation();
      }, 3000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-slate-800 rounded-xl overflow-hidden shadow-xl border border-slate-700">
        <div className="bg-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
          <h3 className="text-white font-medium">EMA Asistan Demo</h3>
          {!isPlaying ? (
            <div className="flex gap-2">
              <button
                onClick={() => startDemo('tr')}
                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors"
              >
                Türkçe Demo
              </button>
              <button
                onClick={() => startDemo('en')}
                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors"
              >
                English Demo
              </button>
            </div>
          ) : (
            <span className="text-xs text-blue-400 animate-pulse">Demo playing...</span>
          )}
        </div>
        
        <div 
          ref={containerRef}
          className="h-[300px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-800 to-slate-900"
        >
          <AnimatePresence>
            {demoConversation.slice(0, activeIndex + 1).map((message, index) => {
              // Only show messages of the current language
              if (message.language !== currentLanguage) return null;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.speaker === 'customer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.speaker === 'customer'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-700 text-slate-100 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        <div className="bg-slate-900 p-4 border-t border-slate-700 flex">
          <input
            type="text"
            placeholder={currentLanguage === 'tr' ? "Mesajınızı yazın (sadece demo)..." : "Type your message (demo only)..."}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-l-md p-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-md transition-colors"
            disabled
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo; 