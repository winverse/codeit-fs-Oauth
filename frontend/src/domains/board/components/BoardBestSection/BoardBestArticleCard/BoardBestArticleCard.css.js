import { style } from '@vanilla-extract/css';
import { media, vars } from '@/styles/tokens.css';

export const card = style({
  display: 'block',
  borderRadius: vars.radius.sm,
  overflow: 'hidden',
  backgroundColor: vars.color.gray50,
  border: `1px solid ${vars.color.gray200}`,
});

export const sticker = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  marginLeft: vars.space.lg,
  padding: '6px 24px 8px',
  borderRadius: '0 0 32px 32px',
  backgroundColor: vars.color.blue,
  color: vars.color.white,
  fontSize: '16px',
  fontWeight: 600,
});

export const content = style({
  padding: '16px 24px',
});

export const main = style({
  display: 'flex',
  gap: vars.space.xs,
  minHeight: '72px',
});

export const title = style({
  flex: 1,
  color: vars.color.gray800,
  fontSize: '18px',
  fontWeight: 600,
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
  padding: vars.space.sm,
  backgroundColor: vars.color.white,
});

export const imageWrapper = style({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const info = style({
  marginTop: vars.space.md,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.space.sm,
  color: vars.color.gray600,
  fontSize: '14px',
});

export const infoLeft = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.xs,
});

export const timestamp = style({
  color: vars.color.gray400,
  fontSize: '14px',
});
