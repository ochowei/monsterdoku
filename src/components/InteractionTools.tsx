import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

export type PlacementMode = 'confirm' | 'quick';

interface InteractionToolsProps {
  hintBanner: string | null;
  onClearHint: () => void;
  placementMode: PlacementMode;
  onChangePlacementMode: (mode: PlacementMode) => void;
}

export const InteractionTools: React.FC<InteractionToolsProps> = ({
  hintBanner,
  onClearHint,
  placementMode,
  onChangePlacementMode,
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

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
        <span className="text-[10px] text-slate-400 font-medium px-2 hidden sm:inline">
          放置模式：
        </span>
        <button
          type="button"
          onClick={() => onChangePlacementMode('confirm')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            placementMode === 'confirm'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
          title="使用滑鼠右鍵開啟確認視窗安全放置"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>確認模式（右鍵）</span>
        </button>

        <button
          type="button"
          onClick={() => onChangePlacementMode('quick')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            placementMode === 'quick'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-md shadow-amber-500/25'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
          title="使用滑鼠左鍵三連擊直接快速放置"
        >
          <Zap className={`w-3.5 h-3.5 ${placementMode === 'quick' ? 'text-slate-950 fill-current' : 'text-amber-400'}`} />
          <span>快速模式（左鍵三擊）</span>
        </button>
      </div>

      {/* Dynamic Controls Guide */}
      <div className="w-full flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 shadow-sm">
          <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-200 flex items-center justify-center font-bold text-[11px]">
            左
          </span>
          <span>
            {placementMode === 'quick' ? (
              <>
                單擊/拖曳：<strong className="text-white">❌ 排除</strong> · 三擊：<strong className="text-amber-300">⚡ 快速放置</strong>
              </>
            ) : (
              <>
                單擊或拖曳：<strong className="text-white">❌ 排除</strong>
              </>
            )}
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
