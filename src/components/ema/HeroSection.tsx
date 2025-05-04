import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/registry/new-york-v4/ui/button';

interface HeroSectionProps {
  tagline: string;
  subheading: string;
  logoSrc: string;
  primaryCTA: {
    text: string;
    href: string;
  };
}

export function HeroSection({
  tagline,
  subheading,
  logoSrc,
  primaryCTA,
}: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#0e0f1a] to-[#1a2333] min-h-[90vh] flex items-center py-16 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-5 gap-8 px-4">
        <div className="md:col-span-3 flex flex-col justify-center space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in">
            {tagline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
            {subheading}
          </p>
          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="bg-brand-primary hover:bg-brand-primary-darker text-white px-8 py-6 text-lg rounded-full transition-all hover:shadow-lg"
            >
              <Link href={primaryCTA.href}>
                {primaryCTA.text}
              </Link>
            </Button>
          </div>
        </div>
        <div className="md:col-span-2 flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src={logoSrc}
              alt="EMA Logo"
              fill
              className="object-contain animate-pulse-slow"
              priority
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[1px]"></div>
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-[#1a2333] to-transparent"></div>
    </section>
  );
} 