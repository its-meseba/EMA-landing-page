import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface GuideSectionProps {
  headline: string;
  features: Feature[];
  empathyLine: string;
}

export function GuideSection({
  headline,
  features,
  empathyLine,
}: GuideSectionProps) {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-12">
          {headline}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border border-brand-border bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all hover:translate-y-[-5px]">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-brand-primary-darker">
                    {feature.title}
                  </CardTitle>
                  <div className="text-3xl text-brand-primary">
                    {feature.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg text-brand-primary-darker bg-brand-primary-lightest inline-block py-2 px-6 rounded-full">
            {empathyLine}
          </p>
        </div>
      </div>
    </section>
  );
} 