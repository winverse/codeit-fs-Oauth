import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';

export const root = style({
  maxWidth: '480px',
  margin: '0 auto',
  padding: '72px 16px 96px',
});

export const card = style({
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.white,
  padding: '28px',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
});

export const title = style({
  color: vars.color.gray900,
  fontSize: '28px',
  lineHeight: 1.2,
  fontWeight: 800,
});

export const subtitle = style({
  color: vars.color.gray600,
  fontSize: '14px',
  lineHeight: 1.5,
});

export const modeRow = style({
  display: 'flex',
  borderRadius: vars.radius.pill,
  padding: '4px',
  gap: '4px',
  backgroundColor: vars.color.gray100,
});

export const modeButton = style({
  flex: 1,
  minHeight: '40px',
  borderRadius: vars.radius.pill,
  fontWeight: 700,
  color: vars.color.gray700,
});

export const modeButtonActive = style({
  backgroundColor: vars.color.white,
  color: vars.color.gray900,
  boxShadow: '0 1px 2px rgba(17, 24, 39, 0.12)',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
});

export const submitButton = style({
  marginTop: '4px',
  minHeight: '48px',
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.blue,
  color: vars.color.white,
  fontWeight: 700,
  selectors: {
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
});

export const divider = style({
  position: 'relative',
  textAlign: 'center',
  color: vars.color.gray500,
  fontSize: '12px',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: '1px',
      backgroundColor: vars.color.gray200,
    },
  },
});

export const dividerText = style({
  position: 'relative',
  backgroundColor: vars.color.white,
  padding: '0 10px',
});

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

export const message = style({
  minHeight: '20px',
  fontSize: '13px',
  lineHeight: 1.4,
  color: vars.color.red,
});
