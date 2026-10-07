import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { ColorRegion } from '../types/puzzle';

interface TutorialInstructionBannerProps {
  instruction: string;
  subText?: string;
  stepNumber?: number;
  totalSteps?: number;
  mode?: 'guided' | 'assisted' | 'independent';
  highlightedRegion?: ColorRegion;
  highlightedCell?: { row: number; col: number };
}

export const TutorialInstructionBanner: React.FC<TutorialInstructionBannerProps> = ({
  instruction,
  subText,
  stepNumber,
  totalSteps,
  mode = 'guided',
  highlightedRegion,
  highlightedCell,
}) => {
  return (
    <aside
      aria-label="教學指引"
      className="w-full max-w-xl mx-auto mb-2.5 px-2 select-none animate-[fadeIn_0.25s_ease-out]"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-amber-950/30 border border-amber-500/35 p-3 sm:py-2.5 sm:px-4 shadow-[0_4px_20px_rgba(245,158,11,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        {/* Subtle decorative warm glow */}
        <div className="absolute top-0 left-0 w-24 h-full bg-amber-400/10 blur-xl pointer-events-none" />

        {/* Content Side */}
        <div className="flex items-start sm:items-center gap-2.5 z-10 w-full">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 shadow-sm">
            <Compass className="w-4 h-4 text-amber-400" />
          </div>

          <div className="text-left flex-grow">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-amber-300/90 font-mono">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                {mode === 'assisted'
                  ? '輔助引導 · Assisted'
                  : mode === 'independent'
                  ? '獨立挑戰 · Independent'
                  : '探索指引 · Guidance'}
              </span>

              {stepNumber !== undefined && totalSteps !== undefined && (
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  步驟 {stepNumber}/{totalSteps}
                </span>
              )}

              {highlightedRegion && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-800 text-slate-200 border border-white/10">
                  <span
                    className="w-2 h-2 rounded-full inline-block shrink-0 shadow-sm"
                    style={{ backgroundColor: highlightedRegion.color }}
                  />
                  <span>{highlightedRegion.name}棲地</span>
                </span>
              )}

              {highlightedCell && (
                <span className="text-[10px] font-mono text-amber-400/80 bg-slate-800/80 px-1.5 py-0.2 rounded border border-white/10">
                  焦點 ({highlightedCell.row + 1}, {highlightedCell.col + 1})
                </span>
              )}
            </div>

            <p className="text-xs text-amber-100 font-medium leading-relaxed">
              {instruction}
            </p>

            {subText && (
              <p className="text-[11px] text-amber-200/80 mt-0.5 leading-relaxed font-normal">
                {subText}
              </p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
