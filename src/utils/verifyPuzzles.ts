import {
  TUTORIAL_1_PUZZLE,
  TUTORIAL_2_PUZZLE,
  TUTORIAL_3_PUZZLE,
  CAMPAIGN_L1_PUZZLE,
  CAMPAIGN_L2_PUZZLE,
  CAMPAIGN_L3_PUZZLE,
  CAMPAIGN_L4_PUZZLE,
  CAMPAIGN_L5_PUZZLE,
  CAMPAIGN_PUZZLES,
  TUTORIAL_PUZZLES,
  PUZZLES_7X7,
} from '../data/samplePuzzle';
import { validatePuzzleStructure } from './puzzleValidation';

function runVerification() {
  console.log('====================================================');
  console.log(' MONSTERDOKU PUZZLE VALIDATION SUITE');
  console.log('====================================================\n');

  let allPassed = true;

  // 1. Verify Campaign L1
  console.log('▶ Verifying Campaign Level 1 (5×5 Very Easy)...');
  const l1Result = validatePuzzleStructure(CAMPAIGN_L1_PUZZLE, {
    allowSingleCellRegion: false,
  });
  console.log('  - Grid size:', CAMPAIGN_L1_PUZZLE.size, 'x', CAMPAIGN_L1_PUZZLE.size);
  console.log('  - Region sizes:', l1Result.regionSizes);
  console.log('  - Solutions found:', l1Result.solutionCount);
  console.log('  - Is unique:', l1Result.isUnique);
  console.log('  - Is valid:', l1Result.isValid);
  if (!l1Result.isValid || !l1Result.isUnique) {
    console.error('  ❌ L1 Validation FAILED:', l1Result.errors);
    allPassed = false;
  } else {
    console.log('  ✅ L1 PASSED\n');
  }

  // 2. Verify Campaign L2
  console.log('▶ Verifying Campaign Level 2 (5×5 Easy)...');
  const l2Result = validatePuzzleStructure(CAMPAIGN_L2_PUZZLE, {
    allowSingleCellRegion: false,
  });
  console.log('  - Grid size:', CAMPAIGN_L2_PUZZLE.size, 'x', CAMPAIGN_L2_PUZZLE.size);
  console.log('  - Region sizes:', l2Result.regionSizes);
  console.log('  - Solutions found:', l2Result.solutionCount);
  console.log('  - Is unique:', l2Result.isUnique);
  console.log('  - Is valid:', l2Result.isValid);
  if (!l2Result.isValid || !l2Result.isUnique) {
    console.error('  ❌ L2 Validation FAILED:', l2Result.errors);
    allPassed = false;
  } else {
    console.log('  ✅ L2 PASSED\n');
  }

  // 3. Verify Campaign L3
  console.log('▶ Verifying Campaign Level 3 (6×6 Easy)...');
  const l3Result = validatePuzzleStructure(CAMPAIGN_L3_PUZZLE, {
    allowSingleCellRegion: false,
  });
  console.log('  - Grid size:', CAMPAIGN_L3_PUZZLE.size, 'x', CAMPAIGN_L3_PUZZLE.size);
  console.log('  - Region sizes:', l3Result.regionSizes);
  console.log('  - Solutions found:', l3Result.solutionCount);
  console.log('  - Is unique:', l3Result.isUnique);
  console.log('  - Is valid:', l3Result.isValid);
  if (!l3Result.isValid || !l3Result.isUnique) {
    console.error('  ❌ L3 Validation FAILED:', l3Result.errors);
    allPassed = false;
  } else {
    console.log('  ✅ L3 PASSED\n');
  }

  // 4. Verify Campaign L4
  console.log('▶ Verifying Campaign Level 4 (6×6 Easy+)...');
  const l4Result = validatePuzzleStructure(CAMPAIGN_L4_PUZZLE, {
    allowSingleCellRegion: false,
  });
  console.log('  - Grid size:', CAMPAIGN_L4_PUZZLE.size, 'x', CAMPAIGN_L4_PUZZLE.size);
  console.log('  - Region sizes:', l4Result.regionSizes);
  console.log('  - Solutions found:', l4Result.solutionCount);
  console.log('  - Is unique:', l4Result.isUnique);
  console.log('  - Is valid:', l4Result.isValid);
  if (!l4Result.isValid || !l4Result.isUnique) {
    console.error('  ❌ L4 Validation FAILED:', l4Result.errors);
    allPassed = false;
  } else {
    console.log('  ✅ L4 PASSED\n');
  }

  // 5. Verify Campaign L5
  console.log('▶ Verifying Campaign Level 5 (7×7 Easy+ Transition)...');
  const l5Result = validatePuzzleStructure(CAMPAIGN_L5_PUZZLE, {
    allowSingleCellRegion: false,
  });
  console.log('  - Grid size:', CAMPAIGN_L5_PUZZLE.size, 'x', CAMPAIGN_L5_PUZZLE.size);
  console.log('  - Region sizes:', l5Result.regionSizes);
  console.log('  - Solutions found:', l5Result.solutionCount);
  console.log('  - Is unique:', l5Result.isUnique);
  console.log('  - Is valid:', l5Result.isValid);
  if (!l5Result.isValid || !l5Result.isUnique) {
    console.error('  ❌ L5 Validation FAILED:', l5Result.errors);
    allPassed = false;
  } else {
    console.log('  ✅ L5 PASSED\n');
  }

  // 6. Verify No Repetition across Onboarding and Campaign
  console.log('▶ Verifying Solution Distinctness across Levels...');
  const solutions = [
    { name: 'Tutorial 1', sol: TUTORIAL_1_PUZZLE.solution.join(',') },
    { name: 'Tutorial 2', sol: TUTORIAL_2_PUZZLE.solution.join(',') },
    { name: 'Tutorial 3', sol: TUTORIAL_3_PUZZLE.solution.join(',') },
    { name: 'Campaign L1', sol: CAMPAIGN_L1_PUZZLE.solution.join(',') },
    { name: 'Campaign L2', sol: CAMPAIGN_L2_PUZZLE.solution.join(',') },
    { name: 'Campaign L3', sol: CAMPAIGN_L3_PUZZLE.solution.join(',') },
    { name: 'Campaign L4', sol: CAMPAIGN_L4_PUZZLE.solution.join(',') },
    { name: 'Campaign L5', sol: CAMPAIGN_L5_PUZZLE.solution.join(',') },
  ];

  const seen = new Map<string, string>();
  let hasDuplicates = false;
  for (const s of solutions) {
    if (seen.has(s.sol)) {
      console.error(`  ❌ Duplicate solution between ${s.name} and ${seen.get(s.sol)}: [${s.sol}]`);
      hasDuplicates = true;
      allPassed = false;
    } else {
      seen.set(s.sol, s.name);
      console.log(`  - ${s.name}: [${s.sol}] (unique)`);
    }
  }
  if (!hasDuplicates) {
    console.log('  ✅ All Solutions are distinct across all levels\n');
  }

  // 7. Verify Tutorial Puzzles Integrity
  console.log('▶ Verifying Tutorial 1-3 Integrity...');
  for (const t of TUTORIAL_PUZZLES) {
    // Tutorial 1 has a single-cell region by design for introductory guidance
    const allowSingleCell = t.id === 'tutorial-1';
    const res = validatePuzzleStructure(t, { allowSingleCellRegion: allowSingleCell });
    if (!res.isValid || !res.isUnique) {
      console.error(`  ❌ ${t.id} failed:`, res.errors);
      allPassed = false;
    } else {
      console.log(`  ✅ ${t.id} passed (${res.solutionCount} unique solution)`);
    }
  }
  console.log('');

  // 8. Verify 7x7 Levels Integrity
  console.log('▶ Verifying 7×7 Levels Integrity...');
  for (const p7 of PUZZLES_7X7) {
    const res = validatePuzzleStructure(p7);
    if (!res.isValid || !res.isUnique) {
      console.error(`  ❌ ${p7.id} failed:`, res.errors);
      allPassed = false;
    } else {
      console.log(`  ✅ ${p7.id} passed (${res.solutionCount} unique solution)`);
    }
  }
  console.log('');

  // 9. Verify Campaign Progression
  console.log('▶ Verifying Campaign List Structure...');
  console.log('  - Total Campaign levels:', CAMPAIGN_PUZZLES.length);
  console.log('  - Level 1 ID:', CAMPAIGN_PUZZLES[0].id, `(${CAMPAIGN_PUZZLES[0].size}x${CAMPAIGN_PUZZLES[0].size}, ${CAMPAIGN_PUZZLES[0].difficulty})`);
  console.log('  - Level 2 ID:', CAMPAIGN_PUZZLES[1].id, `(${CAMPAIGN_PUZZLES[1].size}x${CAMPAIGN_PUZZLES[1].size}, ${CAMPAIGN_PUZZLES[1].difficulty})`);
  console.log('  - Level 3 ID:', CAMPAIGN_PUZZLES[2].id, `(${CAMPAIGN_PUZZLES[2].size}x${CAMPAIGN_PUZZLES[2].size}, ${CAMPAIGN_PUZZLES[2].difficulty})`);
  console.log('  - Level 4 ID:', CAMPAIGN_PUZZLES[3].id, `(${CAMPAIGN_PUZZLES[3].size}x${CAMPAIGN_PUZZLES[3].size}, ${CAMPAIGN_PUZZLES[3].difficulty})`);
  console.log('  - Level 5 ID:', CAMPAIGN_PUZZLES[4].id, `(${CAMPAIGN_PUZZLES[4].size}x${CAMPAIGN_PUZZLES[4].size}, ${CAMPAIGN_PUZZLES[4].difficulty})`);
  console.log('  - Level 6 ID:', CAMPAIGN_PUZZLES[5].id, `(${CAMPAIGN_PUZZLES[5].size}x${CAMPAIGN_PUZZLES[5].size})`);
  
  if (
    CAMPAIGN_PUZZLES[0].id !== 'campaign-1' ||
    CAMPAIGN_PUZZLES[1].id !== 'campaign-2' ||
    CAMPAIGN_PUZZLES[2].id !== 'campaign-3' ||
    CAMPAIGN_PUZZLES[3].id !== 'campaign-4' ||
    CAMPAIGN_PUZZLES[4].id !== 'campaign-5'
  ) {
    console.error('  ❌ Campaign list order incorrect!');
    allPassed = false;
  } else {
    console.log('  ✅ Campaign progression correctly set to L1 -> L2 -> L3 -> L4 -> L5 -> existing levels...\n');
  }

  if (allPassed) {
    console.log('🎉 ALL VERIFICATION CHECKS PASSED!\n');
    process.exit(0);
  } else {
    console.error('💥 SOME CHECKS FAILED!\n');
    process.exit(1);
  }
}

runVerification();
