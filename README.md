# Lark Freelance

Conversion-focused website for **Lark Freelance** — an AI-native IT agency.
Editorial dark-tech design (Linear / Vercel sensibility), warm amber accent,
restrained motion, and the Larkins intelligence layer for lead capture.

Built as a production-grade React/Next.js project — not a single-file app.

## Stack

- **Next.js 14** (App Router) + **React 18**
- **TypeScript** (strict)
- **Tailwind CSS** with theme-aware CSS variables
- **Framer Motion** — restrained, editorial motion
- **@anthropic-ai/sdk** — optional live Larkins assistant

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start   # production
```

## Contacts

All contact details live in **`src/data/contacts.ts`** — change them in one
place and the header, contact section, footer and SEO structured data all
update. The phone number there is a placeholder; replace it with the real one.

## Larkins AI

The Larkins console (section 06) collects a 5-question client brief.

- **Without an API key** — a deterministic scripted flow walks the same five
  questions and produces a summary. Works out of the box.
- **With an API key** — replies are generated live by Claude using the
  `LARKINS_SYSTEM` prompt.

Copy `.env.example` to `.env.local` and set `ANTHROPIC_API_KEY`.

## SEO

- Rich metadata + Open Graph / Twitter cards (`app/layout.tsx`)
- `ProfessionalService` JSON-LD structured data with contact points
- `app/sitemap.ts` and `app/robots.ts`
- Semantic HTML, single `h1` per page, descriptive headings

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # fonts, theme, metadata, JSON-LD
│   ├── page.tsx              # home — all sections
│   ├── globals.css
│   ├── icon.svg
│   ├── robots.ts / sitemap.ts
│   ├── larkins/page.tsx      # cinematic "coming soon" page
│   └── api/larkins/route.ts  # Larkins conversation endpoint
├── components/
│   ├── layout/   # Navbar, Footer, ThemeToggle
│   ├── hero/     # Hero, HeroBackground
│   ├── sections/ # About, Services, Process, Portfolio, Team,
│   │             # Larkins, FAQ, Contact, Freelancers
│   ├── larkins/  # LarkinsStage
│   ├── ui/       # Button, Card, SectionHeading, Section, Glow,
│   │             # NoiseOverlay, Icon
│   └── animations/ # Reveal
├── data/         # services, team, portfolio, process, faq, contacts
├── hooks/        # useTheme, useReveal
├── lib/          # claude (system prompt + scripted flow), utils
└── styles/       # variables.css, animations.css, typography.css
```

## Page flow (conversion path)

Hero → Кто мы → Услуги → Процесс → Портфолио → Команда → Larkins (бриф)
→ Вопросы (FAQ) → Контакты → Для фрилансеров → Footer.

## Design notes

- **Editorial, not "AI-generated"** — no glowing orbs, particle fields or
  grid backdrops. Clean solid surfaces, crisp 1px borders, one quiet warmth
  per section.
- **Theme** — dark by default, warm light counterpart, set pre-paint to avoid
  any flash.
- **Typography** — Playfair Display (headings, full Cyrillic), Geologica
  (body), JetBrains Mono (meta).
- **Motion** — short, calm reveals; honors `prefers-reduced-motion`.
- **Mobile-first** — verified at 375–1440px; burger nav, stacked layouts,
  44px+ touch targets, no horizontal scroll.
- **Accessibility** — semantic HTML, visible focus rings, ARIA labels,
  keyboard navigation.
