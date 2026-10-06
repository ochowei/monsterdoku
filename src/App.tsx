/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SAMPLE_PUZZLE } from './data/samplePuzzle';
import { CellState, ConflictInfo } from './types/puzzle';
import { computeConflicts, checkVictory, getHintAction, evaluateBoard } from './utils/puzzleValidation';
import { sounds } from './utils/audio';
import { GameHeader } from './components/GameHeader';
import { PuzzleBoard } from './components/PuzzleBoard';
import { ColorStatusLegend } from './components/ColorStatusLegend';
import { InteractionTools, InputMode } from './components/InteractionTools';
import { ValidationStatusHUD } from './components/ValidationStatusHUD';
import { HowToPlayModal } from './components/HowToPlayModal';
import { VictoryOverlay } from './components/VictoryOverlay';
import { GameOverOverlay } from './components/GameOverOverlay';

export default function App() {
  const puzzle = SAMPLE_PUZZLE;
  const size = puzzle.size;

  // 7x7 Grid state
  const [gridState, setGridState] = useState<CellState[][]>(() =>
    Array.from({ length: size }, () => Array(size).fill('empty'))
  );

  const [inputMode, setInputMode] = useState<InputMode>('cycle');
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hintCell, setHintCell] = useState<{ row: number; col: number } | null>(null);
  const [hintBanner, setHintBanner] = useState<string | null>(null);
  const [highlightedRegionId, setHighlightedRegionId] = useState<number | null>(null);
  const [showFeedbackCard, setShowFeedbackCard] = useState(false);

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

  const [lives, setLives] = useState<number>(3);
  const [isGameOverOpen, setIsGameOverOpen] = useState(false);
  const MAX_LIVES = 3;

  // Handle cell click (Primary interaction)
  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (lives <= 0) {
        setIsGameOverOpen(true);
        return;
      }

      setHintCell(null);
      setGridState((prev) => {
        const next = prev.map((r) => [...r]);
        const current = next[row][col];
        let targetState: CellState = 'empty';

        if (inputMode === 'cycle') {
          // Empty -> Cross -> Fox -> Empty
          if (current === 'empty') targetState = 'cross';
          else if (current === 'cross') targetState = 'fox';
          else targetState = 'empty';
        } else if (inputMode === 'fox') {
          targetState = current === 'fox' ? 'empty' : 'fox';
        } else if (inputMode === 'cross') {
          targetState = current === 'cross' ? 'empty' : 'cross';
        }

        // If placing a Fox, validate correctness to prevent brute-forcing!
        if (targetState === 'fox') {
          const isCorrect = puzzle.solution[row] === col;

          if (!isCorrect) {
            // Mistake: lose 1 HP!
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
            next[row][col] = 'cross';
            sounds.playMistake();
            setHintBanner(`⚠️ 放置錯誤！失去 1 滴血！該格已排除為 ❌。`);
            return next;
          }

          // Correct Fox placement!
          next[row][col] = 'fox';
          sounds.playFoxPlace();
          return next;
        }

        // Normal marking of Cross or Empty
        next[row][col] = targetState;
        if (targetState === 'cross') {
          sounds.playTap();
        } else {
          sounds.playClear();
        }

        return next;
      });
    },
    [inputMode, lives, puzzle]
  );

  // Handle context menu / right click (Convenient quick-X toggle)
  const handleCellContextMenu = useCallback(
    (e: React.MouseEvent, row: number, col: number) => {
      e.preventDefault();
      setHintCell(null);
      setGridState((prev) => {
        const next = prev.map((r) => [...r]);
        const current = next[row][col];
        const newState: CellState = current === 'cross' ? 'empty' : 'cross';
        next[row][col] = newState;

        if (newState === 'cross') {
          sounds.playTap();
        } else {
          sounds.playClear();
        }
        return next;
      });
    },
    []
  );

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
          onCellClick={handleCellClick}
          onCellContextMenu={handleCellContextMenu}
        />

        {/* Real-time Rule Checklist & Answer Validation */}
        <ValidationStatusHUD
          evaluation={evaluation}
          onCheckAnswer={handleCheckAnswer}
          showFeedbackCard={showFeedbackCard}
          onCloseFeedbackCard={() => setShowFeedbackCard(false)}
        />

        {/* Input Mode Controls & Hint Feedback */}
        <InteractionTools
          mode={inputMode}
          onChangeMode={setInputMode}
          hintBanner={hintBanner}
          onClearHint={() => setHintBanner(null)}
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
        onPlayAgain={handleReset}
      />

      <GameOverOverlay
        isOpen={isGameOverOpen}
        onTryAgain={handleReset}
      />
    </div>
  );
}
