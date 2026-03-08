function createSocialProvider({
  key,
  label,
  iconSrc,
  iconSize = 18,
  buttonStyle = {},
  contentStyle = {},
  labelStyle = {},
  iconStyle = {},
}) {
  return {
    key,
    label,
    iconSrc,
    iconSize,
    buttonStyle: {
      borderColor: 'transparent',
      ...buttonStyle,
    },
    contentStyle: {
      gap: 8,
      ...contentStyle,
    },
    labelStyle: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      ...labelStyle,
    },
    iconStyle,
  };
}

export const SOCIAL_PROVIDERS = [
  createSocialProvider({
    key: 'google',
    label: '구글 로그인',
    iconSrc: '/images/social/google-icon.svg',
    buttonStyle: {
      backgroundColor: '#FFFFFF',
      borderColor: '#747775',
    },
    contentStyle: {
      gap: 10,
    },
    labelStyle: {
      color: '#1F1F1F',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
  }),
  createSocialProvider({
    key: 'kakao',
    label: '카카오 로그인',
    iconSrc: '/images/social/kakao-icon.svg',
    buttonStyle: {
      backgroundColor: '#FEE500',
    },
    labelStyle: {
      color: 'rgba(0, 0, 0, 0.85)',
    },
  }),
  createSocialProvider({
    key: 'naver',
    label: '네이버 로그인',
    iconSrc: '/images/social/naver-icon.svg',
    buttonStyle: {
      backgroundColor: '#03A94D',
    },
    labelStyle: {
      color: '#FFFFFF',
    },
    iconStyle: {
      filter: 'brightness(0) invert(1)',
    },
  }),
];
