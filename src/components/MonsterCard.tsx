/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Lock, MapPin, Trees, HelpCircle } from 'lucide-react';
import { Monster } from '../types/monster';
import { toMonsterCardViewModel } from '../utils/monsterCollection';
import { FoxMascotShowcase } from './FoxIllustration';

interface MonsterCardProps {
  monster: Monster;
  isDiscovered: boolean;
  index: number;
}

/**
 * Mystery Silhouette placeholder for undiscovered monsters.
 * Styled to look mysterious, alluring, and collectible — not like a disabled UI.
 */
const UndiscoveredSilhouette: React.FC = () => {
  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      {/* Subtle mystic aura */}
      <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-xl" />
      <div className="relative w-24 h-24 rounded-full bg-slate-950/70 border border-slate-800/90 flex flex-col items-center justify-center shadow-inner">
        {/* Silhouette beast outline */}
        <svg
          viewBox="0 0 80 80"
          className="w-14 h-14 text-slate-700/80 fill-current drop-shadow-md"
        >
          {/* Beast mysterious shadow */}
          <path d="M40 18 C32 18 24 24 22 34 C18 36 14 42 16 48 C18 54 22 56 26 58 C30 64 36 66 40 66 C44 66 50 64 54 58 C58 56 62 54 64 48 C66 42 62 36 58 34 C56 24 48 18 40 18 Z" />
          {/* Beast shadow ears */}
          <path d="M26 26 L20 12 C24 14 30 18 32 24 Z" />
          <path d="M54 26 L60 12 C56 14 50 18 48 24 Z" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-indigo-400/60" />
        </div>
      </div>
    </div>
  );
};

/**
 * Placeholder artwork for prototype monsters other than Three-Tailed Fox.
 */
const ProvisionalCreatureArt: React.FC<{ type: string }> = ({ type }) => {
  if (type === 'boar') {
    return (
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute inset-0 bg-emerald-500/15 rounded-full blur-xl" />
        <div className="relative w-24 h-24 rounded-full bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-16 h-16 fill-emerald-400">
            <ellipse cx="32" cy="36" rx="20" ry="16" />
            <path d="M20 28 L14 16 L24 24 Z" />
            <path d="M44 28 L50 16 L40 24 Z" />
            <ellipse cx="32" cy="40" rx="9" ry="6" fill="#064e3b" />
            <circle cx="28" cy="40" r="1.5" fill="#a7f3d0" />
            <circle cx="36" cy="40" r="1.5" fill="#a7f3d0" />
          </svg>
        </div>
      </div>
    );
  }

  // Aquatic serpent or generic
  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <div className="absolute inset-0 bg-cyan-500/15 rounded-full blur-xl" />
      <div className="relative w-24 h-24 rounded-full bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center">
        <svg viewBox="0 0 64 64" className="w-16 h-16 fill-cyan-400">
          <path d="M24 48 C24 38 34 32 34 22 C34 16 30 14 32 10 C36 10 40 14 38 22 C36 30 46 38 42 48 Z" />
          <circle cx="33" cy="13" r="1.5" fill="#083344" />
          <path d="M16 50 C26 46 38 46 48 50 C44 54 22 54 16 50 Z" />
        </svg>
      </div>
    </div>
  );
};

export const MonsterCard: React.FC<MonsterCardProps> = ({
  monster,
  isDiscovered,
  index,
}) => {
  const slotNumber = String(index + 1).padStart(2, '0');
  const vm = toMonsterCardViewModel(monster, isDiscovered);

  if (!vm.isDiscovered) {
    return (
      <div className="relative flex flex-col justify-between p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:border-slate-700/80 transition-all duration-200">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs font-bold text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
            #{slotNumber}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-800/40 px-2 py-0.5 rounded-full border border-slate-700/40">
            <Lock className="w-3 h-3 text-slate-400" />
            尚未發現
          </span>
        </div>

        {/* Silhouette Center */}
        <div className="flex flex-col items-center justify-center py-4">
          <UndiscoveredSilhouette />
          <div className="mt-3 text-xl font-bold tracking-widest text-slate-400 font-mono">
            ???
          </div>
          <div className="text-xs text-slate-400 mt-1">
            未確認棲地怪獸
          </div>
        </div>

        {/* Card Footer Clue / Callout */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-400 italic">
            解開世界棲地謎題以發現並登錄此怪獸
          </p>
        </div>
      </div>
    );
  }

  // Discovered Card State
  return (
    <div className="relative flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-[#121c30] border border-amber-500/35 shadow-[0_8px_24px_rgba(245,158,11,0.08)] hover:border-amber-400/50 transition-all duration-200">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs font-bold text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
            #{slotNumber}
          </span>
          <span className="text-xs font-semibold text-amber-300/90 bg-amber-500/10 px-2 py-0.5 rounded">
            {vm.displayCategory}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          已發現
        </span>
      </div>

      {/* Illustration Area */}
      <div className="flex flex-col items-center justify-center py-2">
        {vm.id === 'three-tailed-fox' ? (
          <div className="transform hover:scale-105 transition-transform duration-300">
            <FoxMascotShowcase size={120} />
          </div>
        ) : (
          <ProvisionalCreatureArt type={vm.image || 'creature'} />
        )}
        <h3 className="mt-2 text-xl font-extrabold text-white tracking-wide">
          {vm.displayName}
        </h3>
      </div>

      {/* Details & Lore */}
      <div className="mt-3 space-y-2 text-left">
        {vm.habitat && (
          <div className="flex items-start gap-1.5 text-xs text-slate-300">
            <Trees className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 font-medium">棲地：</span>
              <span>{vm.habitat}</span>
            </div>
          </div>
        )}
        {vm.origin && (
          <div className="flex items-start gap-1.5 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 font-medium">出沒地：</span>
              <span>{vm.origin}</span>
            </div>
          </div>
        )}
        {vm.shortLore && (
          <div className="mt-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-amber-100/80 leading-relaxed font-sans">
            「{vm.shortLore}」
          </div>
        )}
      </div>
    </div>
  );
};
