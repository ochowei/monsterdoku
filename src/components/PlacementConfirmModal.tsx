import React, { useState, useEffect, useRef } from 'react';
import { Check, X, GripHorizontal } from 'lucide-react';
import { FoxIcon } from './FoxIllustration';
import { ColorRegion } from '../types/puzzle';

interface PlacementConfirmModalProps {
  isOpen: boolean;
  row: number;
  col: number;
  anchorRect?: DOMRect | null;
  region: ColorRegion;
  lives: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const PlacementConfirmModal: React.FC<PlacementConfirmModalProps> = ({
  isOpen,
  row,
  col,
  anchorRect,
  region,
  lives,
  onConfirm,
  onCancel,
}) => {
  // Allow keyboard Enter to confirm, Escape to cancel
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onConfirm();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onConfirm, onCancel]);

  // Drag offset state so player can freely drag the dialog around the cell
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
  });

  // Reset drag offset when cell changes or modal reopens
  useEffect(() => {
    setDragOffset({ x: 0, y: 0 });
  }, [row, col, isOpen]);

  // Window-level mouse listeners for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.isDragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setDragOffset({
        x: dragRef.current.startOffsetX + dx,
        y: dragRef.current.startOffsetY + dy,
      });
    };

    const handleMouseUp = () => {
      if (dragRef.current.isDragging) {
        dragRef.current.isDragging = false;
        setIsDragging(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleStartDrag = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startOffsetX: dragOffset.x,
      startOffsetY: dragOffset.y,
    };
    setIsDragging(true);
    e.stopPropagation();
  };

  const CARD_WIDTH = 250;
  const CARD_HEIGHT = 130;
  const GAP = 12;

  // Compute adaptive initial placement (top / bottom / left / right) based on cell position and viewport space
  const placement = React.useMemo(() => {
    if (!anchorRect) {
      return {
        style: {
          position: 'fixed' as const,
          top: `calc(50% + ${dragOffset.y}px)`,
          left: `calc(50% + ${dragOffset.x}px)`,
          transform: 'translate(-50%, -50%)',
          width: `${CARD_WIDTH}px`,
        } as React.CSSProperties,
        dir: 'center',
        hasMoved: Math.abs(dragOffset.x) > 10 || Math.abs(dragOffset.y) > 10,
      };
    }

    const spaceAbove = anchorRect.top;
    const spaceBelow = window.innerHeight - anchorRect.bottom;
    const spaceLeft = anchorRect.left;
    const spaceRight = window.innerWidth - anchorRect.right;

    // Preferred direction based on cell coordinates in 7x7 grid
    let dir: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

    if (row <= 1) {
      dir = 'bottom';
    } else if (row >= 5) {
      dir = 'top';
    } else if (col <= 1) {
      dir = 'right';
    } else if (col >= 5) {
      dir = 'left';
    } else {
      // Middle cells (row 2-4, col 2-4)
      if (col === 2) dir = 'left';
      else if (col === 4) dir = 'right';
      else if (row <= 3) dir = 'bottom';
      else dir = 'top';
    }

    // Verify viewport clearance and adapt if needed
    if (dir === 'top' && spaceAbove < CARD_HEIGHT + GAP) {
      dir = spaceBelow >= CARD_HEIGHT + GAP ? 'bottom' : (spaceRight > spaceLeft ? 'right' : 'left');
    } else if (dir === 'bottom' && spaceBelow < CARD_HEIGHT + GAP) {
      dir = spaceAbove >= CARD_HEIGHT + GAP ? 'top' : (spaceRight > spaceLeft ? 'right' : 'left');
    } else if (dir === 'left' && spaceLeft < CARD_WIDTH + GAP) {
      dir = spaceRight >= CARD_WIDTH + GAP ? 'right' : (spaceBelow > spaceAbove ? 'bottom' : 'top');
    } else if (dir === 'right' && spaceRight < CARD_WIDTH + GAP) {
      dir = spaceLeft >= CARD_WIDTH + GAP ? 'left' : (spaceBelow > spaceAbove ? 'bottom' : 'top');
    }

    let baseTop = 0;
    let baseLeft = 0;

    if (dir === 'bottom') {
      baseTop = anchorRect.bottom + GAP;
      baseLeft = anchorRect.left + anchorRect.width / 2 - CARD_WIDTH / 2;
    } else if (dir === 'top') {
      baseTop = anchorRect.top - CARD_HEIGHT - GAP;
      baseLeft = anchorRect.left + anchorRect.width / 2 - CARD_WIDTH / 2;
    } else if (dir === 'right') {
      baseLeft = anchorRect.right + GAP;
      baseTop = anchorRect.top + anchorRect.height / 2 - CARD_HEIGHT / 2;
    } else if (dir === 'left') {
      baseLeft = anchorRect.left - CARD_WIDTH - GAP;
      baseTop = anchorRect.top + anchorRect.height / 2 - CARD_HEIGHT / 2;
    }

    // Apply drag offset and clamp coordinates safely within the visible viewport bounds
    const computedLeft = Math.max(10, Math.min(window.innerWidth - CARD_WIDTH - 10, baseLeft + dragOffset.x));
    const computedTop = Math.max(10, Math.min(window.innerHeight - CARD_HEIGHT - 10, baseTop + dragOffset.y));

    const hasMoved = Math.abs(dragOffset.x) > 10 || Math.abs(dragOffset.y) > 10;

    return {
      style: {
        position: 'fixed' as const,
        top: `${computedTop}px`,
        left: `${computedLeft}px`,
        width: `${CARD_WIDTH}px`,
      } as React.CSSProperties,
      dir,
      hasMoved,
    };
  }, [anchorRect, row, col, dragOffset]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/20 animate-[fadeIn_0.1s_ease-out]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      {/* Anchored pure semi-transparent draggable card */}
      <div
        style={placement.style}
        className={`
          bg-slate-900/85 border border-amber-400/60 rounded-2xl p-3 shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_16px_rgba(245,158,11,0.25)] text-slate-100 overflow-visible select-none animate-[fadeIn_0.12s_ease-out]
          ${isDragging ? 'cursor-grabbing ring-2 ring-amber-400/80 shadow-2xl scale-[1.01]' : 'transition-transform duration-75'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Directional Pointer Arrow towards target cell (hidden if dragged away) */}
        {!placement.hasMoved && (
          <>
            {placement.dir === 'bottom' && (
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900/90 border-t border-l border-amber-400/60 rotate-45 pointer-events-none" />
            )}
            {placement.dir === 'top' && (
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900/90 border-b border-r border-amber-400/60 rotate-45 pointer-events-none" />
            )}
            {placement.dir === 'right' && (
              <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-slate-900/90 border-b border-l border-amber-400/60 rotate-45 pointer-events-none" />
            )}
            {placement.dir === 'left' && (
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-slate-900/90 border-t border-r border-amber-400/60 rotate-45 pointer-events-none" />
            )}
          </>
        )}

        {/* Header row: Draggable Handle, Mini fox & title */}
        <div
          onMouseDown={handleStartDrag}
          className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800/80 cursor-grab active:cursor-grabbing group"
          title="按住此處可自由拖動位置"
        >
          <div className="flex items-center gap-1.5 pointer-events-none">
            <div className="w-5 h-5 rounded-md bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
              <FoxIcon size={15} animated={false} />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">
              在此放置三尾狐？
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Drag Grip Affordance */}
            <span className="text-slate-500 group-hover:text-amber-400/80 transition-colors cursor-grab" title="拖動視窗">
              <GripHorizontal className="w-3.5 h-3.5" />
            </span>

            {/* Quick close button */}
            <button
              type="button"
              onClick={onCancel}
              onMouseDown={(e) => e.stopPropagation()}
              className="p-0.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="取消 (Esc)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Cell position & region tag */}
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-[11px] mb-2">
          <span className="text-slate-300 font-mono font-medium">
            第 {row + 1} 行 · 第 {col + 1} 列
          </span>
          <span className="flex items-center gap-1 text-slate-200 font-medium">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block shadow-sm"
              style={{ backgroundColor: region.color }}
            />
            {region.name}
          </span>
        </div>

        {/* Warning text */}
        <p className="text-[10px] text-amber-200/80 mb-2.5 text-center leading-tight">
          放錯扣 <strong className="text-red-400">1 滴血</strong>（剩餘 {lives}/3 HP）
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-1 px-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 font-medium text-xs border border-white/15 transition-all cursor-pointer active:scale-95"
          >
            取消 (Esc)
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer active:scale-95"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.8]" />
            <span>放置 (Enter)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
