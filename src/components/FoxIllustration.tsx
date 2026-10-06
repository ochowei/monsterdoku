import React from 'react';

interface FoxIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

/**
 * Compact Three-Tailed Fox Icon optimized for grid cells.
 * Features 3 unmistakable fluffy tails, mystical kitsune markings, and clean silhouette.
 */
export const FoxIcon: React.FC<FoxIconProps> = ({
  className = '',
  size = 44,
  animated = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)] select-none pointer-events-none ${
        animated ? 'animate-[bounce_2s_infinite]' : ''
      } ${className}`}
    >
      <defs>
        {/* Warm spirit fur gradient */}
        <linearGradient id="foxFurGrad" x1="20" y1="20" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fdba74" />
          <stop offset="60%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>

        {/* Fluffy tail white tips */}
        <linearGradient id="tailTipGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fed7aa" />
        </linearGradient>

        {/* Mystical kitsune flame glow */}
        <radialGradient id="spiritGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* --- 3 DISTINCT PROMINENT FLUFFY TAILS --- */}
      {/* Left Tail */}
      <path
        d="M 38 72 C 22 72 6 62 10 38 C 14 20 28 22 32 30 C 35 37 32 48 38 60 Z"
        fill="url(#foxFurGrad)"
      />
      {/* Left Tail White Tip */}
      <path
        d="M 12 34 C 13 22 24 22 30 29 C 27 34 20 37 12 34 Z"
        fill="url(#tailTipGrad)"
      />

      {/* Right Tail */}
      <path
        d="M 62 72 C 78 72 94 62 90 38 C 86 20 72 22 68 30 C 65 37 68 48 62 60 Z"
        fill="url(#foxFurGrad)"
      />
      {/* Right Tail White Tip */}
      <path
        d="M 88 34 C 87 22 76 22 70 29 C 73 34 80 37 88 34 Z"
        fill="url(#tailTipGrad)"
      />

      {/* Center Main Tail */}
      <path
        d="M 44 76 C 36 60 40 32 50 16 C 58 16 64 32 56 76 Z"
        fill="url(#foxFurGrad)"
      />
      {/* Center Tail White Tip */}
      <path
        d="M 47 24 C 49 18 53 18 55 24 C 54 28 48 28 47 24 Z"
        fill="url(#tailTipGrad)"
      />

      {/* Soft Spirit Halo / Ambient Fire */}
      <circle cx="50" cy="54" r="28" fill="url(#spiritGlow)" />

      {/* --- FOX BODY --- */}
      <ellipse cx="50" cy="74" rx="20" ry="16" fill="url(#foxFurGrad)" />
      {/* Chest White Bib */}
      <path
        d="M 42 66 C 42 66 50 78 50 82 C 50 78 58 66 58 66 C 54 62 46 62 42 66 Z"
        fill="#fff7ed"
      />

      {/* --- FOX EARS --- */}
      {/* Left Ear */}
      <path
        d="M 33 46 L 25 18 C 30 19 38 24 43 36 Z"
        fill="url(#foxFurGrad)"
      />
      {/* Left Inner Ear */}
      <path
        d="M 33 40 L 28 23 C 32 24 37 28 40 34 Z"
        fill="#7c2d12"
      />
      <path
        d="M 32 36 L 29 27 C 32 28 35 31 37 34 Z"
        fill="#ffedd5"
      />

      {/* Right Ear */}
      <path
        d="M 67 46 L 75 18 C 70 19 62 24 57 36 Z"
        fill="url(#foxFurGrad)"
      />
      {/* Right Inner Ear */}
      <path
        d="M 67 40 L 72 23 C 68 24 63 28 60 34 Z"
        fill="#7c2d12"
      />
      <path
        d="M 68 36 L 71 27 C 68 28 65 31 63 34 Z"
        fill="#ffedd5"
      />

      {/* --- FOX HEAD & FACE --- */}
      {/* Head shape */}
      <ellipse cx="50" cy="48" rx="22" ry="18" fill="url(#foxFurGrad)" />

      {/* Cheek White Fluff Tufts */}
      {/* Left cheek tuft */}
      <path
        d="M 30 52 C 22 53 23 60 28 61 C 32 61 34 57 33 53 Z"
        fill="#fff7ed"
      />
      {/* Right cheek tuft */}
      <path
        d="M 70 52 C 78 53 77 60 72 61 C 68 61 66 57 67 53 Z"
        fill="#fff7ed"
      />

      {/* White Muzzle / Mask */}
      <path
        d="M 40 48 C 38 56 42 64 50 65 C 58 64 62 56 60 48 C 55 52 45 52 40 48 Z"
        fill="#fff7ed"
      />

      {/* Kitsune Mystical Forehead Flame Crest */}
      <path
        d="M 50 33 C 48 37 47 40 50 43 C 53 40 52 37 50 33 Z"
        fill="#ef4444"
      />
      <circle cx="50" cy="40" r="1.2" fill="#fef08a" />

      {/* Eyes - Mystical, gentle curved kitsune shut eyes (cozy & wise) */}
      <path
        d="M 37 47 C 39 49 43 49 44 47"
        stroke="#431407"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M 56 47 C 57 49 61 49 63 47"
        stroke="#431407"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Red Kitsune Eye Liner Marks */}
      <path
        d="M 35 48 C 33 49 32 51 31 52"
        stroke="#dc2626"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M 65 48 C 67 49 68 51 69 52"
        stroke="#dc2626"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Cute Black Nose & Mouth */}
      <path
        d="M 48 57 C 49 56.5 51 56.5 52 57 L 50 59 Z"
        fill="#1c1917"
      />
      <path
        d="M 50 59 L 50 61 C 49 62 48 62 47 61 M 50 61 C 51 62 52 62 53 61"
        stroke="#1c1917"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Sacred Vermilion Collar with Golden Bell */}
      <path
        d="M 42 66 C 46 68 54 68 58 66"
        stroke="#dc2626"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Brass Bell */}
      <circle cx="50" cy="69" r="3.2" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
      <circle cx="50" cy="70" r="0.8" fill="#78350f" />
    </svg>
  );
};

/**
 * Large Mascot Art for Header & Victory Discovery Sequence
 */
export const FoxMascotShowcase: React.FC<{ size?: number; glow?: boolean }> = ({
  size = 180,
  glow = true,
}) => {
  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Ambient Kitsune Spirit Flare */}
      {glow && (
        <div className="absolute inset-0 -m-8 bg-gradient-to-tr from-amber-500/20 via-orange-500/30 to-red-500/10 rounded-full blur-2xl animate-pulse pointer-events-none" />
      )}

      {/* Floating spirit wisps */}
      <div className="absolute -top-3 -left-2 w-3 h-3 bg-amber-300 rounded-full blur-[1px] animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75" />
      <div className="absolute top-8 -right-3 w-2.5 h-2.5 bg-orange-400 rounded-full blur-[1px] animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_0.7s] opacity-75" />
      <div className="absolute -bottom-1 right-6 w-3 h-3 bg-red-400 rounded-full blur-[1px] animate-[ping_3.2s_cubic-bezier(0,0,0.2,1)_infinite_1.4s] opacity-60" />

      {/* Detailed SVG Illustration */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 filter drop-shadow-[0_8px_24px_rgba(234,88,12,0.45)] transition-transform duration-500 hover:scale-105"
      >
        <defs>
          <linearGradient id="foxShowcaseFur" x1="40" y1="30" x2="160" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="30%" stopColor="#fb923c" />
            <stop offset="70%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>

          <linearGradient id="tailGradShowcase" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          <radialGradient id="sacredHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#f97316" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#b91c1c" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sacred Halo behind */}
        <circle cx="100" cy="100" r="85" fill="url(#sacredHalo)" />

        {/* --- THREE MAJESTIC EXPANSIVE TAILS --- */}
        {/* Tail 1: Left swirling tail */}
        <path
          d="M 80 145 C 45 150 15 130 18 80 C 20 45 52 48 60 65 C 68 82 62 105 78 125 Z"
          fill="url(#foxShowcaseFur)"
        />
        {/* Tail 1 tip */}
        <path
          d="M 22 72 C 24 48 48 48 58 64 C 52 75 38 80 22 72 Z"
          fill="url(#tailGradShowcase)"
        />

        {/* Tail 2: Right swirling tail */}
        <path
          d="M 120 145 C 155 150 185 130 182 80 C 180 45 148 48 140 65 C 132 82 138 105 122 125 Z"
          fill="url(#foxShowcaseFur)"
        />
        {/* Tail 2 tip */}
        <path
          d="M 178 72 C 176 48 152 48 142 64 C 148 75 162 80 178 72 Z"
          fill="url(#tailGradShowcase)"
        />

        {/* Tail 3: Center towering tail */}
        <path
          d="M 90 150 C 72 120 80 60 100 28 C 115 28 125 60 110 150 Z"
          fill="url(#foxShowcaseFur)"
        />
        {/* Tail 3 tip */}
        <path
          d="M 94 45 C 98 32 106 32 110 45 C 107 54 97 54 94 45 Z"
          fill="url(#tailGradShowcase)"
        />

        {/* --- BODY --- */}
        {/* Body trunk */}
        <ellipse cx="100" cy="150" rx="38" ry="32" fill="url(#foxShowcaseFur)" />
        {/* Paws */}
        <ellipse cx="84" cy="176" rx="10" ry="7" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
        <ellipse cx="116" cy="176" rx="10" ry="7" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />

        {/* Chest Fluff */}
        <path
          d="M 85 130 C 85 130 100 155 100 162 C 100 155 115 130 115 130 C 108 122 92 122 85 130 Z"
          fill="#fff7ed"
        />

        {/* --- EARS --- */}
        {/* Left Ear */}
        <path d="M 68 96 L 50 40 C 62 44 78 52 86 78 Z" fill="url(#foxShowcaseFur)" />
        <path d="M 68 86 L 56 50 C 64 53 74 61 80 74 Z" fill="#7c2d12" />
        <path d="M 66 78 L 59 58 C 64 60 70 65 74 74 Z" fill="#ffedd5" />

        {/* Right Ear */}
        <path d="M 132 96 L 150 40 C 138 44 122 52 114 78 Z" fill="url(#foxShowcaseFur)" />
        <path d="M 132 86 L 144 50 C 136 53 126 61 120 74 Z" fill="#7c2d12" />
        <path d="M 134 78 L 141 58 C 136 60 130 65 126 74 Z" fill="#ffedd5" />

        {/* --- HEAD & FACE --- */}
        <ellipse cx="100" cy="98" rx="42" ry="34" fill="url(#foxShowcaseFur)" />

        {/* Cheek fur tufts */}
        <path d="M 62 106 C 46 108 48 122 58 124 C 66 124 70 116 68 108 Z" fill="#fff7ed" />
        <path d="M 138 106 C 154 108 152 122 142 124 C 134 124 130 116 132 108 Z" fill="#fff7ed" />

        {/* White muzzle plate */}
        <path
          d="M 80 98 C 76 114 84 130 100 132 C 116 130 124 114 120 98 C 110 106 90 106 80 98 Z"
          fill="#fff7ed"
        />

        {/* Kitsune Forehead Crest */}
        <path
          d="M 100 68 C 96 76 94 82 100 88 C 106 82 104 76 100 68 Z"
          fill="#dc2626"
        />
        <circle cx="100" cy="82" r="2.5" fill="#fde047" />

        {/* Noble shut curved eyes */}
        <path
          d="M 75 96 C 79 100 87 100 89 96"
          stroke="#431407"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 111 96 C 113 100 121 100 125 96"
          stroke="#431407"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Red Kitsune eye markings */}
        <path d="M 72 98 C 67 100 65 105 64 107" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 128 98 C 133 100 135 105 136 107" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />

        {/* Nose & Smile */}
        <path d="M 96 116 C 98 115 102 115 104 116 L 100 120 Z" fill="#1c1917" />
        <path
          d="M 100 120 L 100 124 C 98 126 96 126 94 124 M 100 124 C 102 126 104 126 106 124"
          stroke="#1c1917"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Red Collar & Sacred Bell */}
        <path
          d="M 84 133 C 92 137 108 137 116 133"
          stroke="#b91c1c"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="100" cy="140" r="5.5" fill="#facc15" stroke="#b45309" strokeWidth="1.5" />
        <circle cx="100" cy="142" r="1.5" fill="#78350f" />
      </svg>
    </div>
  );
};
