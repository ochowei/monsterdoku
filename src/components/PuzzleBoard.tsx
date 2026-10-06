import React from 'react';
import { CellState, ConflictInfo, PuzzleData } from '../types/puzzle';
import { PuzzleCell } from './PuzzleCell';

interface PuzzleBoardProps {
  puzzle: PuzzleData;
  gridState: CellState[][];
  conflicts: ConflictInfo;
  hintCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
  onCellContextMenu?: (e: React.MouseEvent, row: number, col: number) => void;
}

export const PuzzleBoard: React.FC<PuzzleBoardProps> = ({
  puzzle,
  gridState,
  conflicts,
  hintCell,
  onCellClick,
  onCellContextMenu,
}) => {
  const size = puzzle.size;

  // Compute row status
  const rowFoxCounts = gridState.map(
    (row) => row.filter((s) => s === 'fox').length
  );
  // Compute col status
  const colFoxCounts = Array.from({ length: size }, (_, c) =>
    gridState.filter((r) => r[c] === 'fox').length
  );

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Outer decorative board bezel */}
      <div className="relative p-2.5 sm:p-4 bg-gradient-to-b from-[#24334a] via-[#1a2538] to-[#121c2d] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.12)]">
        {/* Subtle corner studs */}
        <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-amber-400/50 shadow-[0_0_4px_rgba(251,191,36,0.6)]" />
        <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-amber-400/50 shadow-[0_0_4px_rgba(251,191,36,0.6)]" />
        <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-amber-400/50 shadow-[0_0_4px_rgba(251,191,36,0.6)]" />
        <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-amber-400/50 shadow-[0_0_4px_rgba(251,191,36,0.6)]" />

        {/* Board Top Column Status Badges */}
        <div className="flex items-center mb-1.5">
          {/* Spacer corresponding to row indicators width */}
          <div className="w-6 sm:w-8 shrink-0 mr-1.5 text-[10px] text-slate-500 font-mono text-center">
            列↓
          </div>

          <div
            className="grid grid-cols-7"
            style={{ width: 'min(76vw, 450px)' }}
          >
            {colFoxCounts.map((count, c) => {
              const isColConflicted = conflicts.colConflicts.has(c);
              const isSatisfied = count === 1 && !isColConflicted;

              return (
                <div
                  key={`col-stat-${c}`}
                  className="flex flex-col items-center justify-center py-0.5"
                >
                  <div
                    className={`
                      w-6 h-5 rounded-md flex items-center justify-center text-[10px] font-bold font-mono transition-all
                      ${
                        isColConflicted
                          ? 'bg-red-500/90 text-white animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.7)]'
                          : isSatisfied
                          ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-[0_0_6px_rgba(16,185,129,0.4)]'
                          : count === 0
                          ? 'text-slate-400/70 hover:text-slate-300'
                          : 'text-amber-400'
                      }
                    `}
                    title={`第 ${c + 1} 列: ${
                      isColConflicted
                        ? '衝突（多於 1 隻）'
                        : isSatisfied
                        ? '完成（恰好 1 隻）'
                        : '尚無三尾狐'
                    }`}
                  >
                    {isColConflicted ? '!' : isSatisfied ? '✓' : c + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* The 7x7 Grid with Row Status Badges on left */}
        <div className="flex items-center">
          {/* Row Indicators on left */}
          <div className="flex flex-col mr-1.5 shrink-0 justify-between">
            <div
              className="grid grid-rows-7 items-center"
              style={{ height: 'min(76vw, 450px)' }}
            >
              {rowFoxCounts.map((count, r) => {
                const isRowConflicted = conflicts.rowConflicts.has(r);
                const isSatisfied = count === 1 && !isRowConflicted;

                return (
                  <div
                    key={`row-stat-${r}`}
                    className="w-6 sm:w-8 h-full flex items-center justify-center"
                  >
                    <div
                      className={`
                        w-6 h-5 rounded-md flex items-center justify-center text-[10px] font-bold font-mono transition-all
                        ${
                          isRowConflicted
                            ? 'bg-red-500/90 text-white animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.7)]'
                            : isSatisfied
                            ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-[0_0_6px_rgba(16,185,129,0.4)]'
                            : count === 0
                            ? 'text-slate-400/70 hover:text-slate-300'
                            : 'text-amber-400'
                        }
                      `}
                      title={`第 ${r + 1} 行: ${
                        isRowConflicted
                          ? '衝突（多於 1 隻）'
                          : isSatisfied
                          ? '完成（恰好 1 隻）'
                          : '尚無三尾狐'
                      }`}
                    >
                      {isRowConflicted ? '!' : isSatisfied ? '✓' : r + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grid Container */}
          <div
            className="grid grid-cols-7 rounded-xl overflow-hidden shadow-2xl bg-slate-950 border-[3px] border-slate-950"
            style={{
              width: 'min(76vw, 450px)',
              height: 'min(76vw, 450px)',
            }}
          >
            {puzzle.cells.map((rowCells, r) =>
              rowCells.map((cell, c) => {
                const regId = cell.regionId;
                const region = puzzle.regions.find((reg) => reg.id === regId)!;

                // Determine border thickness for region demarcation
                const isTopDifferent =
                  r === 0 || puzzle.cells[r - 1][c].regionId !== regId;
                const isBottomDifferent =
                  r === size - 1 || puzzle.cells[r + 1][c].regionId !== regId;
                const isLeftDifferent =
                  c === 0 || puzzle.cells[r][c - 1].regionId !== regId;
                const isRightDifferent =
                  c === size - 1 || puzzle.cells[r][c + 1].regionId !== regId;

                const borderClasses = `
                  ${
                    isTopDifferent
                      ? 'border-t-[3px] border-t-slate-950'
                      : 'border-t border-t-white/30'
                  }
                  ${
                    isBottomDifferent
                      ? 'border-b-[3px] border-b-slate-950'
                      : 'border-b border-b-white/30'
                  }
                  ${
                    isLeftDifferent
                      ? 'border-l-[3px] border-l-slate-950'
                      : 'border-l border-l-white/30'
                  }
                  ${
                    isRightDifferent
                      ? 'border-r-[3px] border-r-slate-950'
                      : 'border-r border-r-white/30'
                  }
                `;

                const isConflicted = conflicts.conflictedCells.has(`${r},${c}`);
                const isHinted =
                  hintCell !== null && hintCell.row === r && hintCell.col === c;

                return (
                  <PuzzleCell
                    key={`cell-${r}-${c}`}
                    row={r}
                    col={c}
                    state={gridState[r][c]}
                    region={region}
                    borderClasses={borderClasses}
                    isConflicted={isConflicted}
                    isHinted={isHinted}
                    onCellClick={onCellClick}
                    onCellContextMenu={onCellContextMenu}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
