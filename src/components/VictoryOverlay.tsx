import React, { useState } from 'react';
import { RotateCcw, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { FoxMascotShowcase } from './FoxIllustration';

interface VictoryOverlayProps {
  isOpen: boolean;
  onPlayAgain: () => void;
}

export const VictoryOverlay: React.FC<VictoryOverlayProps> = ({
  isOpen,
  onPlayAgain,
}) => {
  const [nextClicked, setNextClicked] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-[fadeIn_0.35s_ease-out]">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#161f30] to-[#0c1322] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.15)] text-center text-slate-100 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-amber-500/20 blur-3xl pointer-events-none" />

        {/* Mascot Centerpiece */}
        <div className="my-2 flex justify-center">
          <FoxMascotShowcase size={160} glow={true} />
        </div>

        {/* Title & Lore */}
        <div className="mt-4 mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400/90 font-medium tracking-widest uppercase mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Puzzle Solved · 拼圖解開</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            三尾狐發現！
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            三尾狐在光芒中展開了三條蓬鬆的靈尾。你成功找出了藏在所有顏色區域中的 7 隻三尾狐！
          </p>
        </div>

        {/* Puzzle Summary Pill */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3 mb-6 text-left flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-amber-400" />
            <div>
              <div className="font-semibold text-slate-200">7×7 顏色區域拼圖</div>
              <div className="text-[11px] text-slate-400">7 個顏色區域皆已各放置 1 隻三尾狐</div>
            </div>
          </div>
          <div className="text-right font-mono text-amber-300 font-bold text-sm">
            7 / 7 🦊
          </div>
        </div>

        {/* Next Habitat notification if clicked */}
        {nextClicked && (
          <div className="mb-4 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs animate-[fadeIn_0.2s_ease-out]">
            ✨ 感謝參與 Playtest！下一道題目正在製作中！
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={onPlayAgain}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors border border-slate-600/60 cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>再來一局 · Play Again</span>
          </button>

          <button
            onClick={() => setNextClicked(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-orange-500/25 cursor-pointer active:scale-95"
          >
            <span>下一關 · Next Puzzle</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
