"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

// Define sample phrases in multiple languages
const languagePhrases = {
  tr: ["Merhaba", "Nasılsın", "Teşekkürler", "Mağaza nerede?", "Kırmızı", "Yardım", "Fiyat ne kadar?", "Beden"],
  en: ["Hello", "How are you", "Thank you", "Where is the store?", "Red", "Help", "How much?", "Size"],
  ar: ["مرحبا", "كيف حالك", "شكرا", "أين المتجر؟", "أحمر", "مساعدة", "كم سعره؟", "قياس"],
  ru: ["Привет", "Как дела", "Спасибо", "Где магазин?", "Красный", "Помощь", "Сколько?", "Размер"],
  de: ["Hallo", "Wie geht es dir", "Danke", "Wo ist der Laden?", "Rot", "Hilfe", "Wie viel?", "Größe"]
};

// Define bubble interface
interface Bubble {
  id: string;
  text: string;
  language: string;
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  clicked: boolean;
}

const generateBubbles = (count: number): Bubble[] => {
  const bubbles: Bubble[] = [];
  const languages = Object.keys(languagePhrases) as Array<keyof typeof languagePhrases>;
  
  for (let i = 0; i < count; i++) {
    const language = languages[Math.floor(Math.random() * languages.length)];
    const phrases = languagePhrases[language];
    const text = phrases[Math.floor(Math.random() * phrases.length)];
    
    // Generate a color based on the language
    let color;
    switch(language) {
      case 'tr': color = 'rgba(59, 130, 246, 0.7)'; break; // Blue
      case 'en': color = 'rgba(99, 102, 241, 0.7)'; break; // Indigo
      case 'ar': color = 'rgba(139, 92, 246, 0.7)'; break; // Purple
      case 'ru': color = 'rgba(236, 72, 153, 0.7)'; break; // Pink
      case 'de': color = 'rgba(16, 185, 129, 0.7)'; break; // Emerald
      default: color = 'rgba(59, 130, 246, 0.7)';
    }
    
    bubbles.push({
      id: `bubble-${i}`,
      text,
      language,
      x: Math.random() * 100 - 50, // -50 to 50
      y: Math.random() * 100 - 50, // -50 to 50
      z: Math.random() * 50 - 25,  // -25 to 25
      size: Math.random() * 30 + 40, // 40 to 70
      color,
      clicked: false
    });
  }
  
  return bubbles;
};

const LanguageBubble = ({ 
  bubble, 
  mouseX, 
  mouseY, 
  onClick 
}: { 
  bubble: Bubble; 
  mouseX: any;
  mouseY: any; 
  onClick: () => void;
}) => {
  // Create parallax effect based on mouse position
  const x = useTransform(
    mouseX,
    [0, window.innerWidth],
    [bubble.x - 20, bubble.x + 20]
  );
  
  const y = useTransform(
    mouseY,
    [0, window.innerHeight],
    [bubble.y - 20, bubble.y + 20]
  );

  // Add depth effect with z-index
  const scale = useTransform(
    mouseX,
    [0, window.innerWidth],
    [1 - bubble.z / 200, 1 + bubble.z / 200]
  );

  return (
    <motion.div
      className={`absolute rounded-full flex items-center justify-center text-white font-light cursor-pointer backdrop-blur-sm hover:backdrop-blur-md shadow-lg border border-white/10 transition-shadow hover:shadow-xl ${bubble.clicked ? 'ring-2 ring-white' : ''}`}
      style={{
        x,
        y,
        scale,
        backgroundColor: bubble.color,
        width: bubble.size,
        height: bubble.size,
        fontSize: bubble.size * 0.23,
        zIndex: Math.round(50 + bubble.z),
        textAlign: 'center',
        padding: '8px',
      }}
      whileHover={{ 
        scale: scale.get() * 1.1,
        boxShadow: "0 0 15px rgba(255,255,255,0.3)"
      }}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: bubble.clicked ? 1 : 0.8,
      }}
      transition={{ 
        duration: 0.3,
      }}
    >
      {bubble.text}
    </motion.div>
  );
};

const LanguageBubblesDemoScene = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [recognizedWords, setRecognizedWords] = useState<string[]>([]);
  const [recognitionComplete, setRecognitionComplete] = useState(false);
  
  // Generate bubbles on component mount
  useEffect(() => {
    setBubbles(generateBubbles(15));
  }, []);
  
  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Handle bubble click
  const handleBubbleClick = (id: string) => {
    setBubbles(prev => 
      prev.map(bubble => 
        bubble.id === id 
          ? { ...bubble, clicked: !bubble.clicked } 
          : bubble
      )
    );
    
    // Get the clicked bubble
    const clickedBubble = bubbles.find(bubble => bubble.id === id);
    if (clickedBubble && !clickedBubble.clicked) {
      // Add the word to recognized words
      setRecognizedWords(prev => {
        const newWords = [...prev, clickedBubble.text];
        // If we have 5 or more words, trigger the recognition complete effect
        if (newWords.length >= 5 && !recognitionComplete) {
          setTimeout(() => {
            setRecognitionComplete(true);
          }, 1000);
        }
        return newWords;
      });
    }
  };
  
  // Reset demo
  const resetDemo = () => {
    setBubbles(generateBubbles(15));
    setRecognizedWords([]);
    setRecognitionComplete(false);
  };
  
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div
        ref={containerRef}
        className="relative h-[500px] w-full overflow-hidden bg-gradient-to-b from-slate-900/70 to-blue-900/30 rounded-xl border border-slate-700/50 backdrop-blur-sm shadow-xl"
        style={{ perspective: '1000px' }}
      >
        {/* Center point for reference */}
        <div className="absolute left-1/2 top-1/2 w-1 h-1 bg-transparent -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Render bubbles */}
        {bubbles.map(bubble => (
          <LanguageBubble
            key={bubble.id}
            bubble={bubble}
            mouseX={mouseX}
            mouseY={mouseY}
            onClick={() => handleBubbleClick(bubble.id)}
          />
        ))}
        
        {/* Recognition UI */}
        <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md p-4 border-t border-slate-700/50">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="text-white text-sm">
                {recognitionComplete ? (
                  <span className="text-green-400 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    EMA başarıyla kelimeleri algıladı
                  </span>
                ) : (
                  <span>Algılanan kelimeler: {recognizedWords.length}/5</span>
                )}
              </div>
              <button
                onClick={resetDemo}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
              >
                Yeniden Başlat
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {recognizedWords.map((word, index) => (
                <div 
                  key={index}
                  className="px-2 py-1 bg-blue-600/50 rounded-full text-xs text-white border border-blue-400/30"
                >
                  {word}
                </div>
              ))}
              
              {recognitionComplete && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="ml-2 px-3 py-1 bg-green-600/50 rounded-full text-xs text-white border border-green-400/30 flex items-center gap-1"
                >
                  <span className="font-medium">EMA anladı</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-slate-400">
        Fare imlecini hareket ettirerek EMA'nın farklı dillerdeki kelimeleri nasıl algıladığını deneyimleyin.
      </div>
    </div>
  );
};

export default LanguageBubblesDemoScene; 