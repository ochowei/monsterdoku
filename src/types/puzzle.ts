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

export interface TutorialStep {
  stepId: number;
  instruction: string;
  subText?: string;
  mode?: 'guided' | 'assisted' | 'independent';
  highlightRegionId?: number;
  highlightCell?: { row: number; col: number };
  highlightCells?: { row: number; col: number }[];
  conditionType: 'cell_fox' | 'cells_cross' | 'free_play';
  targetCell?: { row: number; col: number };
  targetCells?: { row: number; col: number }[];
}

export interface TutorialGuidance {
  mode?: 'guided' | 'assisted' | 'independent';
  instruction?: string;
  subText?: string;
  highlightRegionId?: number;
  highlightCell?: { row: number; col: number };
  highlightCells?: { row: number; col: number }[];
  steps?: TutorialStep[];
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
  difficulty?: 'tutorial' | 'very_easy' | 'beginner' | 'easy' | 'easy_plus' | 'medium' | 'hard';
  category?: 'tutorial' | 'campaign' | 'test' | 'endless';
  description?: string;
  guidance?: TutorialGuidance;
}
