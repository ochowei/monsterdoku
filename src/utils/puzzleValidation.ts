import { CellState, ConflictInfo, PuzzleData } from '../types/puzzle';

export interface BoardEvaluation {
  foxCount: number;
  totalRequired: number;
  satisfiedRows: number;
  satisfiedCols: number;
  satisfiedRegions: number;
  isAdjacentValid: boolean;
  conflictedCount: number;
  wrongFoxesCount: number;
  isAllCorrect: boolean;
  statusType: 'success' | 'warning' | 'error' | 'in_progress';
  title: string;
  message: string;
}

export function computeConflicts(
  gridState: CellState[][],
  puzzle: PuzzleData
): ConflictInfo {
  const rowConflicts = new Set<number>();
  const colConflicts = new Set<number>();
  const regionConflicts = new Set<number>();
  const adjacentFoxes = new Set<string>();
  const conflictedCells = new Set<string>();

  const foxes: { r: number; c: number; regId: number }[] = [];

  for (let r = 0; r < puzzle.size; r++) {
    for (let c = 0; c < puzzle.size; c++) {
      if (gridState[r][c] === 'fox') {
        const regId = puzzle.cells[r][c].regionId;
        foxes.push({ r, c, regId });
      }
    }
  }

  // Check pairwise conflicts
  for (let i = 0; i < foxes.length; i++) {
    for (let j = i + 1; j < foxes.length; j++) {
      const f1 = foxes[i];
      const f2 = foxes[j];
      let isConflict = false;

      // 1. Same row
      if (f1.r === f2.r) {
        rowConflicts.add(f1.r);
        isConflict = true;
      }

      // 2. Same col
      if (f1.c === f2.c) {
        colConflicts.add(f1.c);
        isConflict = true;
      }

      // 3. Same region
      if (f1.regId === f2.regId) {
        regionConflicts.add(f1.regId);
        isConflict = true;
      }

      // 4. 8-direction adjacency (cannot touch horizontally, vertically, or diagonally)
      if (Math.abs(f1.r - f2.r) <= 1 && Math.abs(f1.c - f2.c) <= 1) {
        adjacentFoxes.add(`${f1.r},${f1.c}`);
        adjacentFoxes.add(`${f2.r},${f2.c}`);
        isConflict = true;
      }

      if (isConflict) {
        conflictedCells.add(`${f1.r},${f1.c}`);
        conflictedCells.add(`${f2.r},${f2.c}`);
      }
    }
  }

  return {
    rowConflicts,
    colConflicts,
    regionConflicts,
    adjacentFoxes,
    conflictedCells,
  };
}

