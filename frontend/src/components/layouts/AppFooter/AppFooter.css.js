import { style } from '@vanilla-extract/css';
import { media, vars } from '@/styles/tokens.css';

export const footer = style({
  marginTop: '60px',
  backgroundColor: vars.color.gray900,
  color: vars.color.gray400,
});

export const inner = style({
  maxWidth: vars.size.maxContentWidth,
  margin: '0 auto',
  padding: '32px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '60px',
  '@media': {
    [media.tablet]: {
      padding: '32px 104px 108px',
    },
    [media.desktop]: {
      padding: '32px 200px 108px',
    },
  },
});

export const copyright = style({
  order: 3,
  flexBasis: '100%',
  '@media': {
    [media.tablet]: {
      order: 0,
      flexBasis: 'auto',
    },
  },
});

export const menu = style({
  display: 'flex',
  gap: '30px',
  color: vars.color.gray200,
});

export const social = style({
  display: 'flex',
  gap: vars.space.sm,
});

export const socialLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});
