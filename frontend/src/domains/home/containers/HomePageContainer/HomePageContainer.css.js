import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';

export const root = style({
  maxWidth: vars.size.maxContentWidth,
  margin: '0 auto',
  padding: '64px 16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: vars.space.lg,
});

export const title = style({
  color: vars.color.gray900,
  fontSize: '40px',
  lineHeight: 1.2,
  fontWeight: 800,
});

export const desc = style({
  color: vars.color.gray600,
  fontSize: '18px',
  lineHeight: 1.55,
});

export const linkRow = style({
  display: 'flex',
  gap: vars.space.sm,
});

export const primaryLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '46px',
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.blue,
  color: vars.color.white,
  fontWeight: 700,
  padding: '0 20px',
});

export const secondaryLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '46px',
  borderRadius: vars.radius.pill,
  border: `1px solid ${vars.color.gray200}`,
  color: vars.color.gray700,
  fontWeight: 700,
  padding: '0 20px',
});
