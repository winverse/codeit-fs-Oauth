# Panda Market (Next.js App Router)

Next.js 16 + App Router + vanilla-extract 기반으로 재구성된 프로젝트입니다.

## 실행

```bash
pnpm install
pnpm dev
```

- 개발 서버: `http://localhost:3000`
- 프로덕션 빌드: `pnpm build`
- 린트: `pnpm lint`
- 포맷: `pnpm format`

## 기술 스택

- Next.js `16.1.6`
- React `19.2.0`
- App Router
- vanilla-extract

## 디렉터리 구조

```text
src
├─ app
├─ components
├─ containers
├─ hooks
├─ utils
└─ domains
   ├─ board
   │  ├─ components
   │  ├─ containers
   │  ├─ hooks
   │  └─ utils
   └─ article
      ├─ components
      ├─ containers
      ├─ hooks
      └─ utils
```

## API

- Base URL: `https://panda-market-api.vercel.app`
- 문서: `https://panda-market-api.vercel.app/docs/`
