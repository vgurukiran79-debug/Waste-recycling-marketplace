import React from 'react';
import { PlusCircle, Recycle } from 'lucide-react';

interface HeaderProps {
  onOpenCreate: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCreate }) => {
  return (
    <header className="sticky top-0 z-30 bg-[#F8FAF7]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single brand wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2.5 text-stone-900 group whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D6A4F] rounded-md"
        >
          <div className="w-8 h-8 rounded-lg bg-[#2D6A4F] flex items-center justify-center text-white shadow-xs group-hover:bg-[#1B4332] transition-colors">
            <Recycle className="w-4.5 h-4.5" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-stone-900">
            Waste Recycling Marketplace
          </span>
        </a>

        {/* Zone 2: Clean single-line text links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a
            href="#marketplace"
            className="hover:text-[#2D6A4F] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Marketplace
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#2D6A4F] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            How It Works
          </a>
          <a
            href="#categories"
            className="hover:text-[#2D6A4F] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Materials
          </a>
          <a
            href="#pbl-details"
            className="hover:text-[#2D6A4F] transition-colors whitespace-nowrap shrink-0 py-1 text-stone-500"
          >
            PBL Overview
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#2D6A4F] hover:bg-[#1B4332] active:bg-[#153427] rounded-lg shadow-xs hover:shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D6A4F] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Waste</span>
          </button>
        </div>
      </div>
    </header>
  );
};
