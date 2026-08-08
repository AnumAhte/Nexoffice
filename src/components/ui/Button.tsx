import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * The design uses two button treatments — a purple-to-blue gradient and a
 * translucent ghost — at four sizes. Padding, radius, shadow and transition all
 * vary per size, so each combination is spelled out rather than derived.
 */

export type ButtonVariant = 'gradient' | 'ghost';
export type ButtonSize = 'nav' | 'lg' | 'card' | 'submit';

const BASE = 'inline-flex items-center justify-center font-bold text-center';

const GRADIENT = 'text-white bg-[linear-gradient(100deg,#7C3AED,#2563EB)]';

const SIZE: Record<ButtonSize, string> = {
  nav: 'flex-none rounded-full px-5 py-2.5 text-sm',
  lg: 'rounded-full px-[30px] py-[15px] text-[15px] transition duration-[250ms] ease-native hover:-translate-y-0.5',
  card: 'flex-1 rounded-xl px-[14px] py-[11px] text-[13.5px]',
  submit:
    'rounded-[14px] px-[26px] py-4 text-[15px] transition duration-[250ms] ease-native hover:-translate-y-0.5',
};

/** Shadows are size-specific in the design, so they live with the size. */
const GRADIENT_SHADOW: Record<ButtonSize, string> = {
  nav: 'shadow-[0_8px_26px_rgba(124,58,237,0.4)] hover:shadow-[0_10px_34px_rgba(124,58,237,0.62)]',
  lg: 'shadow-[0_14px_40px_rgba(124,58,237,0.45)] hover:shadow-[0_18px_52px_rgba(124,58,237,0.68)]',
  card: 'hover:shadow-[0_10px_26px_rgba(124,58,237,0.5)]',
  submit:
    'shadow-[0_14px_40px_rgba(124,58,237,0.45)] hover:shadow-[0_18px_52px_rgba(124,58,237,0.66)]',
};

const GHOST: Record<ButtonSize, string> = {
  nav: 'text-fg border border-white/[0.14] bg-white/5 hover:border-nex-cyan/55 hover:text-white',
  lg: 'text-fg border border-white/[0.14] bg-white/5 hover:border-nex-cyan/55 hover:text-white',
  card: 'text-fg border border-white/[0.14] bg-white/[0.06] hover:border-nex-cyan/50 hover:text-white',
  submit:
    'text-fg border border-white/[0.14] bg-white/5 hover:border-nex-cyan/55 hover:text-white',
};

function classesFor(variant: ButtonVariant, size: ButtonSize) {
  return cn(
    BASE,
    SIZE[size],
    variant === 'gradient'
      ? cn(GRADIENT, GRADIENT_SHADOW[size], 'hover:text-white')
      : GHOST[size],
  );
}

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

interface ButtonLinkProps extends CommonProps {
  href: string;
  onClick?: () => void;
}

/** Anchor-styled button, used for every in-page navigation CTA. */
export function ButtonLink({
  href,
  variant = 'gradient',
  size = 'lg',
  className,
  children,
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(classesFor(variant, size), className)}
    >
      {children}
    </Link>
  );
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

/** Real `<button>`, used by the contact form submit. */
export function Button({
  variant = 'gradient',
  size = 'submit',
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        classesFor(variant, size),
        'cursor-pointer border-none disabled:cursor-not-allowed disabled:opacity-70',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
