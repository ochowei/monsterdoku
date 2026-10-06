import React from 'react';
import { RefreshCw } from 'lucide-react';
import { FoxIcon } from './FoxIllustration';

export type InputMode = 'cycle' | 'fox' | 'cross';

interface InteractionToolsProps {
  mode: InputMode;
  onChangeMode: (mode: InputMode) => void;
  hintBanner: string | null;
  onClearHint: () => void;
}

export const InteractionTools: React.FC<InteractionToolsProps> = ({
  mode,
  onChangeMode,
  hintBanner,
  onClearHint,
}) => {
  return (
    <div className="w-full max-w-md mx-auto mt-3 px-2 flex flex-col items-center gap-2 select-none">
      {/* Hint Banner if active */}
      {hintBanner && (
        <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs animate-[fadeIn_0.2s_ease-out]">
          <span>{hintBanner}</span>
          <button
            onClick={onClearHint}
            className="text-amber-400/80 hover:text-amber-200 text-[11px] font-semibold underline ml-2 cursor-pointer"
          >
            收起
          </button>
        </div>
      )}

      {/* Input Mode Switcher */}
      <div className="inline-flex p-1 bg-slate-900/90 rounded-xl border border-slate-800 shadow-md">
        <button
          onClick={() => onChangeMode('cycle')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            mode === 'cycle'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="點擊單格依序切換：空白 → ❌ → 🦊"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>循環模式 (Cycle)</span>
        </button>

        <button
          onClick={() => onChangeMode('fox')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            mode === 'fox'
              ? 'bg-orange-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="直接放置/移除三尾狐"
        >
          <FoxIcon size={16} />
          <span>放狐 (Fox)</span>
        </button>

        <button
          onClick={() => onChangeMode('cross')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            mode === 'cross'
              ? 'bg-slate-700 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="快速劃記排除標記"
        >
          <span className="font-bold text-xs">❌</span>
          <span>排除 (Mark)</span>
        </button>
      </div>

      <div className="text-[11px] text-slate-500 text-center">
        {mode === 'cycle'
          ? '單擊格子：空白 → ❌ 排除 → 🦊 三尾狐'
          : mode === 'fox'
          ? '點擊直接放置或移除三尾狐 🦊'
          : '點擊快速排除不可能的位置 ❌'}
      </div>
    </div>
  );
};
