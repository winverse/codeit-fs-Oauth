import { style } from '@vanilla-extract/css';
import { media, vars } from '@/styles/tokens.css';

export const grid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.space.md,
  '@media': {
    [media.tablet]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    [media.desktop]: {
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: vars.space.lg,
    },
  },
});
