import React from 'react';
import { RotateCcw, HeartCrack } from 'lucide-react';
import { FoxIcon } from './FoxIllustration';

interface GameOverOverlayProps {
  isOpen: boolean;
  onTryAgain: () => void;
}

export const GameOverOverlay: React.FC<GameOverOverlayProps> = ({
  isOpen,
  onTryAgain,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#20151a] to-[#120b0f] border border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(239,68,68,0.2)] text-center text-slate-100 overflow-hidden">
        {/* Ambient Red Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-red-500/20 blur-3xl pointer-events-none" />

        {/* Broken Hearts & Faded Fox Icon */}
        <div className="my-3 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-3 text-red-500 animate-pulse">
            <HeartCrack className="w-8 h-8" />
            <HeartCrack className="w-10 h-10" />
            <HeartCrack className="w-8 h-8" />
          </div>

          <div className="w-16 h-16 rounded-2xl bg-slate-900/80 border border-red-500/30 flex items-center justify-center opacity-60 grayscale filter">
            <FoxIcon size={44} animated={false} />
          </div>
        </div>

        {/* Title & Lore */}
        <div className="mt-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-red-400 mb-2">
            靈力耗盡 · 探索失敗
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xs mx-auto leading-relaxed">
            放錯了 3 隻怪獸！三尾狐察覺到了雜亂的氣息，悄然隱入夜色的陰影之中……
          </p>
        </div>

        {/* Stats */}
        <div className="bg-slate-950/70 border border-red-950 rounded-xl p-3 mb-6 text-xs text-slate-400">
          <div>💡 提示：使用 <span className="text-slate-200 font-bold">❌ 排除標記</span> 推導格子是安全的，不會扣除生命值！</div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={onTryAgain}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>重新挑戰 · Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
