# Social Login Flows

이 문서는 현재 코드 기준의 Google, Kakao, Naver 로그인 흐름을 provider별로 분리해 정리한 것입니다.

기준 파일:
- `backend/src/controllers/auth/social.controller.js`
- `backend/src/services/social-auth.service.js`
- `backend/src/repository/user.repository.js`
- `backend/src/providers/token.provider.js`
- `backend/src/providers/cookie.provider.js`

## Google

```mermaid
flowchart TD
  A["사용자: Google 로그인 버튼 클릭"] --> B["GET /api/auth/social/google/login?next=/..."]
  B --> C["SocialAuthController.socialRedirect"]
  C --> D["generateSocialLoginLink('google')"]
  D --> E["Google authorize URL 생성<br/>redirect_uri=http://localhost:5001/api/auth/social/callback/google<br/>scope=openid email profile"]
  E --> F["Google 로그인/동의"]
  F --> G["GET /api/auth/social/callback/google?code&state"]
  G --> H["SocialAuthController.socialCallback"]
  H --> I["socialAuthService.loginOrSignUp({ provider:'google', code, state })"]
  I --> J["POST https://oauth2.googleapis.com/token"]
  J --> K["GET https://openidconnect.googleapis.com/v1/userinfo"]
  K --> L["profile 정규화<br/>{ id: sub, email, name }"]
  L --> M["userRepository.findBySocialAccount('google', profile.id)"]
  M --> N{"소셜 계정 유저 존재?"}
  N -- "Yes" --> O["필요 시 이름 업데이트 후 user 반환"]
  N -- "No" --> P["email 결정 후 userRepository.findByEmail(email)"]
  P --> Q{"같은 이메일 유저 존재?"}
  Q -- "No" --> R["createWithSocialAccount(...)"]
  Q -- "Yes" --> S["connectSocialAccount(existingUser.id, ...)"]
  S --> T["existingUser 반환"]
  O --> U["tokenProvider.generateTokens(user)"]
  R --> U
  T --> U
  U --> V["cookieProvider.setAuthCookies(res, tokens)"]
  V --> W["state decode -> next 복원"]
  W --> X["CLIENT_BASE_URL + next 로 redirect"]
```

## Kakao

```mermaid
flowchart TD
  A["사용자: Kakao 로그인 버튼 클릭"] --> B["GET /api/auth/social/kakao/login?next=/..."]
  B --> C["SocialAuthController.socialRedirect"]
  C --> D["generateSocialLoginLink('kakao')"]
  D --> E["Kakao authorize URL 생성<br/>redirect_uri=http://localhost:5001/api/auth/social/callback/kakao"]
  E --> F["Kakao 로그인/동의"]
  F --> G["GET /api/auth/social/callback/kakao?code&state"]
  G --> H["SocialAuthController.socialCallback"]
  H --> I["socialAuthService.loginOrSignUp({ provider:'kakao', code, state })"]
  I --> J["POST https://kauth.kakao.com/oauth/token<br/>grant_type, client_id, client_secret, redirect_uri, code"]
  J --> K["POST https://kapi.kakao.com/v2/user/me<br/>Authorization: Bearer access_token"]
  K --> L["profile 정규화<br/>{ id, email: kakao_account.email, name: nickname }"]
  L --> M["userRepository.findBySocialAccount('kakao', profile.id)"]
  M --> N{"소셜 계정 유저 존재?"}
  N -- "Yes" --> O["필요 시 이름 업데이트 후 user 반환"]
  N -- "No" --> P["email 결정 후 userRepository.findByEmail(email)"]
  P --> Q{"같은 이메일 유저 존재?"}
  Q -- "No" --> R["createWithSocialAccount(...)"]
  Q -- "Yes" --> S["connectSocialAccount(existingUser.id, ...)"]
  S --> T["existingUser 반환"]
  O --> U["tokenProvider.generateTokens(user)"]
  R --> U
  T --> U
  U --> V["cookieProvider.setAuthCookies(res, tokens)"]
  V --> W["state decode -> next 복원"]
  W --> X["CLIENT_BASE_URL + next 로 redirect"]
```

## Naver

```mermaid
flowchart TD
  A["사용자: Naver 로그인 버튼 클릭"] --> B["GET /api/auth/social/naver/login?next=/..."]
  B --> C["SocialAuthController.socialRedirect"]
  C --> D["generateSocialLoginLink('naver')"]
  D --> E["Naver authorize URL 생성<br/>redirect_uri=http://localhost:5001/api/auth/social/callback/naver"]
  E --> F["Naver 로그인/동의"]
  F --> G["GET /api/auth/social/callback/naver?code&state"]
  G --> H["SocialAuthController.socialCallback"]
  H --> I["socialAuthService.loginOrSignUp({ provider:'naver', code, state })"]
  I --> J["GET https://nid.naver.com/oauth2.0/token?..."]
  J --> K["GET https://openapi.naver.com/v1/nid/me<br/>Authorization: Bearer access_token"]
  K --> L["profile 정규화<br/>{ id, email, name }<br/>name 우선순위: name -> nickname -> email"]
  L --> M["userRepository.findBySocialAccount('naver', profile.id)"]
  M --> N{"소셜 계정 유저 존재?"}
  N -- "Yes" --> O["필요 시 이름 업데이트 후 user 반환"]
  N -- "No" --> P["email 결정 후 userRepository.findByEmail(email)"]
  P --> Q{"같은 이메일 유저 존재?"}
  Q -- "No" --> R["createWithSocialAccount(...)"]
  Q -- "Yes" --> S["connectSocialAccount(existingUser.id, ...)"]
  S --> T["existingUser 반환"]
  O --> U["tokenProvider.generateTokens(user)"]
  R --> U
  T --> U
  U --> V["cookieProvider.setAuthCookies(res, tokens)"]
  V --> W["state decode -> next 복원"]
  W --> X["CLIENT_BASE_URL + next 로 redirect"]
```
