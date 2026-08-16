import React from 'react';

import {
  premiumBadgeIconSymbol,
  premiumCoinsIconSymbol,
  premiumMoneyIconSymbol,
} from '@/components/features/vehicles/premiumIcon';
import { crewmanIconSymbol } from '@/components/icons/classes/crewman';
import { engineerIconSymbol } from '@/components/icons/classes/engineer';
import { infantryIconSymbol } from '@/components/icons/classes/infantry';
import { eagleTeamIconSymbol } from '@/components/icons/teams/eagle';
import { felidTeamIconSymbol } from '@/components/icons/teams/felid';
import { fishTeamIconSymbol } from '@/components/icons/teams/fish';
import { stateOfGazelTeamIconSymbol } from '@/components/icons/teams/gazel';
import { hawkTeamIconSymbol } from '@/components/icons/teams/hawk';
import { nightingaleTeamIconSymbol } from '@/components/icons/teams/nightingale';
import { pigeonTeamIconSymbol } from '@/components/icons/teams/pigeon';
import { redtailTeamIconSymbol } from '@/components/icons/teams/redtail';
import { schwalbenheimKingdomTeamIconSymbol } from '@/components/icons/teams/schwalbenheim';
import { schwalbenheimRepublicTeamIconSymbol } from '@/components/icons/teams/schwalbenheimRepublic';

import type { SvgSymbolDef } from '@/components/icons/types';

const symbols: SvgSymbolDef[] = [
  eagleTeamIconSymbol,
  felidTeamIconSymbol,
  fishTeamIconSymbol,
  stateOfGazelTeamIconSymbol,
  hawkTeamIconSymbol,
  nightingaleTeamIconSymbol,
  pigeonTeamIconSymbol,
  redtailTeamIconSymbol,
  schwalbenheimKingdomTeamIconSymbol,
  schwalbenheimRepublicTeamIconSymbol,
  crewmanIconSymbol,
  engineerIconSymbol,
  infantryIconSymbol,
  premiumCoinsIconSymbol,
  premiumMoneyIconSymbol,
  premiumBadgeIconSymbol,
];

export default function SvgSymbols() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ height: 0, overflow: 'hidden', position: 'absolute', width: 0 }}
    >
      {symbols.map((symbol) => (
        <symbol id={symbol.id} key={symbol.id} viewBox={symbol.viewBox}>
          {symbol.content}
        </symbol>
      ))}
    </svg>
  );
}
