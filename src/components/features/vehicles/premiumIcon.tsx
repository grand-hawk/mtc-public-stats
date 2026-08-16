import { Icon } from '@chakra-ui/react';
import React from 'react';

import type { SvgSymbolDef } from '@/components/icons/types';
import type { VehiclesPlaceDataVehicleInfo } from '@generated/vehicles';

export type PremiumType = NonNullable<
  VehiclesPlaceDataVehicleInfo['premium']
>['type'];

export const premiumCoinsIconSymbol: SvgSymbolDef = {
  id: 'premium-icon-coins',
  viewBox: '0 0 24 24',
  content: (
    <>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M9.68 13.69 12 11.93l2.31 1.76-.88-2.85L15.75 9h-2.84L12 6.19 11.09 9H8.25l2.31 1.84-.88 2.85zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72A7.96 7.96 0 0 0 20 10zm-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" />
    </>
  ),
};

export const premiumMoneyIconSymbol: SvgSymbolDef = {
  id: 'premium-icon-money',
  viewBox: '0 0 24 24',
  content: (
    <>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
    </>
  ),
};

export const premiumBadgeIconSymbol: SvgSymbolDef = {
  id: 'premium-icon-badge',
  viewBox: '0 0 512 512',
  content: (
    <path d="M424 134.5h-45.8c2.3-6.6 3.8-13.9 3.8-21.3 0-35.4-28.1-63.2-63-63.2-22.1 0-41.2 10.7-52.5 28L256 92.3l-10.5-14.5C234.2 60.7 215.1 48 193 48c-34.9 0-63 29.8-63 65.2 0 7.5 1.5 14.7 3.8 21.3H88c-23.3 0-41.8 19-41.8 42.7L46 421.8c0 23.7 17.4 42.2 40.7 42.2h336.7c23.3 0 42.7-18.5 42.7-42.2V177.2c-.1-23.7-18.8-42.7-42.1-42.7zM320 91c11.6 0 21 9.5 21 21 0 11.6-9.4 21-21 21s-21-9.5-21-21 9.4-21 21-21zm-128 0c11.6 0 21 9.5 21 21 0 11.6-9.4 21-21 21s-21-9.5-21-21 9.4-21 21-21zM88 177.2h106.7L151 237.5l34 25 50-69.1.2-.2-.2 228.6H88V177.2zm336 244.6H277V193.4l50 69.1 34-25-43.7-60.4H424v244.7z" />
  ),
};

const premiumConfig: Record<
  PremiumType,
  { color: string; symbol: SvgSymbolDef }
> = {
  coins: { color: 'yellow.400', symbol: premiumCoinsIconSymbol },
  money: { color: 'green.400', symbol: premiumMoneyIconSymbol },
  badge: { color: 'purple.400', symbol: premiumBadgeIconSymbol },
  quest: { color: 'purple.400', symbol: premiumBadgeIconSymbol },
};

interface PremiumIconProps {
  boxSize?: string;
  premium?: PremiumType;
}

export default function PremiumIcon({
  boxSize = '14px',
  premium,
}: PremiumIconProps) {
  if (!premium) return null;

  const config = premiumConfig[premium];

  return (
    <Icon boxSize={boxSize} color={config.color} flexShrink={0}>
      <svg
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0}
        viewBox={config.symbol.viewBox}
      >
        <use href={`#${config.symbol.id}`} />
      </svg>
    </Icon>
  );
}
