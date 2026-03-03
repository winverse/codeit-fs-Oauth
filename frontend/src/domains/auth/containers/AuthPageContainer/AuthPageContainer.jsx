'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormField } from '@/components/FormField';
import { login, signUp } from '@/apis/authApi';
import clsx from 'clsx';
import * as styles from './AuthPageContainer.css';

const SOCIAL_PROVIDERS = [
  { key: 'google', label: 'Google로 계속하기' },
  { key: 'kakao', label: '카카오로 계속하기' },
  { key: 'naver', label: '네이버로 계속하기' },
];

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5001';

export function AuthPageContainer() {
  const router = useRouter();

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isPending, setIsPending] = useState(false);

  const submitLabel = useMemo(
    () => (mode === 'login' ? '로그인' : '회원가입'),
    [mode],
  );

  const clearMessage = () => setMessage('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearMessage();

    if (!email.trim() || !password.trim()) {
      setMessage('이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    if (mode === 'signup' && name.trim().length < 2) {
      setMessage('이름은 2자 이상 입력해 주세요.');
      return;
    }

    setIsPending(true);
    try {
      if (mode === 'login') {
        await login({
          email: email.trim(),
          password,
        });
      } else {
        await signUp({
          email: email.trim(),
          password,
          name: name.trim(),
        });
      }

      router.push('/board');
      router.refresh();
    } catch (error) {
      setMessage(error?.message ?? '요청 중 오류가 발생했습니다.');
    } finally {
      setIsPending(false);
    }
  };

  const handleSocialLogin = (provider) => {
    const next = encodeURIComponent('/board');
    window.location.href = `${API_BASE_URL}/api/auth/social/${provider}/login?next=${next}`;
  };

  return (
    <section className={styles.root}>
      <div className={styles.card}>
        <h1 className={styles.title}>로그인 / 회원가입</h1>
        <p className={styles.subtitle}>
          이메일/비밀번호 또는 소셜 계정으로 바로 시작할 수 있습니다.
        </p>

        <div className={styles.modeRow}>
          <button
            type="button"
            className={clsx(
              styles.modeButton,
              mode === 'login' && styles.modeButtonActive,
            )}
            onClick={() => {
              setMode('login');
              clearMessage();
            }}
          >
            로그인
          </button>
          <button
            type="button"
            className={clsx(
              styles.modeButton,
              mode === 'signup' && styles.modeButtonActive,
            )}
            onClick={() => {
              setMode('signup');
              clearMessage();
            }}
          >
            회원가입
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {mode === 'signup' ? (
            <FormField
              id="name"
              label="이름"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="이름을 입력해 주세요"
              onBlur={clearMessage}
            />
          ) : null}

          <FormField
            id="email"
            label="이메일"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="example@email.com"
            onBlur={clearMessage}
          />

          <FormField
            id="password"
            label="비밀번호"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호를 입력해 주세요"
            onBlur={clearMessage}
          />

          <p className={styles.message}>{message}</p>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={isPending}
          >
            {isPending ? '처리 중...' : submitLabel}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerText}>또는 소셜 계정</span>
        </div>

        <div className={styles.socialGrid}>
          {SOCIAL_PROVIDERS.map((provider) => (
            <button
              key={provider.key}
              type="button"
              className={styles.socialButton}
              onClick={() => handleSocialLogin(provider.key)}
            >
              {provider.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
