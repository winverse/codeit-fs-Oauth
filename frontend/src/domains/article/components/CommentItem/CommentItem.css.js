import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';

export const item = style({
  position: 'relative',
  padding: '24px 0',
});

export const content = style({
  fontSize: '16px',
  lineHeight: 1.4,
  marginBottom: vars.space.lg,
  whiteSpace: 'pre-wrap',
});

export const profileRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: vars.space.sm,
  alignItems: 'flex-start',
});

export const profile = style({
  display: 'inline-flex',
  gap: vars.space.xs,
  alignItems: 'center',
});

export const profileImageWrap = style({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  overflow: 'hidden',
  flexShrink: 0,
});

export const nickname = style({
  color: vars.color.gray600,
  fontSize: '14px',
  marginBottom: '4px',
});

export const timestamp = style({
  color: vars.color.gray400,
  fontSize: '12px',
});

export const actions = style({
  display: 'inline-flex',
  gap: vars.space.xs,
});

export const actionButton = style({
  minHeight: '32px',
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.gray200}`,
  color: vars.color.gray700,
  fontSize: '13px',
  fontWeight: 600,
  padding: '0 10px',
  selectors: {
    '&:hover': {
      borderColor: vars.color.blue,
      color: vars.color.blue,
    },
  },
});

export const textarea = style({
  width: '100%',
  minHeight: '96px',
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.gray100,
  padding: '14px 16px',
  marginBottom: vars.space.sm,
});

export const editActions = style({
  display: 'inline-flex',
  gap: vars.space.xs,
  marginTop: vars.space.xs,
});

export const divider = style({
  width: '100%',
  height: '1px',
  border: 0,
  backgroundColor: vars.color.gray200,
});
