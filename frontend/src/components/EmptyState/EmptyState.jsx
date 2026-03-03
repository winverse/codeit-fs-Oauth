import Image from 'next/image';
import { IMAGE_SIZES } from '@/constants/uiDimensions';
import * as styles from './EmptyState.css';

export function EmptyState({
  text,
  imageSrc = '/images/ui/empty-comments.svg',
}) {
  return (
    <div className={styles.container}>
      <Image
        src={imageSrc}
        alt="비어 있음"
        width={IMAGE_SIZES.EMPTY_STATE}
        height={IMAGE_SIZES.EMPTY_STATE}
      />
      <p className={styles.text}>{text}</p>
    </div>
  );
}
