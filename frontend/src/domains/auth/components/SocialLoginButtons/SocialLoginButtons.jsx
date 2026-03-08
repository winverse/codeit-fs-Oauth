'use client';

import * as styles from './SocialLoginButtons.css';

export function SocialLoginButtons({ providers, onSocialLogin }) {
  return (
    <div className={styles.socialGrid}>
      {providers.map((provider) => (
        <button
          key={provider.key}
          type="button"
          className={styles.socialButton}
          onClick={() => onSocialLogin(provider.key)}
        >
          {provider.label}
        </button>
      ))}
    </div>
  );
}
