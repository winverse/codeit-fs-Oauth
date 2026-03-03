import Image from 'next/image';
import Link from 'next/link';
import { LikeCountDisplay } from '@/components/LikeCountDisplay';
import { IMAGE_SIZES } from '@/constants/uiDimensions';
import { DeleteArticleButton } from '@/domains/article/components/DeleteArticleButton';
import * as styles from './ArticleContentSection.css';
import { lineDivider } from '@/styles/shared.css';
import { formatShortDate } from '@/utils';

export function ArticleContentSection({ article }) {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h1 className={styles.title}>{article.title}</h1>

        <div className={styles.actionRow}>
          <Link
            href={`/addArticle?id=${article.id}`}
            className={styles.actionButton}
          >
            수정
          </Link>
          <DeleteArticleButton
            articleId={article.id}
            className={styles.actionButton}
          />
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.writer}>
          <Image
            src="/images/ui/ic_profile.svg"
            alt="작성자"
            width={IMAGE_SIZES.PROFILE_ICON}
            height={IMAGE_SIZES.PROFILE_ICON}
          />
          {article.writer?.nickname ?? '익명'}
          <span>{formatShortDate(article.createdAt)}</span>
        </div>

        <span className={styles.dividerVertical} />

        <LikeCountDisplay
          count={article.likeCount}
          iconSize={IMAGE_SIZES.PROFILE_ICON}
          gap={8}
        />
      </div>

      <hr className={lineDivider} />

      <p className={styles.content}>{article.content}</p>
    </section>
  );
}
