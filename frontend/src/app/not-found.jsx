import Link from 'next/link';
import { ContentContainer } from '@/components/ContentContainer';

export default function NotFoundPage() {
  return (
    <ContentContainer>
      <h1 style={{ marginBottom: 12 }}>페이지를 찾을 수 없어요.</h1>
      <p style={{ marginBottom: 20 }}>
        요청한 게시글이 존재하지 않거나 삭제되었어요.
      </p>
      <Link href="/board">게시판으로 이동</Link>
    </ContentContainer>
  );
}
