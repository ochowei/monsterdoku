import { ColorRegion, PuzzleData, TutorialGuidance, TutorialStep } from '../types/puzzle';

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
// TUTORIAL 1 (5x5 Guided): Verified 100% Unique Solution [0, 3, 1, 4, 2]
// Designed specifically for beginner onboarding with intuitive forced moves
// ----------------------------------------------------
const GRID_TUTORIAL_1: number[][] = [
  [0, 1, 2, 2, 2],
  [4, 1, 2, 2, 3],
  [4, 1, 3, 3, 3],
  [4, 4, 4, 3, 3],
  [4, 4, 4, 4, 3],
];
export const SOLUTION_TUTORIAL_1: number[] = [0, 3, 1, 4, 2];

export const TUTORIAL_1_STEPS: TutorialStep[] = [
  {
    stepId: 1,
    instruction: '【觀察棲地】看看左上角的綠色棲地。每個棲地都必須藏有一隻三尾狐，而它只有一個格子！',
    subText: '既然沒有其他位置，三尾狐必定藏在此處。試著在該格放置第一隻三尾狐 🦊（右鍵確認放置，或左鍵快速三連擊）。',
    mode: 'guided',
    highlightRegionId: 0,
    highlightCell: { row: 0, col: 0 },
    conditionType: 'cell_fox',
    targetCell: { row: 0, col: 0 },
  },
  {
    stepId: 2,
    instruction: '【相鄰排除】太棒了！三尾狐極具領地意識：周圍 8 格（橫、豎、斜角）都不能有其他怪獸。',
    subText: '左鍵點擊或按住滑動拖曳，把與牠相鄰的三個格子 (1行2列、2行2列、2行1列) 標記為 ❌ 排除。',
    mode: 'guided',
    highlightCells: [
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: 0 },
    ],
    conditionType: 'cells_cross',
    targetCells: [
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: 0 },
    ],
  },
  {
    stepId: 3,
    instruction: '【連鎖推導】現在觀察旁邊的青色棲地。原本的格子被 ❌ 排除後，只剩下唯一安全的空格了！',
    subText: '在青色棲地唯一安全的空格 (第 3 行第 2 列) 放置第二隻三尾狐 🦊。',
    mode: 'guided',
    highlightRegionId: 1,
    highlightCell: { row: 2, col: 1 },
    conditionType: 'cell_fox',
    targetCell: { row: 2, col: 1 },
  },
  {
    stepId: 4,
    instruction: '【行列規則】做得好！注意：每一行與每一列也只能有 1 隻怪獸。第 3 行與第 2 列都已滿足。',
    subText: '觀察第 2 行與藍色棲地，原本可能的位置已被排除，只剩 (第 2 行第 4 列) 安全！請放置第三隻三尾狐 🦊。',
    mode: 'guided',
    highlightRegionId: 2,
    highlightCell: { row: 1, col: 3 },
    conditionType: 'cell_fox',
    targetCell: { row: 1, col: 3 },
  },
  {
    stepId: 5,
    instruction: '【自主完成】做得好！你已經掌握了核心循環：觀察棲地 → 劃記排除 → 放置怪獸。',
    subText: '運用相同的行、列、棲地與非相鄰規則，自主找出最後兩隻三尾狐並完成拼圖吧！（左鍵排除 ❌，右鍵放置 🦊）',
    mode: 'independent',
    conditionType: 'free_play',
  },
];

export const TUTORIAL_1_PUZZLE = createPuzzle(
  'tutorial-1',
  1,
  '新手教學 1 · 入門引導',
  GRID_TUTORIAL_1,
  SOLUTION_TUTORIAL_1,
  {
    size: 5,
    regions: COLOR_REGIONS_5,
    difficulty: 'tutorial',
    category: 'tutorial',
    description: '實戰引導教學：透過實際操作理解觀察棲地、劃記排除與八方非相鄰規則。',
    guidance: {
      mode: 'guided',
      instruction: TUTORIAL_1_STEPS[0].instruction,
      highlightRegionId: TUTORIAL_1_STEPS[0].highlightRegionId,
      highlightCell: TUTORIAL_1_STEPS[0].highlightCell,
      steps: TUTORIAL_1_STEPS,
    },
  }
);

// ----------------------------------------------------
// 5x5 TEST LEVEL (Campaign L1): Verified 100% Unique Solution [1, 3, 0, 2, 4]
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
    guidance?: TutorialGuidance;
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
    guidance: options?.guidance,
  };
}

export const PUZZLE_5X5_TEST = createPuzzle(
  'level-5x5-test',
  2,
  '5×5 實戰關卡',
  GRID_5X5_TEST,
  SOLUTION_5X5_TEST,
  {
    size: 5,
    regions: COLOR_REGIONS_5,
    difficulty: 'beginner',
    category: 'campaign',
    description: '5×5 小型棋盤進階關卡，獨立自主推導與驗證核心非相鄰邏輯。',
  }
);

export const PUZZLES_7X7: PuzzleData[] = [
  createPuzzle('level-1', 3, '關卡 1 (7×7)', GRID_L1, SOLUTION_L1, {
    size: 7,
    regions: COLOR_REGIONS_7,
    difficulty: 'easy',
    category: 'campaign',
  }),
  createPuzzle('level-2', 4, '關卡 2 (7×7)', GRID_L2, SOLUTION_L2, {
    size: 7,
    regions: COLOR_REGIONS_7,
    difficulty: 'medium',
    category: 'campaign',
  }),
  createPuzzle('level-3', 5, '關卡 3 (7×7)', GRID_L3, SOLUTION_L3, {
    size: 7,
    regions: COLOR_REGIONS_7,
    difficulty: 'hard',
    category: 'campaign',
  }),
];

export const PUZZLES: PuzzleData[] = [
  TUTORIAL_1_PUZZLE,
  PUZZLE_5X5_TEST,
  ...PUZZLES_7X7,
];

// Backwards compatibility export
export const SAMPLE_PUZZLE = PUZZLE_5X5_TEST;
export const SAMPLE_SOLUTION = SOLUTION_5X5_TEST;
export const SAMPLE_REGIONS = COLOR_REGIONS_7;
