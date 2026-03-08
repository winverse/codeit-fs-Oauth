'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login, signUp } from '@/apis/authApi';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5001';

export function useAuthPageModel() {
  const router = useRouter();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const authMutation = useMutation({
    mutationFn: async ({ email, password, name, mode }) => {
      if (mode === 'login') {
        return login({
          email: email.trim(),
          password,
        });
      }

      return signUp({
        email: email.trim(),
        password,
        name: name.trim(),
      });
    },
  });

  const clearMessage = () => setMessage('');
  const submitLabel = mode === 'login' ? '로그인' : '회원가입';

  const selectMode = (nextMode) => {
    setMode(nextMode);
    clearMessage();
  };

  const submit = async (event) => {
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

    try {
      await authMutation.mutateAsync({ email, password, name, mode });
      router.push('/');
      router.refresh();
    } catch (error) {
      setMessage(error?.message ?? '요청 중 오류가 발생했습니다.');
    }
  };

  const moveToSocialLogin = (provider) => {
    const next = encodeURIComponent('/');
    window.location.assign(
      `${API_BASE_URL}/api/auth/social/${provider}/login?next=${next}`,
    );
  };

  return {
    mode,
    email,
    password,
    name,
    message,
    submitLabel,
    isPending: authMutation.isPending,
    setEmail,
    setPassword,
    setName,
    clearMessage,
    selectMode,
    submit,
    moveToSocialLogin,
  };
}
