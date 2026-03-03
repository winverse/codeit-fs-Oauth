import Image from 'next/image';
import Link from 'next/link';
import { IMAGE_SIZES } from '@/constants/uiDimensions';
import { ContentContainer } from '@/components/ContentContainer';
import { ArticleCommentsSection } from '@/domains/article/components/ArticleCommentsSection';
import { ArticleContentSection } from '@/domains/article/components/ArticleContentSection';
import * as styles from './ArticleDetailContainer.css';

export function ArticleDetailContainer({
  article,
  initialComments,
  initialNextCursor,
}) {
  return (
    <ContentContainer>
      <ArticleContentSection article={article} />

      <ArticleCommentsSection
        articleId={article.id}
        initialComments={initialComments}
        initialNextCursor={initialNextCursor}
      />

      <Link href="/board" className={styles.backLink}>
        목록으로 돌아가기
        <Image
          src="/images/icons/ic_back.svg"
          alt="뒤로"
          width={IMAGE_SIZES.BACK_ICON}
          height={IMAGE_SIZES.BACK_ICON}
        />
      </Link>
    </ContentContainer>
  );
}
