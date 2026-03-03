import Image from 'next/image';
import { IMAGE_SIZES } from '@/constants/uiDimensions';
import * as styles from './LikeCountDisplay.css';

export function LikeCountDisplay({
  count = 0,
  iconSize = IMAGE_SIZES.LIKE_ICON,
  fontSize = 16,
  gap = 4,
}) {
  const displayCount = count >= 10000 ? '9999+' : String(count);

  return (
    <span className={styles.wrapper} style={{ fontSize, gap }}>
      <Image
        src="/images/icons/ic_heart.svg"
        alt="좋아요"
        width={iconSize}
        height={iconSize}
      />
      {displayCount}
    </span>
  );
}
