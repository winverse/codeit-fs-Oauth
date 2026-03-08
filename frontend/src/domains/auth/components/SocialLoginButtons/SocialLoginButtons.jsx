'use client';

import Image from 'next/image';

import * as styles from './SocialLoginButtons.css';

function SocialLoginButton({ provider, onClick }) {
  const {
    key,
    label,
    iconSrc,
    iconSize,
    buttonStyle,
    contentStyle,
    labelStyle,
    iconStyle,
  } = provider;

  return (
    <button
      type="button"
      aria-label={label}
      className={styles.socialButton}
      style={buttonStyle}
      onClick={() => onClick(key)}
    >
      <span className={styles.buttonContent} style={contentStyle}>
        <Image
          src={iconSrc}
          alt=""
          aria-hidden="true"
          width={iconSize}
          height={iconSize}
          className={styles.icon}
          unoptimized={true}
          style={{
            width: iconSize,
            height: iconSize,
            ...iconStyle,
          }}
        />
        <span className={styles.label} style={labelStyle}>
          {label}
        </span>
      </span>
    </button>
  );
}

export function SocialLoginButtons({ providers, onSocialLogin }) {
  return (
    <div className={styles.socialGrid}>
      {providers.map((provider) => (
        <SocialLoginButton
          key={provider.key}
          provider={provider}
          onClick={onSocialLogin}
        />
      ))}
    </div>
  );
}
