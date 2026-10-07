/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, BookOpen, Compass } from 'lucide-react';
import { Monster } from '../types/monster';
import { getDiscoveredCount, isMonsterDiscovered } from '../utils/monsterCollection';
import { MonsterCard } from '../components/MonsterCard';

interface MonsterBookScreenProps {
  monsters: Monster[];
  discoveredMonsterIds: string[];
  onBackToHome: () => void;
}

export const MonsterBookScreen: React.FC<MonsterBookScreenProps> = ({
  monsters,
  discoveredMonsterIds,
  onBackToHome,
}) => {
  const { discovered, total, progressText } = getDiscoveredCount(
    monsters,
    discoveredMonsterIds
  );

  const percent = total > 0 ? Math.round((discovered / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0e1626] bg-gradient-to-b from-[#0e1626] via-[#121c30] to-[#0a101b] text-slate-100 flex flex-col justify-between p-4 sm:p-6 relative overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl" />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between py-2 border-b border-slate-800/80">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors cursor-pointer text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回首頁</span>
        </button>

        {/* Collection Progress Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>{progressText} discovered</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-4xl mx-auto flex-grow py-6 flex flex-col items-center">
        {/* Title & Lore Subtitle */}
        <div className="text-center mb-8 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Monster Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            怪獸圖鑑 · Monster Book
          </h1>
          <p className="text-sm text-slate-300 font-medium mb-1">
            Discover the creatures hidden across the world.
          </p>
          <p className="text-xs text-slate-400">
            解開各區域的棲地邏輯謎題，登錄隱藏在微光與自然之中的怪獸記錄
          </p>

          {/* Progress Bar */}
          <div className="mt-4 max-w-xs mx-auto">
            <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden border border-slate-700/60 p-[1px]">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-mono">
              <span>進度：{percent}%</span>
              <span>{discovered} / {total} 隻已收集</span>
            </div>
          </div>
        </div>

        {/* Collection Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
          {monsters.map((monster, idx) => (
            <MonsterCard
              key={monster.id}
              monster={monster}
              isDiscovered={isMonsterDiscovered(monster.id, discoveredMonsterIds)}
              index={idx}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
        <div>Monsterdoku Collection Foundation</div>
        <div>v0.1 Prototype</div>
      </footer>
    </div>
  );
};
