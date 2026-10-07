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
export const COLOR_REGIONS_6: ColorRegion[] = COLOR_REGIONS_7.slice(0, 6);

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
// TUTORIAL 2 (5x5 Assisted): Verified 100% Unique Solution [2, 0, 3, 1, 4]
// Focuses on assisted observation of small regions & indirect elimination
// ----------------------------------------------------
const GRID_TUTORIAL_2: number[][] = [
  [1, 0, 0, 2, 2],
  [1, 1, 2, 2, 2],
  [3, 3, 3, 2, 4],
  [3, 3, 3, 3, 4],
  [3, 3, 3, 4, 4],
];
export const SOLUTION_TUTORIAL_2: number[] = [2, 0, 3, 1, 4];

export const TUTORIAL_2_STEPS: TutorialStep[] = [
  {
    stepId: 1,
    instruction: '【尋找突破口】留意上方的綠色棲地，它只有 2 個格子。觀察相鄰的青色棲地，想想看：哪一個位置若放置怪獸，會讓青色棲地完全沒有藏身之處？',
    subText: '透過相鄰影響進行思考，推導出綠色棲地中唯一的安全位置並放置三尾狐 🦊。',
    mode: 'assisted',
    highlightRegionId: 0,
    conditionType: 'cell_fox',
    targetCell: { row: 0, col: 2 },
  },
  {
    stepId: 2,
    instruction: '【連鎖推導】剛才放下的三尾狐佔據了第一行，且相鄰周圍都被封鎖。看看左上角的青色棲地，現在還剩下哪裡可以放？',
    subText: '排除受波及的格子後，青色棲地只剩下唯一可能的安全位置。',
    mode: 'assisted',
    highlightRegionId: 1,
    conditionType: 'cell_fox',
    targetCell: { row: 1, col: 0 },
  },
  {
    stepId: 3,
    instruction: '【擴大觀察】第一行與第二行都已經有三尾狐了。現在將目光轉向右側的藍色棲地。',
    subText: '結合每行只能有 1 隻的規則，推導出藍色棲地中未受影響的安全位置。',
    mode: 'assisted',
    highlightRegionId: 2,
    conditionType: 'cell_fox',
    targetCell: { row: 2, col: 3 },
  },
  {
    stepId: 4,
    instruction: '【自主完成】核心循環已然清晰！接下來不再提供提示，請運用已學會的技巧獨立找出最後 2 隻三尾狐。',
    subText: '觀察剩餘的行、列與棲地，自主完成這個拼圖吧！',
    mode: 'independent',
    conditionType: 'free_play',
  },
];

export const TUTORIAL_2_PUZZLE = createPuzzle(
  'tutorial-2',
  2,
  '新手教學 2 · 輔助推導',
  GRID_TUTORIAL_2,
  SOLUTION_TUTORIAL_2,
  {
    size: 5,
    regions: COLOR_REGIONS_5,
    difficulty: 'tutorial',
    category: 'tutorial',
    description: '輔助引導教學：學習不再依賴單格棲地，透過觀察小區域矛盾與相鄰影響進行自主推導。',
    guidance: {
      mode: 'assisted',
      instruction: TUTORIAL_2_STEPS[0].instruction,
      highlightRegionId: TUTORIAL_2_STEPS[0].highlightRegionId,
      steps: TUTORIAL_2_STEPS,
    },
  }
);

// ----------------------------------------------------
// TUTORIAL 3 (5x5 Independent): Verified 100% Unique Solution [3, 1, 4, 2, 0]
// First fully independent solve: no scripted steps, no region/cell highlights
// ----------------------------------------------------
const GRID_TUTORIAL_3: number[][] = [
  [1, 0, 0, 0, 0],
  [1, 1, 0, 2, 2],
  [1, 1, 0, 2, 2],
  [1, 1, 3, 2, 2],
  [4, 4, 3, 2, 2],
];
export const SOLUTION_TUTORIAL_3: number[] = [3, 1, 4, 2, 0];

