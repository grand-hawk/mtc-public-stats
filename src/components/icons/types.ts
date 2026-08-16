import type { ReactNode } from 'react';

export interface SvgSymbolDef {
  id: string;
  viewBox: string;
  content: ReactNode;
}
