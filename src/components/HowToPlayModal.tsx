import React from 'react';
import { X, Check } from 'lucide-react';
import { FoxIcon } from './FoxIllustration';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/70 rounded-2xl p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close rules"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <FoxIcon size={32} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              探索規則 · How to Play
            </h2>
            <p className="text-xs text-slate-400">
              三尾狐邏輯推理規則指南 (Queens / Meodoku 變體)
            </p>
          </div>
        </div>

        {/* 4 Core Rule Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {/* Rule 1 */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-300 text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="text-sm font-semibold text-slate-200">
                每行恰好 1 隻 (Row)
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              棋盤的每一橫行（Row）中，只能藏有一隻三尾狐。
            </p>
          </div>

          {/* Rule 2 */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-300 text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="text-sm font-semibold text-slate-200">
                每列恰好 1 隻 (Column)
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              棋盤的每一直列（Column）中，只能藏有一隻三尾狐。
            </p>
          </div>

          {/* Rule 3 */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-300 text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-sm font-semibold text-slate-200">
                每色區恰好 1 隻 (Color)
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              棋盤劃分的每個顏色區域中，各恰好藏有一隻三尾狐。
            </p>
          </div>

          {/* Rule 4 */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-300 text-xs font-bold flex items-center justify-center">
                4
              </span>
              <h3 className="text-sm font-semibold text-slate-200">
                狐狸不可相鄰 (Non-adjacent)
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              三尾狐極具領地意識：其周圍相鄰的 8 個格子（橫、豎、斜角）都不能有其他狐狸。
            </p>
          </div>
        </div>

        {/* Health / Spirit Rule Banner */}
        <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/40 mb-4 flex items-center gap-3 text-xs">
          <span className="text-xl shrink-0">💔</span>
          <div className="text-slate-300 leading-relaxed">
            <span className="font-bold text-red-300">靈力限制（最多 3 滴血）：</span>
            若放置三尾狐的位置錯誤，將扣除 1 滴血！扣完 3 滴血將探索失敗。善用 <span className="text-amber-300 font-semibold">❌ 排除標記</span> 推導是不會扣血的！
          </div>
        </div>

        {/* Interaction Guide */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-slate-800/80 to-slate-800/40 border border-slate-700/60 mb-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            操作方式 · Controls
          </h4>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-700">
              <span className="font-semibold text-slate-200">單擊格子</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-slate-400 text-[11px]">
              <span>空白</span>
              <span>→</span>
              <span className="text-slate-300 font-bold">❌ 排除</span>
              <span>→</span>
              <span className="text-amber-400 font-bold">🦊 放置狐狸</span>
              <span>→</span>
              <span>空白</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            ※ 滑鼠右鍵可快速直接切換排除標記（❌）。
          </p>
        </div>

        {/* Got it CTA */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>開始探索 · Let's Play</span>
          </button>
        </div>
      </div>
    </div>
  );
};