export const TUTORIAL_3_PUZZLE = createPuzzle(
  'tutorial-3',
  3,
  '新手教學 3 · 獨立挑戰',
  GRID_TUTORIAL_3,
  SOLUTION_TUTORIAL_3,
  {
    size: 5,
    regions: COLOR_REGIONS_5,
    difficulty: 'tutorial',
    category: 'tutorial',
    description: '獨立挑戰關卡：完全沒有步驟指引與高亮提示，考驗玩家是否已能獨立完成整題推導。',
    guidance: {
      mode: 'independent',
      instruction: '【獨立挑戰】這次換你自己來！運用剛才學到的技巧，找出所有藏在棲地裡的三尾狐吧。',
      subText: '仔細觀察行、列、棲地與八方非相鄰規則。卡住時可使用上方 💡 燈泡提示。',
    },
  }
);

export const TUTORIAL_PUZZLES: PuzzleData[] = [
  TUTORIAL_1_PUZZLE,
  TUTORIAL_2_PUZZLE,
  TUTORIAL_3_PUZZLE,
];

// ----------------------------------------------------
// CAMPAIGN LEVEL 1 (5x5 Very Easy): Verified 100% Unique Solution [1, 4, 2, 0, 3]
// First formal Campaign level. Clear breakthrough with border 2-cell / 3-cell regions.
// Basic 1-step deductions: scan constraints -> immediate placement / elimination.
// ----------------------------------------------------
export const GRID_CAMPAIGN_L1: number[][] = [
  [0, 0, 2, 1, 1],
  [2, 2, 2, 2, 1],
  [3, 2, 2, 2, 4],
  [3, 4, 4, 4, 4],
  [3, 4, 4, 4, 4],
];
export const SOLUTION_CAMPAIGN_L1: number[] = [1, 4, 2, 0, 3];

// ----------------------------------------------------
// CAMPAIGN LEVEL 2 (5x5 Easy): Verified 100% Unique Solution [0, 2, 4, 1, 3]
// Requires mastering the core deduction loop: Scan -> Eliminate -> Place -> Scan again.
// Features a short 2-step deduction chain combining row and region interaction.
// ----------------------------------------------------
export const GRID_CAMPAIGN_L2: number[][] = [
  [0, 0, 1, 1, 2],
  [1, 1, 1, 1, 2],
  [3, 3, 3, 4, 2],
  [3, 3, 3, 4, 4],
  [3, 3, 3, 4, 4],
];
export const SOLUTION_CAMPAIGN_L2: number[] = [0, 2, 4, 1, 3];

