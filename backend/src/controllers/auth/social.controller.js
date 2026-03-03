import { BaseController } from '#controllers/base.controller.js';
import { validate } from '#middlewares';
import { ERROR_MESSAGE } from '#constants';
import { config } from '#config';
import { BadRequestException } from '#exceptions';
import {
  socialProviderParamSchema,
  socialLoginQuerySchema,
  socialCallbackQuerySchema,
} from './dto/social.dto.js';

export class SocialAuthController extends BaseController {
  #socialAuthService;
  #cookieProvider;

  constructor({ socialAuthService, cookieProvider }) {
    super();
    this.#socialAuthService = socialAuthService;
    this.#cookieProvider = cookieProvider;
  }

  routes() {
    this.router.get(
      '/social/:provider/login',
      validate('params', socialProviderParamSchema),
      validate('query', socialLoginQuerySchema),
      (req, res) => this.socialRedirect(req, res),
    );

    this.router.get(
      '/social/callback/:provider',
      validate('params', socialProviderParamSchema),
      validate('query', socialCallbackQuerySchema),
      (req, res) => this.socialCallback(req, res),
    );

    return this.router;
  }

  async socialRedirect(req, res) {
    const { provider } = req.params;
    const { next } = req.query;
    const loginUrl = this.generateSocialLoginLink(provider, { next });

    res.redirect(loginUrl);
  }

  async socialCallback(req, res) {
    const { provider } = req.params;
    const { code, state } = req.query;

    if (!code) {
      throw new BadRequestException(ERROR_MESSAGE.SOCIAL_AUTH_CODE_REQUIRED);
    }

    const { tokens } = await this.#socialAuthService.loginOrSignUp({
      provider,
      code,
      state,
    });

    this.#cookieProvider.setAuthCookies(res, tokens);

    const { next } = this.#decodeState(state);
    const safeNext = this.#normalizeNextPath(next);
    const redirectUrl = new globalThis.URL(
      safeNext,
      config.CLIENT_BASE_URL,
    ).toString();

    return res.redirect(redirectUrl);
  }

  generateSocialLoginLink(provider, { next = '/' }) {
    this.#assertProviderConfig(provider);

    const generator = this.socialLoginLinkGenerator[provider];
    if (!generator) {
      throw new BadRequestException(ERROR_MESSAGE.UNSUPPORTED_SOCIAL_PROVIDER);
    }

    return generator({ next: this.#normalizeNextPath(next) });
  }

  get socialLoginLinkGenerator() {
    return {
      google: ({ next }) => {
        const callback = `${this.#redirectUri}/google`;
        const params = new globalThis.URLSearchParams({
          client_id: config.GOOGLE_CLIENT_ID,
          redirect_uri: callback,
          response_type: 'code',
          scope: 'openid email profile',
          state: this.#encodeState({ next }),
          access_type: 'offline',
          prompt: 'consent',
        });

        return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
      },
      kakao: ({ next }) => {
        const callback = `${this.#redirectUri}/kakao`;
        const params = new globalThis.URLSearchParams({
          client_id: config.KAKAO_CLIENT_ID,
          redirect_uri: callback,
          response_type: 'code',
          state: this.#encodeState({ next }),
        });

        return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
      },
      naver: ({ next }) => {
        const callback = `${this.#redirectUri}/naver`;
        const params = new globalThis.URLSearchParams({
          response_type: 'code',
          client_id: config.NAVER_CLIENT_ID,
          redirect_uri: callback,
          state: this.#encodeState({ next }),
        });

        return `https://nid.naver.com/oauth2.0/authorize?${params.toString()}`;
      },
    };
  }

  get #redirectUri() {
    return `${config.API_BASE_URL}/api/auth/social/callback`;
  }

  #encodeState(payload) {
    return globalThis.Buffer.from(JSON.stringify(payload)).toString('base64url');
  }

  #decodeState(rawState) {
    if (!rawState) {
      return { next: '/' };
    }

    try {
      const parsed = JSON.parse(
        globalThis.Buffer.from(rawState, 'base64url').toString('utf8'),
      );

      return { next: this.#normalizeNextPath(parsed?.next) };
    } catch {
      return { next: '/' };
    }
  }

  #normalizeNextPath(next) {
    if (typeof next !== 'string') {
      return '/';
    }

    const trimmed = next.trim();
    if (!trimmed.startsWith('/')) {
      return '/';
    }

    if (trimmed.startsWith('//')) {
      return '/';
    }

    return trimmed;
  }

  #assertProviderConfig(provider) {
    if (
      provider === 'google' &&
      (!config.GOOGLE_CLIENT_ID || !config.GOOGLE_CLIENT_SECRET)
    ) {
      throw new BadRequestException('Google OAuth 설정이 필요합니다.');
    }

    if (provider === 'kakao' && !config.KAKAO_CLIENT_ID) {
      throw new BadRequestException('Kakao OAuth 설정이 필요합니다.');
    }

    if (
      provider === 'naver' &&
      (!config.NAVER_CLIENT_ID || !config.NAVER_CLIENT_SECRET)
    ) {
      throw new BadRequestException('Naver OAuth 설정이 필요합니다.');
    }
  }
}
