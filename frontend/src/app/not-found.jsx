import Link from 'next/link';
import { ContentContainer } from '@/components/ContentContainer';

export default function NotFoundPage() {
  return (
    <ContentContainer>
      <h1 style={{ marginBottom: 12 }}>페이지를 찾을 수 없어요.</h1>
      <p style={{ marginBottom: 20 }}>요청한 페이지가 존재하지 않아요.</p>
      <Link href="/">홈으로 이동</Link>
    </ContentContainer>
  );
}
