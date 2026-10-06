/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { PUZZLES } from './data/samplePuzzle';
import { CellState, ConflictInfo } from './types/puzzle';
import { computeConflicts, checkVictory, getHintAction, evaluateBoard } from './utils/puzzleValidation';
import { sounds } from './utils/audio';
import { GameHeader } from './components/GameHeader';
import { PuzzleBoard } from './components/PuzzleBoard';
import { ColorStatusLegend } from './components/ColorStatusLegend';
import { InteractionTools, PlacementMode } from './components/InteractionTools';
import { ValidationStatusHUD } from './components/ValidationStatusHUD';
import { HowToPlayModal } from './components/HowToPlayModal';
import { VictoryOverlay } from './components/VictoryOverlay';
import { GameOverOverlay } from './components/GameOverOverlay';
import { PlacementConfirmModal } from './components/PlacementConfirmModal';

export default function App() {
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const puzzle = PUZZLES[levelIndex];
  const size = puzzle.size;

  // 7x7 Grid state
  const [gridState, setGridState] = useState<CellState[][]>(() =>
    Array.from({ length: size }, () => Array(size).fill('empty'))
  );

  // Dragging state for left-click exclusion marking
  const [isDragging, setIsDragging] = useState(false);
  const [dragTargetState, setDragTargetState] = useState<CellState | null>(null);

  // Placement mode: 'confirm' (Right-click modal) vs 'quick' (Left-click triple click)
  const [placementMode, setPlacementMode] = useState<PlacementMode>('confirm');
  const clickTrackerRef = useRef<{
    row: number;
    col: number;
    count: number;
    lastTime: number;
  }>({
    row: -1,
    col: -1,
    count: 0,
    lastTime: 0,
  });

  // Right-click pending placement (ghost fox + confirmation dialog)
  const [pendingPlacement, setPendingPlacement] = useState<{
    row: number;
    col: number;
    rect?: DOMRect;
  } | null>(null);

  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hintCell, setHintCell] = useState<{ row: number; col: number } | null>(null);
  const [hintBanner, setHintBanner] = useState<string | null>(null);
  const [highlightedRegionId, setHighlightedRegionId] = useState<number | null>(null);
  const [showFeedbackCard, setShowFeedbackCard] = useState(false);

  const [lives, setLives] = useState<number>(3);
  const [isGameOverOpen, setIsGameOverOpen] = useState(false);
  const MAX_LIVES = 3;

  // Global mouseup listener to end dragging anywhere on screen
  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
      setDragTargetState(null);
    };
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  // Level selection handler
  const handleSelectLevel = useCallback((newIndex: number) => {
    setLevelIndex(newIndex);
    setGridState(Array.from({ length: PUZZLES[newIndex].size }, () => Array(PUZZLES[newIndex].size).fill('empty')));
    setLives(3);
    setPendingPlacement(null);
    setIsDragging(false);
    setDragTargetState(null);
    setHintCell(null);
    setHintBanner(null);
    setShowFeedbackCard(false);
    setIsGameOverOpen(false);
    setIsVictoryOpen(false);
    sounds.playClear();
  }, []);

  // Advance to next level
  const handleNextLevel = useCallback(() => {
    const nextIdx = (levelIndex + 1) % PUZZLES.length;
    handleSelectLevel(nextIdx);
  }, [levelIndex, handleSelectLevel]);

  // Compute conflicts dynamically
  const conflicts: ConflictInfo = useMemo(
    () => computeConflicts(gridState, puzzle),
    [gridState, puzzle]
  );

  // Comprehensive rule and answer evaluation
  const evaluation = useMemo(
    () => evaluateBoard(gridState, puzzle),
    [gridState, puzzle]
  );

  // Count placed foxes
  const foxCount = useMemo(() => {
    let count = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (gridState[r][c] === 'fox') count++;
      }
    }
    return count;
  }, [gridState, size]);

  // Left Mouse Down: single click or drag to mark "排除" (❌), or triple-click to fast-place in quick mode
  const handleCellMouseDown = useCallback(
    (e: React.MouseEvent, row: number, col: number) => {
      // Left click only (e.button === 0)
      if (e.button !== 0) return;

      if (lives <= 0) {
        setIsGameOverOpen(true);
        return;
      }

      // Once correctly placed, Fox cells are locked and cannot be canceled (prevents misclicking)
      if (gridState[row][col] === 'fox') {
        return;
      }

      setHintCell(null);

      // Track clicks for Quick Mode triple-click
      const now = Date.now();
      const isSameCell =
        clickTrackerRef.current.row === row &&
        clickTrackerRef.current.col === col &&
        now - clickTrackerRef.current.lastTime < 500;

      const clickCount = isSameCell ? clickTrackerRef.current.count + 1 : 1;
      clickTrackerRef.current = {
        row,
        col,
        count: clickCount,
        lastTime: now,
      };

      const isTripleClick = placementMode === 'quick' && (e.detail >= 3 || clickCount >= 3);

      if (isTripleClick) {
        // Reset click tracker so subsequent clicks start fresh
        clickTrackerRef.current.count = 0;
        setIsDragging(false);
        setDragTargetState(null);

        // Fast place Fox!
        const isCorrect = puzzle.solution[row] === col;
        if (!isCorrect) {
          // Mistake! Deduct 1 HP
          setLives((prevLives) => {
            const nextLives = Math.max(0, prevLives - 1);
            if (nextLives === 0) {
              setTimeout(() => {
                setIsGameOverOpen(true);
                sounds.playGameOver();
              }, 300);
            }
            return nextLives;
          });

          // Mark this cell as cross so player knows it's excluded
          setGridState((prev) => {
            const next = prev.map((r) => [...r]);
            next[row][col] = 'cross';
            return next;
          });
          sounds.playMistake();
          setHintBanner(`⚠️ 快速放置錯誤！失去 1 滴血！該格已排除為 ❌。`);
        } else {
          // Correct!
          setGridState((prev) => {
            const next = prev.map((r) => [...r]);
            next[row][col] = 'fox';
            return next;
          });
          sounds.playFoxPlace();
          setHintBanner(null);
        }
        return;
      }

      // Normal left click & drag start:
      const current = gridState[row][col];
      // If cell is already cross, toggle back to empty
      // If empty, mark as cross (排除)
      const nextState: CellState = current === 'cross' ? 'empty' : 'cross';

      setDragTargetState(nextState);
      setIsDragging(true);

      setGridState((prev) => {
        const next = prev.map((r) => [...r]);
        next[row][col] = nextState;
        return next;
      });

      if (nextState === 'cross') {
        sounds.playTap();
      } else {
        sounds.playClear();
      }
    },
    [gridState, lives, placementMode, puzzle]
  );

  // Drag over other cells while left mouse button is pressed
  const handleCellMouseEnter = useCallback(
    (row: number, col: number) => {
      if (!isDragging || dragTargetState === null) return;
      if (lives <= 0) return;

      setGridState((prev) => {
        // Protect already confirmed foxes from being accidentally overwritten when painting crosses
        if (prev[row][col] === 'fox') return prev;
        if (prev[row][col] === dragTargetState) return prev;
        const next = prev.map((r) => [...r]);
        next[row][col] = dragTargetState;
        return next;
      });

      if (dragTargetState === 'cross') {
        sounds.playTap();
      } else {
        sounds.playClear();
      }
    },
    [isDragging, dragTargetState, lives]
  );

  // Right Click: preview virtual (semi-transparent) Fox and popup confirmation modal
  const handleCellContextMenu = useCallback(
    (e: React.MouseEvent, row: number, col: number) => {
      e.preventDefault();
      if (lives <= 0) {
        setIsGameOverOpen(true);
        return;
      }

      // Once correctly placed, Fox cells are locked and cannot be canceled
      if (gridState[row][col] === 'fox') {
        return;
      }

      setHintCell(null);

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      // Show virtual ghost preview and open confirmation dialog
      setPendingPlacement({ row, col, rect });
      sounds.playTap();
    },
    [gridState, lives]
  );

  // Confirmation modal: confirm placing Fox at pending coordinates
  const handleConfirmPlacement = useCallback(() => {
    if (!pendingPlacement) return;
    const { row, col } = pendingPlacement;
    setPendingPlacement(null);

    const isCorrect = puzzle.solution[row] === col;
    if (!isCorrect) {
      // Mistake! Deduct 1 HP
      setLives((prevLives) => {
        const nextLives = Math.max(0, prevLives - 1);
        if (nextLives === 0) {
          setTimeout(() => {
            setIsGameOverOpen(true);
            sounds.playGameOver();
          }, 300);
        }
        return nextLives;
      });

      // Mark this cell as cross so player knows it's excluded
      setGridState((prev) => {
        const next = prev.map((r) => [...r]);
        next[row][col] = 'cross';
        return next;
      });
      sounds.playMistake();
      setHintBanner(`⚠️ 放置錯誤！失去 1 滴血！該格已排除為 ❌。`);
    } else {
      // Correct!
      setGridState((prev) => {
        const next = prev.map((r) => [...r]);
        next[row][col] = 'fox';
        return next;
      });
      sounds.playFoxPlace();
      setHintBanner(null);
    }
  }, [pendingPlacement, puzzle]);

  // Confirmation modal: cancel placing Fox
  const handleCancelPlacement = useCallback(() => {
    setPendingPlacement(null);
    sounds.playClear();
  }, []);

  // Check victory condition whenever gridState changes
  useEffect(() => {
    if (checkVictory(gridState, puzzle, conflicts)) {
      sounds.playVictoryFanfare();
      setIsVictoryOpen(true);
    }
  }, [gridState, puzzle, conflicts]);

  // Audio mute toggle
  const handleToggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sounds.setMuted(nextMuted);
  }, [isMuted]);

  // Reset board
  const handleReset = useCallback(() => {
    setGridState(Array.from({ length: size }, () => Array(size).fill('empty')));
    setLives(MAX_LIVES);
    setPendingPlacement(null);
    setIsDragging(false);
    setDragTargetState(null);
    setHintCell(null);
    setHintBanner(null);
    setShowFeedbackCard(false);
    setIsGameOverOpen(false);
    setIsVictoryOpen(false);
    sounds.playClear();
  }, [size]);

  // Hint handler
  const handleHint = useCallback(() => {
    const hint = getHintAction(gridState, puzzle);
    setHintBanner(hint.message);
    if (hint.row !== undefined && hint.col !== undefined) {
      setHintCell({ row: hint.row, col: hint.col });
      sounds.playTap();
    }
  }, [gridState, puzzle]);

  // Check answers handler
  const handleCheckAnswer = useCallback(() => {
    setShowFeedbackCard(true);
    if (evaluation.isAllCorrect) {
      sounds.playVictoryFanfare();
      setIsVictoryOpen(true);
    } else if (evaluation.conflictedCount > 0) {
      sounds.playConflict();
    } else {
      sounds.playTap();
    }
  }, [evaluation]);

  return (
    <div className="min-h-screen bg-[#0e1626] bg-gradient-to-b from-[#0e1626] via-[#121c30] to-[#0a101b] text-slate-100 flex flex-col justify-between p-3 sm:p-5 relative overflow-x-hidden">
      {/* Subtle night-sky stars & glow background */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl" />
        <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-amber-200/50 blur-[1px]" />
        <div className="absolute top-36 left-24 w-1.5 h-1.5 rounded-full bg-cyan-200/40 blur-[1px]" />
        <div className="absolute bottom-20 left-1/3 w-2 h-2 rounded-full bg-violet-200/50 blur-[1px]" />
      </div>

      <main className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center flex-grow">
        {/* Game Header */}
        <GameHeader
          currentLevel={levelIndex}
          totalLevels={PUZZLES.length}
          foxCount={foxCount}
          totalFoxes={size}
          lives={lives}
          maxLives={MAX_LIVES}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenRules={() => setIsRulesOpen(true)}
          onReset={handleReset}
          onHint={handleHint}
        />

        {/* Puzzle Board Viewport */}
        <PuzzleBoard
          puzzle={puzzle}
          gridState={gridState}
          conflicts={conflicts}
          hintCell={hintCell}
          ghostCell={pendingPlacement}
          onCellMouseDown={handleCellMouseDown}
          onCellMouseEnter={handleCellMouseEnter}
          onCellContextMenu={handleCellContextMenu}
        />

        {/* Real-time Rule Checklist & Answer Validation */}
        <ValidationStatusHUD
          evaluation={evaluation}
          onCheckAnswer={handleCheckAnswer}
          showFeedbackCard={showFeedbackCard}
          onCloseFeedbackCard={() => setShowFeedbackCard(false)}
        />

        {/* Dual Mouse Controls Guide & Hint Feedback */}
        <InteractionTools
          hintBanner={hintBanner}
          onClearHint={() => setHintBanner(null)}
          placementMode={placementMode}
          onChangePlacementMode={(mode) => {
            setPlacementMode(mode);
            sounds.playTap();
          }}
        />

        {/* Color Status Legend */}
        <ColorStatusLegend
          puzzle={puzzle}
          gridState={gridState}
          highlightedRegionId={highlightedRegionId}
          onHoverRegion={setHighlightedRegionId}
        />
      </main>

      {/* Footer Info for itch.io playtest context */}
      <footer className="relative z-10 w-full max-w-2xl mx-auto mt-4 pt-3 border-t border-slate-800/60 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-1">
        <div>
          Three-Tailed Fox Puzzle Prototype
        </div>
        <div className="flex items-center gap-2">
          <span>itch.io Playtest Ver. 0.1</span>
          <span>·</span>
          <span>7×7 Color Region Puzzle</span>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <HowToPlayModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      <VictoryOverlay
        isOpen={isVictoryOpen}
        currentLevel={levelIndex}
        totalLevels={PUZZLES.length}
        onPlayAgain={handleReset}
        onNextLevel={handleNextLevel}
      />

      <GameOverOverlay
        isOpen={isGameOverOpen}
        onTryAgain={handleReset}
      />

      {/* Right-click Virtual Fox Placement Confirmation Modal */}
      {pendingPlacement && (
        <PlacementConfirmModal
          isOpen={!!pendingPlacement}
          row={pendingPlacement.row}
          col={pendingPlacement.col}
          anchorRect={pendingPlacement.rect}
          region={puzzle.regions.find((r) => r.id === puzzle.cells[pendingPlacement.row][pendingPlacement.col].regionId)!}
          lives={lives}
          onConfirm={handleConfirmPlacement}
          onCancel={handleCancelPlacement}
        />
      )}
    </div>
  );
}
