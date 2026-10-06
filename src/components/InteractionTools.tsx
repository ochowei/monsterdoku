import React from 'react';

interface InteractionToolsProps {
  hintBanner: string | null;
  onClearHint: () => void;
}

export const InteractionTools: React.FC<InteractionToolsProps> = ({
  hintBanner,
  onClearHint,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto mt-2 px-2 flex flex-col items-center gap-2 select-none">
      {/* Hint Banner if active */}
      {hintBanner && (
        <div className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs animate-[fadeIn_0.2s_ease-out]">
          <span>{hintBanner}</span>
          <button
            onClick={onClearHint}
            className="text-amber-400/80 hover:text-amber-200 text-[11px] font-semibold underline ml-2 cursor-pointer"
          >
            收起
          </button>
        </div>
      )}

      {/* Clean Dual Mouse Controls Guide */}
      <div className="w-full flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 shadow-sm">
          <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-200 flex items-center justify-center font-bold text-[11px]">
            左
          </span>
          <span>
            單擊或拖曳：<strong className="text-white">❌ 排除</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-amber-500/20 text-slate-300 shadow-sm">
          <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[11px]">
            右
          </span>
          <span>
            右鍵：<strong className="text-amber-300">🦊 預覽確認放置</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
