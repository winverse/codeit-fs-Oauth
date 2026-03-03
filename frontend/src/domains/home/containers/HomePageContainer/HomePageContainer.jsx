import Link from 'next/link';
import * as styles from './HomePageContainer.css';

export function HomePageContainer() {
  return (
    <section className={styles.root}>
      <h1 className={styles.title}>
        판다마켓
        <br />
        자유게시판
      </h1>

      <p className={styles.desc}>
        최신 Next.js App Router 구조와 vanilla-extract 기반으로 정리된
        게시판입니다.
      </p>

      <div className={styles.linkRow}>
        <Link href="/board" className={styles.primaryLink}>
          게시글 보러가기
        </Link>
        <Link href="/addArticle" className={styles.secondaryLink}>
          글 작성하기
        </Link>
      </div>
    </section>
  );
}
