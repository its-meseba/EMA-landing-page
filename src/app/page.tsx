"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, Variants, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Separator } from '@/registry/new-york-v4/ui/separator';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent } from '@/registry/new-york-v4/ui/card';
import { ArrowRight, XCircle, Sparkles } from 'lucide-react';
import InteractiveDemo from '@/components/InteractiveDemo';
import ParallaxFeature from '@/components/ParallaxFeature';
import LanguageBubblesDemoScene from '@/components/LanguageBubblesDemoScene';
import ComparisonTable from '@/components/ComparisonTable';
import AnimatedFAQ from '@/components/AnimatedFAQ';
import FeatureShowcase from '@/components/FeatureShowcase';
import VideoShowcase from '@/components/VideoShowcase';
import AnimatedMetrics from '@/components/AnimatedMetrics';
import IntegrationTimeline from '@/components/IntegrationTimeline';
import TestimonialCarousel from '@/components/TestimonialCarousel';

// Create a Badge component since it's not available
const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}>
      {children}
    </span>
  );
};

// Define bubble type for type safety
interface LanguageBubbleProps {
  id: string;
  text: string;
  size: number;
  x: string;
  y: string;
  color: string;
  duration: number;
  delay: number;
  scale: number[];
  rotate: number;
  floatY: number[];
  floatX: number[];
}

// Language Bubble Component - Extracted for better maintainability
const LanguageBubble = ({ bubble }: { bubble: LanguageBubbleProps }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  
  // Simplify animations for users who prefer reduced motion
  const animationSettings = prefersReducedMotion ? {
    opacity: 0.6,
    scale: 1,
    rotate: 0
  } : {
    opacity: [0.4, 0.7, 0.4],
    y: [`${bubble.floatY[0]}%`, `${bubble.floatY[1]}%`, `${bubble.floatY[0]}%`],
    x: [`${bubble.floatX[0]}%`, `${bubble.floatX[1]}%`, `${bubble.floatX[0]}%`],
    scale: bubble.scale,
    rotate: bubble.rotate
  };

  return (
    <motion.div
      className="absolute rounded-full flex items-center justify-center font-light text-white backdrop-blur-sm shadow-lg transform-gpu"
      style={{
        width: bubble.size,
        height: bubble.size,
        backgroundColor: bubble.color,
        left: bubble.x,
        top: bubble.y,
        fontSize: bubble.size * 0.33,
        textAlign: 'center',
        zIndex: isHovered ? 1 : 0,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={animationSettings}
      transition={{
        duration: bubble.duration,
        repeat: Infinity,
        delay: bubble.delay,
        ease: "easeInOut"
      }}
      whileHover={{ 
        scale: prefersReducedMotion ? 1 : 1.15, 
        opacity: 0.9,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      aria-hidden="true" // Accessibility - decorative only
    >
      {bubble.text}
    </motion.div>
  );
};

// Define language bubbles with more variety and improved configuration
const createBubbles = (): LanguageBubbleProps[] => {
  // Common words/phrases related to shopping and assistance in 5 languages
  const phrases = {
    tr: ["Merhaba", "Nasılsın", "Yardım", "Ürünler", "Fiyat", "Teşekkürler"],
    en: ["Hello", "Help", "Products", "Price", "Thank you", "Where is"],
    ar: ["مرحبا", "مساعدة", "منتجات", "سعر", "شكرا", "أين"],
    ru: ["Привет", "Помощь", "Продукты", "Цена", "Спасибо", "Где"],
    de: ["Hallo", "Hilfe", "Produkte", "Preis", "Danke", "Wo ist"]
  };
  
  // Create a diverse set of bubbles
  const allBubbles: LanguageBubbleProps[] = [];
  
  // Helper to get random value in range
  const random = (min: number, max: number) => Math.random() * (max - min) + min;
  
  // Create bubbles for each language
  Object.entries(phrases).forEach(([lang, words]) => {
    words.forEach((word, i) => {
      // Skip some words to avoid overcrowding
      if (Math.random() > 0.75) return;
      
      allBubbles.push({
        id: `${lang}${i}`,
        text: word,
        size: random(65, 110),
        x: `${random(5, 95)}%`,
        y: `${random(5, 95)}%`,
        color: `rgba(${random(59, 147)}, ${random(130, 211)}, ${random(246, 254)}, ${random(0.15, 0.35)})`,
        duration: random(15, 25),
        delay: random(0, 3),
        scale: [random(0.85, 1), random(1, 1.2), random(0.85, 1)],
        rotate: random(-5, 5),
        floatY: [random(-5, -2), random(2, 5)],  // Y movement range
        floatX: [random(-3, 0), random(0, 3)]    // X movement range
      });
    });
  });
  
  // Return a randomized subset - fewer on mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const count = isMobile ? 8 : 16;
  
  return allBubbles
    .sort(() => Math.random() - 0.5)  // Shuffle
    .slice(0, count);                 // Take subset
};

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger children animations
      delayChildren: 0.3,   // Wait a bit before starting children
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const taglineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5, // Delay the tagline slightly after container appears
      staggerChildren: 0.08, // Stagger characters
    },
  },
};

const characterVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] } // Custom cubic bezier for smooth pop
  },
};

