import * as styles from './BoardBestSection.css';
import { BoardBestArticleCard } from './BoardBestArticleCard';
import { sectionHeader, sectionTitle } from '@/styles/shared.css';

export function BoardBestSection({ articles }) {
  if (!articles.length) {
    return null;
  }

  return (
    <section>
      <div className={sectionHeader}>
        <h2 className={sectionTitle}>베스트 게시글</h2>
      </div>

      <div className={styles.grid}>
        {articles.map((article) => (
          <BoardBestArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
