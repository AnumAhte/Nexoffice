/**
 * The design cycles four accent treatments (purple / blue / cyan / neutral)
 * across services, technologies, testimonials and the about pillars.
 *
 * Every value below is a literal Tailwind class string so the compiler can see
 * it during scanning — never build these names dynamically.
 */

export type Accent = 'purple' | 'blue' | 'cyan' | 'neutral';

/** Card hover treatment: border tint + coloured drop shadow. */
export const cardAccentHover: Record<Accent, string> = {
  purple:
    'hover:border-nex-violet/50 hover:shadow-[0_22px_54px_rgba(124,58,237,0.32)]',
  blue: 'hover:border-nex-sky/50 hover:shadow-[0_22px_54px_rgba(37,99,235,0.32)]',
  cyan: 'hover:border-nex-cyan/50 hover:shadow-[0_22px_54px_rgba(34,211,238,0.26)]',
  neutral: 'hover:border-white/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]',
};

/** Smaller hover treatment used by the technology chips. */
export const chipAccentHover: Record<Accent, string> = {
  purple:
    'hover:border-nex-violet/45 hover:shadow-[0_16px_40px_rgba(124,58,237,0.28)]',
  blue: 'hover:border-nex-sky/45 hover:shadow-[0_16px_40px_rgba(37,99,235,0.28)]',
  cyan: 'hover:border-nex-cyan/45 hover:shadow-[0_16px_40px_rgba(34,211,238,0.24)]',
  neutral: 'hover:border-white/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]',
};

/** 44px icon tile inside service cards. */
export const iconTileAccent: Record<Accent, string> = {
  purple:
    'bg-[linear-gradient(140deg,rgba(168,85,247,0.28),rgba(59,130,246,0.18))] border-nex-violet/[0.34]',
  blue: 'bg-[linear-gradient(140deg,rgba(59,130,246,0.28),rgba(34,211,238,0.18))] border-nex-sky/[0.34]',
  cyan: 'bg-[linear-gradient(140deg,rgba(34,211,238,0.26),rgba(16,185,129,0.16))] border-nex-cyan/[0.34]',
  neutral: 'bg-white/12 border-white/[0.34]',
};

/** Stroke colour of the icon drawn inside the tile above. */
export const iconStrokeAccent: Record<Accent, string> = {
  purple: 'stroke-nex-violet-soft',
  blue: 'stroke-nex-sky-soft',
  cyan: 'stroke-nex-cyan-ink',
  neutral: 'stroke-white',
};

/** 36px lettered badge on the technology chips. */
export const badgeAccent: Record<Accent, string> = {
  purple:
    'bg-[linear-gradient(140deg,rgba(168,85,247,0.3),rgba(37,99,235,0.2))]',
  blue: 'bg-[linear-gradient(140deg,rgba(37,99,235,0.3),rgba(34,211,238,0.2))]',
  cyan: 'bg-[linear-gradient(140deg,rgba(34,211,238,0.28),rgba(16,185,129,0.2))]',
  neutral: 'bg-white/12',
};

/** Testimonial card hover shadow. */
export const quoteAccentHover: Record<Accent, string> = {
  purple: 'hover:shadow-[0_22px_54px_rgba(124,58,237,0.28)]',
  blue: 'hover:shadow-[0_22px_54px_rgba(37,99,235,0.28)]',
  cyan: 'hover:shadow-[0_22px_54px_rgba(34,211,238,0.24)]',
  neutral: 'hover:shadow-[0_22px_54px_rgba(0,0,0,0.5)]',
};

/** Testimonial avatar gradient. */
export const avatarAccent: Record<Accent, string> = {
  purple: 'bg-[linear-gradient(140deg,#7C3AED,#22D3EE)]',
  blue: 'bg-[linear-gradient(140deg,#2563EB,#A855F7)]',
  cyan: 'bg-[linear-gradient(140deg,#22D3EE,#7C3AED)]',
  neutral: 'bg-[linear-gradient(140deg,rgba(255,255,255,0.2),rgba(255,255,255,0.06))]',
};

/** Full-bleed pillar cards in the About section. */
export const pillarAccent: Record<Accent, string> = {
  purple:
    'bg-[linear-gradient(160deg,rgba(124,58,237,0.16),rgba(255,255,255,0.03))] border-nex-violet/[0.28] hover:shadow-[0_24px_60px_rgba(124,58,237,0.3)]',
  blue: 'bg-[linear-gradient(160deg,rgba(37,99,235,0.16),rgba(255,255,255,0.03))] border-nex-sky/[0.28] hover:shadow-[0_24px_60px_rgba(37,99,235,0.3)]',
  cyan: 'bg-[linear-gradient(160deg,rgba(34,211,238,0.14),rgba(255,255,255,0.03))] border-nex-cyan/[0.26] hover:shadow-[0_24px_60px_rgba(34,211,238,0.24)]',
  neutral:
    'bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] border-white/[0.28] hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]',
};

/** 46px icon tile inside the About pillar cards. */
export const pillarIconAccent: Record<Accent, string> = {
  purple: 'bg-nex-violet/[0.18] border-nex-violet/40',
  blue: 'bg-nex-sky/[0.18] border-nex-sky/40',
  cyan: 'bg-nex-cyan/[0.16] border-nex-cyan/40',
  neutral: 'bg-white/[0.18] border-white/40',
};

/** Stroke colour for the About pillar icons. */
export const pillarStrokeAccent: Record<Accent, string> = {
  purple: 'stroke-nex-violet-ink',
  blue: 'stroke-nex-sky-ink',
  cyan: 'stroke-nex-cyan-soft',
  neutral: 'stroke-white',
};

/** Numbered process-step labels. */
export const stepAccent = {
  violet: 'text-nex-violet',
  periwinkle: 'text-nex-periwinkle',
  sky: 'text-nex-sky',
  cyan: 'text-nex-cyan',
} as const;

export type StepAccent = keyof typeof stepAccent;

/** Section eyebrow colours. */
export const eyebrowAccent = {
  violet: 'text-nex-violet',
  sky: 'text-nex-sky',
  cyan: 'text-nex-cyan',
} as const;

export type EyebrowAccent = keyof typeof eyebrowAccent;
