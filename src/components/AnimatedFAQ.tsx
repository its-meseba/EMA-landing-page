"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { z } from 'zod';

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
  category: z.string(),
});

const faqsSchema = z.array(faqItemSchema);

const faqCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

const faqCategoriesSchema = z.array(faqCategorySchema);

interface AnimatedFAQProps {
  onContactClick: () => void;
}

const AnimatedFAQ = ({ onContactClick }: AnimatedFAQProps) => {
  const { t } = useLanguage();
  const faqsSource = t('faq.questions');
  const faqsResult = faqsSchema.safeParse(faqsSource);
  const faqs = faqsResult.success ? faqsResult.data : [];

  const categoriesSource = t('faq.categories');
  const categoriesResult = faqCategoriesSchema.safeParse(categoriesSource);
  const categories = categoriesResult.success ? categoriesResult.data : [];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" ||
      faq.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const highlightText = (text: string) => {
    if (!searchQuery) return text;

    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, i) => {
      return part.toLowerCase() === searchQuery.toLowerCase() ?
        <span key={i} className="bg-yellow-200 text-slate-900 rounded px-1">{part}</span> :
        part;
    });
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setOpenIndex(null);
  };

  if (!faqs.length || !categories.length) {
    return null;
  }

  const altTitle = t('faq.altTitle');
  const altSubtitle = t('faq.altSubtitle');
  const searchPlaceholder = t('faq.searchPlaceholder');
  const noResultsTitle = t('faq.noResultsTitle');
  const noResultsSubtitle = t('faq.noResultsSubtitle');
  const footerText = t('faq.footerText');
  const footerButton = t('faq.footerButton');

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-xl" ref={containerRef}>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">{typeof altTitle === 'string' ? altTitle : ''}</h2>
      <p className="text-slate-600 mb-6">{typeof altSubtitle === 'string' ? altSubtitle : ''}</p>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder={typeof searchPlaceholder === 'string' ? searchPlaceholder : ''}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIndex(null);
            }}
            className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
          <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index: number) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border border-slate-200 rounded-lg overflow-hidden"
            >
              <motion.button
                className={`w-full p-4 flex justify-between items-center text-left focus:outline-none transition-colors ${openIndex === index ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'
                  }`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                whileTap={{ scale: 0.995 }}
              >
                <span className="font-medium text-slate-800">
                  {highlightText(faq.question)}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className={`h-5 w-5 ${openIndex === index ? 'text-blue-600' : 'text-slate-400'}`} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-slate-50 border-t border-slate-200">
                      <p className="text-slate-600">
                        {highlightText(faq.answer)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Search className="text-slate-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-1">{typeof noResultsTitle === 'string' ? noResultsTitle : ''}</h3>
            <p className="text-slate-500">{typeof noResultsSubtitle === 'string' ? noResultsSubtitle : ''}</p>
          </motion.div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 text-center">
        <p className="text-slate-600">{typeof footerText === 'string' ? footerText : ''}</p>
        <button
          onClick={onContactClick}
          className="mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
          {typeof footerButton === 'string' ? footerButton : ''}
        </button>
      </div>
    </div>
  );
};

export default AnimatedFAQ; 