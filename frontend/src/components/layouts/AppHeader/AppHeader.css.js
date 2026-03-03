import { style } from '@vanilla-extract/css';
import { media, vars } from '@/styles/tokens.css';

export const header = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: vars.size.headerHeight,
  borderBottom: `1px solid ${vars.color.gray200}`,
  backgroundColor: vars.color.white,
  zIndex: 100,
});

export const inner = style({
  maxWidth: vars.size.maxContentWidth,
  height: '100%',
  margin: '0 auto',
  paddingLeft: vars.space.md,
  paddingRight: vars.space.md,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media': {
    [media.tablet]: {
      paddingLeft: vars.space.lg,
      paddingRight: vars.space.lg,
    },
    [media.desktop]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
});

export const left = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.md,
});

export const logoLink = style({
  display: 'inline-flex',
  alignItems: 'center',
});

export const nav = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.md,
  fontSize: '16px',
  fontWeight: 700,
  color: vars.color.gray600,
  '@media': {
    [media.tablet]: {
      gap: '36px',
      fontSize: '18px',
    },
  },
});

export const navLink = style({
  transition: 'color 150ms ease',
  selectors: {
    '&:hover': {
      color: vars.color.blue,
    },
  },
});

export const navLinkActive = style({
  color: vars.color.blue,
});

export const loginLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '80px',
  height: '42px',
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.blue,
  color: vars.color.white,
  fontWeight: 700,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.blueHover,
    },
  },
});
