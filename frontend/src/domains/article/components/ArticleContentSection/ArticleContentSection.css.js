import { style } from '@vanilla-extract/css';
import { media, vars } from '@/styles/tokens.css';

export const section = style({
  marginBottom: vars.space.xl,
  '@media': {
    [media.tablet]: {
      marginBottom: '64px',
    },
  },
});

export const heading = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: vars.space.sm,
  marginBottom: vars.space.md,
});

export const title = style({
  color: vars.color.gray800,
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: 1.35,
});

export const actionRow = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.xs,
  flexShrink: 0,
});

export const actionButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '36px',
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.gray200}`,
  padding: '0 12px',
  fontSize: '14px',
  color: vars.color.gray700,
  selectors: {
    '&:hover': {
      borderColor: vars.color.blue,
      color: vars.color.blue,
    },
  },
});

export const info = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.md,
  marginBottom: vars.space.md,
  color: vars.color.gray600,
  fontSize: '14px',
});

export const writer = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.xs,
});

export const dividerVertical = style({
  width: '1px',
  height: '24px',
  backgroundColor: vars.color.gray200,
});

export const content = style({
  marginTop: vars.space.lg,
  color: vars.color.gray700,
  fontSize: '16px',
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
});
