import { z } from 'zod';

export const socialProviderParamSchema = z.object({
  provider: z.enum(['google', 'kakao', 'naver']),
});

export const socialLoginQuerySchema = z.object({
  next: z.string().optional().default('/'),
});

export const socialCallbackQuerySchema = z.object({
  code: z.string().min(1, '인가 코드가 필요합니다.'),
  state: z.string().optional(),
});
