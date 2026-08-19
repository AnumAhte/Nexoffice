'use client';

import { useEffect, useRef, useState } from 'react';

/** Length of the roll-up, in ms — the design's `dur`. */
const DURATION = 1200;
/** Fraction of the element that must be on screen before it counts. */
const THRESHOLD = 0.45;

interface CountUpProps {
  count: number;
  /** Rendered straight after the number ("+", "%", " wks"). */
  suffix?: string;
  className?: string;
}

/**
 * A statistic that rolls up from zero the first time it scrolls into view.
 *
 * The final value is what renders on the server, so the number is correct
 * before hydration, with no JavaScript, and whenever motion is reduced.
 */
export function CountUp({ count, suffix = '', className }: CountUpProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [value, setValue] = useState(count);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / DURATION);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(count * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      setValue(0);
      frame = requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
      run();
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          run();
        }
      },
      { threshold: THRESHOLD },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [count]);

  return (
    <p ref={ref} className={className}>
      {value}
      {suffix}
    </p>
  );
}
