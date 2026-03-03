import { style } from '@vanilla-extract/css';
import { media, vars } from '@/styles/tokens.css';

export const titleRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.space.sm,
  marginBottom: vars.space.lg,
});

export const title = style({
  fontSize: '20px',
  fontWeight: 700,
  color: vars.color.gray800,
  '@media': {
    [media.tablet]: {
      fontSize: '28px',
    },
  },
});

export const submitButton = style({
  minHeight: '44px',
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.blue,
  color: vars.color.white,
  fontWeight: 700,
  padding: '0 22px',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.blueHover,
    },
    '&:disabled': {
      backgroundColor: vars.color.gray400,
      cursor: 'default',
    },
  },
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
  '@media': {
    [media.tablet]: {
      gap: vars.space.lg,
    },
  },
});

export const error = style({
  color: vars.color.red,
  fontWeight: 600,
  fontSize: '14px',
});