export default function LandingPage() {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const logoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (logoContainerRef.current && window.innerWidth >= 1024) {
        const rect = logoContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = (event.clientX - centerX) / 20;
        const offsetY = (event.clientY - centerY) / 20;
        setTransform({ x: -offsetX, y: -offsetY });
      } else {
        setTransform({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
       setTransform({ x: 0, y: 0 });
    }

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave); 

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Generate bubbles (memoized to avoid re-creation on each render)
  const [bubbles, setBubbles] = useState<LanguageBubbleProps[]>([]);
  
  useEffect(() => {
    setBubbles(createBubbles());
    
    // Regenerate bubbles when window is resized
    const handleResize = () => {
      setBubbles(createBubbles());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Split the second tagline for character animation
  const tagline2 = "EMA sizi anlasın.";
  const taglineChars = tagline2.split("");

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0e0f1a] to-[#1a2333] text-white overflow-hidden relative py-12 md:py-0">
        {/* Language Bubbles Background - with hardware-accelerated animations */}
        <div className="absolute inset-0 z-0 overflow-hidden will-change-transform">
          {bubbles.map((bubble) => (
            <LanguageBubble key={bubble.id} bubble={bubble} />
          ))}
        </div>

        <motion.div
          className="container grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 px-5 md:px-8 py-12 md:py-16 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="lg:col-span-3 flex flex-col justify-center space-y-6 md:space-y-8 z-10"
            variants={itemVariants}
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-playfair font-bold tracking-tighter leading-[0.9] mb-4 md:mb-6"
              variants={taglineVariants}
            >
              <motion.span className="block text-shadow-lg" variants={characterVariants}>
                Konuşun,
              </motion.span>

              <motion.span
                className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent animate-gradient-shift mt-2"
                variants={taglineVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                {taglineChars.map((char, index) => (
                  <motion.span
                    key={`${char}-${index}`}
                    variants={characterVariants}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl md:text-3xl font-inter text-slate-300 font-light max-w-2xl leading-relaxed"
              variants={itemVariants}
            >
              Mağazada sorular canlı, cevaplar da öyle olsun. Sesi ve dili anlayan, insan gibi yanıt veren asistanınız.
            </motion.p>

            <motion.div className="pt-4" variants={itemVariants}>
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-montserrat shadow-blue-500/30 shadow-lg transition-all hover:shadow-blue-500/50 hover:translate-y-[-2px] w-full sm:w-auto">
                Pilot Kuruluma Başvur
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="lg:col-span-2 flex items-center justify-center mt-8 lg:mt-0"
            ref={logoContainerRef}
            variants={itemVariants}
          >
            <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[450px] w-full max-w-md">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
                style={{
                  transform: `translate(${transform.x}px, ${transform.y}px)`
                }}
              >
                <div className="animate-pulse-glow w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-gradient-radial from-blue-600/20 via-blue-600/5 to-transparent rounded-full flex items-center justify-center p-4">
                  <Image
                    src="/branding/ema_logo.png"
                    alt="EMA Logo"
                    width={400}
                    height={400}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="min-h-screen w-full flex items-center justify-center bg-slate-900 text-white py-16 md:py-24">
        <div className="container px-5 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold mb-10 md:mb-16 tracking-tighter leading-[1.1] max-w-4xl mx-auto">
              Müşteriler arıyor, <span className="text-red-400">dokunmatik ekranlar</span> yetmiyor.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">
              {[
                "Yazmakla uğraşmak istemeyen müşteriler...",
                "Kalabalıkta sesini duyuramayan satış ekibi...",
                "Farklı diller, sınırlı zaman..."
              ].map((problem, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-all group">
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-red-400 mb-4 transform group-hover:scale-110 transition-transform">
                      <XCircle className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                    <p className="text-base sm:text-lg text-slate-300 font-inter">{problem}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="relative py-8 sm:py-10 px-6 sm:px-8 bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-xl border border-slate-700">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 text-4xl sm:text-5xl text-slate-700">"</div>
              <p className="text-xl sm:text-2xl md:text-3xl text-center text-slate-300 italic font-playfair">
                Teknoloji konuştuğumu anlayamıyorsa, kimin için var?
              </p>
              <div className="absolute -right-3 bottom-5 text-4xl sm:text-5xl text-slate-700">"</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Interactive Language Demo Scene */}
      <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 text-white py-16 md:py-24">
        <div className="container px-5 md:px-8">
          <div className="max-w-5xl mx-auto text-center mb-10 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold mb-4 sm:mb-6 tracking-tighter leading-[1.1]">
              Dillerarası <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Etkileşim</span> Deneyimi
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-inter leading-relaxed">
              EMA'nın farklı dillerdeki kelimeleri algılama yeteneğini interaktif olarak keşfedin.
            </p>
          </div>
          
          <LanguageBubblesDemoScene />
        </div>
      </section>

      {/* Guide Section */}
      <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container px-5 md:px-8">
          <div className="max-w-5xl mx-auto text-center mb-10 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold mb-4 sm:mb-6 tracking-tighter leading-[1.1]">
              Konuşan, dinleyen, <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">anlayan</span> asistan.
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-inter leading-relaxed">
              EMA, her müşterinin ihtiyacını doğal bir diyalogla karşılar.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-10 md:mb-12">
            {[
              {
                title: "5 Dil",
                description: "Türkçe, İngilizce, Arapça, Rusça, Almanca",
                icon: "🌐"
              },
              {
                title: "Doğal Konuşma",
                description: "Yazma yok, dokunma yok. Sadece konuşun.",
                icon: "🗣️"
              },
              {
                title: "Bağlamsal Zekâ",
                description: "Tutarlı cevaplar, akıllı öneriler, öğrenen sistem.",
                icon: "🧠"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-blue-500/50 transition-all overflow-hidden group">
                <CardContent className="p-6 sm:p-8 relative">
                  <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-blue-500/10 rounded-full -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-colors"></div>
                  <div className="text-3xl sm:text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-montserrat font-bold mb-2 sm:mb-3 text-white">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-slate-300 font-inter">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <p className="text-center text-base sm:text-lg text-blue-400 italic font-playfair">
            Sizi ve müşterinizi anlıyoruz.
          </p>
        </div>
      </section>

      {/* NEW SECTION: Parallax Feature */}
      <ParallaxFeature />

      {/* Plan Section */}
      <section className="min-h-screen w-full flex items-center justify-center bg-white py-16 md:py-24">
        <div className="container px-5 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold text-center text-slate-900 mb-10 md:mb-16 tracking-tighter leading-[1.1]">
              3 Kolay Adım
            </h2>
            
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-blue-100 hidden md:block"></div>
              
              {[
                {
                  step: "1",
                  title: "EMA'yı Kurun",
                  description: "Dakikalar içinde aktif."
                },
                {
                  step: "2",
                  title: "Müşteriniz Konuşsun",
                  description: "\"Merhaba, kırmızı mont var mı?\""
                },
                {
                  step: "3",
                  title: "Bilgiler Ekrana Gelsin",
                  description: "Stok, fiyat, yön tarifleri anında."
                }
              ].map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-12 mb-10 sm:mb-16 last:mb-0 relative">
                  <div className="md:w-1/2 md:text-right order-2 md:order-1 text-center md:text-right">
                    {index % 2 === 0 ? (
                      <>
                        <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900 mb-1 sm:mb-2">{step.title}</h3>
                        <p className="text-sm sm:text-base text-slate-600 font-inter leading-relaxed">{step.description}</p>
                      </>
                    ) : <div className="md:h-24"></div>}
                  </div>
                  
                  <div className="flex items-center justify-center z-10 order-1 md:order-2">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-500 text-white flex items-center justify-center font-montserrat font-bold text-xl sm:text-2xl shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 order-3 text-center md:text-left">
                    {index % 2 === 1 ? (
                      <>
                        <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900 mb-1 sm:mb-2">{step.title}</h3>
                        <p className="text-sm sm:text-base text-slate-600 font-inter leading-relaxed">{step.description}</p>
                      </>
                    ) : <div className="md:h-24"></div>}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 sm:mt-16 text-center">
              <Badge className="px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-montserrat bg-blue-50 text-blue-800 border border-blue-200 rounded-full">
                Sade kurulum, eğitim gerekmez.
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Video Showcase */}
      <section className="w-full py-14 sm:py-20 bg-gradient-to-b from-slate-100 to-white">
        <div className="container px-5 md:px-8 mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-bold mb-3 sm:mb-4 text-slate-900 tracking-tighter leading-[1.1]">EMA Nasıl Çalışır?</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-inter leading-relaxed">
              Gelişmiş yapay zeka asistanımızın müşterilerle doğal dilde nasıl etkileşim kurduğunu görmek için videoyu izleyin.
            </p>
          </div>
          
          <VideoShowcase 
            title="EMA Yapay Zeka Asistanı"
            description="5 dilde müşterilerle doğal konuşma akışında iletişim kurar"
            videoSrc="/videos/ema-demo.mp4"
            posterSrc="/videos/ema-poster.jpg"
          />
        </div>
      </section>

      {/* Add animated metrics section */}
      <section className="w-full py-12 sm:py-16 bg-white">
        <div className="container px-5 md:px-8 mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-bold mb-3 sm:mb-4 text-slate-900 tracking-tighter leading-[1.1]">Rakamlarla EMA</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-inter leading-relaxed">
              Her geçen gün daha fazla mağaza ve müşteriye hizmet veriyoruz
            </p>
          </div>
          
          <AnimatedMetrics />
        </div>
      </section>
      
      {/* Integration timeline section */}
      <section className="w-full py-16 bg-slate-50">
        <IntegrationTimeline />
      </section>
      
      {/* Enhanced testimonials section */}
      <section className="w-full py-14 sm:py-20 bg-white">
        <div className="container px-5 md:px-8 mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-bold mb-3 sm:mb-4 text-slate-900 tracking-tighter leading-[1.1]">Müşterilerimiz Ne Diyor?</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-inter leading-relaxed">
              EMA'yı mağazalarında kullanan iş ortaklarımızın deneyimleri
            </p>
          </div>
          
          <TestimonialCarousel />
        </div>
      </section>

      {/* NEW SECTION: Feature Showcase */}
      <section className="min-h-screen w-full flex items-center justify-center bg-slate-100 py-24">
        <div className="container px-4">
          <FeatureShowcase />
        </div>
      </section>

      {/* Loss Section */}
      <section className="min-h-screen w-full flex items-center justify-center bg-slate-900 text-white py-16 md:py-24">
        <div className="container px-5 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold mb-10 md:mb-16 text-center tracking-tighter leading-[1.1]">
              Olmazsa <span className="text-red-400">Ne Olur?</span>
            </h2>
            
            <div className="space-y-6 sm:space-y-10 mb-10 md:mb-16">
              {[
                "Müşteri ürünü bulamadan mağazayı terk eder.",
                "Yabancı müşteriyle iletişim kopar.",
                "Satış potansiyeli boşa gider."
              ].map((loss, index) => (
                <div key={index} className="flex items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-r from-red-900/30 to-slate-800 rounded-xl border border-red-900/30">
                  <div className="text-red-500 shrink-0">
                    <XCircle className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <p className="text-base sm:text-xl text-slate-300 font-inter leading-relaxed">{loss}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-red-900/20 border border-red-900/30 p-4 sm:p-6 text-center rounded-xl">
              <p className="text-base sm:text-lg text-red-300 font-montserrat">
                Her kaybedilen soru, kaybedilen ciro demektir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Section */}
      <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container px-5 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold mb-10 md:mb-16 text-center tracking-tighter leading-[1.1]">
              Olursa <span className="text-emerald-400">Ne Kazanırsınız?</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 mb-10 md:mb-16">
              {[
                "Müşteri memnun, mağaza verimli",
                "Çalışan huzurlu, sorular azalır",
                "Her konuşma içgörüye dönüşür",
                "Satış artışı somutlaşır"
              ].map((gain, index) => (
                <Card key={index} className="bg-gradient-to-br from-emerald-900/40 to-slate-800 border-emerald-900/20 hover:border-emerald-500/50 transition-all group">
                  <CardContent className="p-4 sm:p-8 flex items-start gap-4 sm:gap-6">
                    <div className="text-emerald-400 shrink-0 transform group-hover:scale-110 transition-transform">
                      <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <p className="text-base sm:text-xl text-slate-300 font-inter leading-relaxed">{gain}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <p className="text-center text-base sm:text-lg text-emerald-400 italic font-playfair">
              Teknoloji artık gerçekten yardımcı.
            </p>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Comparison Table */}
      <section className="min-h-screen w-full flex items-center justify-center bg-slate-50 py-16 md:py-24">
        <div className="container px-5 md:px-8">
          <div className="max-w-5xl mx-auto text-center mb-10 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold mb-4 sm:mb-6 text-slate-900 tracking-tighter leading-[1.1]">
              Çözüm <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">Karşılaştırması</span>
            </h2>
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-inter leading-relaxed">
              EMA'nın geleneksel yöntemlere göre sunduğu avantajları keşfedin.
            </p>
          </div>
          
          <ComparisonTable />
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-100 to-white py-16 md:py-24">
        <div className="container px-5 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold mb-10 md:mb-16 text-center text-slate-900 tracking-tighter leading-[1.1]">
              Onlar Ne <span className="text-blue-600">Diyor?</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  quote: "EMA sayesinde yabancı müşterilerle %30 daha fazla satış yaptık.",
                  author: "GiyimMarket",
                  location: "İstanbul"
                },
                {
                  quote: "Ekrana dokunmak yerine konuşmak, özellikle yaşlı müşterilerimizi rahatlattı.",
                  author: "Teknoshop",
                  location: "Ankara"
                },
                {
                  quote: "Kurulum 20 dakika sürdü, ilk gün 120 ürün sorgusu aldık.",
                  author: "Outlet 44",
                  location: "İzmir"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-6 sm:p-8 shadow-xl shadow-slate-200 border border-slate-100 flex flex-col h-full transform hover:translate-y-[-5px] transition-transform">
                  <div className="mb-4 sm:mb-6 text-xl sm:text-2xl text-blue-500 font-playfair">"</div>
                  <p className="text-base sm:text-lg text-slate-700 mb-6 sm:mb-8 flex-grow font-inter leading-relaxed">{testimonial.quote}</p>
                  <div>
                    <p className="font-bold text-slate-900 font-montserrat">{testimonial.author}</p>
                    <p className="text-slate-500 font-inter">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Animated FAQ */}
      <section className="min-h-screen w-full flex items-center justify-center bg-white py-16 md:py-24">
        <div className="container px-5 md:px-8">
          <div className="max-w-5xl mx-auto text-center mb-10 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold mb-4 sm:mb-6 text-slate-900 tracking-tighter leading-[1.1]">
              Merak <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">Ettikleriniz</span>
            </h2>
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-inter leading-relaxed">
              EMA hakkında sıkça sorulan soruları ve cevaplarını bulun.
            </p>
          </div>
          
          <AnimatedFAQ />
        </div>
      </section>

      {/* CTA Section (Final) */}
      <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1a2333] to-[#0e0f1a] text-white py-16 md:py-24">
        <div className="container px-5 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 sm:mb-8 px-3 sm:px-4 py-1 font-montserrat bg-amber-500/20 text-amber-300 border-amber-500/20 uppercase tracking-wider text-xs sm:text-sm rounded-full">
              İlk 50 Mağaza
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold mb-8 sm:mb-12 tracking-tighter leading-[1.1]">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Fırsatı</span> Kaçırmayın
            </h2>
            
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full px-8 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl font-montserrat shadow-amber-500/30 shadow-lg transition-all hover:shadow-amber-500/50 hover:translate-y-[-2px] w-full sm:w-auto">
              Pilot Kuruluma Başvur
            </Button>
            
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-slate-400 font-inter">
              İlk 50 mağazaya özel lansman indirimi.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-[#0e0f1a] text-white py-12 sm:py-16">
        <div className="container px-5 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-10 sm:mb-12">
            <div>
              <div className="mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold font-playfair bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">EMA</span>
              </div>
              <p className="text-sm sm:text-base text-slate-400 max-w-xs font-inter leading-relaxed">
                Teknolojiyi Konuşma Kolaylığında Sunuyoruz.
              </p>
            </div>
            
            <div>
              <h3 className="font-montserrat font-semibold text-base sm:text-lg mb-3 sm:mb-4">Yasal</h3>
              <ul className="space-y-2 sm:space-y-3 font-inter">
                {["KVKK", "Gizlilik Politikası", "Çerez Politikası"].map((link, index) => (
                  <li key={index}>
                    <Link href="#" className="text-sm sm:text-base text-slate-400 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-montserrat font-semibold text-base sm:text-lg mb-3 sm:mb-4">İletişim</h3>
              <ul className="space-y-2 sm:space-y-3 font-inter">
                <li className="text-sm sm:text-base text-slate-400">info@ema.ai</li>
                <li className="text-sm sm:text-base text-slate-400">+90 212 000 00 00</li>
                <li className="flex gap-3 sm:gap-4 pt-2 sm:pt-3">
                  {["LinkedIn", "Instagram", "YouTube"].map((social, index) => (
                    <Link key={index} href="#" className="text-sm sm:text-base text-slate-400 hover:text-white transition-colors">
                      {social}
                    </Link>
                  ))}
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-slate-800 mb-6 sm:mb-8" />
          
          <p className="text-center text-xs sm:text-sm text-slate-500 font-inter">
            © 2025 EMA. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </main>
  );
}
