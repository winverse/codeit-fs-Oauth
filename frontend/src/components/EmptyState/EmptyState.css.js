import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';

export const container = style({
  margin: vars.space.lg,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.space.lg,
});

export const text = style({
  color: vars.color.gray400,
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
});
