# OAuth 소셜 로그인 — Passport 없이 직접 구현하기

이 프로젝트는 Passport.js 없이 Google, Kakao, Naver 소셜 로그인을 직접 구현한 데모입니다.
아래는 두 접근법의 장단점을 비교하고, 이 프로젝트가 직접 구현을 선택한 이유를 정리한 글입니다.

---

## Passport.js

### 장점

**빠른 셋업**
`passport-google-oauth20` 같은 Strategy 패키지를 설치하면 OAuth 흐름을 몇 줄로 붙일 수 있습니다. 프로토타입이나 빠른 기능 검증에 유리합니다.

**100개 이상의 공급자 지원**
GitHub, Twitter, Facebook 등 유명 서비스에 대한 Strategy가 공식 또는 커뮤니티 패키지로 존재합니다. 지원 범위가 넓습니다.

**팀 차원의 친숙함**
오랫동안 Node.js 인증의 사실상 표준으로 쓰였기 때문에, 팀원들이 이미 알고 있을 가능성이 높습니다. 온보딩 비용이 낮습니다.

---

### 단점

**오래된 라이브러리**
Passport는 2011년에 출시되었습니다. 핵심 설계가 Node.js 초창기 관행인 콜백 패턴에 기반하고 있어 현대 코드베이스와 이질감이 있습니다. 메인테이너 활동도 점차 줄어드는 추세입니다.

**`done` 콜백과 async/await의 불일치**
Strategy의 검증 함수는 Node.js 스타일의 `done` 콜백을 씁니다. `async/await` 기반 코드베이스에서는 자연스럽지 않고, 에러를 `done`으로 전달하는 과정에서 실수가 생기기 쉽습니다.

```js
(accessToken, refreshToken, profile, done) => {
  try {
    const user = await findUser(profile.id);
    done(null, user);
  } catch (err) {
    done(err); // 빠뜨리면 요청이 그냥 끊겨버림
  }
}
```

**블랙박스 추상화**
Strategy 내부에서 토큰 교환과 프로필 조회가 이루어지므로, 개발자가 작성하는 코드만 보면 OAuth 흐름이 어떻게 동작하는지 알 수 없습니다. 디버깅이 어렵고, Authorization Code Flow를 직접 이해하기 힘듭니다.

**세션 중심 설계와 JWT의 충돌**
Passport는 세션 기반 인증을 전제로 설계되었습니다. JWT를 쓰는 프로젝트에서도 `serializeUser` / `deserializeUser`를 정의해야 하거나, 사용하지 않는 세션 계층이 껍데기로 남는 경우가 생깁니다.

**DI 컨테이너와의 궁합 문제**
Strategy를 전역으로 등록하는 방식(`passport.use(...)`)은 의존성 주입 컨테이너 패턴과 맞지 않습니다. Strategy 인스턴스가 전역 상태에 묶이기 때문에 단위 테스트나 라이프사이클 관리가 어려워집니다.

**국내 공급자의 비공식 Strategy 의존**
카카오, 네이버에 대한 공식 Passport Strategy는 없습니다. 커뮤니티가 만든 `passport-kakao`, `passport-naver` 같은 패키지에 의존해야 하는데, 공급자 API가 변경되었을 때 대응이 늦으면 소셜 로그인 전체가 깨질 수 있습니다.

---

## 직접 구현

### 장점

**OAuth 흐름이 코드에 그대로 드러난다**
Authorization Code Flow의 각 단계가 명시적으로 보입니다. 코드를 읽는 것만으로 OAuth가 어떻게 동작하는지 이해할 수 있습니다.

```
① 사용자 → /api/auth/social/google/login
② 서버 → Google authorize URL로 redirect
③ Google → /api/auth/social/callback/google?code=...
④ 서버 → POST oauth2.googleapis.com/token  (code → access_token 교환)
⑤ 서버 → GET openidconnect.googleapis.com/v1/userinfo  (프로필 조회)
⑥ 서버 → JWT 발급 → 쿠키 세팅 → 클라이언트로 redirect
```

**외부 의존성이 없다**
Node.js 18+의 내장 `fetch`만 사용합니다. Strategy 패키지, 버전 충돌, 메인테이너 공백 같은 문제가 없습니다.

