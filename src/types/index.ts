import type { ComponentType } from 'react';
import type { Accent, StepAccent } from '@/lib/accents';

/**
 * Structural icon contract. Both the hand-traced design icons and the
 * `lucide-react` icons satisfy it, and every icon is sized with utility
 * classes rather than width/height props.
 */
export type IconComponent = ComponentType<{ className?: string }>;

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Pillar {
  icon: IconComponent;
  title: string;
  body: string;
  accent: Accent;
}

export interface ProcessStep {
  label: string;
  body: string;
  accent: StepAccent;
}

export interface Service {
  icon: IconComponent;
  title: string;
  body: string;
  accent: Accent;
}

export interface Project {
  /** Stable key — also used as the DOM id, so keep it unique and URL-safe. */
  id: string;
  title: string;
  description: string;
  tags: string[];
  /**
   * Optional screenshot. Drop a file in `/public/projects` and reference it as
   * `/projects/<file>`; without it the card renders the branded gradient slot.
   */
  image?: string;
  /** Alt text for `image`. Required whenever `image` is set. */
  imageAlt?: string;
  demoUrl: string;
  repoUrl: string;
}

export interface Technology {
  name: string;
  /** Two-or-fewer character monogram shown in the badge. */
  badge: string;
  accent: Accent;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  accent: Accent;
}

export interface ContactChannel {
  icon: IconComponent;
  label: string;
  href?: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}
