# Portfolio agent guide

## Project intent

This is Nikolas Josef P. Dalisay's public full-stack developer portfolio. Preserve the established visual direction: a restrained digital field journal built from warm cream paper, charcoal ink, muted oxide red, pale blue-grey, editorial typography, ID-card motifs, and small interface metadata.

`D:\PersonalProjects\Landing Page.png` does not exist in this project. The structural reference is `D:\Downloads\Landing Page.png`; use it only for section order and information architecture. Do not copy its grayscale wireframe styling. The visual reference is the cream/charcoal editorial collage discussed in the project brief.

## Stack and commands

- React 19 + TypeScript
- Standard Vite
- Tailwind CSS v4 plus authored CSS in `app/globals.css`
- Motion for React for meaningful interaction and reveal animation
- shadcn/Base UI primitives for accessible interactive controls
- `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`

Use npm and preserve `package-lock.json`. Do not introduce a second component library, state library, or animation engine unless a concrete feature requires it.

## Content ownership

- Public content lives in `lib/portfolio-data.ts`.
- User-replaceable image slots live under `public/assets/projects/` when supplied.
- The public résumé is `public/assets/nikolas-dalisay-resume.pdf`.
- The external replacement guide is `D:\PersonalProjects\PORTFOLIO_CONTENT_GUIDE.md`.

Keep Projects 03 and 04 visibly marked as placeholders until the user supplies real content. Do not invent outcomes, metrics, clients, URLs, or technologies.

## Design constraints

- Maintain the one-page order: hero, about, skills, education, experience, projects, contact.
- Mobile may recompose, but must retain the journal/ID-card identity and primary actions.
- Motion must be restrained and must respect `prefers-reduced-motion` through `MotionConfig reducedMotion="user"`.
- Keep body copy readable; collage effects cannot reduce contrast, keyboard usability, or tap target size.
- Use the asymmetric project grid. Do not replace it with an autoplay carousel.
- Preserve semantic headings, visible focus states, useful alt text, and keyboard-operable dialogs.

## Security invariants

- Never commit `.env` files or real credentials.
- Never expose Turnstile, Upstash, Resend, or rate-limit secrets through a `VITE_` variable.
- The contact form must retain server-side Zod validation, origin checks, the honeypot, Turnstile server verification, hashed-IP rate limiting, strict length limits, and plain-text email output.
- Do not log contact messages or store them in a database.
- Preserve security headers in `vercel.json` and update the CSP deliberately when adding an external origin.

## Verification

Before handing off a change, run the production build and lint. For visual changes, verify desktop and mobile compositions when browser testing is available. Run `npm audit --omit=dev` after dependency changes and address high-severity production findings without using `--force` blindly.
