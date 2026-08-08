'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Container } from '@/components/ui/Section';
import type { Project } from '@/types';

/** Flex gap between cards, in px — must stay in sync with the track's class. */
const GAP = 20;
/** A drag shorter than this is treated as a click, not a swipe. */
const DRAG_THRESHOLD = 5;

interface PortfolioCarouselProps {
  projects: Project[];
  autoSlide?: boolean;
  autoSlideMs?: number;
  /** Rendered above the track, inside the shared content rail. */
  header: ReactNode;
}

/**
 * Horizontally snapping project rail: drag with a pointer, step with the
 * arrows, or let it advance on its own. Auto-advance pauses while the pointer
 * is over the rail, while keyboard focus is inside it, and whenever the visitor
 * prefers reduced motion.
 */
export function PortfolioCarousel({
  projects,
  autoSlide = true,
  autoSlideMs = 3800,
  header,
}: PortfolioCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Drag bookkeeping — refs, so a drag never triggers a re-render per frame.
  const dragging = useRef(false);
  const dragMoved = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const snapRestore = useRef<number | null>(null);

  const slide = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + GAP : 340;
    const max = track.scrollWidth - track.clientWidth - 4;

    let target = track.scrollLeft + direction * step;
    if (target > max) target = 0;
    if (target < 0) target = max;

    // Chromium can cancel a programmatic smooth scroll while mandatory snapping
    // is active, leaving the rail stuck. Lift snapping for the duration of the
    // step and restore it once the track has settled on the new card.
    track.style.scrollSnapType = 'none';
    track.scrollTo({ left: target, behavior: 'smooth' });

    if (snapRestore.current) window.clearTimeout(snapRestore.current);
    snapRestore.current = window.setTimeout(() => {
      track.style.scrollSnapType = '';
    }, 600);
  }, []);

  useEffect(
    () => () => {
      if (snapRestore.current) window.clearTimeout(snapRestore.current);
    },
    [],
  );

  useEffect(() => {
    if (!autoSlide || paused) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduceMotion) return;

    const timer = window.setInterval(() => slide(1), autoSlideMs);
    return () => window.clearInterval(timer);
  }, [autoSlide, autoSlideMs, paused, slide]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    // Let the browser handle text selection and secondary buttons.
    if (event.button !== 0) return;

    const track = trackRef.current;
    if (!track) return;

    dragging.current = true;
    dragMoved.current = false;
    dragStartX.current = event.clientX;
    dragStartScroll.current = track.scrollLeft;
    // Free-scroll while dragging; snapping resumes on release.
    track.style.scrollSnapType = 'none';
    track.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;

    const track = trackRef.current;
    if (!track) return;

    const delta = event.clientX - dragStartX.current;
    if (Math.abs(delta) > DRAG_THRESHOLD) dragMoved.current = true;
    track.scrollLeft = dragStartScroll.current - delta;
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;

    const track = trackRef.current;
    dragging.current = false;

    if (track) {
      track.style.scrollSnapType = '';
      if (track.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }
    }
  };

  // Swallow the click that follows a real drag so cards don't navigate.
  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!dragMoved.current) return;
    event.preventDefault();
    event.stopPropagation();
    dragMoved.current = false;
  };

  return (
    <>
      <Container className="flex flex-wrap items-end gap-6">
        {header}
        <div className="flex flex-none gap-2.5">
          <CarouselButton label="Previous projects" onClick={() => slide(-1)}>
            <ChevronLeft className="size-[18px]" aria-hidden />
          </CarouselButton>
          <CarouselButton label="Next projects" onClick={() => slide(1)}>
            <ChevronRight className="size-[18px]" aria-hidden />
          </CarouselButton>
        </div>
      </Container>

      <div
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Selected projects"
        tabIndex={0}
        className="no-scrollbar mt-[34px] flex snap-x snap-mandatory touch-pan-y gap-5 overflow-x-auto px-[clamp(24px,6vw,120px)] pt-1.5 pb-[30px] select-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-[46px] cursor-pointer items-center justify-center rounded-full border border-white/[0.14] bg-white/5 text-fg transition duration-[250ms] ease-native hover:border-nex-violet/60 hover:bg-nex-purple/[0.18]"
    >
      {children}
    </button>
  );
}
