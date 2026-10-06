import React from 'react';
import { Volume2, VolumeX, HelpCircle, RotateCcw, Lightbulb, Heart } from 'lucide-react';
import { FoxIcon } from './FoxIllustration';

interface GameHeaderProps {
  currentLevel: number;
  totalLevels: number;
  foxCount: number;
  totalFoxes: number;
  lives: number;
  maxLives: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenRules: () => void;
  onReset: () => void;
  onHint: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  currentLevel,
  totalLevels,
  foxCount,
  totalFoxes,
  lives,
  maxLives,
  isMuted,
  onToggleMute,
  onOpenRules,
  onReset,
  onHint,
}) => {
  return (
    <header className="w-full max-w-2xl mx-auto mb-3 flex flex-col items-center select-none">
      {/* Top Level & Setting Banner */}
      <div className="flex items-center justify-between w-full px-2 sm:px-4 py-2 border-b border-slate-800/80 mb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-semibold">
            第 {currentLevel + 1} 關 / 共 {totalLevels} 關
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 font-medium">7×7 顏色區域</span>
        </div>

        {/* Global Action Icons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
            title={isMuted ? '開啟音效' : '靜音'}
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onOpenRules}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors text-xs font-medium border border-slate-700/60"
            title="查看規則"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>規則</span>
          </button>
        </div>
      </div>

      {/* Main Title & Monster Identifier */}
      <div className="text-center mb-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-semibold mb-1">
          <FoxIcon size={18} />
          <span>三尾狐拼圖 · Three-Tailed Fox</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
          <span>三尾狐邏輯解謎</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          每行、每列、每個顏色區域各藏 1 隻三尾狐，且任意兩隻不可相鄰
        </p>
      </div>

      {/* Primary Status & Quick Actions Bar */}
      <div className="flex items-center justify-between w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl gap-2 flex-wrap sm:flex-nowrap">
        {/* Fox Count Meter */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-6 h-6 rounded-lg bg-orange-500/15 flex items-center justify-center">
            <FoxIcon size={20} />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Foxes Found
            </div>
            <div className="text-sm font-bold font-mono text-amber-300">
              {foxCount} <span className="text-slate-500 font-normal">/ {totalFoxes}</span>
            </div>
          </div>
        </div>

        {/* 3 HP / Hearts Meter */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/70 rounded-lg border border-slate-800/80">
          <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
            靈力 HP
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: maxLives }, (_, i) => {
              const isAlive = i < lives;
              return (
                <span
                  key={`heart-${i}`}
                  className={`text-sm transition-all duration-300 transform ${
                    isAlive
                      ? 'scale-100 filter drop-shadow-[0_0_5px_rgba(239,68,68,0.8)] animate-[pulse_2s_infinite]'
                      : 'scale-90 opacity-25 grayscale filter'
                  }`}
                  title={isAlive ? '生命點數' : '已放錯扣除'}
                >
                  {isAlive ? '❤️' : '🖤'}
                </span>
              );
            })}
          </div>
        </div>

        {/* Action Buttons: Hint & Reset */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onHint}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/60 transition-all active:scale-95 cursor-pointer"
            title="獲得線索"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>提示 Hint</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700/60 transition-all active:scale-95 cursor-pointer"
            title="重設棋盤"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置 Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
