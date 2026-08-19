'use client';

import { useEffect } from 'react';

/** Radius of the pool of light that trails the pointer. */
const RADIUS = 300;
const TINT = 'rgba(168,85,247,0.15)';
const FADE = 'rgba(168,85,247,0) 66%';

/**
 * Lights any `[data-glow]` element under the pointer with a soft violet pool
 * that follows the cursor.
 *
 * One delegated listener covers every card on the page, which is why this
 * mounts once in the layout rather than per element. Touch pointers never get
 * it — there is no hover state to reward.
 */
export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        '[data-glow]',
      );
      if (!target || frame) return;

      const { clientX, clientY } = event;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = target.getBoundingClientRect();
        const x = Math.round(clientX - rect.left);
        const y = Math.round(clientY - rect.top);
        target.style.backgroundImage = `radial-gradient(${RADIUS}px circle at ${x}px ${y}px, ${TINT}, ${FADE})`;
      });
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        '[data-glow]',
      );
      if (target) target.style.backgroundImage = '';
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerout', onPointerOut);
    };
  }, []);

  return null;
}
