import { createHash, randomUUID } from 'node:crypto';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import { z } from 'zod';

const contactSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    email: z.email().max(254),
    subject: z.string().trim().min(3).max(120),
    message: z.string().trim().min(20).max(3000),
    companyWebsite: z.string().max(0).optional().default(''),
    turnstileToken: z.string().min(1).max(2048),
  })
  .strict();

type TurnstileResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
  'error-codes'?: string[];
};

const jsonHeaders = {
  'Cache-Control': 'no-store, max-age=0',
  'Content-Type': 'application/json; charset=utf-8',
};

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

function clientIp(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  const requestOrigin = new URL(request.url).origin;
  const configured = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  const vercelOrigin = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  const allowed = new Set([requestOrigin, vercelOrigin, ...configured].filter(Boolean));

  return allowed.has(origin);
}

function rateLimitIdentifier(ip: string) {
  const salt = process.env.RATE_LIMIT_SALT;
  if (!salt) throw new Error('Missing rate-limit salt');
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

async function validateTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error('Missing Turnstile secret');

  const body = new URLSearchParams({ secret, response: token });
  if (ip !== 'unknown') body.set('remoteip', ip);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) return false;
  const result = (await response.json()) as TurnstileResponse;
  return result.success && (!result.action || result.action === 'contact');
}

async function applyRateLimit(ip: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error('Missing rate-limit storage');

  const ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, '15 m'),
    prefix: 'portfolio:contact',
    analytics: false,
  });

  return ratelimit.limit(rateLimitIdentifier(ip));
}

const contactHandler = {
  async fetch(request: Request) {
    if (request.method !== 'POST') {
      return json(405, { ok: false, message: 'Method not allowed.' });
    }

    if (!isAllowedOrigin(request)) {
      return json(403, { ok: false, message: 'Request not allowed.' });
    }

    const contentType = request.headers.get('content-type') ?? '';
    const contentLength = Number(request.headers.get('content-length') ?? '0');
    if (!contentType.includes('application/json') || contentLength > 20_000) {
      return json(415, { ok: false, message: 'Invalid request.' });
    }

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return json(400, { ok: false, message: 'Invalid request.' });
    }

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      return json(400, { ok: false, message: 'Please check the form and try again.' });
    }

    if (parsed.data.companyWebsite) {
      return json(200, { ok: true });
    }

    try {
      const ip = clientIp(request);
      const limit = await applyRateLimit(ip);
      if (!limit.success) {
        return json(429, { ok: false, message: 'Please wait before sending another message.' });
      }

      const turnstileValid = await validateTurnstile(parsed.data.turnstileToken, ip);
      if (!turnstileValid) {
        return json(400, { ok: false, message: 'The anti-spam check could not be verified.' });
      }

      const apiKey = process.env.RESEND_API_KEY;
      const from = process.env.RESEND_FROM_EMAIL;
      const to = process.env.CONTACT_TO_EMAIL ?? 'npdalisay@gmail.com';
      if (!apiKey || !from || !to) throw new Error('Missing mail configuration');

      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send(
        {
          from,
          to,
          replyTo: parsed.data.email,
          subject: `Portfolio inquiry: ${parsed.data.subject.replace(/[\r\n]/g, ' ')}`,
          text: [
            `Name: ${parsed.data.name}`,
            `Email: ${parsed.data.email}`,
            `Subject: ${parsed.data.subject}`,
            '',
            parsed.data.message,
          ].join('\n'),
        },
        { idempotencyKey: randomUUID() },
      );

      if (error) throw new Error('Mail provider rejected the request');
      return json(200, { ok: true });
    } catch {
      return json(503, {
        ok: false,
        message: 'The message service is temporarily unavailable. Please email directly.',
      });
    }
  },
};

export default contactHandler;
