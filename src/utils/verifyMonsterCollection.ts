/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MONSTERS } from '../data/monsters';
import {
  isMonsterDiscovered,
  getDiscoveredCount,
  toMonsterCardViewModel,
} from './monsterCollection';

export function runMonsterVerification(): boolean {
  console.log('====================================================');
  console.log(' MONSTERDOKU COLLECTION VALIDATION SUITE');
  console.log('====================================================\n');

  let allPassed = true;

  // 1. Static seed data integrity
  console.log('▶ Verifying Static Monster Roster Integrity...');
  console.log('  - Total Monsters count:', MONSTERS.length);

  if (MONSTERS.length < 3) {
    console.error('  ❌ FAILED: MONSTERS must have at least 3 entries.');
    allPassed = false;
  } else {
    console.log('  ✅ Monster count >= 3 check PASSED');
  }

  const seenIds = new Set<string>();
  for (const m of MONSTERS) {
    if (!m.id || !m.name || !m.category || !m.origin || !m.habitat || !m.shortLore) {
      console.error(`  ❌ FAILED: Monster ${m.id || 'unknown'} has missing required fields.`);
      allPassed = false;
    }
    if (seenIds.has(m.id)) {
      console.error(`  ❌ FAILED: Duplicate monster ID: ${m.id}`);
      allPassed = false;
    }
    seenIds.add(m.id);

    // Verify static monster definition does not leak player state
    if ('discovered' in m) {
      console.error(`  ❌ FAILED: Monster definition ${m.id} improperly contains 'discovered' player state.`);
      allPassed = false;
    }
  }

  console.log('  - Monster IDs registered:', Array.from(seenIds).join(', '));
  console.log('  ✅ Static Monster Schema & Separation PASSED\n');

  // 2. Default state check (0 / 3)
  console.log('▶ Verifying Default Discovered State (0 / 3)...');
  const defaultDiscovered: string[] = [];
  const defaultStats = getDiscoveredCount(MONSTERS, defaultDiscovered);
  console.log('  - Discovered count:', defaultStats.discovered);
  console.log('  - Total count:', defaultStats.total);
  console.log('  - Progress text:', defaultStats.progressText);

  if (defaultStats.discovered !== 0 || defaultStats.total !== MONSTERS.length || defaultStats.progressText !== `0 / ${MONSTERS.length}`) {
    console.error('  ❌ FAILED: Default discovered state should be 0 / 3, got:', defaultStats);
    allPassed = false;
  } else {
    console.log('  ✅ Default (0 / 3) State PASSED\n');
  }

  // 3. Information masking check for undiscovered cards
  console.log('▶ Verifying Undiscovered Information Masking...');
  for (const m of MONSTERS) {
    const maskedVM = toMonsterCardViewModel(m, false);
    if (maskedVM.isDiscovered !== false) {
      console.error(`  ❌ FAILED: ViewModel for undiscovered ${m.id} marked as discovered.`);
      allPassed = false;
    }
    if (maskedVM.displayName !== '???') {
      console.error(`  ❌ FAILED: Undiscovered monster ${m.id} leaked display name: ${maskedVM.displayName}`);
      allPassed = false;
    }
    if (maskedVM.origin || maskedVM.habitat || maskedVM.shortLore) {
      console.error(`  ❌ FAILED: Undiscovered monster ${m.id} leaked confidential origin/habitat/lore.`);
      allPassed = false;
    }
  }
  console.log('  ✅ Information Masking PASSED (No leak of name/origin/habitat/lore)\n');

  // 4. Simulated discovered state check (1 / 3 with Three-Tailed Fox)
  console.log('▶ Verifying Simulated Discovered State (1 / 3 with three-tailed-fox)...');
  const simulatedDiscovered: string[] = ['three-tailed-fox'];
  const simulatedStats = getDiscoveredCount(MONSTERS, simulatedDiscovered);
  console.log('  - Discovered count:', simulatedStats.discovered);
  console.log('  - Progress text:', simulatedStats.progressText);

  if (simulatedStats.discovered !== 1 || simulatedStats.progressText !== `1 / ${MONSTERS.length}`) {
    console.error('  ❌ FAILED: Simulated state should be 1 / 3, got:', simulatedStats);
    allPassed = false;
  } else {
    console.log('  ✅ Simulated (1 / 3) Progress PASSED');
  }

  const fox = MONSTERS.find((m) => m.id === 'three-tailed-fox')!;
  const foxVM = toMonsterCardViewModel(fox, true);
  if (!foxVM.isDiscovered || foxVM.displayName !== '三尾狐' || !foxVM.shortLore) {
    console.error('  ❌ FAILED: Discovered Three-Tailed Fox ViewModel missing real data:', foxVM);
    allPassed = false;
  } else {
    console.log('  ✅ Discovered Fox Card ViewModel properly populated PASSED');
  }

  // Other monsters should remain undiscovered in simulated state
  const otherMonsters = MONSTERS.filter((m) => m.id !== 'three-tailed-fox');
  for (const other of otherMonsters) {
    const isOtherDiscovered = isMonsterDiscovered(other.id, simulatedDiscovered);
    if (isOtherDiscovered) {
      console.error(`  ❌ FAILED: ${other.id} was unexpectedly discovered.`);
      allPassed = false;
    }
  }
  console.log('  ✅ Other monsters remained undiscovered in simulated state PASSED\n');

  if (allPassed) {
    console.log('🎉 ALL MONSTER COLLECTION VERIFICATION CHECKS PASSED!\n');
  } else {
    console.error('💥 SOME MONSTER COLLECTION CHECKS FAILED!\n');
    process.exit(1);
  }

  return allPassed;
}

// Execute if run directly via tsx
runMonsterVerification();