// ----------------------------------------------------
// 5x5 TEST LEVEL (Archived prototype level): Verified 100% Unique Solution [1, 3, 0, 2, 4]
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
    difficulty?: 'tutorial' | 'very_easy' | 'beginner' | 'easy' | 'easy_plus' | 'medium' | 'hard';
    category?: 'tutorial' | 'campaign' | 'test' | 'endless';
    description?: string;
    guidance?: TutorialGuidance;
  }
): PuzzleData {
  const size = options?.size ?? grid.length;
  const regions =
    options?.regions ??
    (size === 5 ? COLOR_REGIONS_5 : size === 6 ? COLOR_REGIONS_6 : COLOR_REGIONS_7);

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

export const CAMPAIGN_L1_PUZZLE = createPuzzle(
  'campaign-1',
  1,
  '關卡 1 · 5×5 (Very Easy)',
  GRID_CAMPAIGN_L1,
  SOLUTION_CAMPAIGN_L1,
  {
    size: 5,
    regions: COLOR_REGIONS_5,
    difficulty: 'very_easy',
    category: 'campaign',
    description: '5×5 入門實戰關卡：脫離教學輔助，自主運用棲地與邊界限制進行推導。',
  }
);

export const CAMPAIGN_L2_PUZZLE = createPuzzle(
  'campaign-2',
  2,
  '關卡 2 · 5×5 (Easy)',
  GRID_CAMPAIGN_L2,
  SOLUTION_CAMPAIGN_L2,
  {
    size: 5,
    regions: COLOR_REGIONS_5,
    difficulty: 'easy',
    category: 'campaign',
    description: '5×5 進階實戰關卡：建立「掃視 → 排除 → 放置」思維循環，體驗短鏈邏輯排除。',
  }
);

// ----------------------------------------------------
// CAMPAIGN LEVEL 3 (6x6 Easy): Verified 100% Unique Solution [3, 0, 5, 1, 4, 2]
// First 6x6 board: introduces board expansion without sudden logic jump.
// Clear opening with 1-2 step deduction (line-region interaction at top-left).
// ----------------------------------------------------
export const GRID_CAMPAIGN_L3: number[][] = [
  [1, 0, 0, 0, 0, 2],
  [1, 2, 2, 2, 2, 2],
  [3, 3, 2, 4, 4, 2],
  [3, 3, 5, 4, 4, 2],
  [3, 5, 5, 4, 4, 4],
  [3, 5, 5, 4, 4, 4],
];
export const SOLUTION_CAMPAIGN_L3: number[] = [3, 0, 5, 1, 4, 2];

export const CAMPAIGN_L3_PUZZLE = createPuzzle(
  'campaign-3',
  3,
  '關卡 3 · 6×6 (Easy)',
  GRID_CAMPAIGN_L3,
  SOLUTION_CAMPAIGN_L3,
  {
    size: 6,
    regions: COLOR_REGIONS_6,
    difficulty: 'easy',
    category: 'campaign',
    description: '更大的棲地，熟悉的推理。首次踏入 6×6 棋盤，運用掌握的基本排除技巧探索更寬闊的都市區域。',
  }
);

// ----------------------------------------------------
// CAMPAIGN LEVEL 4 (6x6 Easy+): Verified 100% Unique Solution [2, 4, 1, 3, 0, 5]
// Second 6x6 board: Increases deduction depth without changing board size.
// Features a multi-phase opening requiring Scan -> Mark Xs -> Scan Again -> Place,
// followed by midgame line-region deduction (short 3-step) before smooth collapse.
// ----------------------------------------------------
export const GRID_CAMPAIGN_L4: number[][] = [
  [2, 0, 0, 0, 0, 0],
  [2, 0, 0, 1, 1, 0],
  [2, 2, 1, 1, 1, 1],
  [4, 2, 3, 3, 3, 1],
  [4, 2, 3, 5, 5, 1],
  [4, 2, 3, 5, 5, 5],
];
export const SOLUTION_CAMPAIGN_L4: number[] = [2, 4, 1, 3, 0, 5];

export const CAMPAIGN_L4_PUZZLE = createPuzzle(
  'campaign-4',
  4,
  '關卡 4 · 6×6 (Easy+)',
  GRID_CAMPAIGN_L4,
  SOLUTION_CAMPAIGN_L4,
  {
    size: 6,
    regions: COLOR_REGIONS_6,
    difficulty: 'easy_plus',
    category: 'campaign',
    description: '尺寸不變，邏輯升級。相同的 6×6 視野，需要更深入觀察棲地與行列的交錯限制，體驗多步驟排除的樂趣。',
  }
);

export const PUZZLE_5X5_TEST = createPuzzle(
  'level-5x5-test',
  99,
  '5×5 測試關卡',
  GRID_5X5_TEST,
  SOLUTION_5X5_TEST,
  {
    size: 5,
    regions: COLOR_REGIONS_5,
    difficulty: 'beginner',
    category: 'test',
    description: '5×5 開發測試關卡。',
  }
);

export const PUZZLES_7X7: PuzzleData[] = [
  createPuzzle('level-1', 5, '關卡 5 (7×7)', GRID_L1, SOLUTION_L1, {
    size: 7,
    regions: COLOR_REGIONS_7,
    difficulty: 'easy',
    category: 'campaign',
  }),
  createPuzzle('level-2', 6, '關卡 6 (7×7)', GRID_L2, SOLUTION_L2, {
    size: 7,
    regions: COLOR_REGIONS_7,
    difficulty: 'medium',
    category: 'campaign',
  }),
  createPuzzle('level-3', 7, '關卡 7 (7×7)', GRID_L3, SOLUTION_L3, {
    size: 7,
    regions: COLOR_REGIONS_7,
    difficulty: 'hard',
    category: 'campaign',
  }),
];

export const CAMPAIGN_PUZZLES: PuzzleData[] = [
  CAMPAIGN_L1_PUZZLE,
  CAMPAIGN_L2_PUZZLE,
  CAMPAIGN_L3_PUZZLE,
  CAMPAIGN_L4_PUZZLE,
  ...PUZZLES_7X7,
];

export const PUZZLES: PuzzleData[] = CAMPAIGN_PUZZLES;

// Backwards compatibility export
export const SAMPLE_PUZZLE = CAMPAIGN_L1_PUZZLE;
export const SAMPLE_SOLUTION = SOLUTION_CAMPAIGN_L1;
export const SAMPLE_REGIONS = COLOR_REGIONS_5;
