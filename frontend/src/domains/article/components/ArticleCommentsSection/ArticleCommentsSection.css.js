import { style } from '@vanilla-extract/css';
import { media, vars } from '@/styles/tokens.css';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
  marginBottom: vars.space.xl,
});

export const sectionTitle = style({
  fontSize: '16px',
  fontWeight: 600,
});

export const textarea = style({
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.gray100,
  width: '100%',
  minHeight: '104px',
  resize: 'vertical',
  padding: '16px 24px',
  selectors: {
    '&::placeholder': {
      color: vars.color.gray400,
      fontSize: '14px',
      lineHeight: '24px',
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.blue}`,
      outlineOffset: '1px',
    },
  },
  '@media': {
    [media.tablet]: {
      selectors: {
        '&::placeholder': {
          fontSize: '16px',
        },
      },
    },
  },
});

export const postButton = style({
  alignSelf: 'flex-end',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '88px',
  minHeight: '40px',
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.blue,
  color: vars.color.white,
  fontWeight: 700,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.blueHover,
    },
    '&:disabled': {
      backgroundColor: vars.color.gray400,
      cursor: 'default',
    },
  },
});

export const commentList = style({
  display: 'flex',
  flexDirection: 'column',
});

export const moreButton = style({
  marginTop: vars.space.lg,
  alignSelf: 'center',
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.gray200}`,
  minHeight: '42px',
  padding: '0 16px',
  color: vars.color.gray700,
  fontWeight: 600,
  selectors: {
    '&:hover': {
      borderColor: vars.color.blue,
      color: vars.color.blue,
    },
  },
});

export const error = style({
  color: vars.color.red,
  fontSize: '14px',
  fontWeight: 600,
});
