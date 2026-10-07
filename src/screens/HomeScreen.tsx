/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play, Sparkles, Volume2, VolumeX, Compass, BookOpen } from 'lucide-react';
import { FoxMascotShowcase } from '../components/FoxIllustration';
import { GameScreen } from '../types/gameFlow';
import { sounds } from '../utils/audio';

interface HomeScreenProps {
  onSelectScreen: (screen: GameScreen) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  discoveredCount?: number;
  totalMonsters?: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectScreen,
  isMuted,
  onToggleMute,
  discoveredCount = 0,
  totalMonsters = 3,
}) => {
  return (
    <div className="min-h-screen bg-[#0e1626] bg-gradient-to-b from-[#0e1626] via-[#121c30] to-[#0a101b] text-slate-100 flex flex-col justify-between p-4 sm:p-6 relative overflow-x-hidden">
      {/* Subtle night-sky stars & glow background */}
      <div className="fixed inset-0 pointer-events-none opacity-35">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl" />
        <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-amber-200/50 blur-[1px]" />
        <div className="absolute top-36 left-24 w-1.5 h-1.5 rounded-full bg-cyan-200/40 blur-[1px]" />
        <div className="absolute bottom-20 left-1/3 w-2 h-2 rounded-full bg-violet-200/50 blur-[1px]" />
      </div>

      {/* Top Bar with Sound Toggle */}
      <header className="relative z-10 w-full max-w-lg mx-auto flex items-center justify-end py-1">
        <button
          onClick={onToggleMute}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800/80 transition-colors cursor-pointer"
          title={isMuted ? '開啟音效' : '靜音'}
          aria-label="Toggle sound"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </header>

      {/* Main Home Hub */}
      <main className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center justify-center flex-grow py-4 text-center">
        {/* Mascot Showcase */}
        <div className="mb-3 transform hover:scale-105 transition-transform duration-300">
          <FoxMascotShowcase size={120} />
        </div>

        {/* Titles */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold mb-2 shadow-sm">
            <span>✨ Cozy Urban Fantasy Logic Puzzle</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-1">
            Monsterdoku
          </h1>
          <p className="text-sm font-medium text-amber-400/90 mb-1">
            三尾狐：都市棲地解謎
          </p>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            找出隱藏在街道與顏色區域中的靈獸三尾狐
          </p>
        </div>

        {/* Mode Selector Buttons */}
        <div className="w-full flex flex-col gap-3">
          {/* Tutorial Mode (Primary Onboarding Entry) */}
          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              onSelectScreen('tutorial');
            }}
            className="w-full group relative flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-emerald-600/20 hover:from-emerald-500/30 hover:to-teal-500/25 border border-emerald-400/40 hover:border-emerald-400/70 shadow-[0_8px_24px_rgba(16,185,129,0.15)] transition-all duration-200 cursor-pointer active:scale-[0.98] text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 ml-0.5" />
              </div>
              <div>
                <div className="text-base font-bold text-white group-hover:text-emerald-200 transition-colors flex items-center gap-2">
                  <span>新手教學 · Tutorials</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/25 text-emerald-300 border border-emerald-400/40">
                    推薦入門
                  </span>
                </div>
                <div className="text-xs text-slate-300/90 mt-0.5">
                  3 個 5×5 關卡：引導 → 輔助 → 獨立挑戰
                </div>
              </div>
            </div>
            <span className="text-emerald-400 font-mono text-sm font-bold group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>

          {/* Campaign Mode (Active) */}
          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              onSelectScreen('campaign');
            }}
            className="w-full group relative flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-600/20 hover:from-amber-500/30 hover:to-orange-500/25 border border-amber-400/40 hover:border-amber-400/70 shadow-[0_8px_24px_rgba(245,158,11,0.15)] transition-all duration-200 cursor-pointer active:scale-[0.98] text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
              <div>
                <div className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                  闖關模式 · Campaign
                </div>
                <div className="text-xs text-slate-300/90 mt-0.5">
                  挑戰 5×5 實戰與經典 7×7 區域邏輯關卡
                </div>
              </div>
            </div>
            <span className="text-amber-400 font-mono text-sm font-bold group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>

          {/* Monster Book Entry (Collection Feature) */}
          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              onSelectScreen('monster-book');
            }}
            className="w-full group relative flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-indigo-600/20 hover:from-indigo-500/30 hover:to-purple-500/25 border border-indigo-400/40 hover:border-indigo-400/70 shadow-[0_8px_24px_rgba(99,102,241,0.15)] transition-all duration-200 cursor-pointer active:scale-[0.98] text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-indigo-500 text-slate-950 flex items-center justify-center shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 ml-0.5" />
              </div>
              <div>
                <div className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors flex items-center gap-2">
                  <span>怪獸圖鑑 · Monster Book</span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-500/25 text-indigo-300 border border-indigo-400/40">
                    {discoveredCount} / {totalMonsters} discovered
                  </span>
                </div>
                <div className="text-xs text-slate-300/90 mt-0.5">
                  查看各區域棲地靈獸與收集生態記錄
                </div>
              </div>
            </div>
            <span className="text-indigo-400 font-mono text-sm font-bold group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>

          {/* Endless Mode (Placeholder) */}
          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              onSelectScreen('endless');
            }}
            className="w-full group relative flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all duration-200 cursor-pointer active:scale-[0.98] text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center group-hover:text-amber-300 transition-colors">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors flex items-center gap-2">
                  <span>無盡模式 · Endless</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-amber-400/80 border border-amber-400/20">
                    Preview
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  隨機無限生成謎題挑戰
                </div>
              </div>
            </div>
            <span className="text-slate-500 font-mono text-sm group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 w-full max-w-md mx-auto pt-4 border-t border-slate-800/60 text-center text-[11px] text-slate-400 flex items-center justify-between">
        <div>Monsterdoku Prototype</div>
        <div>itch.io Playtest Ver. 0.2</div>
      </footer>
    </div>
  );
};
