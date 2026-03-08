import Link from 'next/link';
import * as styles from './HomePageContainer.css';

export function HomePageContainer() {
  return (
    <section className={styles.root}>
      <h1 className={styles.title}>
        소셜 로그인
        <br />
        데모 프로젝트
      </h1>

      <p className={styles.desc}>
        Next.js App Router, React 19, OAuth 기반 인증 흐름을 중심으로 구성된
        예제입니다.
      </p>

      <div className={styles.linkRow}>
        <Link href="/login" className={styles.primaryLink}>
          로그인하기
        </Link>
        <Link href="/addArticle" className={styles.secondaryLink}>
          글 작성하기
        </Link>
      </div>
    </section>
  );
}
