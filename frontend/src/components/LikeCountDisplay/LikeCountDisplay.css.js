import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';

export const wrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  color: vars.color.gray500,
});
