/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Monster } from '../types/monster';

/**
 * Checks whether a monster is currently marked as discovered by the player.
 */
export function isMonsterDiscovered(
  monsterId: string,
  discoveredIds: readonly string[]
): boolean {
  return discoveredIds.includes(monsterId);
}

/**
 * Calculates current collection statistics.
 */
export function getDiscoveredCount(
  monsters: readonly Monster[],
  discoveredIds: readonly string[]
): { discovered: number; total: number; progressText: string } {
  const discovered = monsters.filter((m) => isMonsterDiscovered(m.id, discoveredIds)).length;
  const total = monsters.length;
  return {
    discovered,
    total,
    progressText: `${discovered} / ${total}`,
  };
}

/**
 * View presentation model for a monster card.
 * Enforces data-masking so undiscovered monsters never leak lore, origin, habitat, or real name.
 */
export interface MonsterCardViewModel {
  id: string;
  isDiscovered: boolean;
  displayName: string;
  displayCategory: string;
  origin?: string;
  habitat?: string;
  shortLore?: string;
  image?: string;
}

export function toMonsterCardViewModel(
  monster: Monster,
  isDiscovered: boolean
): MonsterCardViewModel {
  if (!isDiscovered) {
    return {
      id: monster.id,
      isDiscovered: false,
      displayName: '???',
      displayCategory: '未確認',
    };
  }

  return {
    id: monster.id,
    isDiscovered: true,
    displayName: monster.name,
    displayCategory: monster.category,
    origin: monster.origin,
    habitat: monster.habitat,
    shortLore: monster.shortLore,
    image: monster.image,
  };
}
