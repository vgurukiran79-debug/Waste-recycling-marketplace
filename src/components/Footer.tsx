import React from 'react';
import { Recycle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Project Designation */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2D6A4F] flex items-center justify-center text-white shrink-0">
              <Recycle className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="font-display font-bold text-base text-white">
                Waste Recycling Marketplace
              </div>
              <div className="text-xs text-stone-400">
                College PBL Project
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center gap-6 text-xs text-stone-400 font-medium">
            <a href="#top" className="hover:text-white transition-colors">
              Hero
            </a>
            <a href="#marketplace" className="hover:text-white transition-colors">
              Marketplace
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#pbl-details" className="hover:text-white transition-colors">
              Project Scope
            </a>
          </div>

          {/* Disclaimer / Academic Note */}
          <div className="text-xs text-stone-400 text-center md:text-right">
            <span>Educational prototype for resource circularity</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Non-commercial PBL demonstration</span>
          </div>

        </div>
      </div>
    </footer>
  );
};
