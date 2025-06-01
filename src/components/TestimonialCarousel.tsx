"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role?: string;
  company: string;
  quote: string;
  image?: string;
  location: string;
  rating?: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "GiyimMarket",
    company: "GiyimMarket",
    quote: "EMA sayesinde yabancı müşterilerle %30 daha fazla satış yaptık.",
    location: "İstanbul",
  },
  {
    id: 2,
    name: "Teknoshop",
    company: "Teknoshop",
    quote: "Ekrana dokunmak yerine konuşmak, özellikle yaşlı müşterilerimizi rahatlattı.",
    location: "Ankara",
  },
  {
    id: 3,
    name: "Outlet 44",
    company: "Outlet 44",
    quote: "Kurulum 20 dakika sürdü, ilk gün 120 ürün sorgusu aldık.",
    location: "İzmir",
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto advance slides
  useEffect(() => {
    if (!isAutoplay) return;

    autoplayTimerRef.current = setTimeout(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [currentIndex, isAutoplay]);

  // Go to previous slide
  const prevSlide = () => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    setIsAutoplay(false);
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Go to next slide
  const nextSlide = () => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    setIsAutoplay(false);
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % testimonials.length
    );
  };

  // Go to specific slide
  const goToSlide = (index: number) => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    setIsAutoplay(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Calculate background position based on current index for parallax effect
  const bgPosition = `${-currentIndex * 25}% center`;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 shadow-2xl">
        {/* Animated background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundPosition: bgPosition,
            transition: "background-position 0.5s ease-out"
          }}
        />

        {/* Testimonial carousel */}
        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction > 0 ? 300 : -300
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -300 : 300
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="py-16 px-6 md:px-16"
            >
              <div className="md:flex gap-8 items-center">
                {/* Testimonial image */}
                <div className="mb-8 md:mb-0 md:w-1/3 flex flex-col items-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-70 mix-blend-overlay" />
                    {/* Placeholder avatar with outline */}
                    <div className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center text-white">
                      <span className="text-3xl font-bold">
                        {testimonials[currentIndex].company.charAt(0)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    {testimonials[currentIndex].rating && (
                      <div className="flex justify-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={`${i < (testimonials[currentIndex].rating || 0)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-slate-600'
                              }`}
                          />
                        ))}
                      </div>
                    )}

                    <p className="text-blue-200 mt-2 text-sm">
                      {testimonials[currentIndex].location}
                    </p>
                  </div>
                </div>

                {/* Testimonial content */}
                <div className="md:w-2/3 relative">
                  <Quote className="absolute top-0 left-0 w-10 h-10 text-blue-500/20 -translate-x-1/2 -translate-y-1/2" />

                  <blockquote className="text-xl md:text-2xl font-light text-white italic mb-8 leading-relaxed">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>

                  <div className="flex flex-col">
                    <div className="font-semibold text-white text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    {testimonials[currentIndex].role && testimonials[currentIndex].company && (
                      <div className="text-blue-300">
                        {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                      </div>
                    )}
                    {!testimonials[currentIndex].role && testimonials[currentIndex].company && (
                      <div className="text-blue-300">
                        {testimonials[currentIndex].company}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots navigation */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/30 hover:bg-white/50'
                }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel; 