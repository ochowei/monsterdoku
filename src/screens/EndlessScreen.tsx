/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Play, Sparkles } from 'lucide-react';
import { FoxIcon } from '../components/FoxIllustration';
import { sounds } from '../utils/audio';

interface EndlessScreenProps {
  onBackToHome: () => void;
  onGoToCampaign: () => void;
}

export const EndlessScreen: React.FC<EndlessScreenProps> = ({
  onBackToHome,
  onGoToCampaign,
}) => {
  return (
    <div className="min-h-screen bg-[#0e1626] bg-gradient-to-b from-[#0e1626] via-[#121c30] to-[#0a101b] text-slate-100 flex flex-col justify-between p-4 sm:p-6 relative overflow-x-hidden">
      {/* Subtle night-sky stars & glow background */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-md mx-auto flex items-center justify-between py-2">
        <button
          onClick={() => {
            sounds.playClear();
            onBackToHome();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回首頁</span>
        </button>
      </header>

      {/* Content */}
      <main className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center justify-center flex-grow py-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-amber-500/20 border border-purple-400/30 flex items-center justify-center mb-4 shadow-lg">
          <Sparkles className="w-8 h-8 text-purple-300 animate-pulse" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          無盡模式 · Endless Mode
        </h2>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 max-w-sm mb-6 leading-relaxed">
          <p className="font-semibold text-amber-300 mb-1 flex items-center justify-center gap-1.5">
            <FoxIcon size={16} />
            <span>架構已預留 · 開發進行中</span>
          </p>
          <p className="text-slate-400">
            Endless 模式正在建立無限 procedural puzzle 生成器。目前請先前往「闖關模式（Campaign Mode）」體驗已精確驗證唯一解的 5×5 入門測試與 7×7 經典棲地關卡！
          </p>
        </div>

        <div className="w-full max-w-xs flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              onGoToCampaign();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>前往闖關模式 (Campaign)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playClear();
              onBackToHome();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors cursor-pointer active:scale-95"
          >
            返回首頁 (Home)
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-md mx-auto pt-3 border-t border-slate-800/60 text-center text-[11px] text-slate-500">
        Monsterdoku · Endless Mode Placeholder
      </footer>
    </div>
  );
};
