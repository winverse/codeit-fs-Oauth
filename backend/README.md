# DI Express (Awilix) 완성본

## 프로젝트 개요

이 프로젝트는 Express 기반 인증 API를 **Layered Architecture + DI 컨테이너(Awilix)** 구조로 구성한 완성본입니다.  
핵심 목적은 컨트롤러/서비스/리포지토리 책임을 분리하고, 의존성 조립을 `src/common/di/container.js`에서 중앙 관리하는 방식을 학습하는 것입니다.

도메인은 `auth`, `users`를 중심으로 구성되어 있으며, 인증은 Access/Refresh Token 쿠키 전략을 사용합니다.

## 학습 포인트

1. 수동 DI에서 컨테이너 기반 DI(Awilix)로 전환하는 방식
2. 계층별 역할 분리
   - Controller: HTTP 입출력
   - Service: 비즈니스 로직
   - Repository: DB 접근(Prisma)
3. 인증 미들웨어에서 Access 만료 시 Refresh로 재발급하는 흐름
4. 예외 클래스를 통한 일관된 에러 응답 구조

## 디렉터리 구조

```text
src
├─ common
│  ├─ constants
│  ├─ di
│  ├─ exceptions
│  └─ lifecycle
├─ config
├─ controllers
│  ├─ auth
│  └─ users
├─ db
├─ middlewares
├─ providers
├─ repository
└─ services
```

## 실행 전 준비

- Node.js 22 이상
- pnpm
- PostgreSQL

## 환경 변수 설정

`env/.env.example`를 참고해서 `env/.env.development`를 준비합니다.

예시:

```env
NODE_ENV=development
PORT=5001
DATABASE_URL="postgresql://username:password@localhost:5432/prisma_auth"
JWT_ACCESS_SECRET="32자 이상 문자열"
JWT_REFRESH_SECRET="32자 이상 문자열"
```

## 실행 가이드

### 1) 의존성 설치

```bash
pnpm install
```

### 2) Prisma Client 생성

```bash
pnpm run prisma:generate
```

### 3) 스키마 반영

```bash
pnpm run prisma:push
```

### 4) 서버 실행

```bash
pnpm run dev
```

서버가 정상 실행되면 기본 주소는 아래와 같습니다.

- `http://localhost:5001/api`

### 5) 기본 동작 확인

```bash
curl http://localhost:5001/api/ping
```

## 주요 파일

- DI 컨테이너: `src/common/di/container.js`
- 인증 서비스: `src/services/auth.service.js`
- 인증 미들웨어: `src/middlewares/auth.middleware.js`
- 유저 리포지토리: `src/repository/user.repository.js`
- 전역 에러 핸들러: `src/middlewares/error-handler.middleware.js`

---

## NestJS 연관성

이 프로젝트를 이해했다면, NestJS 코드베이스는 처음 보더라도 구조가 이미 익숙하게 느껴질 것입니다.  
이 프로젝트에서 **직접 구현한 패턴**을 NestJS는 프레임워크 내부에 내장하고 있기 때문입니다.

### 개념 대응 관계

| 이 프로젝트 (Awilix + Express)                                                            | NestJS                                                                                |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `src/common/di/container.js` — Awilix 컨테이너에 클래스를 수동 등록                       | `@Injectable()` 데코레이터 — NestJS가 클래스를 자동으로 IoC 컨테이너에 등록           |
| `asClass(AuthService).singleton()`                                                        | `@Injectable()` + `providers` 배열에 등록하면 기본 singleton 스코프                   |
| `constructor(userRepository, passwordProvider, tokenProvider)` 생성자 인자 순서로 DI 수행 | 생성자 파라미터 타입을 기반으로 자동 DI 수행 (TypeScript reflect-metadata 활용)       |
| `AuthController`, `UsersController` — `routes()` 메서드로 라우터 직접 구성                | `@Controller('auth')`, `@Get()`, `@Post()` 데코레이터로 라우팅 선언                   |
| `AuthMiddleware` 클래스 — `authenticate(req, res, next)` 직접 구현                        | `@Injectable()` 를 붙인 `NestMiddleware` 또는 `Guard` (`canActivate`)                 |
| `src/common/exceptions/*.js` — `ConflictException`, `UnauthorizedException` 수동 정의     | `@nestjs/common`이 동일 이름의 내장 HTTP 예외 클래스를 제공                           |
| `error-handler.middleware.js` — Express 4-인자 전역 에러 핸들러                           | `ExceptionFilter` (`@Catch()`) — 전역 예외 처리를 데코레이터로 선언                   |
| `src/controllers/auth/dto/auth.dto.js` — Zod 스키마로 DTO 검증                            | `class-validator` + `class-transformer` 기반 DTO 클래스, `ValidationPipe`로 자동 검증 |
| `App` 클래스 (`middleware()`, `routes()`, `errorHandling()`) — 앱 초기화 직접 조립        | `AppModule` + `NestFactory.create()` — 모듈 선언만으로 초기화 및 조립 자동화          |
| `bootstrap()` 함수 — 컨테이너 생성 → App 인스턴스화 → `listen()` 호출                     | `NestFactory.create(AppModule).then(app => app.listen(port))`                         |

### 핵심 통찰

NestJS가 낯설게 느껴지는 가장 큰 이유는 **데코레이터(`@Injectable`, `@Controller`, `@Get`)** 문법입니다.  
그러나 데코레이터는 표현 방식의 차이일 뿐, 그 아래에서 일어나는 일은 이 프로젝트에서 직접 작성한 것과 동일합니다.

- `@Injectable()` → `asClass(...).singleton()` 등록과 본질적으로 동일합니다.
- `@Controller('auth')` + `@Post('login')` → `this.router.post('/login', ...)` 선언을 클래스 수준으로 끌어올린 것입니다.
- NestJS의 `Module` 시스템 → 이 프로젝트의 `container.js`를 도메인별로 파일 단위로 분리한 구조와 같습니다.

이 프로젝트에서 DI 컨테이너를 직접 조립해 본 경험이 있다면, NestJS에서 IoC 컨테이너가 왜 그렇게 동작하는지를 이해하는 데 드는 시간이 크게 단축됩니다.
