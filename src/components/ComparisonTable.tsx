"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Info } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/registry/new-york-v4/ui/tooltip";

// Comparison data structure
interface ComparisonItem {
  feature: string;
  ema: boolean;
  touchscreen: boolean;
  staff: boolean;
  description: string;
}

const comparisonData: ComparisonItem[] = [
  {
    feature: "Çoklu Dil Desteği",
    ema: true,
    touchscreen: false,
    staff: false,
    description: "EMA, 5 dilde doğal konuşma diyaloglarını anlayabilir ve yanıtlayabilir."
  },
  {
    feature: "Doğal Konuşma Tanıma",
    ema: true,
    touchscreen: false,
    staff: true,
    description: "EMA, diyalog akışını takip eder ve bağlamı anlar."
  },
  {
    feature: "Yoğun Saatlerde Ölçekleme",
    ema: true,
    touchscreen: true,
    staff: false,
    description: "Kalabalık anlarda bile tüm müşteri sorgularını aynı hızda yanıtlar."
  },
  {
    feature: "Ürün Bilgisi Erişimi",
    ema: true,
    touchscreen: true,
    staff: true,
    description: "Mağazadaki tüm ürünler hakkında anlık bilgi sağlar."
  },
  {
    feature: "Kişiselleştirilmiş Öneriler",
    ema: true,
    touchscreen: false,
    staff: true,
    description: "Müşteri sorguları ve tercihlerine göre kişiselleştirilmiş öneriler sunar."
  },
  {
    feature: "Konuşma Verilerinden İçgörüler",
    ema: true,
    touchscreen: false,
    staff: false,
    description: "Müşteri etkileşimlerinden değerli içgörüler çıkarır ve raporlar."
  },
  {
    feature: "7/24 Kullanılabilirlik",
    ema: true,
    touchscreen: true,
    staff: false,
    description: "Personel mesai saatleri dışında da hizmet verir."
  },
  {
    feature: "İnsan Müdahalesi Gerektirmez",
    ema: true,
    touchscreen: true,
    staff: false,
    description: "Tamamen otonom çalışır, sürekli insan desteği gerektirmez."
  }
];

const ComparisonTable = () => {
  const [view, setView] = useState<'all' | 'differences'>('all');
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  // Filter data based on view selection
  const filteredData = view === 'all' 
    ? comparisonData 
    : comparisonData.filter(item => !(item.ema && item.touchscreen && item.staff) && !((!item.ema && !item.touchscreen && !item.staff)));

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <h3 className="text-2xl font-bold mb-2">EMA Çözümü Karşılaştırması</h3>
        <p className="text-slate-300">EMA'nın geleneksel yöntemlere göre avantajlarını keşfedin.</p>
      </div>

      {/* View toggle */}
      <div className="bg-slate-100 p-4 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView('all')}
            className={`px-3 py-1 text-sm rounded-md ${
              view === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            } transition-colors`}
          >
            Tüm Özellikler
          </button>
          <button
            onClick={() => setView('differences')}
            className={`px-3 py-1 text-sm rounded-md ${
              view === 'differences' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            } transition-colors`}
          >
            Yalnızca Farklar
          </button>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-slate-500 hover:text-slate-700">
                <Info size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-800 text-white border-slate-700 p-3 max-w-xs">
              <p>Bu karşılaştırma, EMA'nın dokunmatik ekranlar ve insan personeline kıyasla sunduğu avantajları gösterir.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-4 text-left text-slate-700 font-semibold border-b border-slate-200 w-1/3">Özellik</th>
              <th className="p-4 text-center text-slate-700 font-semibold border-b border-slate-200">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-blue-600">EMA</span>
                  <span className="text-xs text-slate-500">Yapay Zeka Asistan</span>
                </div>
              </th>
              <th className="p-4 text-center text-slate-700 font-semibold border-b border-slate-200">
                <div className="flex flex-col items-center gap-1">
                  <span>Dokunmatik Ekran</span>
                  <span className="text-xs text-slate-500">Kiosk</span>
                </div>
              </th>
              <th className="p-4 text-center text-slate-700 font-semibold border-b border-slate-200">
                <div className="flex flex-col items-center gap-1">
                  <span>İnsan Personeli</span>
                  <span className="text-xs text-slate-500">Satış Danışmanı</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredData.map((item, index) => (
                <motion.tr 
                  key={item.feature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`
                    ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} 
                    ${selectedFeature === item.feature ? 'bg-blue-50' : ''}
                    hover:bg-blue-50 cursor-pointer transition-colors
                  `}
                  onClick={() => setSelectedFeature(item.feature === selectedFeature ? null : item.feature)}
                >
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">{item.feature}</td>
                  <td className="p-4 border-b border-slate-100 text-center">
                    {item.ema ? (
                      <div className="flex justify-center">
                        <div className="bg-blue-100 text-blue-600 rounded-full p-1">
                          <Check size={18} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <div className="bg-slate-100 text-slate-400 rounded-full p-1">
                          <X size={18} />
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="p-4 border-b border-slate-100 text-center">
                    {item.touchscreen ? (
                      <div className="flex justify-center">
                        <div className="bg-slate-100 text-slate-600 rounded-full p-1">
                          <Check size={18} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <div className="bg-slate-100 text-slate-400 rounded-full p-1">
                          <X size={18} />
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="p-4 border-b border-slate-100 text-center">
                    {item.staff ? (
                      <div className="flex justify-center">
                        <div className="bg-slate-100 text-slate-600 rounded-full p-1">
                          <Check size={18} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <div className="bg-slate-100 text-slate-400 rounded-full p-1">
                          <X size={18} />
                        </div>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Feature description panel - shown when a feature is selected */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div 
            className="p-4 bg-blue-50 border-t border-blue-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-semibold text-slate-700 mb-2">{selectedFeature}</h4>
            <p className="text-slate-600">
              {comparisonData.find(item => item.feature === selectedFeature)?.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComparisonTable; 