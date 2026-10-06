import React from 'react';
import { CellState, PuzzleData } from '../types/puzzle';

interface ColorStatusLegendProps {
  puzzle: PuzzleData;
  gridState: CellState[][];
  highlightedRegionId: number | null;
  onHoverRegion: (regionId: number | null) => void;
}

export const ColorStatusLegend: React.FC<ColorStatusLegendProps> = ({
  puzzle,
  gridState,
  highlightedRegionId,
  onHoverRegion,
}) => {
  // Count how many foxes are in each color
  const colorFoxCounts: Record<number, number> = {};
  puzzle.regions.forEach((r) => {
    colorFoxCounts[r.id] = 0;
  });

  for (let r = 0; r < puzzle.size; r++) {
    for (let c = 0; c < puzzle.size; c++) {
      if (gridState[r][c] === 'fox') {
        const regId = puzzle.cells[r][c].regionId;
        colorFoxCounts[regId] = (colorFoxCounts[regId] || 0) + 1;
      }
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-3 px-2 flex flex-col items-center select-none">
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {puzzle.regions.map((region) => {
          const count = colorFoxCounts[region.id] || 0;
          const isSatisfied = count === 1;
          const isOverflow = count > 1;
          const isHighlighted = highlightedRegionId === region.id;

          return (
            <div
              key={`color-reg-${region.id}`}
              onMouseEnter={() => onHoverRegion(region.id)}
              onMouseLeave={() => onHoverRegion(null)}
              className={`
                flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer
                ${
                  isHighlighted
                    ? 'ring-2 ring-amber-400 bg-slate-800'
                    : 'bg-slate-900/60 hover:bg-slate-800/80'
                }
                ${
                  isOverflow
                    ? 'border-red-500/80 bg-red-950/20'
                    : isSatisfied
                    ? 'border-emerald-500/50 bg-emerald-950/20'
                    : 'border-slate-800'
                }
              `}
              title={`${region.name}區域: ${count}/1 隻三尾狐`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm ring-1 ring-white/20"
                style={{ backgroundColor: region.color }}
              />
              <span className="text-xs font-semibold text-slate-300">
                {region.name}
              </span>
              <span
                className={`text-[10px] font-mono font-bold ${
                  isOverflow
                    ? 'text-red-400'
                    : isSatisfied
                    ? 'text-emerald-400'
                    : 'text-slate-500'
                }`}
              >
                {isOverflow ? '!' : isSatisfied ? '✓' : `${count}/1`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
