import type { ReactNode } from 'react';
import { eyebrowAccent, type EyebrowAccent } from '@/lib/accents';
import { cn } from '@/lib/utils';

/** About's lead sits 18px below the title; every other section uses 16px. */
const LEAD_SPACING = {
  default: 'mt-4',
  wide: 'mt-[18px]',
} as const;

interface SectionHeadingProps {
  eyebrow: string;
  accent: EyebrowAccent;
  title: ReactNode;
  /** Id for the `<h2>`, so the owning `<section>` can point at it. */
  titleId: string;
  lead?: ReactNode;
  leadSpacing?: keyof typeof LEAD_SPACING;
  /** Extra classes for the lead paragraph — width constraints, text wrapping. */
  leadClassName?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  accent,
  title,
  titleId,
  lead,
  leadSpacing = 'default',
  leadClassName,
  className,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p
        className={cn(
          'text-[13px] font-bold tracking-[0.18em] uppercase',
          eyebrowAccent[accent],
        )}
      >
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className="mt-3.5 text-[clamp(30px,3.6vw,46px)] leading-[1.12] font-extrabold tracking-[-0.035em]"
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            LEAD_SPACING[leadSpacing],
            'text-[17px] leading-[1.7] text-fg-lead',
            leadClassName,
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
