import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';

export const socialGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.space.xs,
});

export const socialButton = style({
  minHeight: '46px',
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.gray200}`,
  color: vars.color.gray800,
  fontWeight: 700,
});
