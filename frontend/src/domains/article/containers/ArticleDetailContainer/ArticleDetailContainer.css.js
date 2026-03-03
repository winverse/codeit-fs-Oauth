import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';

export const backLink = style({
  margin: '0 auto',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  minHeight: '46px',
  padding: '0 18px',
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.blue,
  color: vars.color.white,
  fontWeight: 700,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.blueHover,
    },
  },
});
