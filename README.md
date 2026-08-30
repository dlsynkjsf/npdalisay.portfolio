# Nikolas Dalisay portfolio

A responsive one-page portfolio for Nikolas Josef P. Dalisay, designed as a restrained digital field journal with editorial paper, ID-card motifs, muted oxide red, and purposeful motion.

## Stack

- React 19 and TypeScript
- Vite 8
- Tailwind CSS 4 plus custom CSS
- Motion for React
- Base UI/shadcn primitives
- Vercel Function for the contact endpoint
- Cloudflare Turnstile, Upstash rate limiting, and Resend delivery

## Local development

```bash
npm install
npm run dev
```

The visual site works without service credentials. To test the complete contact endpoint locally, copy `.env.example` to `.env.local`, fill the values, and use Vercel's local development workflow so `/api/contact` is available.

## Checks

```bash
npm run lint
npm run build
npm audit --omit=dev
```

## Content

Edit `lib/portfolio-data.ts` for biography, skills, experience, education, and project case studies. The complete editing and asset-placement guide is in `D:\PersonalProjects\PORTFOLIO_CONTENT_GUIDE.md`.

## Vercel deployment

Import this folder into Vercel as a Vite project. Add every variable from `.env.example` in Project Settings → Environment Variables before enabling the public form. After the first deployment, add the exact `*.vercel.app` origin to `ALLOWED_ORIGINS` and add the same hostname to the Cloudflare Turnstile widget.

Real secrets must never be committed. The Vercel Function fails closed when Turnstile, rate limiting, or mail delivery is not configured.
