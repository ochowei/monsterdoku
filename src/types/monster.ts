/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Static domain model for a Monster in Monsterdoku.
 * Note: Player collection state (such as discovery status) is intentionally
 * decoupled from this definition and tracked separately.
 */
export interface Monster {
  id: string;
  name: string;
  category: string;
  origin: string;
  habitat: string;
  shortLore: string;
  image?: string;
}
