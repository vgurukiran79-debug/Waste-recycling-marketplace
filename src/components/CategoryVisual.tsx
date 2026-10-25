import React from 'react';

interface CategoryVisualProps {
  category: 'paper' | 'plastic' | 'metal' | 'ewaste';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CATEGORY_META = {
  paper: {
    name: 'Paper & Cardboard',
    shortName: 'Paper & Card',
    colorText: 'text-amber-800',
    colorBg: 'bg-amber-50',
    colorBorder: 'border-amber-200/80',
    accent: '#B45309',
    badge: 'Cellulose Fibers',
  },
  plastic: {
    name: 'Plastic',
    shortName: 'Plastic Polymers',
    colorText: 'text-emerald-800',
    colorBg: 'bg-emerald-50',
    colorBorder: 'border-emerald-200/80',
    accent: '#059669',
    badge: 'Polymers #1 - #5',
  },
  metal: {
    name: 'Metal & Aluminium',
    shortName: 'Metal & Alum',
    colorText: 'text-slate-800',
    colorBg: 'bg-slate-100',
    colorBorder: 'border-slate-300/80',
    accent: '#475569',
    badge: 'Ferrous & Non-Ferrous',
  },
  ewaste: {
    name: 'Electronic Waste',
    shortName: 'E-Waste',
    colorText: 'text-teal-900',
    colorBg: 'bg-teal-50',
    colorBorder: 'border-teal-200/80',
    accent: '#0D9488',
    badge: 'PCBs & Components',
  },
};

export const CategoryVisual: React.FC<CategoryVisualProps> = ({
  category,
  className = '',
  size = 'md',
}) => {
  const isPaper = category === 'paper';
  const isPlastic = category === 'plastic';
  const isMetal = category === 'metal';
  const isEwaste = category === 'ewaste';

  const viewBox = "0 0 320 200";

  return (
    <div className={`relative overflow-hidden rounded-t-xl select-none ${className}`}>
      <svg
        viewBox={viewBox}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Paper Gradients */}
          <linearGradient id="grad-paper-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF5EE" />
            <stop offset="100%" stopColor="#EDE3D2" />
          </linearGradient>
          <linearGradient id="grad-paper-box" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A373" />
            <stop offset="100%" stopColor="#C48B58" />
          </linearGradient>

          {/* Plastic Gradients */}
          <linearGradient id="grad-plastic-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0FDF4" />
            <stop offset="100%" stopColor="#DCFCE7" />
          </linearGradient>
          <linearGradient id="grad-plastic-bot" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
          </linearGradient>

          {/* Metal Gradients */}
          <linearGradient id="grad-metal-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="grad-metal-can" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* E-Waste Gradients */}
          <linearGradient id="grad-ewaste-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0FDFA" />
            <stop offset="100%" stopColor="#CCFBF1" />
          </linearGradient>
          <linearGradient id="grad-ewaste-pcb" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#134E4A" />
            <stop offset="100%" stopColor="#042F2E" />
          </linearGradient>

          <pattern id="cardboard-ribs" width="12" height="12" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="12" stroke="#B07D4C" strokeWidth="1" strokeOpacity="0.35" />
          </pattern>
        </defs>

        {/* Paper & Cardboard Theme */}
        {isPaper && (
          <g>
            <rect width="320" height="200" fill="url(#grad-paper-bg)" />
            {/* Background texture circles */}
            <circle cx="280" cy="30" r="70" fill="#E2D4BF" fillOpacity="0.3" />
            <circle cx="40" cy="170" r="50" fill="#E2D4BF" fillOpacity="0.4" />

            {/* Back Cardboard Box */}
            <g transform="translate(60, 45)">
              <rect x="0" y="25" width="100" height="90" rx="4" fill="#DDB892" />
              <rect x="0" y="25" width="100" height="90" fill="url(#cardboard-ribs)" />
              {/* Box flaps */}
              <polygon points="0,25 25,0 125,0 100,25" fill="#E6CCB2" />
              <polygon points="100,25 125,0 125,90 100,115" fill="#B08968" />
              {/* Tape seal */}
              <rect x="40" y="15" width="20" height="85" fill="#C89F77" fillOpacity="0.75" />
            </g>

            {/* Stack of Clean Paper Sheets */}
            <g transform="translate(160, 75)">
              <rect x="10" y="20" width="110" height="75" rx="3" fill="#FFFFFF" stroke="#E2D4BF" strokeWidth="1.5" />
              <rect x="5" y="12" width="110" height="75" rx="3" fill="#FAF6F0" stroke="#E2D4BF" strokeWidth="1.5" />
              <rect x="0" y="4" width="110" height="75" rx="3" fill="#FFFFFF" stroke="#D7C9B1" strokeWidth="1.5" />
              {/* Paper text lines */}
              <line x1="16" y1="24" x2="60" y2="24" stroke="#9C8B73" strokeWidth="3" strokeLinecap="round" />
              <line x1="16" y1="36" x2="90" y2="36" stroke="#C9BDB0" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="46" x2="84" y2="46" stroke="#C9BDB0" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="56" x2="72" y2="56" stroke="#C9BDB0" strokeWidth="2" strokeLinecap="round" />
              {/* Recycle Mobius Loop Mini Stamp */}
              <path
                d="M 85,55 L 90,62 L 95,55 Z"
                fill="#2D6A4F"
              />
            </g>
          </g>
        )}

        {/* Plastic Theme */}
        {isPlastic && (
          <g>
            <rect width="320" height="200" fill="url(#grad-plastic-bg)" />
            <circle cx="60" cy="50" r="60" fill="#BBF7D0" fillOpacity="0.3" />
            <circle cx="260" cy="150" r="80" fill="#BBF7D0" fillOpacity="0.4" />

            {/* Recycled Polymer Granules Scatter */}
            <circle cx="60" cy="140" r="6" fill="#34D399" fillOpacity="0.6" />
            <circle cx="75" cy="150" r="5" fill="#10B981" fillOpacity="0.7" />
            <circle cx="85" cy="135" r="7" fill="#059669" fillOpacity="0.5" />
            <circle cx="95" cy="148" r="5.5" fill="#6EE7B7" fillOpacity="0.8" />
            <circle cx="108" cy="142" r="6" fill="#047857" fillOpacity="0.6" />

            {/* HDPE Jug / Bottle 1 */}
            <g transform="translate(130, 40)">
              {/* Bottle neck & cap */}
              <rect x="25" y="0" width="20" height="12" rx="2" fill="#10B981" />
              <path d="M 22,12 C 22,25 5,30 5,45 L 5,115 C 5,120 10,125 18,125 L 52,125 C 60,125 65,120 65,115 L 65,45 C 65,30 48,25 48,12 Z"
                fill="url(#grad-plastic-bot)"
              />
              {/* Handle */}
              <path d="M 48,38 C 58,40 68,50 68,65 C 68,75 58,82 48,84"
                fill="none" stroke="#047857" strokeWidth="6" strokeLinecap="round"
              />
              {/* Embossed polymer resin code 2 */}
              <polygon points="35,62 25,80 45,80" fill="none" stroke="#D1FAE5" strokeWidth="2" strokeLinejoin="round" />
              <text x="35" y="77" fill="#D1FAE5" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>
            </g>

            {/* Secondary Clear PET Bottle */}
            <g transform="translate(205, 55)">
              <rect x="18" y="0" width="14" height="10" rx="2" fill="#047857" />
              <path d="M 17,10 C 17,20 5,26 5,38 L 5,95 C 5,100 9,105 15,105 L 35,105 C 41,105 45,100 45,95 L 45,38 C 45,26 33,20 33,10 Z"
                fill="#6EE7B7" fillOpacity="0.55" stroke="#34D399" strokeWidth="1.5"
              />
              <line x1="5" y1="55" x2="45" y2="55" stroke="#10B981" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="5" y1="75" x2="45" y2="75" stroke="#10B981" strokeWidth="1" strokeDasharray="2,2" />
            </g>
          </g>
        )}

        {/* Metal & Aluminium Theme */}
        {isMetal && (
          <g>
            <rect width="320" height="200" fill="url(#grad-metal-bg)" />
            <circle cx="80" cy="40" r="70" fill="#CBD5E1" fillOpacity="0.3" />
            <circle cx="270" cy="160" r="75" fill="#CBD5E1" fillOpacity="0.4" />

            {/* Aluminium Cans & Extruded Rod */}
            <g transform="translate(60, 45)">
              {/* Can 1 upright */}
              <ellipse cx="40" cy="15" rx="22" ry="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
              <rect x="18" y="15" width="44" height="85" fill="url(#grad-metal-can)" />
              <ellipse cx="40" cy="100" rx="22" ry="7" fill="#64748B" />
              {/* Tab on top */}
              <ellipse cx="40" cy="15" rx="6" ry="3" fill="#475569" />
              <rect x="38" y="11" width="5" height="7" rx="1" fill="#CBD5E1" />
            </g>

            {/* Can 2 compressed/crushed for recycling */}
            <g transform="translate(130, 80)">
              <ellipse cx="38" cy="12" rx="26" ry="8" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
              <path d="M 12,12 Q 22,25 15,38 Q 28,48 16,58 L 60,58 Q 48,46 62,35 Q 52,22 64,12 Z" fill="#94A3B8" />
              <ellipse cx="38" cy="58" rx="24" ry="7" fill="#475569" />
              {/* Crushed indentation lines */}
              <path d="M 18,25 Q 38,32 58,23" fill="none" stroke="#F1F5F9" strokeWidth="1.5" />
              <path d="M 17,45 Q 38,40 57,48" fill="none" stroke="#334155" strokeWidth="1.5" />
            </g>

            {/* Metal Ingots / Scrap beams */}
            <g transform="translate(200, 60)">
              {/* Ingot bar 1 */}
              <polygon points="10,40 70,25 90,45 30,60" fill="#94A3B8" />
              <polygon points="10,40 30,60 30,75 10,55" fill="#475569" />
              <polygon points="30,60 90,45 90,60 30,75" fill="#64748B" />
              {/* Ingot bar 2 */}
              <polygon points="20,15 80,0 100,20 40,35" fill="#CBD5E1" />
              <polygon points="20,15 40,35 40,50 20,30" fill="#64748B" />
              <polygon points="40,35 100,20 100,35 40,50" fill="#94A3B8" />
            </g>
          </g>
        )}

        {/* Electronic Waste Theme */}
        {isEwaste && (
          <g>
            <rect width="320" height="200" fill="url(#grad-ewaste-bg)" />
            {/* PCB Grid Dot Matrix */}
            <g opacity="0.35">
              {[40, 80, 120, 160, 200, 240, 280].map((x) =>
                [30, 60, 90, 120, 150, 180].map((y) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#0D9488" />
                ))
              )}
            </g>

            {/* Main Circuit Board Module */}
            <g transform="translate(50, 40)">
              {/* PCB Base */}
              <rect x="0" y="0" width="130" height="95" rx="6" fill="url(#grad-ewaste-pcb)" stroke="#115E59" strokeWidth="2" />
              
              {/* Gold Finger Connector edge */}
              <g transform="translate(15, 95)">
                {[0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88].map((offset) => (
                  <rect key={offset} x={offset} y="0" width="5" height="10" fill="#F59E0B" rx="1" />
                ))}
              </g>

              {/* Central Processor Chip */}
              <rect x="35" y="18" width="40" height="40" rx="3" fill="#1E293B" stroke="#0D9488" strokeWidth="1" />
              <circle cx="55" cy="38" r="8" fill="#0F766E" />
              <text x="55" y="41" fill="#F59E0B" fontSize="8" fontWeight="bold" textAnchor="middle">CPU</text>

              {/* Circuit traces */}
              <polyline points="15,25 35,25" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
              <polyline points="15,35 25,35 30,30 35,30" fill="none" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round" />
              <polyline points="75,25 105,25 115,35" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
              <polyline points="75,45 95,45 105,55 115,55" fill="none" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="15" cy="25" r="2.5" fill="#F59E0B" />
              <circle cx="115" cy="35" r="2.5" fill="#F59E0B" />

              {/* Capacitors */}
              <circle cx="95" cy="75" r="6" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
              <circle cx="112" cy="75" r="5" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
            </g>

            {/* RAM Stick Module */}
            <g transform="translate(200, 30)">
              <rect x="0" y="0" width="95" height="28" rx="3" fill="#065F46" stroke="#10B981" strokeWidth="1" />
              {/* RAM Chips */}
              <rect x="10" y="5" width="14" height="18" fill="#18181B" rx="1" />
              <rect x="30" y="5" width="14" height="18" fill="#18181B" rx="1" />
              <rect x="50" y="5" width="14" height="18" fill="#18181B" rx="1" />
              <rect x="70" y="5" width="14" height="18" fill="#18181B" rx="1" />
              {/* Edge Pins */}
              <rect x="5" y="28" width="85" height="4" fill="#F59E0B" />
            </g>

            {/* Integrated Circuit Chip DIP package */}
            <g transform="translate(205, 85)">
              <rect x="0" y="0" width="70" height="35" rx="3" fill="#18181B" stroke="#64748B" strokeWidth="1" />
              <circle cx="10" cy="17" r="3" fill="#64748B" />
              <text x="38" y="21" fill="#E2E8F0" fontSize="8" fontFamily="monospace">RECYCLE</text>
              {/* Top pins */}
              {[-6, -3].map((py, idx) => null)}
              {[8, 20, 32, 44, 56].map((px) => (
                <rect key={`tp-${px}`} x={px} y="-4" width="4" height="4" fill="#94A3B8" />
              ))}
              {/* Bottom pins */}
              {[8, 20, 32, 44, 56].map((px) => (
                <rect key={`bp-${px}`} x={px} y="35" width="4" height="4" fill="#94A3B8" />
              ))}
            </g>
          </g>
        )}
      </svg>

      {/* Subtle material stream tag - clean text label without garish pill badges */}
      <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-stone-700 shadow-2xs border border-white/60">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_META[category].accent }} />
        <span>{CATEGORY_META[category].badge}</span>
      </div>
    </div>
  );
};
