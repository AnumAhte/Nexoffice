import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Vertical rhythm presets, transcribed from the design's section padding. */
const PADDING = {
  hero: 'pt-[clamp(72px,12vh,140px)] pb-[clamp(64px,10vh,110px)]',
  standard: 'py-[clamp(60px,9vh,110px)]',
  compact: 'py-[clamp(50px,8vh,100px)]',
  compactDeep: 'pt-[clamp(50px,8vh,100px)] pb-[clamp(60px,9vh,110px)]',
} as const;

interface SectionProps {
  id: string;
  children: ReactNode;
  padding?: keyof typeof PADDING;
  /**
   * Portfolio's carousel bleeds to the viewport edge, so its section drops the
   * shared container and horizontal padding.
   */
  bleed?: boolean;
  labelledBy?: string;
  className?: string;
}

export function Section({
  id,
  children,
  padding = 'standard',
  bleed = false,
  labelledBy,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'relative z-1',
        PADDING[padding],
        !bleed && 'mx-auto max-w-[1240px] px-6',
        className,
      )}
    >
      {children}
    </section>
  );
}

/** The 1240px content rail, for use inside a bleeding section. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto max-w-[1240px] px-6', className)}>
      {children}
    </div>
  );
}
