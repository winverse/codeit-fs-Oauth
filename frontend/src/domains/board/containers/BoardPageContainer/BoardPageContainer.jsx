import Link from 'next/link';
import { ContentContainer } from '@/components/ContentContainer';
import { BoardArticleList } from '@/domains/board/components/BoardArticleList';
import { BoardBestSection } from '@/domains/board/components/BoardBestSection';
import * as styles from './BoardPageContainer.css';
import { sectionHeader, sectionTitle } from '@/styles/shared.css';

export function BoardPageContainer({
  articles,
  bestArticles,
  page,
  pageSize,
  totalCount,
  orderBy,
  keyword,
}) {
  return (
    <ContentContainer className={styles.wrapper}>
      <BoardBestSection articles={bestArticles} />

      <section>
        <div className={sectionHeader}>
          <h2 className={sectionTitle}>게시글</h2>
          <Link href="/addArticle" className={styles.writeLink}>
            글쓰기
          </Link>
        </div>

        <form action="/board" className={styles.toolbar}>
          <input type="hidden" name="page" value="1" />
          <input type="hidden" name="pageSize" value={pageSize} />

          <input
            className={styles.searchInput}
            type="search"
            name="keyword"
            defaultValue={keyword}
            placeholder="검색할 키워드를 입력해 주세요"
          />

          <div className={styles.controls}>
            <select
              className={styles.sortSelect}
              name="orderBy"
              defaultValue={orderBy}
            >
              <option value="recent">최신순</option>
              <option value="like">좋아요순</option>
            </select>

            <button type="submit" className={styles.submitButton}>
              적용
            </button>
          </div>
        </form>

        <BoardArticleList
          articles={articles}
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
          orderBy={orderBy}
          keyword={keyword}
        />
      </section>
    </ContentContainer>
  );
}
