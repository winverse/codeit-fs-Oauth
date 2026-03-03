'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { APP_LOGO_SIZE } from '@/constants/uiDimensions';
import * as styles from './AppHeader.css';

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link href="/" className={styles.logoLink} aria-label="홈으로 이동">
            <Image
              src="/images/logo/logo.svg"
              alt="판다마켓 로고"
              width={APP_LOGO_SIZE.width}
              height={APP_LOGO_SIZE.height}
              priority={true}
            />
          </Link>

          <nav className={styles.nav}>
            <Link
              href="/board"
              className={clsx(
                styles.navLink,
                pathname?.startsWith('/board') && styles.navLinkActive,
              )}
            >
              자유게시판
            </Link>
          </nav>
        </div>

        <Link href="/login" className={styles.loginLink}>
          로그인
        </Link>
      </div>
    </header>
  );
}
