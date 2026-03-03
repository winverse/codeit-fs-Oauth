import Image from 'next/image';
import Link from 'next/link';
import { LikeCountDisplay } from '@/components/LikeCountDisplay';
import { IMAGE_SIZES } from '@/constants/uiDimensions';
import * as styles from '../BoardArticleList.css';
import { formatShortDate } from '@/utils';

export function BoardArticleListItem({ article }) {
  return (
    <>
      <Link href={`/board/${article.id}`} className={styles.item}>
        <div className={styles.row}>
          <h3 className={styles.title}>{article.title}</h3>

          {article.image ? (
            <div className={styles.thumbnail}>
              <div className={styles.imageWrapper}>
                <Image
                  src={article.image}
                  alt={`${article.id}번 게시글 이미지`}
                  fill={true}
                  sizes={`${IMAGE_SIZES.ARTICLE_THUMBNAIL}px`}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className={styles.meta}>
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

          <LikeCountDisplay
            count={article.likeCount}
            iconSize={IMAGE_SIZES.PROFILE_ICON}
            gap={8}
          />
        </div>
      </Link>

      <hr className={styles.divider} />
    </>
  );
}
