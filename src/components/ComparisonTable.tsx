"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/registry/new-york-v4/ui/tooltip";

interface ComparisonFeature {
  name: string;
  ema: boolean;
  touchscreen: boolean;
  human: boolean;
  description?: string;
}

const ComparisonTable = () => {
  const { t } = useLanguage();
  const comparisonData = (t('comparison.features') || []) as ComparisonFeature[];
  const columns = (t('comparison.columns') || { ema: "EMA (AI Assistant)", touchscreen: "Touchscreen Kiosk", human: "Human Staff (Sales Rep)" }) as { ema: string, touchscreen: string, human: string };

  const [view, setView] = useState<'all' | 'differences'>('all');
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const filteredData = view === 'all'
    ? comparisonData
    : comparisonData.filter((item: ComparisonFeature) => !(item.ema && item.touchscreen && item.human) && !((!item.ema && !item.touchscreen && !item.human)));

  if (comparisonData.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <h3 className="text-2xl font-bold mb-2">{t('comparison.altTitle') as string}</h3>
        <p className="text-slate-300">{t('comparison.altSubtitle') as string}</p>
      </div>

      <div className="bg-slate-100 p-4 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView('all')}
            className={`px-3 py-1 text-sm rounded-md ${view === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              } transition-colors`}
          >
            {t('comparison.toggleAll') as string}
          </button>
          <button
            onClick={() => setView('differences')}
            className={`px-3 py-1 text-sm rounded-md ${view === 'differences'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              } transition-colors`}
          >
            {t('comparison.toggleDiff') as string}
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
              <p>{t('comparison.tooltip') as string}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-4 text-left text-slate-700 font-semibold border-b border-slate-200 w-1/3">{t('comparison.featureCol') as string}</th>
              <th className="p-4 text-center text-slate-700 font-semibold border-b border-slate-200">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-blue-600">EMA</span>
                  <span className="text-xs text-slate-500">{columns.ema}</span>
                </div>
              </th>
              <th className="p-4 text-center text-slate-700 font-semibold border-b border-slate-200">
                <div className="flex flex-col items-center gap-1">
                  <span>{t('comparison.touchscreenCol') as string}</span>
                  <span className="text-xs text-slate-500">{columns.touchscreen}</span>
                </div>
              </th>
              <th className="p-4 text-center text-slate-700 font-semibold border-b border-slate-200">
                <div className="flex flex-col items-center gap-1">
                  <span>{t('comparison.staffCol') as string}</span>
                  <span className="text-xs text-slate-500">{columns.human}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredData.map((item: ComparisonFeature, index: number) => (
                <motion.tr
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`
                    ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} 
                    ${selectedFeature === item.name ? 'bg-blue-50' : ''}
                    hover:bg-blue-50 cursor-pointer transition-colors
                  `}
                  onClick={() => setSelectedFeature(item.name === selectedFeature ? null : item.name)}
                >
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">{item.name}</td>
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
                    {item.human ? (
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
              {comparisonData.find((item: ComparisonFeature) => item.name === selectedFeature)?.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComparisonTable; 