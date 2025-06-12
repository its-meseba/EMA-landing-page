"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: "EMA hangi dilleri destekliyor?",
    answer: "EMA şu anda Türkçe, İngilizce, Arapça, Rusça ve Almanca dillerini akıcı şekilde desteklemektedir. Gelecek güncellemelerle dil desteği genişletilecektir.",
    category: "technical"
  },
  {
    question: "EMA'yı mağazama nasıl entegre edebilirim?",
    answer: "EMA entegrasyonu son derece basittir. Kurulum ekibimiz mağazanıza gelir, gerekli donanımı kurar ve sistemlerinizle entegrasyonu sağlar. Ortalama kurulum süresi sadece 2-3 saattir.",
    category: "installation"
  },
  {
    question: "EMA'nın donanım gereksinimleri nelerdir?",
    answer: "EMA için standart bir dokunmatik ekran, mikrofon ve hoparlör sistemi yeterlidir. Ekipmanlar kurulum paketine dahildir ve mağazanıza profesyonel ekibimiz tarafından kurulur.",
    category: "technical"
  },
  {
    question: "Müşterilerim EMA'yı nasıl kullanır?",
    answer: "Müşterileriniz EMA ile tamamen doğal bir şekilde konuşabilir. Ekranda 'Merhaba' veya 'Hello' diyerek başlamaları yeterlidir. EMA, müşterinin dilini otomatik olarak algılar ve o dilde yanıt verir.",
    category: "usage"
  },
  {
    question: "EMA müşteri verilerini kaydediyor mu?",
    answer: "EMA, müşteri etkileşimlerinden değerli içgörüler çıkarır ancak kişisel bilgileri kaydetmez. Sadece ürün sorguları, sıklıkla sorulan sorular gibi mağaza operasyonlarını geliştirmeye yönelik anonim veriler toplanır.",
    category: "privacy"
  },
  {
    question: "Yeni ürünler eklendiğinde EMA'yı güncellemem gerekir mi?",
    answer: "Hayır, EMA bulut tabanlı bir sistemdir ve mağaza envanterinizle otomatik olarak senkronize olur. Yeni ürünler eklediğinizde veya fiyatları değiştirdiğinizde EMA otomatik olarak güncellenir.",
    category: "usage"
  },
  {
    question: "EMA internet bağlantısı olmadan çalışır mı?",
    answer: "EMA optimum performans için internet bağlantısı gerektirir. Ancak kısa süreli bağlantı kesintilerinde temel işlevleri yerine getirebilecek şekilde tasarlanmıştır.",
    category: "technical"
  },
  {
    question: "EMA'nın maliyeti nedir?",
    answer: "EMA için aylık abonelik planları sunuyoruz. Fiyatlandırma, mağaza büyüklüğü ve ihtiyaçlarınıza göre değişir. EMA program için başvuran ilk 50 mağazaya özel lansman indirimleri mevcuttur.",
    category: "pricing"
  }
];

const categories = [
  { id: "all", name: "Tümü" },
  { id: "technical", name: "Teknik" },
  { id: "installation", name: "Kurulum" },
  { id: "usage", name: "Kullanım" },
  { id: "privacy", name: "Gizlilik" },
  { id: "pricing", name: "Fiyatlandırma" }
];

const AnimatedFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [highlightedText, setHighlightedText] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter FAQs based on search query and category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" ||
      faq.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Highlight text in search results
  const highlightText = (text: string) => {
    if (!searchQuery) return text;

    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, i) => {
      return part.toLowerCase() === searchQuery.toLowerCase() ?
        <span key={i} className="bg-yellow-200 text-slate-900 rounded px-1">{part}</span> :
        part;
    });
  };

  // Handle category click
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setOpenIndex(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-xl" ref={containerRef}>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Sıkça Sorulan Sorular</h2>
      <p className="text-slate-600 mb-6">EMA hakkında merak ettiğiniz her şey</p>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Soru ara..."
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
          {categories.map(category => (
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

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
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
            <h3 className="text-lg font-medium text-slate-800 mb-1">Sonuç Bulunamadı</h3>
            <p className="text-slate-500">Aramanızla eşleşen bir soru bulunamadı. Lütfen farklı anahtar kelimeler deneyin veya tüm kategorilere göz atın.</p>
          </motion.div>
        )}
      </div>

      {/* Footer with more help option */}
      <div className="mt-8 pt-6 border-t border-slate-200 text-center">
        <p className="text-slate-600">Aradığınızı bulamadınız mı?</p>
        <button className="mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
          Bize Ulaşın
        </button>
      </div>
    </div>
  );
};

export default AnimatedFAQ; 