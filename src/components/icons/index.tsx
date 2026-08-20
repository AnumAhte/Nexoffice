/**
 * Icons traced 1:1 from `design/Nexoffice Website.dc.html`.
 *
 * The design's glyphs are bespoke 24×24 / stroke-2 / round-cap drawings, so
 * they are reproduced here rather than approximated with a library. Icons that
 * the design draws identically to Lucide (chevrons, mail, phone, map pin, the
 * mobile menu affordance) are imported straight from `lucide-react` at their
 * point of use.
 *
 * Colour comes from a `stroke-*` / `fill-*` utility on the element; size comes
 * from `w-* h-*`. Every icon is decorative — the surrounding element carries
 * the accessible name.
 */

interface IconProps {
  className?: string;
}

/** Shared attributes for the outline family. */
const outline = {
  viewBox: '0 0 24 24',
  fill: 'none',
  // Overridden by the `stroke-*` utility each icon is given; this is the
  // fallback so a glyph is never invisible.
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
} as const;

/* ------------------------------------------------------------------ About */

/** Mission — ringed crosshair. */
export function CrosshairIcon({ className }: IconProps) {
  return (
    <svg {...outline} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" />
    </svg>
  );
}

/** Vision — eye. */
export function EyeIcon({ className }: IconProps) {
  return (
    <svg {...outline} className={className}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/** How we work — four-point spark. */
export function SparkIcon({ className }: IconProps) {
  return (
    <svg {...outline} className={className}>
      <path d="M12 2l2.6 6.6L21 11l-6.4 2.4L12 20l-2.6-6.6L3 11l6.4-2.4z" />
    </svg>
  );
}

/* --------------------------------------------------------------- Services */

/** Custom Web Development — angle brackets. */
export function CodeIcon({ className }: IconProps) {
  return (
    <svg {...outline} className={className}>
      <path d="M8 18l-5-6 5-6M16 6l5 6-5 6" />
    </svg>
  );
}

/** AI Solutions — pinned chip. */
export function ChipIcon({ className }: IconProps) {
  return (
    <svg {...outline} className={className}>
      <rect x="5" y="5" width="14" height="14" rx="4" />
      <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" />
    </svg>
  );
}

/** ERP Systems — four modules. */
export function GridIcon({ className }: IconProps) {
  return (
    <svg {...outline} className={className}>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </svg>
  );
}

/** SaaS Development — usage bars. */
export function BarsIcon({ className }: IconProps) {
  return (
    <svg {...outline} className={className}>
      <path d="M4 17V9M10 17V5M16 17v-6M22 17V8" />
    </svg>
  );
}

/** E-commerce Solutions — cart. */
export function CartIcon({ className }: IconProps) {
  return (
    <svg {...outline} className={className}>
      <path d="M3 5h2l2.4 10.4A2 2 0 009.36 17h7.2a2 2 0 001.96-1.6L20 8H6.2" />
      <circle cx="10" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </svg>
  );
}

/** Automation — radiating hub. */
export function AutomationIcon({ className }: IconProps) {
  return (
    <svg {...outline} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </svg>
  );
}

/** API Development — chain link. */
export function LinkIcon({ className }: IconProps) {
  return (
    <svg {...outline} className={className}>
      <path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1" />
      <path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1" />
    </svg>
  );
}

/** UI/UX Design — framed composition. */
export function CanvasIcon({ className }: IconProps) {
  return (
    <svg {...outline} className={className}>
      <path d="M3 16l6-6 4 4 3-3 5 5" />
      <rect x="2" y="3" width="20" height="18" rx="3" />
    </svg>
  );
}

/* ------------------------------------------------------------ Footer social */

/** Solid LinkedIn mark, as drawn in the design. */
export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable={false}
      className={className}
    >
      <path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 002.48 2.5A2.5 2.5 0 007.5 6a2.5 2.5 0 00-2.52-2.5zM3 21h4V9H3v12zm7 0h4v-6.4c0-1.7.9-2.6 2.1-2.6s1.9.9 1.9 2.6V21h4v-7c0-3.4-1.8-5-4.3-5-1.7 0-2.6.9-3.1 1.6h-.1V9H10v12z" />
    </svg>
  );
}
