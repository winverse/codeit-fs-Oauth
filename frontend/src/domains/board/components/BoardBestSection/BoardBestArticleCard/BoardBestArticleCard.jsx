import Image from 'next/image';
import Link from 'next/link';
import { LikeCountDisplay } from '@/components/LikeCountDisplay';
import { IMAGE_SIZES } from '@/constants/uiDimensions';
import * as styles from './BoardBestArticleCard.css';
import { formatShortDate } from '@/utils';

export function BoardBestArticleCard({ article }) {
  return (
    <Link className={styles.card} href={`/board/${article.id}`}>
      <div className={styles.sticker}>
        <Image
          src="/images/icons/ic_medal.svg"
          alt="베스트"
          width={IMAGE_SIZES.MEDAL_ICON}
          height={IMAGE_SIZES.MEDAL_ICON}
        />
        Best
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
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

        <div className={styles.info}>
          <div className={styles.infoLeft}>
            {article.writer?.nickname ?? '익명'}
            <LikeCountDisplay count={article.likeCount} fontSize={14} />
          </div>
          <span className={styles.timestamp}>
            {formatShortDate(article.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
