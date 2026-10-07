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

export const COLOR_REGIONS_5: ColorRegion[] = COLOR_REGIONS_7.slice(0, 5);

// ----------------------------------------------------
// 5x5 TEST LEVEL: Verified 100% Unique Solution [1, 3, 0, 2, 4]
// ----------------------------------------------------
const GRID_5X5_TEST: number[][] = [
  [0, 0, 1, 1, 1],
  [2, 0, 1, 1, 1],
  [2, 2, 1, 4, 4],
  [3, 3, 3, 4, 4],
  [3, 3, 4, 4, 4],
];
export const SOLUTION_5X5_TEST: number[] = [1, 3, 0, 2, 4];

// ----------------------------------------------------
// LEVEL 1 (7x7): Verified 100% Unique Solution [0, 3, 5, 1, 6, 4, 2]
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
// LEVEL 2 (7x7): Verified 100% Unique Solution [0, 6, 1, 3, 5, 2, 4]
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
// LEVEL 3 (7x7): Verified 100% Unique Solution [6, 0, 5, 2, 4, 1, 3]
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
  solution: number[],
  options?: {
    size?: number;
    regions?: ColorRegion[];
    difficulty?: 'tutorial' | 'beginner' | 'easy' | 'medium' | 'hard';
    category?: 'tutorial' | 'campaign' | 'test' | 'endless';
    description?: string;
  }
): PuzzleData {
  const size = options?.size ?? grid.length;
  const regions = options?.regions ?? (size === 5 ? COLOR_REGIONS_5 : COLOR_REGIONS_7);

  return {
    id,
    title,
    titleEn: `Level ${levelNum}`,
    monsterName: '三尾狐',
    monsterNameEn: 'Three-Tailed Fox',
    size,
    regions,
    cells: grid.map((row, r) =>
      row.map((regionId, c) => ({
        row: r,
        col: c,
        regionId,
        active: true,
      }))
    ),
    solution,
    difficulty: options?.difficulty,
    category: options?.category,
    description: options?.description,
  };
}

export const PUZZLE_5X5_TEST = createPuzzle(
  'level-5x5-test',
  1,
  '5×5 測試關卡',
  GRID_5X5_TEST,
  SOLUTION_5X5_TEST,
  {
    size: 5,
    regions: COLOR_REGIONS_5,
    difficulty: 'beginner',
    category: 'campaign',
    description: '5×5 小型棋盤測試關卡，驗證自適應棋盤大小與核心非相鄰邏輯。',
  }
);

export const PUZZLES_7X7: PuzzleData[] = [
  createPuzzle('level-1', 2, '關卡 1 (7×7)', GRID_L1, SOLUTION_L1, {
    size: 7,
    regions: COLOR_REGIONS_7,
    difficulty: 'easy',
    category: 'campaign',
  }),
  createPuzzle('level-2', 3, '關卡 2 (7×7)', GRID_L2, SOLUTION_L2, {
    size: 7,
    regions: COLOR_REGIONS_7,
    difficulty: 'medium',
    category: 'campaign',
  }),
  createPuzzle('level-3', 4, '關卡 3 (7×7)', GRID_L3, SOLUTION_L3, {
    size: 7,
    regions: COLOR_REGIONS_7,
    difficulty: 'hard',
    category: 'campaign',
  }),
];

export const PUZZLES: PuzzleData[] = [
  PUZZLE_5X5_TEST,
  ...PUZZLES_7X7,
];

// Backwards compatibility export
export const SAMPLE_PUZZLE = PUZZLE_5X5_TEST;
export const SAMPLE_SOLUTION = SOLUTION_5X5_TEST;
export const SAMPLE_REGIONS = COLOR_REGIONS_7;
