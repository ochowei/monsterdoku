export type CellState = 'empty' | 'cross' | 'fox';

export interface ColorRegion {
  id: number;
  name: string;
  nameEn: string;
  color: string;
}

export interface PuzzleCellData {
  row: number;
  col: number;
  regionId: number;
  active: boolean; // Preserves future irregular board readiness
}

export interface ConflictInfo {
  rowConflicts: Set<number>;
  colConflicts: Set<number>;
  regionConflicts: Set<number>;
  adjacentFoxes: Set<string>; // "r,c" keys
  conflictedCells: Set<string>; // "r,c" keys
}

export interface PuzzleData {
  id: string;
  title: string;
  titleEn: string;
  monsterName: string;
  monsterNameEn: string;
  size: number;
  regions: ColorRegion[];
  cells: PuzzleCellData[][];
  solution: number[]; // col index for each row: solution[row] = col
  difficulty?: 'tutorial' | 'beginner' | 'easy' | 'medium' | 'hard';
  category?: 'tutorial' | 'campaign' | 'test' | 'endless';
  description?: string;
}
