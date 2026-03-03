import { style } from '@vanilla-extract/css';
import { media, vars } from '@/styles/tokens.css';

export const list = style({
  display: 'flex',
  flexDirection: 'column',
});

export const item = style({
  display: 'block',
  padding: '4px 0',
});

export const row = style({
  display: 'flex',
  gap: vars.space.xs,
  minHeight: '72px',
});

export const title = style({
  flex: 1,
  color: vars.color.gray800,
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: 1.35,
  '@media': {
    [media.tablet]: {
      fontSize: '20px',
    },
  },
});

export const thumbnail = style({
  width: '72px',
  height: '72px',
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.gray200}`,
  backgroundColor: vars.color.white,
  padding: vars.space.sm,
});

export const imageWrapper = style({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const meta = style({
  marginTop: vars.space.md,
  display: 'flex',
  justifyContent: 'space-between',
  gap: vars.space.sm,
  alignItems: 'center',
});

export const writer = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.xs,
  color: vars.color.gray600,
  fontSize: '14px',
});

export const divider = style({
  width: '100%',
  height: '1px',
  border: 0,
  backgroundColor: vars.color.gray200,
  margin: '24px 0',
});

export const pager = style({
  marginTop: vars.space.lg,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.space.sm,
});

export const pagerLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '88px',
  minHeight: '42px',
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.gray200}`,
  color: vars.color.gray700,
  fontWeight: 600,
  selectors: {
    '&:hover': {
      borderColor: vars.color.blue,
      color: vars.color.blue,
    },
  },
});

export const pagerDisabled = style({
  opacity: 0.45,
  pointerEvents: 'none',
});

export const pagerCurrent = style({
  color: vars.color.gray600,
  fontSize: '14px',
});
