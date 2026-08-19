import { cn } from '@/lib/utils';

interface LogoProps {
  /**
   * Gradient ids must stay unique across the document, so each placement
   * passes its own (`nexNav`, `nexFoot`, …) exactly as the design does.
   */
  gradientId: string;
  size?: 'nav' | 'footer';
  className?: string;
}

const MARK = {
  nav: 'h-[31px] w-[34px]',
  footer: 'h-[29px] w-8',
} as const;

const NEX = {
  nav: 'text-2xl',
  footer: 'text-[23px]',
} as const;

const OFFICE = {
  nav: 'text-base',
  footer: 'text-[15px]',
} as const;

/**
 * The Nexoffice lockup: the gradient monogram supplies the leading "N", the
 * wordmark completes it with "ex" + "office".
 */
export function Logo({ gradientId, size = 'nav', className }: LogoProps) {
  return (
    <span className={cn('flex items-center gap-[3px]', className)}>
      <span className="sr-only">Nexoffice</span>
      <svg
        viewBox="0 0 144 132"
        className={cn(
          MARK[size],
          'flex-none drop-shadow-[0_0_10px_rgba(124,58,237,0.55)]',
          // The mark eases in once, in the header only.
          size === 'nav' && 'animate-logo-in',
        )}
        aria-hidden
        focusable={false}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="22%" stopColor="#7C3AED" />
            <stop offset="58%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <rect x="0" y="40" width="24" height="24" rx="7" fill="#7C3AED" />
        <rect x="32" y="40" width="24" height="24" rx="7" fill="#10B981" />
        <rect x="0" y="72" width="24" height="24" rx="7" fill="#4F46E5" />
        <rect x="32" y="72" width="24" height="24" rx="7" fill="#2563EB" />
        <rect
          x="66"
          y="40"
          width="28"
          height="92"
          rx="10"
          fill={`url(#${gradientId})`}
        />
        <rect
          x="112"
          y="0"
          width="28"
          height="126"
          rx="10"
          fill={`url(#${gradientId})`}
        />
        <line
          x1="80"
          y1="54"
          x2="126"
          y2="112"
          stroke={`url(#${gradientId})`}
          strokeWidth="30"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex items-baseline gap-0.5" aria-hidden>
        <span
          className={cn(
            NEX[size],
            'font-extrabold tracking-[-0.045em] text-white',
          )}
        >
          ex
        </span>
        <span
          className={cn(
            OFFICE[size],
            'font-semibold tracking-[-0.03em] text-nex-cyan',
          )}
        >
          office
        </span>
      </span>
    </span>
  );
}
