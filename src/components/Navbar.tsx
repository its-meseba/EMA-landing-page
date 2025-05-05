import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/registry/new-york-v4/ui/button';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-200 dark:bg-gray-950/90 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="/branding/logo.png" 
            alt="EMA Logo" 
            width={120} 
            height={40} 
            className="h-10 w-auto" 
          />
        </Link>
        <div className="flex items-center space-x-4">
          <a 
            href="https://app.ema.solace.com.tr" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Uygulamayı Kullan
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 