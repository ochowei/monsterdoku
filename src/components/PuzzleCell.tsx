import React from 'react';
import { CellState, ColorRegion } from '../types/puzzle';
import { FoxIcon } from './FoxIllustration';

interface PuzzleCellProps {
  row: number;
  col: number;
  state: CellState;
  region: ColorRegion;
  borderClasses: string;
  isConflicted: boolean;
  isHinted: boolean;
  isGhost?: boolean;
  isLockedCross?: boolean;
  onMouseDown: (e: React.MouseEvent, row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onContextMenu: (e: React.MouseEvent, row: number, col: number) => void;
}

export const PuzzleCell: React.FC<PuzzleCellProps> = ({
  row,
  col,
  state,
  region,
  borderClasses,
  isConflicted,
  isHinted,
  isGhost = false,
  isLockedCross = false,
  onMouseDown,
  onMouseEnter,
  onContextMenu,
}) => {
  const isLocked = state === 'fox' || isLockedCross;

  return (
    <button
      type="button"
      onMouseDown={(e) => onMouseDown(e, row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onContextMenu={(e) => onContextMenu(e, row, col)}
      aria-label={`Cell Row ${row + 1}, Col ${col + 1}, ${region.name}: ${state}`}
      style={{
        backgroundColor: region.color,
      }}
      className={`
        relative flex items-center justify-center aspect-square select-none outline-none
        transition-colors duration-150 ${isLocked ? 'cursor-default' : 'cursor-pointer hover:brightness-110'}
        focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:z-20
        ${borderClasses}
        ${
          isConflicted
            ? 'ring-2 ring-red-500 ring-inset bg-red-950/40 animate-[pulse_1s_ease-in-out_infinite]'
            : ''
        }
        ${
          isHinted
            ? 'ring-2 ring-amber-400 ring-inset shadow-[0_0_16px_rgba(251,191,36,0.5)] z-10'
            : ''
        }
        ${
          isGhost
            ? 'ring-2 ring-amber-300 ring-inset shadow-[0_0_12px_rgba(251,191,36,0.6)] z-10'
            : ''
        }
      `}
    >
      {/* State Display: Fox */}
      {state === 'fox' && (
        <div
          className={`relative z-10 transform transition-transform duration-200 ${
            isConflicted ? 'animate-[shake_0.4s_ease-in-out]' : ''
          }`}
        >
          <FoxIcon size={46} animated={false} />
          {/* Confirmed check badge showing the fox is locked in */}
          <span
            className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full text-[9px] font-bold text-slate-950 flex items-center justify-center shadow-sm ring-1 ring-slate-900"
            title="已確認正確鎖定"
          >
            ✓
          </span>
          {isConflicted && (
            <span
              className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 rounded-full text-[9px] font-bold text-white flex items-center justify-center shadow-sm"
              title="Conflict detected!"
            >
              !
            </span>
          )}
        </div>
      )}

      {/* Ghost Virtual Fox Preview (Right-click preview) */}
      {isGhost && state !== 'fox' && (
        <div className="relative z-10 opacity-60 scale-105 animate-pulse filter drop-shadow-[0_0_8px_rgba(251,191,36,0.9)] pointer-events-none">
          <FoxIcon size={46} animated={false} />
          <span className="absolute -bottom-1 -right-1 px-1 py-0.2 bg-amber-500 text-slate-950 text-[8px] font-bold rounded shadow">
            預覽
          </span>
        </div>
      )}

      {/* State Display: Cross ❌ */}
      {state === 'cross' && !isGhost && (
        <div
          className={`relative z-10 flex items-center justify-center transition-transform ${
            isLockedCross
              ? 'text-red-700 filter drop-shadow-[0_0_6px_rgba(220,38,38,0.7)]'
              : 'text-slate-950/85 hover:text-slate-950 active:scale-90'
          }`}
        >
          <svg
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              isLockedCross
                ? 'drop-shadow-[0_0_4px_rgba(239,68,68,0.8)]'
                : 'drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]'
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={isLockedCross ? '3.8' : '3.2'}
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          {isLockedCross && (
            <span
              className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-600 rounded-full text-[8px] font-bold text-white flex items-center justify-center shadow-md ring-1 ring-slate-950"
              title="放錯已確認排除，不可重複放置"
            >
              ✕
            </span>
          )}
        </div>
      )}

      {/* Hover visual affordance if empty */}
      {state === 'empty' && !isGhost && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-slate-950/25 ring-2 ring-white/40" />
        </div>
      )}
    </button>
  );
};
