'use client';

import { useEffect, useRef } from 'react';

/**
 * Below this width the network is decorative only — there is no pointer to
 * drive the parallax, so the listener is never attached.
 */
const PARALLAX_MIN_WIDTH = 760;
/** Peak layer offset, in px, at the far edge of the hero. */
const SHIFT_X = 6;
const SHIFT_Y = 5;

/** The four service nodes orbiting the core, in the design's DOM order. */
const NODES = [
  {
    label: 'AI',
    anchor: 'left-1/2 top-[10%]',
    stack: 'flex-col',
    dot: 'size-[13px] bg-nex-violet shadow-[0_0_14px_4px_rgba(168,85,247,0.5)]',
    text: 'text-fg-badge',
    animation: 'animate-node-a',
  },
  {
    label: 'WEB',
    anchor: 'left-[12%] top-1/2',
    stack: 'flex-col',
    dot: 'size-3 bg-[#6D5AF0] shadow-[0_0_13px_4px_rgba(109,90,240,0.45)]',
    text: 'text-[#c3c8f7]',
    animation: 'animate-node-b',
  },
  {
    label: 'ERP',
    anchor: 'left-[88%] top-1/2',
    stack: 'flex-col',
    dot: 'size-3 bg-nex-sky shadow-[0_0_13px_4px_rgba(59,130,246,0.45)]',
    text: 'text-[#b9d0f9]',
    animation: 'animate-node-c',
  },
  {
    label: 'AUTOMATION',
    anchor: 'left-1/2 top-[90%]',
    stack: 'flex-col-reverse',
    dot: 'size-3 bg-nex-cyan shadow-[0_0_13px_4px_rgba(34,211,238,0.45)]',
    text: 'text-[#a8e8f5]',
    animation: 'animate-node-d',
  },
] as const;

const NODE_LABEL =
  'text-[clamp(10px,1.1vw,12.5px)] font-bold tracking-[0.17em]';

/**
 * The hero's animated service network: a Nexoffice core wired to the four
 * things we build, with dashes travelling along each link. Two layers drift
 * against each other as the pointer crosses the hero, which is what gives the
 * diagram its depth.
 */
export function HeroNetwork() {
  const hostRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const back = backRef.current;
    const front = frontRef.current;
    if (!host || !back || !front) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(hover: none)').matches ||
      window.innerWidth < PARALLAX_MIN_WIDTH
    ) {
      return;
    }

    // The pointer is tracked across the whole hero, not just the diagram, so
    // the layers are already displaced by the time the cursor reaches them.
    const hero = document.getElementById('home') ?? host;
    const layers: Array<readonly [HTMLDivElement, number]> = [
      [back, 1],
      [front, 2],
    ];

    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      if (frame) return;
      const { clientX, clientY } = event;

      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = host.getBoundingClientRect();
        const dx =
          (clientX - (rect.left + rect.width / 2)) / Math.max(rect.width, 1);
        const dy =
          (clientY - (rect.top + rect.height / 2)) / Math.max(rect.height, 1);

        for (const [layer, depth] of layers) {
          const x = (dx * SHIFT_X * depth).toFixed(2);
          const y = (dy * SHIFT_Y * depth).toFixed(2);
          layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      });
    };

    const onPointerLeave = () => {
      for (const [layer] of layers) {
        layer.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    hero.addEventListener('pointermove', onPointerMove, { passive: true });
    hero.addEventListener('pointerleave', onPointerLeave, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      data-glow
      className="relative h-[clamp(238px,33vw,308px)] w-full rounded-[34px]"
    >
      {/* Links — the static rail, each overlaid with a travelling dash. */}
      <div
        ref={backRef}
        className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform"
      >
        <div className="absolute top-[10%] left-1/2 h-2/5 w-px translate-x-[-0.5px] bg-[linear-gradient(180deg,rgba(168,85,247,0.05),rgba(168,85,247,0.34))]" />
        <div
          data-net-line
          className="animate-dash-slow absolute top-[10%] left-1/2 h-2/5 w-px translate-x-[-0.5px] bg-[linear-gradient(180deg,#A855F7_0_3px,transparent_3px_13px)] bg-size-[1px_13px] opacity-85"
        />

        <div className="absolute top-1/2 left-1/2 h-2/5 w-px translate-x-[-0.5px] bg-[linear-gradient(180deg,rgba(34,211,238,0.34),rgba(34,211,238,0.05))]" />
        <div
          data-net-line
          className="animate-dash-fast absolute top-1/2 left-1/2 h-2/5 w-px translate-x-[-0.5px] bg-[linear-gradient(180deg,#22D3EE_0_3px,transparent_3px_13px)] bg-size-[1px_13px] opacity-80"
        />

        <div className="absolute top-1/2 left-[12%] h-px w-[38%] translate-y-[-0.5px] bg-[linear-gradient(90deg,rgba(109,90,240,0.06),rgba(168,85,247,0.34))]" />
        <div
          data-net-line
          className="animate-dash-x-slow absolute top-1/2 left-[12%] h-px w-[38%] translate-y-[-0.5px] bg-[linear-gradient(90deg,#8B5CF6_0_3px,transparent_3px_13px)] bg-size-[13px_1px] opacity-85"
        />

        <div className="absolute top-1/2 left-1/2 h-px w-[38%] translate-y-[-0.5px] bg-[linear-gradient(90deg,rgba(59,130,246,0.34),rgba(34,211,238,0.06))]" />
        <div
          data-net-line
          className="animate-dash-x-fast absolute top-1/2 left-1/2 h-px w-[38%] translate-y-[-0.5px] bg-[linear-gradient(90deg,#3B82F6_0_3px,transparent_3px_13px)] bg-size-[13px_1px] opacity-80"
        />
      </div>

      {/* Core and nodes — the nearer layer, so it travels twice as far. */}
      <div
        ref={frontRef}
        className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform"
      >
        <div
          data-net-core
          className="animate-core absolute top-1/2 left-1/2 flex -translate-1/2 flex-col items-center gap-[9px]"
        >
          <span className="flex size-[clamp(66px,8.4vw,88px)] items-center justify-center rounded-3xl border border-nex-violet/50 bg-[linear-gradient(150deg,rgba(124,58,237,0.34),rgba(37,99,235,0.2))]">
            <svg viewBox="0 0 144 132" className="h-[27px] w-[30px]" aria-hidden>
              <defs>
                <linearGradient id="nexNetCore" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="58%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
              <rect
                x="66"
                y="40"
                width="28"
                height="92"
                rx="10"
                fill="url(#nexNetCore)"
              />
              <rect
                x="112"
                y="0"
                width="28"
                height="126"
                rx="10"
                fill="url(#nexNetCore)"
              />
              <line
                x1="80"
                y1="54"
                x2="126"
                y2="112"
                stroke="url(#nexNetCore)"
                strokeWidth="30"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="rounded-[7px] bg-[rgba(5,5,12,0.88)] px-2.5 py-[3px] text-[clamp(10px,1.1vw,12px)] font-bold tracking-[0.18em] text-white">
            NEXOFFICE
          </span>
        </div>

        {NODES.map((node) => (
          <div
            key={node.label}
            data-net-node
            className={`${node.anchor} ${node.stack} ${node.animation} absolute flex -translate-1/2 items-center gap-2`}
          >
            <span className={`${node.dot} rounded-full`} />
            <span className={`${NODE_LABEL} ${node.text}`}>{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
