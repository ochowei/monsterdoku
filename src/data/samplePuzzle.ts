import { ColorRegion, PuzzleData } from '../types/puzzle';

export const SAMPLE_REGIONS: ColorRegion[] = [
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

const RAW_GRID: number[][] = [
  [0, 0, 0, 0, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 2],
  [0, 3, 1, 1, 1, 2, 2],
  [0, 3, 1, 1, 2, 2, 4],
  [0, 3, 3, 3, 3, 5, 4],
  [0, 3, 3, 3, 5, 5, 4],
  [6, 6, 6, 6, 6, 5, 5],
];

// Verified 100% unique solution: [row] -> col
// row 0: col 0 (region 0: Green)
// row 1: col 3 (region 1: Teal)
// row 2: col 5 (region 2: Blue)
// row 3: col 1 (region 3: Orange)
// row 4: col 6 (region 4: Purple)
// row 5: col 4 (region 5: Red)
// row 6: col 2 (region 6: Gray)
export const SAMPLE_SOLUTION: number[] = [0, 3, 5, 1, 6, 4, 2];

export const SAMPLE_PUZZLE: PuzzleData = {
  id: 'sample-01',
  title: '三尾狐拼圖',
  titleEn: 'Three-Tailed Fox Puzzle',
  monsterName: '三尾狐',
  monsterNameEn: 'Three-Tailed Fox',
  size: 7,
  regions: SAMPLE_REGIONS,
  cells: RAW_GRID.map((row, r) =>
    row.map((regionId, c) => ({
      row: r,
      col: c,
      regionId,
      active: true,
    }))
  ),
  solution: SAMPLE_SOLUTION,
};
