import { CellState, ConflictInfo, PuzzleCellData, PuzzleData } from '../types/puzzle';

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

export interface PuzzleValidationResult {
  isValid: boolean;
  isUnique: boolean;
  solutionCount: number;
  errors: string[];
  regionSizes: Record<number, number>;
}

export function solvePuzzleSolutions(
  cells: PuzzleCellData[][],
  size: number
): number[][] {
  const solutions: number[][] = [];
  function search(row: number, currentCols: number[]) {
    if (row === size) {
      solutions.push([...currentCols]);
      return;
    }
    for (let c = 0; c < size; c++) {
      if (currentCols.includes(c)) continue;
      if (row > 0 && Math.abs(currentCols[row - 1] - c) <= 1) continue;
      const reg = cells[row][c].regionId;
      let regUsed = false;
      for (let prevR = 0; prevR < row; prevR++) {
        if (cells[prevR][currentCols[prevR]].regionId === reg) {
          regUsed = true;
          break;
        }
      }
      if (regUsed) continue;

      currentCols.push(c);
      search(row + 1, currentCols);
      currentCols.pop();
    }
  }
  search(0, []);
  return solutions;
}

export function validatePuzzleStructure(
  puzzle: PuzzleData,
  options?: { allowSingleCellRegion?: boolean }
): PuzzleValidationResult {
  const errors: string[] = [];
  const size = puzzle.size;
  const regionSizes: Record<number, number> = {};

  puzzle.regions.forEach((r) => {
    regionSizes[r.id] = 0;
  });

  // 1. Check dimensions
  if (puzzle.cells.length !== size) {
    errors.push(`Row count mismatch: expected ${size}, got ${puzzle.cells.length}`);
  }

  // 2. Map cells by region
  const regionCells: Map<number, { r: number; c: number }[]> = new Map();
  for (let r = 0; r < size; r++) {
    if (puzzle.cells[r]?.length !== size) {
      errors.push(`Row ${r} col count mismatch: expected ${size}`);
      continue;
    }
    for (let c = 0; c < size; c++) {
      const regId = puzzle.cells[r][c].regionId;
      if (!puzzle.regions.some((reg) => reg.id === regId)) {
        errors.push(`Invalid regionId ${regId} at (${r}, ${c})`);
      }
      regionSizes[regId] = (regionSizes[regId] || 0) + 1;
      if (!regionCells.has(regId)) {
        regionCells.set(regId, []);
      }
      regionCells.get(regId)!.push({ r, c });
    }
  }

  // 3. Check region count and connectivity
  if (regionCells.size !== size) {
    errors.push(`Expected ${size} active regions, found ${regionCells.size}`);
  }

  for (const [id, cells] of regionCells.entries()) {
    if (!options?.allowSingleCellRegion && cells.length < 2) {
      errors.push(`Region ${id} has size ${cells.length} < 2 (single cell regions not allowed)`);
    }

    // 4-connected BFS
    const visited = new Set<string>();
    const queue = [cells[0]];
    visited.add(`${cells[0].r},${cells[0].c}`);
    while (queue.length > 0) {
      const cur = queue.shift()!;
      for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        const nr = cur.r + dr;
        const nc = cur.c + dc;
        if (
          nr >= 0 &&
          nr < size &&
          nc >= 0 &&
          nc < size &&
          puzzle.cells[nr][nc].regionId === id
        ) {
          const key = `${nr},${nc}`;
          if (!visited.has(key)) {
            visited.add(key);
            queue.push({ r: nr, c: nc });
          }
        }
      }
    }
    if (visited.size !== cells.length) {
      errors.push(`Region ${id} is not 4-connected (visited ${visited.size}/${cells.length} cells)`);
    }
  }

  // 4. Check solution validity
  if (puzzle.solution.length !== size) {
    errors.push(`Solution length mismatch: expected ${size}, got ${puzzle.solution.length}`);
  } else {
    const colSet = new Set(puzzle.solution);
    if (colSet.size !== size) {
      errors.push('Duplicate columns in solution');
    }
    const solRegions = new Set<number>();
    for (let r = 0; r < size; r++) {
      const c = puzzle.solution[r];
      if (c >= 0 && c < size) {
        solRegions.add(puzzle.cells[r][c].regionId);
        if (r > 0 && Math.abs(puzzle.solution[r - 1] - c) <= 1) {
          errors.push(`Adjacent foxes in solution between row ${r - 1} and ${r}`);
        }
      }
    }
    if (solRegions.size !== size) {
      errors.push(`Solution does not have exactly 1 fox per region (found ${solRegions.size}/${size})`);
    }
  }

  // 5. Check uniqueness via backtracking solver
  const solutions = solvePuzzleSolutions(puzzle.cells, size);
  const solutionCount = solutions.length;
  const isUnique = solutionCount === 1;

  if (solutionCount === 0) {
    errors.push('Puzzle has no valid solutions');
  } else if (solutionCount > 1) {
    errors.push(`Puzzle does not have unique solution: found ${solutionCount} solutions`);
  }

  return {
    isValid: errors.length === 0,
    isUnique,
    solutionCount,
    errors,
    regionSizes,
  };
}
