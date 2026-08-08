'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * The design's scroll reveal: elements start 26px low and fully transparent,
 * then ease in over 700ms once they cross 94% of the viewport height. Items
 * within a group stagger by 40ms, capped at 240ms.
 */

/** cubic-bezier(.22,.61,.36,1) — the design's easing curve. */
export const REVEAL_EASE: [number, number, number, number] = [
  0.22, 0.61, 0.36, 1,
];
export const REVEAL_DURATION = 0.7;
const STAGGER_STEP = 0.04;
const STAGGER_CAP = 0.24;

/** Matches `r.top < innerHeight * 0.94` from the design's sweep(). */
export const REVEAL_VIEWPORT = {
  once: true,
  margin: '0px 0px -6% 0px',
};

export function revealDelay(index = 0): number {
  return Math.min(index * STAGGER_STEP, STAGGER_CAP);
}

export function revealVariants(index = 0): Variants {
  return {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: REVEAL_DURATION,
        ease: REVEAL_EASE,
        delay: revealDelay(index),
      },
    },
  };
}

const TAGS = {
  div: motion.div,
  article: motion.article,
  figure: motion.figure,
  li: motion.li,
  section: motion.section,
};

interface RevealProps {
  children: ReactNode;
  /** Position within its group, used for the staggered delay. */
  index?: number;
  as?: keyof typeof TAGS;
  className?: string;
}

export function Reveal({
  children,
  index = 0,
  as = 'div',
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  // The tags share an identical prop surface; the cast keeps TypeScript from
  // widening them into an unusable union.
  const Tag = TAGS[as] as typeof motion.div;

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      variants={revealVariants(index)}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
    >
      {children}
    </Tag>
  );
}
