import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { recipes, slotRecipes } from '@/components/providers/chakra/recipes';

const config = defineConfig({
  globalCss: {
    '*': {
      scrollBehavior: 'smooth',
      _scrollbar: {
        width: '8px',
      },
      _scrollbarThumb: {
        backgroundColor: 'fg.subtle',
      },
      _scrollbarTrack: {
        backgroundColor: 'bg.subtle',
      },
    },
    '*::selection': {
      backgroundColor: 'whiteAlpha.300',
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: {
          value: GeistSans.style.fontFamily,
        },
        body: {
          value: GeistSans.style.fontFamily,
        },
        mono: {
          value: GeistMono.style.fontFamily,
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: '#0b0b0c',
          },
          subtle: {
            value: '#131315',
          },
          muted: {
            value: '#18181b',
          },
          emphasized: {
            value: '#232328',
          },
          panel: {
            value: '#131315',
          },
        },
      },
    },
    recipes,
    slotRecipes,
  },
});

export default createSystem(defaultConfig, config);
