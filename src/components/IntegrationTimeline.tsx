"use client";

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { CalendarCheck, Users, Zap, Database, Sparkles, Award } from 'lucide-react';

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  highlights: string[];
}

const steps: TimelineStep[] = [
  {
    id: 1,
    title: "Keşif ve Planlama",
    description: "Mağazanızın ihtiyaçlarını anlamak ve EMA'yı nasıl entegre edeceğimizi planlamak için bir toplantı düzenleriz.",
    duration: "1-2 Gün",
    icon: <CalendarCheck className="w-6 h-6 text-blue-600" />,
    highlights: [
      "Mağaza düzeni ve akışının analizi",
      "Müşteri yolculuk haritası çıkarma",
      "Özelleştirme gereksinimlerinin belirlenmesi"
    ]
  },
  {
    id: 2,
    title: "Teknik Entegrasyon",
    description: "EMA'yı mevcut sistemlerinizle entegre eder ve gerekli donanımın kurulumunu yaparız.",
    duration: "1 Gün",
    icon: <Zap className="w-6 h-6 text-purple-600" />,
    highlights: [
      "Donanım kurulumu ve kalibrasyonu",
      "Ağ bağlantısı yapılandırması",
      "Güvenlik protokollerinin ayarlanması"
    ]
  },
  {
    id: 3,
    title: "Veri Entegrasyonu",
    description: "EMA'yı ürün kataloğunuz, stok veritabanı ve diğer sistemlerle senkronize ederiz.",
    duration: "2-3 Gün",
    icon: <Database className="w-6 h-6 text-emerald-600" />,
    highlights: [
      "Ürün veritabanı bağlantısı",
      "Fiyatlandırma ve stok bilgisi senkronizasyonu",
      "Özelleştirilmiş yanıtlar için içerik hazırlama"
    ]
  },
  {
    id: 4,
    title: "Ekip Eğitimi",
    description: "Mağaza ekibinize EMA'yı nasıl kullanacaklarını ve yöneteceklerini öğretmek için eğitim veririz.",
    duration: "1 Gün",
    icon: <Users className="w-6 h-6 text-amber-600" />,
    highlights: [
      "Yönetici paneli kullanım eğitimi",
      "Müşteri yönlendirme taktikleri",
      "Sorun giderme ve teknik destek süreçleri"
    ]
  },
  {
    id: 5,
    title: "İnce Ayar ve Optimizasyon",
    description: "EMA'nın performansını izler ve mağazanıza özgü ihtiyaçlara göre optimize ederiz.",
    duration: "Sürekli",
    icon: <Sparkles className="w-6 h-6 text-pink-600" />,
    highlights: [
      "Performans analizi ve iyileştirmeler",
      "Müşteri geri bildirimlerine göre ayarlamalar",
      "Yeni özellik ve yeteneklerin devreye alınması"
    ]
  },
  {
    id: 6,
    title: "Tam Operasyon ve Destek",
    description: "EMA artık tamamen operasyonel! 7/24 teknik destek ve düzenli güncellemelerle yanınızdayız.",
    duration: "Süresiz",
    icon: <Award className="w-6 h-6 text-blue-600" />,
    highlights: [
      "7/24 teknik destek ve izleme",
      "Aylık performans raporları",
      "Düzenli yazılım güncellemeleri"
    ]
  }
];

const IntegrationTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto py-16 px-4"
      style={{ 
        opacity: opacity as any, 
        scale: scale as any 
      }}
    >
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-slate-900 mb-4">EMA Entegrasyon Süreci</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          EMA'yı mağazanıza entegre etmek hızlı ve kolaydır. İşte sizinle birlikte atacağımız adımlar:
        </p>
      </motion.div>
      
      <div className="relative">
        {/* Timeline center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full transform -translate-x-1/2 hidden md:block"></div>
        
        {/* Steps */}
        <div className="space-y-12 relative">
          {steps.map((step, index) => (
            <TimelineItem 
              key={step.id} 
              step={step} 
              index={index} 
            />
          ))}
        </div>
      </div>
      
      <div className="mt-20 bg-blue-50 border border-blue-100 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">4-7</div>
            <div className="text-sm text-slate-600">Günde Kurulum</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-emerald-600 mb-2">99%</div>
            <div className="text-sm text-slate-600">Kesintisiz Çalışma</div>
          </div>
          
          <div className="flex-1 ml-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Hızlı ve Sorunsuz Entegrasyon
            </h3>
            <p className="text-slate-600">
              EMA entegrasyonu, mağazanızın günlük operasyonlarını kesintiye uğratmadan, ortalama bir hafta içinde tamamlanır. 
              Müşterilerinize hizmet vermeye devam ederken, geleceğin teknolojisine geçiş yapın.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Timeline Item Component
const TimelineItem = ({ step, index }: { step: TimelineStep, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} items-center gap-8`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Step number circle for mobile */}
      <div className="md:hidden absolute left-0 top-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg z-10">
        {step.id}
      </div>
      
      {/* Main content */}
      <div className={`md:w-5/12 bg-white p-6 rounded-xl shadow-lg border border-slate-100 
        ${isEven ? 'md:text-right md:items-end' : ''} 
        relative ml-12 md:ml-0 mt-4 md:mt-0 z-10`}
      >
        <div className={`absolute top-6 ${isEven ? 'md:-right-14' : 'md:-left-14'} -left-14 md:left-auto w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg hidden md:flex`}>
          {step.id}
        </div>
        
        <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
          <div className="p-2 rounded-lg bg-slate-100">
            {step.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
        </div>
        
        <p className="text-slate-600 mb-4">{step.description}</p>
        
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <div className={`px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 ${isEven ? 'md:ml-auto' : ''}`}>
              {step.duration}
            </div>
          </div>
          
          <ul className={`space-y-1 text-sm ${isEven ? 'md:text-right' : ''}`}>
            {step.highlights.map((highlight, i) => (
              <li key={i} className="text-slate-700">{highlight}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Center Dot for desktop */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-white border-4 border-blue-600 z-20"></div>
    </motion.div>
  );
};

export default IntegrationTimeline; 