export function evaluateBoard(
  gridState: CellState[][],
  puzzle: PuzzleData
): BoardEvaluation {
  const conflicts = computeConflicts(gridState, puzzle);
  const size = puzzle.size;

  let foxCount = 0;
  let wrongFoxesCount = 0;

  // Check row counts
  let satisfiedRows = 0;
  for (let r = 0; r < size; r++) {
    const rowFoxes = gridState[r].filter((s) => s === 'fox').length;
    if (rowFoxes === 1 && !conflicts.rowConflicts.has(r)) {
      satisfiedRows++;
    }
  }

  // Check col counts
  let satisfiedCols = 0;
  for (let c = 0; c < size; c++) {
    const colFoxes = gridState.filter((row) => row[c] === 'fox').length;
    if (colFoxes === 1 && !conflicts.colConflicts.has(c)) {
      satisfiedCols++;
    }
  }

  // Check region counts
  let satisfiedRegions = 0;
  const regionCounts: Record<number, number> = {};
  puzzle.regions.forEach((reg) => {
    regionCounts[reg.id] = 0;
  });

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (gridState[r][c] === 'fox') {
        foxCount++;
        const regId = puzzle.cells[r][c].regionId;
        regionCounts[regId] = (regionCounts[regId] || 0) + 1;
        if (puzzle.solution[r] !== c) {
          wrongFoxesCount++;
        }
      }
    }
  }

  puzzle.regions.forEach((reg) => {
    if (regionCounts[reg.id] === 1 && !conflicts.regionConflicts.has(reg.id)) {
      satisfiedRegions++;
    }
  });

  const isAdjacentValid = conflicts.adjacentFoxes.size === 0;
  const conflictedCount = conflicts.conflictedCells.size;

  const isAllCorrect =
    foxCount === size &&
    conflictedCount === 0 &&
    wrongFoxesCount === 0 &&
    satisfiedRows === size &&
    satisfiedCols === size &&
    satisfiedRegions === size;

  if (isAllCorrect) {
    return {
      foxCount,
      totalRequired: size,
      satisfiedRows,
      satisfiedCols,
      satisfiedRegions,
      isAdjacentValid,
      conflictedCount,
      wrongFoxesCount,
      isAllCorrect: true,
      statusType: 'success',
      title: '解題完全正確！🎉',
      message: `所有 ${size} 隻三尾狐皆符合行、列、顏色區域與非相鄰規則！`,
    };
  }

  if (conflictedCount > 0) {
    return {
      foxCount,
      totalRequired: size,
      satisfiedRows,
      satisfiedCols,
      satisfiedRegions,
      isAdjacentValid,
      conflictedCount,
      wrongFoxesCount,
      isAllCorrect: false,
      statusType: 'error',
      title: `發現 ${conflictedCount} 個衝突位置 ⚠️`,
      message: '有三尾狐在同一行、同一列、同色區域或相鄰 8 格中發生衝突，請檢查紅框標記！',
    };
  }

  if (foxCount === size) {
    if (wrongFoxesCount > 0) {
      return {
        foxCount,
        totalRequired: size,
        satisfiedRows,
        satisfiedCols,
        satisfiedRegions,
        isAdjacentValid,
        conflictedCount,
        wrongFoxesCount,
        isAllCorrect: false,
        statusType: 'warning',
        title: `已放滿 ${size} 隻，但有條件未完全達成 💡`,
        message: `目前已放置 ${size} 隻三尾狐，其中有 ${wrongFoxesCount} 隻位置不符合唯一解。請檢查是否每個顏色區域皆剛好有 1 隻！`,
      };
    }
  }

  if (foxCount === 0) {
    return {
      foxCount,
      totalRequired: size,
      satisfiedRows,
      satisfiedCols,
      satisfiedRegions,
      isAdjacentValid: true,
      conflictedCount: 0,
      wrongFoxesCount: 0,
      isAllCorrect: false,
      statusType: 'in_progress',
      title: '尚未放置三尾狐',
      message: '點擊格子放置三尾狐 🦊 或劃記不可能的排除格 ❌，目標是在每行、每列、每個顏色區域各找 1 隻。',
    };
  }

  // Intermediate state with 1-6 foxes and no conflicts
  if (wrongFoxesCount === 0) {
    return {
      foxCount,
      totalRequired: size,
      satisfiedRows,
      satisfiedCols,
      satisfiedRegions,
      isAdjacentValid,
      conflictedCount: 0,
      wrongFoxesCount: 0,
      isAllCorrect: false,
      statusType: 'success',
      title: `目前放置的 ${foxCount} 隻狐狸全部正確！✨`,
      message: `進展非常順利！已正確滿足 ${satisfiedRows} 行、${satisfiedCols} 列、${satisfiedRegions} 個顏色區域，無任何衝突，請繼續推導剩餘 ${size - foxCount} 隻！`,
    };
  }

  return {
    foxCount,
    totalRequired: size,
    satisfiedRows,
    satisfiedCols,
    satisfiedRegions,
    isAdjacentValid,
    conflictedCount: 0,
    wrongFoxesCount,
    isAllCorrect: false,
    statusType: 'warning',
    title: `已放置 ${foxCount}/${size} 隻，但有位置需調整`,
    message: `目前放置的狐狸中，有 ${wrongFoxesCount} 隻位置不符合最終解，建議檢查該行或相鄰區域的邏輯排除！`,
  };
}

export function checkVictory(
  gridState: CellState[][],
  puzzle: PuzzleData,
  conflicts: ConflictInfo
): boolean {
  if (conflicts.conflictedCells.size > 0) return false;

  let foxCount = 0;
  for (let r = 0; r < puzzle.size; r++) {
    for (let c = 0; c < puzzle.size; c++) {
      if (gridState[r][c] === 'fox') {
        foxCount++;
        if (puzzle.solution[r] !== c) {
          return false;
        }
      }
    }
  }

  return foxCount === puzzle.size;
}

export function getHintAction(
  gridState: CellState[][],
  puzzle: PuzzleData
): {
  type: 'fix_conflict' | 'reveal_fox' | 'mark_impossible' | 'none';
  row?: number;
  col?: number;
  message: string;
} {
  const conflicts = computeConflicts(gridState, puzzle);
  if (conflicts.conflictedCells.size > 0) {
    const firstConflict = Array.from(conflicts.conflictedCells)[0];
    const [r, c] = firstConflict.split(',').map(Number);
    return {
      type: 'fix_conflict',
      row: r,
      col: c,
      message: `衝突提示：請檢查位置 (${r + 1}, ${c + 1}) 的三尾狐（同行、同列、同區域或相鄰衝突）。`,
    };
  }

  // Check if any placed fox is wrong (even if not conflicting yet)
  for (let r = 0; r < puzzle.size; r++) {
    for (let c = 0; c < puzzle.size; c++) {
      if (gridState[r][c] === 'fox' && puzzle.solution[r] !== c) {
        return {
          type: 'fix_conflict',
          row: r,
          col: c,
          message: `調整提示：第 ${r + 1} 行、第 ${c + 1} 列的三尾狐位置不正確，建議清除重新推導。`,
        };
      }
    }
  }

  // Find an unplaced solution fox
  for (let r = 0; r < puzzle.size; r++) {
    const correctCol = puzzle.solution[r];
    if (gridState[r][correctCol] !== 'fox') {
      return {
        type: 'reveal_fox',
        row: r,
        col: correctCol,
        message: `靈獸感應：第 ${r + 1} 行、第 ${correctCol + 1} 列必定藏有一隻三尾狐！`,
      };
    }
  }

  return {
    type: 'none',
    message: '所有三尾狐皆已尋獲！',
  };
}
