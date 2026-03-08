'use client';

import clsx from 'clsx';
import * as styles from '@/domains/auth/containers/AuthPageContainer/AuthPageContainer.css';

export function AuthModeSwitch({ mode, onSelectMode }) {
  return (
    <div className={styles.modeRow}>
      <button
        type="button"
        className={clsx(
          styles.modeButton,
          mode === 'login' && styles.modeButtonActive,
        )}
        onClick={() => onSelectMode('login')}
      >
        로그인
      </button>
      <button
        type="button"
        className={clsx(
          styles.modeButton,
          mode === 'signup' && styles.modeButtonActive,
        )}
        onClick={() => onSelectMode('signup')}
      >
        회원가입
      </button>
    </div>
  );
}
