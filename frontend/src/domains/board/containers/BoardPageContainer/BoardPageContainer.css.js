import { style } from '@vanilla-extract/css';
import { media, vars } from '@/styles/tokens.css';

export const wrapper = style({
  gap: vars.space.xl,
});

export const toolbar = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
  marginBottom: vars.space.lg,
  '@media': {
    [media.tablet]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
});

export const searchInput = style({
  flex: 1,
  minHeight: '44px',
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.gray100,
  padding: '0 16px',
  selectors: {
    '&::placeholder': {
      color: vars.color.gray400,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.blue}`,
      outlineOffset: '1px',
    },
  },
});

export const controls = style({
  display: 'flex',
  gap: vars.space.xs,
});

export const sortSelect = style({
  minHeight: '44px',
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.white,
  padding: '0 12px',
});

export const submitButton = style({
  minHeight: '44px',
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.blue,
  color: vars.color.white,
  fontWeight: 700,
  padding: '0 16px',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.blueHover,
    },
  },
});

export const writeLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '44px',
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.blue,
  color: vars.color.white,
  fontWeight: 700,
  padding: '0 16px',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.blueHover,
    },
  },
});
