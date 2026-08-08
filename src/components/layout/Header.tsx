'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { REVEAL_EASE } from '@/components/ui/Reveal';
import { navLinks } from '@/data/site';
import { cn } from '@/lib/utils';

const LINK_CLASS =
  'text-sm font-medium text-fg-nav transition-colors hover:text-white';

/**
 * Sticky, blurred site header.
 *
 * The design specifies a single-row nav; below 900px that row no longer fits,
 * so the links move into a disclosure panel built from the same tokens.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    const media = window.matchMedia('(min-width: 900px)');
    const onBreakpoint = () => {
      if (media.matches) close();
    };

    window.addEventListener('keydown', onKeyDown);
    media.addEventListener('change', onBreakpoint);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      media.removeEventListener('change', onBreakpoint);
    };
  }, [open, close]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[rgba(6,6,16,0.72)] backdrop-blur-[16px]">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1240px] items-center gap-6 px-6 py-3.5"
      >
        <Link href="#home" className="flex-none" onClick={close}>
          <Logo gradientId="nexNav" size="nav" />
        </Link>

        <div className="flex-1" />

        <div className="hidden flex-wrap items-center justify-end gap-[26px] menu:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={LINK_CLASS}>
              {link.label}
            </Link>
          ))}
          <ButtonLink href="#contact" size="nav">
            Start a project
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex size-[42px] flex-none cursor-pointer items-center justify-center rounded-xl border border-white/[0.12] bg-white/5 text-fg-social transition-colors hover:border-nex-violet/60 hover:text-white menu:hidden"
        >
          {open ? (
            <X className="size-[19px]" aria-hidden />
          ) : (
            <Menu className="size-[19px]" aria-hidden />
          )}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: REVEAL_EASE }}
            className="overflow-hidden border-t border-white/[0.07] menu:hidden"
          >
            <div className="mx-auto flex max-w-[1240px] flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={cn(LINK_CLASS, 'rounded-xl px-2 py-3 text-[15px]')}
                >
                  {link.label}
                </Link>
              ))}
              <ButtonLink
                href="#contact"
                size="nav"
                className="mt-2 w-full"
                onClick={close}
              >
                Start a project
              </ButtonLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