**DI 컨테이너에 자연스럽게 녹아든다**
`SocialAuthService`는 다른 서비스와 동일하게 생성자 주입으로 의존성을 받고 컨테이너에 등록됩니다. 테스트 시 mock 교체도 쉽습니다.

```js
constructor({ userRepository, tokenProvider }) {
  this.#userRepository = userRepository;
  this.#tokenProvider = tokenProvider;
}
```

**Provider별 에러를 세밀하게 처리한다**
각 공급자의 에러 응답 포맷이 다른데, 직접 구현하면 그에 맞게 정확한 에러 메시지를 꺼낼 수 있습니다.

```js
const message =
  payload?.error_description ??  // Google, Naver
  payload?.error ??
  payload?.message ??             // Kakao
  payload?.extras?.detailMsg ??   // Kakao 상세
  rawText ??
  defaultErrorMessage;
```

**이메일/소셜 로그인의 JWT 흐름이 동일하다**
두 경로 모두 같은 `TokenProvider`를 호출하며 끝납니다. 인증 이후 처리 로직이 일관됩니다.

```js
// auth.service.js (이메일 로그인)
const tokens = this.#tokenProvider.generateTokens(user);

// social-auth.service.js (소셜 로그인)
const tokens = this.#tokenProvider.generateTokens(user);
```

---

### 단점

**구현 코드를 직접 작성해야 한다**
토큰 교환, 프로필 조회, 에러 처리, state 인코딩/디코딩을 모두 손으로 작성합니다. Passport가 숨겨주는 것들을 개발자가 직접 책임집니다.

**보안 실수의 여지가 있다**
CSRF 방어를 위한 `state` 파라미터 검증, open redirect 방지, 안전한 쿠키 설정 같은 보안 요소를 직접 챙겨야 합니다. Passport Strategy는 이런 부분을 어느 정도 처리해줍니다.

**공급자가 늘수록 코드도 늘어난다**
새 공급자마다 토큰 교환 로직과 프로필 정규화를 새로 작성해야 합니다. Passport는 Strategy를 설치하는 것으로 해결합니다.

**커뮤니티 검증이 없다**
수많은 프로젝트에서 검증된 Strategy 코드 대신, 팀이 직접 작성한 코드를 씁니다. 엣지 케이스나 보안 취약점을 놓칠 가능성이 있습니다.

---

## 비교 요약

| 항목 | Passport | 직접 구현 |
|------|----------|-----------|
| 초기 설정 속도 | 빠름 | 느림 |
| OAuth 흐름 가시성 | 낮음 (블랙박스) | 높음 |
| 외부 의존성 | Strategy 패키지 필요 | 없음 |
| async/await 친화성 | 낮음 (done 콜백) | 높음 |
| DI 컨테이너 친화성 | 낮음 (전역 등록) | 높음 |
| 국내 공급자 안정성 | 비공식 패키지 의존 | 공식 API 직접 호출 |
| 보안 책임 | Strategy가 일부 담당 | 개발자가 직접 담당 |
| 라이브러리 최신성 | 2011년 출시, 성숙 | 해당 없음 |
| 공급자 추가 비용 | 패키지 설치 | 로직 직접 작성 |

---

## 이 프로젝트가 직접 구현을 선택한 이유

- JWT + HttpOnly 쿠키 기반 인증을 쓰기 때문에 Passport의 세션 중심 설계가 불필요한 복잡성을 만든다
- Awilix DI 컨테이너를 사용하므로 Passport의 전역 Strategy 등록 방식과 맞지 않는다
- 카카오, 네이버를 지원해야 하는데 공식 Strategy가 없다
- OAuth 흐름 자체를 코드로 명확히 드러내는 것이 이 프로젝트의 학습 목적에 맞다

Passport가 나쁜 도구라는 뜻이 아닙니다. 빠른 프로토타이핑, 다양한 공급자를 한 번에 지원해야 하는 경우, 혹은 팀이 이미 Passport에 익숙한 경우라면 여전히 좋은 선택입니다. 다만 이 프로젝트의 맥락에서는 직접 구현이 더 자연스러운 선택이었습니다.

소셜 로그인 상세 흐름은 [SOCIAL_LOGIN_FLOWS.md](./SOCIAL_LOGIN_FLOWS.md)를 참고하세요.
