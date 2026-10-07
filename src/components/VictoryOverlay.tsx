import React from 'react';
import { RotateCcw, ArrowRight, Sparkles, MapPin, Trophy, Home } from 'lucide-react';
import { FoxMascotShowcase } from './FoxIllustration';

interface VictoryOverlayProps {
  isOpen: boolean;
  currentLevel: number;
  totalLevels: number;
  onPlayAgain: () => void;
  onNextLevel: () => void;
  onRestartCampaign?: () => void;
  onBackToHome?: () => void;
}

export const VictoryOverlay: React.FC<VictoryOverlayProps> = ({
  isOpen,
  currentLevel,
  totalLevels,
  onPlayAgain,
  onNextLevel,
  onRestartCampaign,
  onBackToHome,
}) => {
  if (!isOpen) return null;

  const isFinalLevel = currentLevel >= totalLevels - 1;

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
            {isFinalLevel ? (
              <>
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Campaign Complete · 戰役全數完成</span>
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Level {currentLevel + 1} Cleared · 關卡完成</span>
                <Sparkles className="w-3.5 h-3.5" />
              </>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            {isFinalLevel ? '🎉 戰役完成！' : '三尾狐發現！'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            {isFinalLevel
              ? '太厲害了！你已成功通關目前 Campaign 全部的 3 個三尾狐棲地關卡！三尾狐向你優雅致意，都市的夜色歸於祥和。'
              : `恭喜通過第 ${currentLevel + 1} 關！三尾狐在光芒中展開了三條蓬鬆的靈尾。`}
          </p>
        </div>

        {/* Puzzle Summary Pill */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3.5 mb-6 text-left flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5 text-slate-300">
            {isFinalLevel ? (
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
            )}
            <div>
              <div className="font-semibold text-slate-200">
                {isFinalLevel
                  ? 'Campaign 全部 3 個關卡全數完成'
                  : `第 ${currentLevel + 1} 關 · 7×7 顏色區域`}
              </div>
              <div className="text-[11px] text-slate-400">
                {isFinalLevel
                  ? '已成功探索完畢所有 3 處三尾狐棲地'
                  : `剩餘 ${totalLevels - currentLevel - 1} 個關卡等待挑戰`}
              </div>
            </div>
          </div>
          <div className="text-right font-mono text-amber-300 font-bold text-sm">
            {isFinalLevel ? '3 / 3 🏆' : '7 / 7 🦊'}
          </div>
        </div>

        {/* Action Buttons */}
        {isFinalLevel ? (
          <div className="flex flex-col gap-2.5 items-center w-full">
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full">
              {onBackToHome && (
                <button
                  onClick={onBackToHome}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors border border-slate-700 cursor-pointer active:scale-95"
                >
                  <Home className="w-4 h-4 text-slate-400" />
                  <span>返回首頁 · Home</span>
                </button>
              )}

              {onRestartCampaign && (
                <button
                  onClick={onRestartCampaign}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-orange-500/25 cursor-pointer active:scale-95"
                >
                  <RotateCcw className="w-4 h-4 stroke-[2.5]" />
                  <span>重新開始戰役 · Restart</span>
                </button>
              )}
            </div>

            <button
              onClick={onPlayAgain}
              className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer mt-1"
            >
              重玩第 3 關 · Replay Level 3
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={onPlayAgain}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors border border-slate-600/60 cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重新本關 · Replay</span>
            </button>

            <button
              onClick={onNextLevel}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-orange-500/25 cursor-pointer active:scale-95"
            >
              <span>進入第 {currentLevel + 2} 關 · Next Level</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
