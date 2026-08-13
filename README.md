# Nexoffice

Marketing site for Nexoffice, built from a finalised design file
(`Nexoffice Website.dc.html`) which is the single source of truth for layout,
spacing, colour, type, shadows and motion.

The design sources are **not tracked in this repository** — they live in a
local `design/` folder, which is gitignored. Keep a copy: any change to the UI
should be checked against it rather than eyeballed.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** — tokens live in `src/app/globals.css` under `@theme`
- **Framer Motion** — scroll reveals and the mobile nav disclosure
- **Lucide React** — chevrons, mail/phone/pin, menu glyphs

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

## Folder structure

```
src/
├── app/
│   ├── api/contact/route.ts   # form endpoint (Resend-ready)
│   ├── globals.css            # design tokens + base layer
│   ├── layout.tsx             # shell: background, header, footer, fonts, metadata
│   └── page.tsx               # section order
├── components/
│   ├── brand/Logo.tsx
│   ├── cards/                 # ProjectCard, ServiceCard, TestimonialCard
│   ├── contact/               # ContactForm, FormField, ContactDetails
│   ├── icons/                 # glyphs traced from the design
│   ├── layout/                # Header, Footer, BackgroundFX
│   ├── portfolio/             # PortfolioCarousel
│   ├── sections/              # one component per page section
│   └── ui/                    # Button, Section, SectionHeading, Reveal
├── data/                      # all editable content
├── lib/                       # accents, contact-form rules, utils
└── types/                     # shared interfaces
```

## Editing content

Everything visible is data-driven — no JSX edits needed for copy changes:

| File | Controls |
| --- | --- |
| `src/data/site.ts` | Nav links, hero stats, contact channels, footer columns, socials |
| `src/data/about.ts` | Mission/Vision/How-we-work pillars, the four process steps |
| `src/data/services.ts` | The eight service cards |
| `src/data/projects.ts` | Portfolio projects **and** carousel timing |
| `src/data/technologies.ts` | Technology chips |
| `src/data/testimonials.ts` | Client quotes |

### Adding or removing a project

Append to (or delete from) the `projects` array in `src/data/projects.ts`:

```ts
{
  id: 'unique-slug',
  title: 'Project name',
  description: 'One or two sentences.',
  tags: ['Next.js', 'PostgreSQL'],
  image: '/projects/project-name.webp',   // optional
  imageAlt: 'Dashboard showing …',        // required when image is set
}
```

Cards show image, title, description and tags. `demoUrl` and `repoUrl` remain
on the `Project` type as optional fields, but nothing renders them.

The carousel, arrows, auto-advance and the section heading count all follow
automatically. Without `image`, the card renders the branded gradient slot from
the design. Screenshots go in `public/projects/` and are served through
`next/image` (AVIF/WebP, lazy, correctly sized).

Auto-advance is configured by `carouselConfig` in the same file
(`autoSlide`, `autoSlideMs`), matching the design's component props.

## Contact form

Fields are name, email, company, phone, service needed and project details.
Name, email, service and project details are required; company and phone are
optional, though phone is still format-checked when present. Validation lives in
`src/lib/contact-form.ts` (email format, phone pattern, 20-character minimum on
the details, and service membership of `SERVICE_OPTIONS` — so a request crafted
outside the form cannot smuggle in an unlisted service). The same module runs
server-side in `src/app/api/contact/route.ts`, so the rules can never drift.

Submitting is guarded against duplicates by a ref that flips synchronously, not
just the disabled button — `disabled` only applies after a re-render, so a fast
double-click could otherwise dispatch twice.

### Where submissions go

Briefs are emailed to **nexofficeonline@gmail.com** — `site.email` in
`src/data/site.ts`, the same address published in the contact section and
footer. Set `CONTACT_TO_EMAIL` if delivery should go somewhere else.

Delivery is wired for **Resend** over `fetch` — no extra dependency. One value
turns it on:

1. Sign up at [resend.com](https://resend.com) **using nexofficeonline@gmail.com**.
2. Create an API key at <https://resend.com/api-keys>.
3. Paste it into `.env.local` as `RESEND_API_KEY=re_…` and restart the server.
4. Deploying? Add the same variable in your host's environment settings
   (on Vercel: Project → Settings → Environment Variables).

Step 1 matters: out of the box the site sends from Resend's shared
`onboarding@resend.dev` sender, which needs no DNS setup but is only allowed to
deliver to the address that owns the API key. To send from your own domain to
anyone, verify a domain in Resend and set
`CONTACT_FROM_EMAIL="Nexoffice <hello@your-domain.com>"`.

Until `RESEND_API_KEY` is set the route validates and logs the submission to the
server console, so the form is fully exercisable locally. `CONTACT_TO_EMAIL`
overrides the recipient without a code change.

To use **EmailJS** instead, keep the route for validation and replace the body
of `deliver()` with a POST to `https://api.emailjs.com/api/v1.0/email/send`.

## Design fidelity notes

Two details the design file did not specify, resolved in its own visual
language rather than invented:

- **Mobile navigation.** The design shows one nav row; below 900px those links
  no longer fit, so they collapse into a disclosure panel using the same
  surface, border and type tokens. The breakpoint is `--breakpoint-menu`.
- **Project media.** The design marks the card image area as a slot. Without a
  screenshot the card shows the specified gradient plus the grid texture and
  monogram already used by the contact map slot.

One deliberate deviation: the design's page shell uses `overflow-x: hidden`,
which would turn the wrapper into a scroll container and stop the sticky header
from sticking. `overflow-x: clip` gives identical clipping without that side
effect.

## Accessibility & performance

- Semantic landmarks throughout; every `<section>` is labelled by its heading.
- Skip link, visible focus rings, `aria-expanded`/`aria-controls` on the menu,
  labelled carousel controls, `aria-invalid` + `aria-describedby` on invalid
  fields, and a polite live region for submission status.
- All motion — reveals, drifting background, carousel auto-advance — is
  disabled under `prefers-reduced-motion`.
- Fonts are self-hosted through `next/font` (no render-blocking request), and
  `lucide-react` / `framer-motion` imports are tree-shaken via
  `optimizePackageImports`.
