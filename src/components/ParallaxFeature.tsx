"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card } from '@/registry/new-york-v4/ui/card';

interface FeatureData {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const features: FeatureData[] = [
  {
    icon: '🔊',
    title: 'Doğal Dil İşleme',
    description: 'İnsan dilini doğal akışında anlar, konuşma dilindeki nüansları yakalar.',
    color: 'from-blue-500/20 to-blue-700/20'
  },
  {
    icon: '🌐',
    title: 'Çoklu Dil Desteği',
    description: 'Türkçe, İngilizce, Arapça, Rusça ve Almanca dillerinde akıcı iletişim kurar.',
    color: 'from-indigo-500/20 to-indigo-700/20'
  },
  {
    icon: '🧠',
    title: 'Bağlamsal Anlama',
    description: 'Sorguları bağlam içinde değerlendirir, konu dışı yanıtları filtreler.',
    color: 'from-purple-500/20 to-purple-700/20'
  },
  {
    icon: '📱',
    title: 'Sorunsuz Entegrasyon',
    description: 'Mevcut sistemlere kolay entegrasyon, minimum teknik gereksinim.',
    color: 'from-green-500/20 to-green-700/20'
  }
];

const ParallaxFeature = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerTop, setContainerTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  // Initialize dimensions
  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (containerRect) {
          setContainerTop(containerRect.top + window.scrollY);
          setContainerHeight(containerRect.height);
          setWindowHeight(window.innerHeight);
        }
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  const { scrollY } = useScroll();

  return (
    <div ref={containerRef} className="relative w-full py-20 overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-800"></div>
      
      {/* Center title */}
      <div className="relative z-10 text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Öne Çıkan Özellikler
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          EMA'nın yapay zeka destekli özellikleri, mağaza deneyimini yeni bir seviyeye taşır.
        </p>
      </div>
      
      {/* Parallax feature cards */}
      <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {features.map((feature, index) => {
          // Calculate parallax effect based on scroll position
          const yRange = [-20, 20]; 
          const rotateRange = index % 2 === 0 ? [-2, 2] : [2, -2];
          
          // Create different scroll speeds for each card
          const yOffset = useTransform(
            scrollY, 
            [containerTop - windowHeight, containerTop + containerHeight], 
            yRange
          );
          
          const rotate = useTransform(
            scrollY, 
            [containerTop - windowHeight, containerTop + containerHeight], 
            rotateRange
          );

          return (
            <motion.div
              key={index}
              style={{ 
                y: yOffset, 
                rotate: rotate 
              }}
              className="w-full perspective"
            >
              <Card className={`h-full backdrop-blur-sm bg-gradient-to-br ${feature.color} border-slate-700/50 hover:border-slate-500 transition-all shadow-xl hover:shadow-2xl`}>
                <div className="relative p-6 md:p-8 h-full z-10 flex flex-col">
                  {/* Background decorative elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
                  
                  {/* Content */}
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-slate-300 flex-grow">{feature.description}</p>
                  
                  {/* Visual indicator of depth */}
                  <div className="mt-6 w-16 h-1 bg-gradient-to-r from-white/80 to-transparent rounded-full"></div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ParallaxFeature; 