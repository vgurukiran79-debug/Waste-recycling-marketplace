import React, { useState } from 'react';
import { UploadCloud, MessageCircle, Truck, Check, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenCreate: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenCreate }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      number: '01',
      title: 'List recyclable materials.',
      subtitle: 'Inventory & Specification',
      description:
        'Specify material stream (paper, plastic, metal, e-waste), available volume, pickup location, and an indicative asking price or free community pickup.',
      icon: UploadCloud,
      actionText: 'Open listing form',
      action: onOpenCreate,
      highlights: [
        'Document material cleanliness and baling status',
        'Set zero or nominal token prices',
        'State campus depot or workshop location',
      ],
    },
    {
      number: '02',
      title: 'Connect with interested recyclers.',
      subtitle: 'Direct Inquiries & Matching',
      description:
        'Local upcyclers, campus design students, makerspaces, and registered scrap processors discover listings and submit direct inquiries for pickup.',
      icon: MessageCircle,
      actionText: 'Browse existing listings',
      action: () => {
        document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
      },
      highlights: [
        'Safe communication without private personal phone numbers',
        'Confirm material specs & volume requirements',
        'Direct connection between producers and circular consumers',
      ],
    },
    {
      number: '03',
      title: 'Arrange collection or delivery.',
      subtitle: 'Circular Handoff & Diverted Waste',
      description:
        'Coordinate a scheduled handoff at campus logistics hubs, depot loading bays, or local collection sites. Keep clean secondary materials out of landfills.',
      icon: Truck,
      actionText: 'Review material streams',
      action: () => {
        document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
      },
      highlights: [
        'Convenient local drop-off or depot pickup',
        'Direct material diversion into production cycles',
        'Practical sustainability modeling for academic hubs',
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-wider text-[#2D6A4F] uppercase">
            Simple 3-Step Process
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mt-1">
            How It Works
          </h2>
          <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
            A practical, closed-loop exchange model designed to connect localized waste generators with recyclers and reusers.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx + 1;

            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx + 1)}
                className={`relative rounded-2xl p-6 transition-all border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#2D6A4F]/40 shadow-sm ring-1 ring-[#2D6A4F]/20'
                    : 'bg-white/80 border-stone-200/90 hover:bg-white hover:border-stone-300'
                }`}
              >
                <div className="space-y-4">
                  {/* Step Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono-numbers text-2xl font-extrabold text-[#2D6A4F]/80">
                      {step.number}
                    </span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#E8F5E9] text-[#2D6A4F]' : 'bg-stone-100 text-stone-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Step Title & Subtitle */}
                  <div>
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide block">
                      {step.subtitle}
                    </span>
                    <h3 className="font-display font-bold text-lg text-stone-900 mt-0.5">
                      {step.title}
                    </h3>
                  </div>

                  {/* Step Description */}
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="pt-2 border-t border-stone-100 space-y-1.5">
                    {step.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      step.action();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D6A4F] hover:text-[#1B4332] cursor-pointer group"
                  >
                    <span>{step.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <span className="text-[11px] text-stone-400">
                    Step {idx + 1} of 3
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* PBL Academic Context Note Card */}
        <div id="pbl-details" className="bg-[#EBF5EE] rounded-2xl p-5 border border-[#2D6A4F]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wide">
              College Project-Based Learning (PBL) Framework
            </div>
            <p className="text-xs sm:text-sm text-stone-700 max-w-3xl leading-relaxed">
              This prototype evaluates localized circular waste diversion within educational and community hubs. Data is persisted locally in your browser to simulate live exchange transactions without external servers or payment gateways.
            </p>
          </div>
          <button
            onClick={onOpenCreate}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#1B4332] rounded-lg shadow-2xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            Test Listing Flow
          </button>
        </div>

      </div>
    </section>
  );
};
