import React from 'react';
import { Card, CardContent } from '@/registry/new-york-v4/ui/card';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface PlanSectionProps {
  steps: Step[];
  trustNote: string;
}

export function PlanSection({ steps, trustNote }: PlanSectionProps) {
  return (
    <section className="bg-[#f5f5f7] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
          3 Kolay Adım
        </h2>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-brand-primary/30 hidden md:block"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border-t-4 border-t-brand-primary bg-white shadow-md hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white text-xl font-bold mb-2">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-semibold text-brand-primary-darker">
                        {step.title}
                      </h3>
                    </div>
                    <div className="flex justify-center mb-4 text-4xl text-brand-primary">
                      {step.icon}
                    </div>
                    <p className="text-center text-gray-600">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                {/* Timeline dot */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-primary rounded-full hidden md:block"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <p className="text-gray-700 font-medium">{trustNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 