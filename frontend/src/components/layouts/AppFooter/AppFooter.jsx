import Image from 'next/image';
import { IMAGE_SIZES } from '@/constants/uiDimensions';
import * as styles from './AppFooter.css';

const socials = [
  {
    href: 'https://www.facebook.com/',
    src: '/images/social/facebook-logo.svg',
    label: '페이스북',
  },
  {
    href: 'https://twitter.com/',
    src: '/images/social/twitter-logo.svg',
    label: '트위터',
  },
  {
    href: 'https://www.youtube.com/',
    src: '/images/social/youtube-logo.svg',
    label: '유튜브',
  },
  {
    href: 'https://www.instagram.com/',
    src: '/images/social/instagram-logo.svg',
    label: '인스타그램',
  },
];

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.copyright}>©codeit - 2026</div>

        <div className={styles.menu}>
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>

        <div className={styles.social}>
          {socials.map((social) => (
            <a
              key={social.href}
              className={styles.socialLink}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
            >
              <Image
                src={social.src}
                alt={social.label}
                width={IMAGE_SIZES.SOCIAL_ICON}
                height={IMAGE_SIZES.SOCIAL_ICON}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
