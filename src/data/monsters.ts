/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Monster } from '../types/monster';

/**
 * Static prototype monster roster for Monsterdoku.
 * Separated from player collection progress.
 */
export const MONSTERS: Monster[] = [
  {
    id: 'three-tailed-fox',
    name: '三尾狐',
    category: '靈獸',
    origin: '城市天台與老街巷弄',
    habitat: '神社與暖色燈火之境',
    shortLore: '穿梭於黃昏城市微光之中的守護靈狐。據說看見牠第三條尾巴掠過屋簷的人，都能解開當天最棘手的難題。',
    image: 'fox',
  },
  {
    id: 'mountain-boar',
    name: '巨石野豬',
    category: '山林巨獸',
    origin: '翠綠山巒與竹林幽徑',
    habitat: '密林深苔與岩盤',
    shortLore: '體魄堅如山石的遠古林獸。每當牠穿過森林，大地都會隨著其沉穩的步伐低沉共鳴，守護林間地脈。',
    image: 'boar',
  },
  {
    id: 'river-serpent',
    name: '碧水龍蛇',
    category: '水域幻獸',
    origin: '晨霧籠罩的深潭與水岸',
    habitat: '清涼湖心與冷泉',
    shortLore: '潛伏於深水冷波之中的長頸水怪，性情溫和優雅。據說只會在心靈澄澈之人的注視下，短暫探出水面。',
    image: 'serpent',
  },
];
