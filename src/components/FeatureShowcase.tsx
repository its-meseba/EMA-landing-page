"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  image: string;
  benefits: string[];
}

const FeatureShowcase = () => {
  const { t } = useLanguage();
  const featuresSource = t('features.featuresList') || t('features.featureList');
  const features: Feature[] = Array.isArray(featuresSource) ? featuresSource : [];

  const [activeFeature, setActiveFeature] = useState<string>(features.length > 0 ? features[0].id : '');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || features.length === 0) return;

    const interval = setInterval(() => {
      const currentIndex = features.findIndex(f => f.id === activeFeature);
      const nextIndex = (currentIndex + 1) % features.length;
      setActiveFeature(features[nextIndex].id);
    }, 8000);

    return () => clearInterval(interval);
  }, [activeFeature, isAutoPlaying, features]);

  const current = features.find(f => f.id === activeFeature);

  if (features.length === 0 || !current) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 flex flex-col">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-900">{t('features.title') as string}</h2>
            <p className="mt-2 text-slate-600">{t('features.subtitle') as string}</p>
          </div>

          <div className="space-y-3">
            {features.map((feature) => (
              <button
                key={feature.id}
                className={`w-full text-left p-4 rounded-lg transition-all ${activeFeature === feature.id
                  ? `bg-gradient-to-r ${feature.color} text-white shadow-lg`
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                onClick={() => {
                  setActiveFeature(feature.id);
                  setIsAutoPlaying(false);
                }}
              >
                <div className="flex items-start">
                  <div className={`p-1.5 rounded-md text-2xl flex items-center justify-center ${activeFeature === feature.id
                    ? 'bg-white/20'
                    : `text-white bg-gradient-to-r ${feature.color}`
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
              {isAutoPlaying ? t('features.autoplayOn') as string : t('features.autoplayOff') as string}
            </button>
          </div>
        </div>

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
                  <span className="text-3xl">{current.icon}</span>
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
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <p className="text-slate-500 text-sm">{t('features.imageNotFound') as string}</p>
                  )}
                </div>

                <h4 className="text-lg font-semibold text-slate-800 mb-4">{t('features.benefitsTitle') as string}</h4>
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