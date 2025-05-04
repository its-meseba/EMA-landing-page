import React from 'react';

interface ProblemSectionProps {
  headline: string;
  problems: string[];
  empathyQuote: string;
}

export function ProblemSection({
  headline,
  problems,
  empathyQuote,
}: ProblemSectionProps) {
  return (
    <section className="bg-[#333333] py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{headline}</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start group">
                <div className="mr-4 mt-1 text-red-500 animate-pulse group-hover:animate-none">❗</div>
                <p className="text-xl text-gray-200">{problem}</p>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center">
            <blockquote className="text-2xl md:text-3xl text-white italic text-center relative px-8">
              <span className="absolute top-0 left-0 text-5xl text-brand-primary opacity-50">"</span>
              {empathyQuote}
              <span className="absolute bottom-0 right-0 text-5xl text-brand-primary opacity-50">"</span>
            </blockquote>
          </div>
        </div>
      </div>
      
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-pattern-retail"></div>
      </div>
    </section>
  );
} 