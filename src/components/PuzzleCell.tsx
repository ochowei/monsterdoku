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
  onCellClick: (row: number, col: number) => void;
  onCellContextMenu?: (e: React.MouseEvent, row: number, col: number) => void;
}

export const PuzzleCell: React.FC<PuzzleCellProps> = ({
  row,
  col,
  state,
  region,
  borderClasses,
  isConflicted,
  isHinted,
  onCellClick,
  onCellContextMenu,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCellClick(row, col);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onCellContextMenu) {
      onCellContextMenu(e, row, col);
    } else {
      onCellClick(row, col);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      aria-label={`Cell Row ${row + 1}, Col ${col + 1}, ${region.name}: ${state}`}
      style={{
        backgroundColor: region.color,
      }}
      className={`
        relative flex items-center justify-center aspect-square select-none outline-none
        transition-colors duration-150 cursor-pointer
        hover:brightness-110 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:z-20
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
      `}
    >
      {/* State Display: Fox */}
      {state === 'fox' && (
        <div
          className={`relative z-10 transform transition-transform duration-200 active:scale-95 ${
            isConflicted ? 'animate-[shake_0.4s_ease-in-out]' : ''
          }`}
        >
          <FoxIcon size={46} animated={false} />
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

      {/* State Display: Cross ❌ */}
      {state === 'cross' && (
        <div className="relative z-10 flex items-center justify-center text-slate-950/85 hover:text-slate-950 transition-transform active:scale-90">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      )}

      {/* Hover visual affordance if empty */}
      {state === 'empty' && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-slate-950/25 ring-2 ring-white/40" />
        </div>
      )}
    </button>
  );
};
