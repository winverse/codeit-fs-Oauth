'use client';

import { AuthModeSwitch } from '@/domains/auth/components/AuthModeSwitch';
import { AuthCredentialForm } from '@/domains/auth/components/AuthCredentialForm';
import { SocialLoginButtons } from '@/domains/auth/components/SocialLoginButtons';
import { SOCIAL_PROVIDERS } from '@/domains/auth/constants/socialProviders';
import { useAuthPageModel } from '@/domains/auth/hooks/useAuthPageModel';
import * as styles from './AuthPageContainer.css';

export function AuthPageContainer() {
  const authPageModel = useAuthPageModel();

  return (
    <section className={styles.root}>
      <div className={styles.card}>
        <h1 className={styles.title}>로그인 / 회원가입</h1>
        <p className={styles.subtitle}>
          이메일/비밀번호 또는 소셜 계정으로 바로 시작할 수 있습니다.
        </p>

        <AuthModeSwitch
          mode={authPageModel.mode}
          onSelectMode={authPageModel.selectMode}
        />

        <AuthCredentialForm
          mode={authPageModel.mode}
          name={authPageModel.name}
          email={authPageModel.email}
          password={authPageModel.password}
          message={authPageModel.message}
          isPending={authPageModel.isPending}
          submitLabel={authPageModel.submitLabel}
          onNameChange={authPageModel.setName}
          onEmailChange={authPageModel.setEmail}
          onPasswordChange={authPageModel.setPassword}
          onFieldBlur={authPageModel.clearMessage}
          onSubmit={authPageModel.submit}
        />

        <div className={styles.divider}>
          <span className={styles.dividerText}>또는 소셜 계정</span>
        </div>

        <SocialLoginButtons
          providers={SOCIAL_PROVIDERS}
          onSocialLogin={authPageModel.moveToSocialLogin}
        />
      </div>
    </section>
  );
}
