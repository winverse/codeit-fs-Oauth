import { config } from '#config';
import { ERROR_MESSAGE } from '#constants';
import { BadRequestException, UnauthorizedException } from '#exceptions';

export class SocialAuthService {
  #userRepository;
  #tokenProvider;

  constructor({ userRepository, tokenProvider }) {
    this.#userRepository = userRepository;
    this.#tokenProvider = tokenProvider;
  }

  async loginOrSignUp({ provider, code, state }) {
    const profile = await this.#getSocialProfile(provider, code, state);
    const user = await this.#resolveUser({ provider, profile });
    const tokens = this.#tokenProvider.generateTokens(user);
    return { user, tokens };
  }

  async #resolveUser({ provider, profile }) {
    const socialUser = await this.#userRepository.findBySocialAccount(
      provider,
      profile.id,
    );

    // 1. 소셜 계정으로 찾은 경우 — 이름 없으면 업데이트
    if (socialUser) {
      return !socialUser.name && profile.name
        ? this.#userRepository.update(socialUser.id, { name: profile.name })
        : socialUser;
    }

    const email = this.#resolveEmail({ provider, profile });
    const existingUser = await this.#userRepository.findByEmail(email);

    // 2. 이메일 일치 유저 없으면 새 유저 생성
    if (!existingUser) {
      return this.#userRepository.createWithSocialAccount({
        email,
        name: profile.name,
        provider,
        providerId: profile.id,
      });
    }

    // 3. 이메일 일치 기존 유저에 소셜 계정 연결
    await this.#userRepository.connectSocialAccount(existingUser.id, {
      provider,
      providerId: profile.id,
    });
    return existingUser;
  }

  async #getSocialProfile(provider, code, state) {
    switch (provider) {
      case 'google':
        return this.#getGoogleProfile(code);
      case 'kakao':
        return this.#getKakaoProfile(code);
      case 'naver':
        return this.#getNaverProfile(code, state);
      default:
        throw new BadRequestException(
          ERROR_MESSAGE.UNSUPPORTED_SOCIAL_PROVIDER,
        );
    }
  }

  async #getGoogleProfile(code) {
    if (!config.GOOGLE_CLIENT_ID || !config.GOOGLE_CLIENT_SECRET) {
      throw new BadRequestException('Google OAuth 설정이 필요합니다.');
    }

    const callbackUri = `${config.API_BASE_URL}/api/auth/social/callback/google`;

    const tokenResponse = await this.#requestJson(
      'https://oauth2.googleapis.com/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new globalThis.URLSearchParams({
          code,
          client_id: config.GOOGLE_CLIENT_ID,
          client_secret: config.GOOGLE_CLIENT_SECRET,
          redirect_uri: callbackUri,
          grant_type: 'authorization_code',
        }),
      },
      'Google 토큰 요청에 실패했습니다.',
    );

    const profileResponse = await this.#requestJson(
      'https://openidconnect.googleapis.com/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      },
      'Google 프로필 조회에 실패했습니다.',
    );

    return {
      id: String(profileResponse.sub),
      email: profileResponse.email ?? null,
      name: profileResponse.name ?? 'Google User',
    };
  }

  async #getKakaoProfile(code) {
    if (!config.KAKAO_CLIENT_ID) {
      throw new BadRequestException('Kakao OAuth 설정이 필요합니다.');
    }

    const callbackUri = `${config.API_BASE_URL}/api/auth/social/callback/kakao`;

    const tokenParams = new globalThis.URLSearchParams({
      grant_type: 'authorization_code',
      client_id: config.KAKAO_CLIENT_ID,
      redirect_uri: callbackUri,
      code,
    });

    if (config.KAKAO_CLIENT_SECRET) {
      tokenParams.set('client_secret', config.KAKAO_CLIENT_SECRET);
    }

    const tokenResponse = await this.#requestJson(
      'https://kauth.kakao.com/oauth/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: tokenParams,
      },
      'Kakao 토큰 요청에 실패했습니다.',
    );

    console.log('tokenResponse', tokenResponse);

    const profileResponse = await this.#requestJson(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      },
      'Kakao 프로필 조회에 실패했습니다.',
    );

    const nickname =
      profileResponse.kakao_account?.profile?.nickname ??
      profileResponse.properties?.nickname ??
      'Kakao User';

    return {
      id: String(profileResponse.id),
      email: profileResponse.kakao_account?.email ?? null,
      name: nickname,
    };
  }

  async #getNaverProfile(code, state) {
    if (!config.NAVER_CLIENT_ID || !config.NAVER_CLIENT_SECRET) {
      throw new BadRequestException('Naver OAuth 설정이 필요합니다.');
    }

    const callbackUri = `${config.API_BASE_URL}/api/auth/social/callback/naver`;

    const tokenQuery = new globalThis.URLSearchParams({
      grant_type: 'authorization_code',
      client_id: config.NAVER_CLIENT_ID,
      client_secret: config.NAVER_CLIENT_SECRET,
      code,
      state: state || 'oauth_state',
      redirect_uri: callbackUri,
    });

    const tokenResponse = await this.#requestJson(
      `https://nid.naver.com/oauth2.0/token?${tokenQuery.toString()}`,
      {
        method: 'GET',
      },
      'Naver 토큰 요청에 실패했습니다.',
    );

    const profilePayload = await this.#requestJson(
      'https://openapi.naver.com/v1/nid/me',
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      },
      'Naver 프로필 조회에 실패했습니다.',
    );

    const profileResponse = profilePayload.response;

    return {
      id: String(profileResponse.id),
      email: profileResponse.email ?? null,
      name:
        profileResponse.name ??
        profileResponse.nickname ??
        profileResponse.email ??
        'Naver User',
    };
  }

  #resolveEmail({ provider, profile }) {
    if (profile.email) {
      return profile.email.toLowerCase();
    }

    const safeSocialId = String(profile.id).replace(/[^a-zA-Z0-9_.-]/g, '_');
    return `${provider}_${safeSocialId}@social.local`;
  }

  async #requestJson(url, options, defaultErrorMessage) {
    const response = await globalThis.fetch(url, options);
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        payload?.error_description ??
        payload?.error ??
        payload?.message ??
        defaultErrorMessage;

      throw new UnauthorizedException(
        message ?? ERROR_MESSAGE.SOCIAL_AUTH_FAILED,
      );
    }

    return payload;
  }
}
