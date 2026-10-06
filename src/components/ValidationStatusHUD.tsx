import React from 'react';
import { CheckCircle2, AlertTriangle, SearchCheck, Check } from 'lucide-react';
import { BoardEvaluation } from '../utils/puzzleValidation';

interface ValidationStatusHUDProps {
  evaluation: BoardEvaluation;
  onCheckAnswer: () => void;
  showFeedbackCard: boolean;
  onCloseFeedbackCard: () => void;
}

export const ValidationStatusHUD: React.FC<ValidationStatusHUDProps> = ({
  evaluation,
  onCheckAnswer,
  showFeedbackCard,
  onCloseFeedbackCard,
}) => {
  const isRowComplete = evaluation.satisfiedRows === evaluation.totalRequired;
  const isColComplete = evaluation.satisfiedCols === evaluation.totalRequired;
  const isRegionComplete = evaluation.satisfiedRegions === evaluation.totalRequired;
  const isAdjacentOk = evaluation.isAdjacentValid;

  return (
    <div className="w-full max-w-xl mx-auto my-3 px-2 flex flex-col items-center gap-2 select-none">
      {/* 4 Core Rule Real-Time Checklist */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {/* Row Rule */}
        <div
          className={`flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
            isRowComplete
              ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
              : 'bg-slate-900/60 border-slate-800 text-slate-400'
          }`}
        >
          <span className="font-medium">每行 1 隻</span>
          <span className="font-mono font-bold flex items-center gap-1">
            {isRowComplete && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            {evaluation.satisfiedRows}/7
          </span>
        </div>

        {/* Column Rule */}
        <div
          className={`flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
            isColComplete
              ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
              : 'bg-slate-900/60 border-slate-800 text-slate-400'
          }`}
        >
          <span className="font-medium">每列 1 隻</span>
          <span className="font-mono font-bold flex items-center gap-1">
            {isColComplete && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            {evaluation.satisfiedCols}/7
          </span>
        </div>

        {/* Region Rule */}
        <div
          className={`flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
            isRegionComplete
              ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
              : 'bg-slate-900/60 border-slate-800 text-slate-400'
          }`}
        >
          <span className="font-medium">每色區 1 隻</span>
          <span className="font-mono font-bold flex items-center gap-1">
            {isRegionComplete && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            {evaluation.satisfiedRegions}/7
          </span>
        </div>

        {/* Adjacency Rule */}
        <div
          className={`flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
            !isAdjacentOk
              ? 'bg-red-950/40 border-red-500/70 text-red-300 animate-pulse'
              : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
          }`}
        >
          <span className="font-medium">非相鄰</span>
          <span className="font-mono font-bold flex items-center gap-1">
            {isAdjacentOk ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>無衝突</span>
              </>
            ) : (
              <span className="text-red-400">有相鄰！</span>
            )}
          </span>
        </div>
      </div>

      {/* Primary Verification Action Button */}
      <button
        onClick={onCheckAnswer}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 active:scale-98 transition-all cursor-pointer"
      >
        <SearchCheck className="w-4 h-4 text-slate-950" />
        <span>驗證當前答案 · Check My Answers</span>
      </button>

      {/* Answer Verification Feedback Card Modal / Toast */}
      {showFeedbackCard && (
        <div className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl text-left animate-[fadeIn_0.2s_ease-out]">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              {evaluation.statusType === 'success' ? (
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : evaluation.statusType === 'error' ? (
                <div className="w-6 h-6 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <SearchCheck className="w-4 h-4" />
                </div>
              )}
              <h4 className="text-xs font-bold text-slate-100">
                {evaluation.title}
              </h4>
            </div>

            <button
              onClick={onCloseFeedbackCard}
              className="text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 transition-colors"
            >
              關閉
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            {evaluation.message}
          </p>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[11px] font-mono text-center">
            <div className="p-1.5 rounded-lg bg-slate-950/60">
              <span className="block text-slate-500 text-[10px]">已放置</span>
              <span className="font-bold text-amber-300">
                {evaluation.foxCount} / {evaluation.totalRequired}
              </span>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-950/60">
              <span className="block text-slate-500 text-[10px]">規則衝突</span>
              <span
                className={`font-bold ${
                  evaluation.conflictedCount > 0
                    ? 'text-red-400'
                    : 'text-emerald-400'
                }`}
              >
                {evaluation.conflictedCount} 處
              </span>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-950/60">
              <span className="block text-slate-500 text-[10px]">已滿足行/列</span>
              <span className="font-bold text-slate-300">
                {evaluation.satisfiedRows + evaluation.satisfiedCols} / 14
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
