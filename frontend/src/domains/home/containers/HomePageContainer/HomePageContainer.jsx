import Link from 'next/link';
import * as styles from './HomePageContainer.css';

export function HomePageContainer() {
  return (
    <section className={styles.root}>
      <h1 className={styles.title}>
        OAuth 인증
        <br />
        데모 프로젝트
      </h1>

      <p className={styles.desc}>
        이메일 회원가입, 일반 로그인, Google/Kakao/Naver 소셜 로그인 흐름만
        남긴 최소 구성입니다.
      </p>

      <div className={styles.linkRow}>
        <Link href="/login" className={styles.primaryLink}>
          로그인 / 회원가입
        </Link>
      </div>
    </section>
  );
}
