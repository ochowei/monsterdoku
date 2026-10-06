import { ColorRegion, PuzzleData } from '../types/puzzle';

export const COLOR_REGIONS_7: ColorRegion[] = [
  {
    id: 0,
    name: '綠色',
    nameEn: 'Green',
    color: '#4cae75',
  },
  {
    id: 1,
    name: '青色',
    nameEn: 'Teal',
    color: '#2ea89d',
  },
  {
    id: 2,
    name: '藍色',
    nameEn: 'Blue',
    color: '#4693e0',
  },
  {
    id: 3,
    name: '橘色',
    nameEn: 'Orange',
    color: '#d97b4c',
  },
  {
    id: 4,
    name: '紫色',
    nameEn: 'Purple',
    color: '#8f70d6',
  },
  {
    id: 5,
    name: '紅色',
    nameEn: 'Red',
    color: '#e65366',
  },
  {
    id: 6,
    name: '灰色',
    nameEn: 'Gray',
    color: '#98a1b3',
  },
];

// ----------------------------------------------------
// LEVEL 1: Verified 100% Unique Solution [0, 3, 5, 1, 6, 4, 2]
// ----------------------------------------------------
const GRID_L1: number[][] = [
  [0, 0, 0, 0, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 2],
  [0, 3, 1, 1, 1, 2, 2],
  [0, 3, 1, 1, 2, 2, 4],
  [0, 3, 3, 3, 3, 5, 4],
  [0, 3, 3, 3, 5, 5, 4],
  [6, 6, 6, 6, 6, 5, 5],
];
export const SOLUTION_L1: number[] = [0, 3, 5, 1, 6, 4, 2];

// ----------------------------------------------------
// LEVEL 2: Verified 100% Unique Solution [0, 6, 1, 3, 5, 2, 4]
// ----------------------------------------------------
const GRID_L2: number[][] = [
  [0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 1],
  [0, 2, 1, 1, 1, 1, 1],
  [2, 2, 1, 3, 1, 1, 1],
  [2, 5, 5, 3, 4, 4, 4],
  [2, 5, 5, 3, 6, 4, 6],
  [5, 5, 5, 3, 6, 6, 6],
];
export const SOLUTION_L2: number[] = [0, 6, 1, 3, 5, 2, 4];

// ----------------------------------------------------
// LEVEL 3: Verified 100% Unique Solution [6, 0, 5, 2, 4, 1, 3]
// ----------------------------------------------------
const GRID_L3: number[][] = [
  [1, 1, 1, 0, 0, 0, 0],
  [1, 1, 2, 2, 0, 0, 0],
  [1, 3, 2, 2, 0, 2, 0],
  [3, 3, 3, 2, 2, 2, 2],
  [3, 5, 4, 4, 4, 4, 2],
  [3, 5, 4, 6, 6, 4, 2],
  [5, 5, 6, 6, 4, 4, 2],
];
export const SOLUTION_L3: number[] = [6, 0, 5, 2, 4, 1, 3];

function createPuzzle(
  id: string,
  levelNum: number,
  title: string,
  grid: number[][],
  solution: number[]
): PuzzleData {
  return {
    id,
    title,
    titleEn: `Level ${levelNum}`,
    monsterName: '三尾狐',
    monsterNameEn: 'Three-Tailed Fox',
    size: 7,
    regions: COLOR_REGIONS_7,
    cells: grid.map((row, r) =>
      row.map((regionId, c) => ({
        row: r,
        col: c,
        regionId,
        active: true,
      }))
    ),
    solution,
  };
}

export const PUZZLES: PuzzleData[] = [
  createPuzzle('level-1', 1, '關卡 1', GRID_L1, SOLUTION_L1),
  createPuzzle('level-2', 2, '關卡 2', GRID_L2, SOLUTION_L2),
  createPuzzle('level-3', 3, '關卡 3', GRID_L3, SOLUTION_L3),
];

// Backwards compatibility export
export const SAMPLE_PUZZLE = PUZZLES[0];
export const SAMPLE_SOLUTION = SOLUTION_L1;
export const SAMPLE_REGIONS = COLOR_REGIONS_7;
