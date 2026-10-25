import React, { useState } from 'react';
import { ArrowDown, PlusCircle, Sparkles, Layers, Box, Cpu, RefreshCw, MapPin } from 'lucide-react';
import { CategoryVisual } from './CategoryVisual';

interface HeroProps {
  onOpenCreate: () => void;
  onSelectCategory: (category: 'all' | 'paper' | 'plastic' | 'metal' | 'ewaste') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCreate, onSelectCategory }) => {
  const [activeTab, setActiveTab] = useState<'paper' | 'plastic' | 'metal' | 'ewaste'>('plastic');

  const streamInfo = {
    paper: {
      name: 'Paper & Cardboard',
      tag: 'Baled Boxes & Office Bond',
      volume: 'Clean & dry bundles',
      typicalUse: 'Pulp recovery & eco-packaging',
    },
    plastic: {
      name: 'Plastic Polymers',
      tag: 'HDPE, PET & Polypropylene',
      volume: 'Sorted & rinsed containers',
      typicalUse: 'Shredding flake & extrusion',
    },
    metal: {
      name: 'Metal & Aluminium',
      tag: 'Aluminium Cans, Copper & Brass',
      volume: 'Scrap & compacted metals',
      typicalUse: 'Foundry remelt & fabrication',
    },
    ewaste: {
      name: 'Electronic Waste',
      tag: 'Circuit Boards & Decommissioned Hardware',
      volume: 'Clean electronics lots',
      typicalUse: 'Component reuse & precious metal recycling',
    },
  };

  const handleExploreCategory = (cat: 'paper' | 'plastic' | 'metal' | 'ewaste') => {
    onSelectCategory(cat);
    const marketplaceEl = document.getElementById('marketplace');
    if (marketplaceEl) {
      marketplaceEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="top" className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 overflow-hidden">
      {/* Subtle ecological background ambient gradient */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-radial-[at_top_right] from-[#D8F3DC]/40 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-[#52B788]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* College PBL context banner - clean text, no pill badges */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#2D6A4F] uppercase">
              <span>College PBL Project</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-500">Resource Circularity Initiative</span>
            </div>

            {/* Exact Requested Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.08] text-balance">
              Turn Waste Into <span className="text-[#2D6A4F]">Worth.</span>
            </h1>

            {/* Exact Requested Description */}
            <p className="text-lg sm:text-xl text-stone-600 leading-relaxed max-w-2xl text-pretty font-normal">
              Connect recyclable waste with people who can reuse, collect or recycle it.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href="#marketplace"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#2D6A4F] hover:bg-[#1B4332] active:bg-[#153427] rounded-xl shadow-sm hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D6A4F] cursor-pointer"
              >
                <span>Explore Materials</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCreate}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#1B4332] bg-[#E8F5E9] hover:bg-[#D8EEDC] active:bg-[#C8E6CD] border border-[#2D6A4F]/20 rounded-xl transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D6A4F] cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-[#2D6A4F]" />
                <span>+ List Waste</span>
              </button>
            </div>

            {/* Authentic Stream Indicators - unboxed metadata */}
            <div className="pt-4 border-t border-stone-200/80">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-stone-500 block">Stream 01</span>
                  <span className="font-semibold text-stone-800">Paper & Cardboard</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Stream 02</span>
                  <span className="font-semibold text-stone-800">Plastic Polymers</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Stream 03</span>
                  <span className="font-semibold text-stone-800">Metal & Aluminium</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Stream 04</span>
                  <span className="font-semibold text-stone-800">Electronic Waste</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Attractive Recycling-Themed Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-5 space-y-4">
              
              {/* Card Header & Stream Switcher */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-wide">
                    Live Material Streams
                  </div>
                  <div className="text-sm font-bold text-stone-800">
                    {streamInfo[activeTab].name}
                  </div>
                </div>

                <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs font-medium">
                  {(['plastic', 'paper', 'metal', 'ewaste'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveTab(cat)}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer capitalize ${
                        activeTab === cat
                          ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {cat === 'ewaste' ? 'E-Waste' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Graphical Visual Illustration */}
              <div className="relative group rounded-xl overflow-hidden border border-stone-200">
                <CategoryVisual category={activeTab} className="h-48 w-full" />
                <button
                  onClick={() => handleExploreCategory(activeTab)}
                  className="absolute inset-0 bg-[#1B4332]/0 group-hover:bg-[#1B4332]/10 transition-colors flex items-end justify-end p-3 cursor-pointer"
                  title="View this stream in marketplace"
                >
                  <span className="text-xs font-medium bg-white/95 text-stone-800 px-2.5 py-1 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    View Listings →
                  </span>
                </button>
              </div>

              {/* Stream Details Preview */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Material Classification</span>
                  <span className="font-medium text-stone-800">{streamInfo[activeTab].tag}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Preparation Standard</span>
                  <span className="font-medium text-stone-800">{streamInfo[activeTab].volume}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-stone-500">Intended Lifecycle</span>
                  <span className="font-medium text-[#2D6A4F]">{streamInfo[activeTab].typicalUse}</span>
                </div>
              </div>

              {/* Mini Action footer */}
              <div className="pt-1">
                <button
                  onClick={() => handleExploreCategory(activeTab)}
                  className="w-full py-2 px-3 text-xs font-semibold text-[#1B4332] bg-[#F4F8F4] hover:bg-[#E8F2E8] border border-[#2D6A4F]/20 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Filter Marketplace for {streamInfo[activeTab].name}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
