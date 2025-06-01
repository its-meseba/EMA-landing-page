"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  Languages,
  Brain,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image: string;
  benefits: string[];
}

const features: Feature[] = [
  {
    id: 'voice-recognition',
    title: 'Doğal Dil İşleme',
    description: 'EMA, doğal konuşma dilini anlayabilen ve cevaplayabilen gelişmiş yapay zeka modelini kullanır. Müşterileriniz tıpkı bir insanla konuşur gibi EMA ile iletişim kurabilir.',
    icon: <Volume2 className="h-8 w-8" />,
    color: 'from-blue-600 to-cyan-600',
    image: '/images/voice-recognition.png',
    benefits: [
      'Klavye ve dokunmatik ekran kullanımını ortadan kaldırır',
      'Yaşlı ve teknoloji kullanımına alışkın olmayan müşteriler için idealdir',
      'Eller serbest etkileşim sağlar',
      'Konuşma nüanslarını, tonlamaları ve aksanları anlayabilir'
    ]
  },
  {
    id: 'multilingual',
    title: 'Çoklu Dil Desteği',
    description: 'EMA, beş farklı dilde akıcı iletişim kurabilir. Müşterinin konuştuğu dili otomatik olarak algılar ve aynı dilde yanıt verir, böylece mağazanız uluslararası müşterilere de hitap edebilir.',
    icon: <Languages className="h-8 w-8" />,
    color: 'from-purple-600 to-indigo-600',
    image: '/images/multilingual.png',
    benefits: [
      'Turist ve yabancı müşterilerle iletişim engelini ortadan kaldırır',
      'Çevirmen ihtiyacını ortadan kaldırır',
      'Yabancı dil bilen personel gereksinimini azaltır',
      'Uluslararası müşteri memnuniyetini artırır'
    ]
  },
  {
    id: 'contextual',
    title: 'Bağlamsal Anlama',
    description: 'EMA sadece kelimeleri değil, konuşmanın bağlamını da anlar. Müşterinin ne demek istediğini anlamak için önceki konuşmaları hatırlar ve buna göre yanıt verir.',
    icon: <Brain className="h-8 w-8" />,
    color: 'from-orange-500 to-pink-500',
    image: '/images/contextual.png',
    benefits: [
      'Diyalog akışını mantıklı bir şekilde sürdürür',
      'Müşterinin tekrar bilgi vermesini gerektirmez',
      'Karmaşık müşteri ihtiyaçlarını anlar',
      'Doğal ve insan gibi yanıtlar verir'
    ]
  },
  {
    id: 'analytics',
    title: 'Müşteri İçgörüleri',
    description: 'EMA, müşteri sorguları ve etkileşimleri hakkında değerli veriler toplar. Bu veriler, stok yönetimi, ürün yerleşimi ve müşteri deneyimini geliştirmek için kullanılabilir.',
    icon: <TrendingUp className="h-8 w-8" />,
    color: 'from-emerald-500 to-teal-500',
    image: '/images/analytics.png',
    benefits: [
      'En çok sorulan ürünleri belirler',
      'Satın alma eğilimlerini analiz eder',
      'Müşteri memnuniyetini ölçer',
      'Veri odaklı stok ve satış kararları almanızı sağlar'
    ]
  }
];

const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState<string>(features[0].id);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    // Rotate through features automatically
    const interval = setInterval(() => {
      const currentIndex = features.findIndex(f => f.id === activeFeature);
      const nextIndex = (currentIndex + 1) % features.length;
      setActiveFeature(features[nextIndex].id);
    }, 8000);

    return () => clearInterval(interval);
  }, [activeFeature, isAutoPlaying]);

  // Find the current active feature
  const current = features.find(f => f.id === activeFeature) || features[0];

  return (
    <div className="w-full max-w-6xl mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Feature tabs - side navigation */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-900">EMA'nın Özellikleri</h2>
            <p className="mt-2 text-slate-600">Her özellik, müşteri deneyimini zenginleştirmek için tasarlandı.</p>
          </div>

          <div className="space-y-3">
            {features.map((feature) => (
              <button
                key={feature.id}
                className={`w-full text-left p-4 rounded-lg transition-all ${activeFeature === feature.id
                  ? `bg-gradient-to-r ${feature.color} text-white shadow-lg shadow-${feature.id === 'multilingual' ? 'purple' : feature.id === 'contextual' ? 'orange' : feature.id === 'analytics' ? 'emerald' : 'blue'}-500/20`
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                onClick={() => {
                  setActiveFeature(feature.id);
                  setIsAutoPlaying(false);
                }}
              >
                <div className="flex items-start">
                  <div className={`p-1.5 rounded-md ${activeFeature === feature.id
                    ? 'bg-white/20'
                    : `bg-gradient-to-r ${feature.color} text-white`
                    }`}>
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className={`text-sm mt-1 ${activeFeature === feature.id ? 'text-white/80' : 'text-slate-500'
                      }`}>
                      {feature.description.substring(0, 75)}...
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`text-sm flex items-center py-2 px-4 rounded-md ${isAutoPlaying
                ? 'bg-slate-200 text-slate-800'
                : 'bg-white border border-slate-200 text-slate-600'
                }`}
            >
              {isAutoPlaying ? 'Otomatik Oynatma Açık' : 'Otomatik Oynatma Kapalı'}
            </button>
          </div>
        </div>

        {/* Feature display area */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200 h-full"
            >
              <div className={`p-6 bg-gradient-to-r ${current.color} text-white`}>
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  {current.icon}
                  {current.title}
                </h3>
                <p className="mt-2 text-white/90">{current.description}</p>
              </div>

              <div className="p-6">
                <div className="rounded-lg overflow-hidden bg-slate-100 relative flex items-center justify-center mb-6 pt-[56.25%]">
                  {current.image ? (
                    <Image
                      src={current.image}
                      alt={current.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <p className="text-slate-500 text-sm">Görsel bulunamadı</p>
                  )}
                </div>

                <h4 className="text-lg font-semibold text-slate-800 mb-4">Faydaları</h4>
                <ul className="space-y-3">
                  {current.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="flex items-start"
                    >
                      <span className={`flex-shrink-0 p-1 rounded-full bg-gradient-to-r ${current.color} text-white`}>
                        <ChevronRight className="h-4 w-4" />
                      </span>
                      <span className="ml-3 text-slate-600">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase; 