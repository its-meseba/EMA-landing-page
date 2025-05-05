"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Building2, Globe, Star } from 'lucide-react';

// Define type for metrics state
interface MetricCounts {
  mağaza: number;
  kullanıcı: number;
  dil: number;
  memnuniyet: number;
}

// Define type for metric targets
interface MetricTargets {
  mağaza: number;
  kullanıcı: number;
  dil: number;
  memnuniyet: number;
}

// Define type for metric display props
interface MetricDisplay {
  title: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  color: string;
}

// Main component with multiple metrics
const AnimatedMetrics = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [counts, setCounts] = useState<MetricCounts>({
    mağaza: 0,
    kullanıcı: 0,
    dil: 0,
    memnuniyet: 0,
  });

  const targets: MetricTargets = {
    mağaza: 25,
    kullanıcı: 10000,
    dil: 5,
    memnuniyet: 98,
  };

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setCounts(prevCounts => {
          const newCounts = { ...prevCounts };
          let allReached = true;

          // Update each count
          (Object.keys(targets) as Array<keyof MetricTargets>).forEach(key => {
            if (newCounts[key] < targets[key]) {
              const increment = key === 'kullanıcı' ? 500 : 1;
              newCounts[key] = Math.min(newCounts[key] + increment, targets[key]);
              if (newCounts[key] < targets[key]) allReached = false;
            }
          });

          if (allReached) clearInterval(interval);
          return newCounts;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Metrics to display
  const metricsList: MetricDisplay[] = [
    { 
      title: 'Aktif Mağaza', 
      value: counts.mağaza, 
      suffix: '+',
      icon: <Building2 className="h-6 w-6 text-blue-500" />,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    { 
      title: 'Günlük Kullanıcı', 
      value: counts.kullanıcı, 
      suffix: '+',
      icon: <Users className="h-6 w-6 text-violet-500" />,
      color: 'bg-gradient-to-r from-violet-500 to-purple-500'
    },
    { 
      title: 'Desteklenen Dil', 
      value: counts.dil, 
      suffix: '',
      icon: <Globe className="h-6 w-6 text-amber-500" />,
      color: 'bg-gradient-to-r from-amber-500 to-orange-500'
    },
    { 
      title: 'Müşteri Memnuniyeti', 
      value: counts.memnuniyet, 
      suffix: '%',
      icon: <Star className="h-6 w-6 text-emerald-500" />,
      color: 'bg-gradient-to-r from-emerald-500 to-green-500'
    }
  ];
    
  return (
    <div ref={ref} className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {metricsList.map((metric, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: index * 0.1 }}
          >
            <div className="border border-slate-200 hover:border-slate-300 transition-colors h-full bg-white rounded-lg shadow-sm">
              <div className="p-4 sm:p-6 flex flex-col items-center text-center">
                <div className="mb-3 sm:mb-4">{metric.icon}</div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium mb-1 sm:mb-2">{metric.title}</p>
                <div className="relative font-bold text-2xl sm:text-3xl md:text-4xl flex items-baseline">
                  <span className={`bg-clip-text text-transparent ${metric.color}`}>
                    {metric.value.toLocaleString()}
                  </span>
                  <span className="text-sm sm:text-base text-slate-500 ml-1">{metric.suffix}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedMetrics; 