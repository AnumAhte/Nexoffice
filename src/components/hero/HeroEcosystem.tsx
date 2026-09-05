'use client';

import Image from 'next/image';
import {
  Fragment,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from 'react';

/**
 * The hero's product ecosystem: eight glass panels standing at three depths
 * around the Nexoffice core mark, wired back to it by pulsing spokes. Three of
 * them carry real screenshots; the rest are abstract mini-UIs.
 *
 * The scene assembles itself from CSS alone — entrance, dust, spoke pulses.
 * The script layered on top only adds the drift: pointer parallax, a slow
 * per-panel float, and a scroll-driven dolly. If it never runs, the scene is
 * still there, just still.
 */

/** The spokes' coordinate space. Panel anchors are expressed against it. */
const VIEW_W = 1040;
const VIEW_H = 460;

type Tier = 'near' | 'mid' | 'far';

/* -------------------------------------------------------------- card bodies */

/** A row of skeleton text, used by several of the mini-UIs. */
function Line({ width, className = '' }: { width: string; className?: string }) {
  return (
    <span
      className={`block h-1 rounded-[3px] bg-[#aeb2c9] opacity-[0.32] ${className}`}
      style={{ width }}
    />
  );
}

/** AI Employee — a conversation, ending in the agent still typing. */
function ChatBody() {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex w-[74%] flex-col gap-1 self-start rounded-[9px_9px_9px_3px] bg-white/[0.07] px-2 py-1.5">
        <span className="h-1 w-[88%] rounded-[3px] bg-[#c9cbe0] opacity-55" />
        <span className="h-1 w-[58%] rounded-[3px] bg-[#c9cbe0] opacity-55" />
      </div>
      <div className="flex w-[66%] flex-col gap-1 self-end rounded-[9px_9px_3px_9px] bg-nex-violet/24 px-2 py-1.5">
        <span className="h-1 w-[82%] rounded-[3px] bg-[#e9dcff] opacity-80" />
        <span className="h-1 w-[60%] rounded-[3px] bg-[#e9dcff] opacity-80" />
      </div>
      <div className="flex gap-[3px] self-start rounded-[9px] bg-white/[0.06] px-2 py-1.5">
        <span className="size-1 rounded-full bg-nex-violet" />
        <span className="size-1 rounded-full bg-nex-violet opacity-60" />
        <span className="size-1 rounded-full bg-nex-violet opacity-[0.32]" />
      </div>
    </div>
  );
}

/** Automation — four steps, with work travelling down the rails between them. */
const WORKFLOW = [
  { node: '#A855F7', rail: '#A855F7', seconds: 3.4 },
  { node: '#6366F1', rail: '#6366F1', seconds: 3.8 },
  { node: '#3B82F6', rail: '#3B82F6', seconds: 4.2 },
  { node: '#22D3EE', rail: null, seconds: 0 },
] as const;

function WorkflowBody() {
  return (
    <>
      <div className="flex items-center">
        {WORKFLOW.map((step) => (
          <Fragment key={step.node}>
            <span
              className="size-[14px] flex-none rounded-[5px] border bg-white/[0.06]"
              style={{
                borderColor: step.node,
                boxShadow: `0 0 9px -2px ${step.node}`,
              }}
            />
            {step.rail ? (
              <span
                className="h-px flex-1 bg-size-[11px_1px]"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${step.rail} 0 3px, transparent 3px 11px)`,
                  animation: `nexEcoRail ${step.seconds}s linear infinite`,
                }}
              />
            ) : null}
          </Fragment>
        ))}
      </div>
      <div className="mt-2.5 flex flex-col gap-[5px]">
        <Line width="100%" />
        <Line width="72%" />
        <Line width="88%" />
      </div>
    </>
  );
}

/** Analytics — bars breathing against their baseline, over a two-line summary. */
const BAR_HEIGHTS = [42, 66, 38, 80, 56, 94, 72];

function BarsBody() {
  return (
    <>
      <div className="flex h-[46px] items-end gap-[5px]">
        {BAR_HEIGHTS.map((height, i) => (
          <span
            key={i}
            className="flex-1 origin-bottom rounded-[3px_3px_1px_1px] bg-[linear-gradient(180deg,rgba(34,211,238,0.85),rgba(34,211,238,0.16))]"
            style={{
              height: `${height}%`,
              animation: `nexBar ${(3.2 + i * 0.35).toFixed(2)}s ease-in-out ${(i * 0.12).toFixed(2)}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="mt-[7px] flex flex-col gap-1">
        <Line width="64%" />
        <Line width="40%" />
      </div>
    </>
  );
}

/** Inventory — stock levels, one line running low. */
const STOCK = [
  { color: '#10B981', level: 86 },
  { color: '#22D3EE', level: 62 },
  { color: '#F59E0B', level: 38 },
  { color: '#10B981', level: 74 },
];

function StockBody() {
  return (
    <div className="flex flex-col gap-[5px]">
      {STOCK.map((row, i) => (
        <div key={i} className="flex items-center gap-[5px]">
          <span
            className="size-1 flex-none rounded-[1px]"
            style={{
              background: row.color,
              boxShadow: `0 0 6px ${row.color}`,
            }}
          />
          <span className="h-[3px] flex-1 overflow-hidden rounded-[2px] bg-white/[0.08]">
            <span
              className="block h-full opacity-70"
              style={{ width: `${row.level}%`, background: row.color }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

/** API — indented syntax, read as shape rather than as code. */
const CODE = [
  { indent: 10, color: '#A855F7', width: 72 },
  { indent: 22, color: '#22D3EE', width: 54 },
  { indent: 22, color: '#7C8AA6', width: 86 },
  { indent: 34, color: '#3B82F6', width: 46 },
  { indent: 10, color: '#7C8AA6', width: 62 },
];

function CodeBody() {
  return (
    <div className="flex flex-col gap-1 text-[0px]">
      {CODE.map((row, i) => (
        <div key={i} className="flex items-center gap-1">
          <span className="flex-none" style={{ width: row.indent }} />
          <span
            className="h-[3px] rounded-[2px] opacity-60"
            style={{ width: `${row.width}%`, background: row.color }}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * A product screenshot, pushed back behind a tint so it reads as a surface in
 * the scene rather than as a picture competing with the headline.
 */
function ShotBody({
  src,
  height,
  tint,
}: {
  src: string;
  height: number;
  tint: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-lg border border-white/[0.09] bg-[#0a0a16]"
      style={{ height }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="200px"
        className="object-cover object-left-top [filter:saturate(0.88)_brightness(0.8)_contrast(1.05)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(158deg, ${tint}, rgba(5,5,12,0.5) 82%)`,
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[34%] bg-[linear-gradient(180deg,rgba(255,255,255,0.07),transparent)]"
      />
    </div>
  );
}

/* ------------------------------------------------------------- scene layout */

interface Panel {
  id: string;
  tier: Tier;
  /** Anchor as a percentage of the stage. The spoke ends here too. */
  left: number;
  top: number;
  width: string;
  /** Resting depth and tilt, before any drift is added. */
  z: number;
  ry: number;
  rx: number;
  /** Tint washed over the card, and the colour of its hover pill. */
  accent: string;
  /** Header status dot — usually the accent, but not always. */
  dot?: string;
  title: string;
  label: string;
  /** Panels hanging off the top of the stage carry their pill above instead. */
  labelAbove?: boolean;
  /** Spoke: which gradient, how fast its dashes run and its pulse breathes. */
  spoke: { gradient: 0 | 1; dash: number; pulse: number };
  /** The bead travelling in along that spoke. */
  bead: { color: string; speed: number };
  body: ReactNode;
}

const PANELS: Panel[] = [
  {
    id: 'ai-employee',
    tier: 'near',
    left: 14,
    top: 33,
    width: 'clamp(126px, 18vw, 190px)',
    z: 80,
    ry: 15,
    rx: -3,
    accent: '#A855F7',
    title: 'AI Employee',
    label: 'AI AGENTS',
    spoke: { gradient: 0, dash: 5, pulse: 7 },
    bead: { color: '#A855F7', speed: 0.16 },
    body: <ChatBody />,
  },
  {
    id: 'automation',
    tier: 'near',
    left: 79,
    top: 82,
    width: 'clamp(126px, 18vw, 186px)',
    z: 62,
    ry: -14,
    rx: 4,
    accent: '#8B5CF6',
    title: 'Automation Workflow',
    label: 'AUTOMATION',
    spoke: { gradient: 1, dash: 5.6, pulse: 7.8 },
    bead: { color: '#22D3EE', speed: 0.13 },
    body: <WorkflowBody />,
  },
  {
    id: 'erp',
    tier: 'mid',
    left: 87,
    top: 25,
    width: 'clamp(120px, 19vw, 200px)',
    z: 26,
    ry: -18,
    rx: -4,
    accent: '#3B82F6',
    title: 'AI ERP System',
    label: 'ERP SYSTEMS',
    spoke: { gradient: 0, dash: 6.2, pulse: 8.7 },
    bead: { color: '#3B82F6', speed: 0.11 },
    body: (
      <ShotBody
        src="/hero/erp-dashboard.png"
        height={86}
        tint="rgba(59,130,246,0.2)"
      />
    ),
  },
  {
    id: 'analytics',
    tier: 'mid',
    left: 27,
    top: 83,
    width: 'clamp(112px, 16vw, 172px)',
    z: 30,
    ry: 13,
    rx: 4,
    accent: '#22D3EE',
    title: 'Analytics',
    label: 'ANALYTICS',
    spoke: { gradient: 1, dash: 6.8, pulse: 9.5 },
    bead: { color: '#22D3EE', speed: 0.145 },
    body: <BarsBody />,
  },
  {
    id: 'grocery',
    tier: 'mid',
    left: 33,
    top: 16,
    width: 'clamp(112px, 15vw, 164px)',
    z: -18,
    ry: 12,
    rx: -6,
    accent: '#6366F1',
    dot: '#22D3EE',
    title: 'Grocery E-commerce',
    label: 'E-COMMERCE',
    labelAbove: true,
    spoke: { gradient: 0, dash: 7.4, pulse: 10.4 },
    bead: { color: '#A855F7', speed: 0.125 },
    body: (
      <ShotBody
        src="/hero/gro-home.png"
        height={78}
        tint="rgba(34,211,238,0.16)"
      />
    ),
  },
  {
    id: 'inventory',
    tier: 'far',
    left: 9,
    top: 50,
    width: '148px',
    z: -95,
    ry: 24,
    rx: 2,
    accent: '#10B981',
    title: 'Inventory System',
    label: 'INVENTORY',
    spoke: { gradient: 1, dash: 8, pulse: 11.2 },
    bead: { color: '#10B981', speed: 0.1 },
    body: <StockBody />,
  },
  {
    id: 'invoicing',
    tier: 'far',
    left: 91,
    top: 52,
    width: '146px',
    z: -78,
    ry: -24,
    rx: 3,
    accent: '#F59E0B',
    title: 'Billing & Invoicing',
    label: 'INVOICING',
    spoke: { gradient: 0, dash: 8.6, pulse: 12 },
    bead: { color: '#F59E0B', speed: 0.095 },
    body: (
      <ShotBody
        src="/hero/erp-invoice.png"
        height={66}
        tint="rgba(245,158,11,0.16)"
      />
    ),
  },
  {
    id: 'api',
    tier: 'far',
    left: 65,
    top: 15,
    width: '152px',
    z: -44,
    ry: -10,
    rx: -7,
    accent: '#22D3EE',
    title: 'API / Developer',
    label: 'API / DEV',
    labelAbove: true,
    spoke: { gradient: 1, dash: 9.2, pulse: 12.9 },
    bead: { color: '#22D3EE', speed: 0.105 },
    body: <CodeBody />,
  },
];

/** Panels arrive from 620ms, 115ms apart, in the order they are declared. */
const CARD_DELAY_BASE = 620;
const CARD_DELAY_STEP = 115;

/**
 * The three dust planes. Each mote's rise is staggered off its index so the
 * plane never pulses as one.
 */
const PLANES = [
  {
    tier: 'far' as Tier,
    z: -190,
    size: 1.4,
    color: '#93C5FD',
    glow: 'rgba(147,197,253,0.26)',
    seconds: 13.5,
    at: [
      [6, 74],
      [19, 88],
      [31, 34],
      [44, 90],
      [57, 26],
      [69, 84],
      [83, 38],
      [94, 80],
    ],
  },
  {
    tier: 'mid' as Tier,
    z: -40,
    size: 1.9,
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.3)',
    seconds: 9.2,
    at: [
      [12, 62],
      [26, 86],
      [40, 30],
      [54, 92],
      [66, 44],
      [79, 88],
      [91, 36],
    ],
  },
  {
    tier: 'near' as Tier,
    z: 130,
    size: 2.6,
    color: '#22D3EE',
    glow: 'rgba(34,211,238,0.34)',
    seconds: 6.4,
    at: [
      [16, 80],
      [34, 90],
      [50, 36],
      [62, 86],
      [76, 42],
      [88, 84],
    ],
  },
];

/* ------------------------------------------------------------------- motion */

/** Float amplitude — x, y, z — and pointer pull, per depth. */
const DRIFT: Record<Tier, { ax: number; ay: number; az: number; pull: number }> =
  {
    near: { ax: 15, ay: 17, az: 30, pull: 34 },
    mid: { ax: 10, ay: 12, az: 20, pull: 18 },
    far: { ax: 6, ay: 8, az: 13, pull: 7 },
  };

/** How far each dust plane slides against the pointer. */
const PLANE_PULL: Record<Tier, number> = { near: 26, mid: 13, far: 5 };

/** Below this the scene is decorative only — no parallax, no travelling beads. */
const DRIFT_MIN_WIDTH = 760;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * Frame-rate independent easing: `rate` is the fraction closed per 60Hz frame,
 * rescaled to however long this frame actually took.
 */
const approach = (rate: number, dt: number) => 1 - Math.pow(1 - rate, dt * 60);

function useEcosystemDrift(hostRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rig = host.querySelector<HTMLElement>('[data-eco-rig]');
    if (!rig) return;

    const wide = window.matchMedia(`(min-width: ${DRIFT_MIN_WIDTH}px)`);
    const canHover = window.matchMedia('(hover: hover)');

    // Every list below is rendered from its config array, so DOM order and
    // config order are the same and the two zip by index.
    const panels = Array.from(
      host.querySelectorAll<HTMLElement>('[data-eco-wrap]'),
    ).map((el, i) => ({
      el,
      config: PANELS[i],
      drift: DRIFT[PANELS[i].tier],
      // Offsetting the far ring keeps it from breathing in step with the rest.
      seed: i * 1.73 + (PANELS[i].tier === 'far' ? 0.9 : 0),
      hover: 0,
      target: 0,
    }));

    const planes = Array.from(
      host.querySelectorAll<HTMLElement>('[data-eco-plane]'),
    ).map((el, i) => ({
      el,
      z: PLANES[i].z,
      pull: PLANE_PULL[PLANES[i].tier],
      speed: 0.045 + i * 0.03,
      seed: i * 2.1,
    }));

    const beads = Array.from(
      host.querySelectorAll<SVGCircleElement>('[data-eco-bead]'),
    ).map((el, i) => ({
      el,
      x: (PANELS[i].left / 100) * VIEW_W,
      y: (PANELS[i].top / 100) * VIEW_H,
      speed: PANELS[i].bead.speed,
      // Spread the beads along their spokes so they never arrive together.
      progress: (i * 0.19) % 1,
    }));

    const face = host.querySelector<HTMLElement>('[data-eco-logo-face]');
    const logo = host.querySelector<HTMLElement>('[data-eco-logo]');

    let rect = host.getBoundingClientRect();
    let rectAt = performance.now();
    let pointerX = 0;
    let pointerY = 0;
    let driftX = 0;
    let driftY = 0;

    // The pointer is tracked across the whole hero, so the scene has already
    // turned by the time the cursor reaches it.
    const hero = document.getElementById('home') ?? host;

    const onPointerMove = (event: PointerEvent) => {
      pointerX = clamp(
        (event.clientX - (rect.left + rect.width / 2)) /
          Math.max(rect.width / 2, 1),
        -1,
        1,
      );
      pointerY = clamp(
        (event.clientY - (rect.top + rect.height / 2)) /
          Math.max(rect.height / 2, 1),
        -1,
        1,
      );
    };

    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    const enter = (panel: (typeof panels)[number]) => () => {
      panel.target = 1;
    };
    const leave = (panel: (typeof panels)[number]) => () => {
      panel.target = 0;
    };
    const handlers = panels.map((panel) => ({
      panel,
      onEnter: enter(panel),
      onLeave: leave(panel),
    }));

    let tracking = false;

    const track = () => {
      if (tracking || !wide.matches || !canHover.matches) return;
      tracking = true;
      hero.addEventListener('pointermove', onPointerMove, { passive: true });
      hero.addEventListener('pointerleave', onPointerLeave, { passive: true });
      for (const { panel, onEnter, onLeave } of handlers) {
        panel.el.addEventListener('pointerenter', onEnter);
        panel.el.addEventListener('pointerleave', onLeave);
      }
    };

    const untrack = () => {
      if (!tracking) return;
      tracking = false;
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', onPointerLeave);
      for (const { panel, onEnter, onLeave } of handlers) {
        panel.el.removeEventListener('pointerenter', onEnter);
        panel.el.removeEventListener('pointerleave', onLeave);
        panel.target = 0;
      }
      onPointerLeave();
    };

    const onQueryChange = () => {
      if (wide.matches && canHover.matches) track();
      else untrack();
    };

    track();
    wide.addEventListener('change', onQueryChange);
    canHover.addEventListener('change', onQueryChange);

    const start = performance.now();
    let previous = start;
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);

      const dt = Math.min(0.05, (now - previous) / 1000);
      previous = now;

      if (now - rectAt > 250) {
        rect = host.getBoundingClientRect();
        rectAt = now;
      }

      // Nothing to look at — skip the writes until the hero is back in view.
      const viewport = window.innerHeight || 800;
      if (rect.bottom < -120 || rect.top > viewport + 120) return;

      const t = (now - start) / 1000;
      const settle = approach(0.055, dt);
      driftX += (pointerX - driftX) * settle;
      driftY += (pointerY - driftY) * settle;

      // How far the hero has travelled up the viewport, 0 → 1. The scene tips
      // and dollies with it, so scrolling away feels like walking past.
      const scrolled = clamp(
        (viewport * 0.55 - rect.top) / Math.max(viewport * 0.9, 1),
        0,
        1,
      );

      rig.style.transform =
        `rotateY(${(driftX * 6).toFixed(2)}deg) ` +
        `rotateX(${(-driftY * 4 - scrolled * 3.2).toFixed(2)}deg) ` +
        `translate3d(${(driftX * -10).toFixed(2)}px, ${(driftY * -7 - scrolled * 26).toFixed(2)}px, ${(scrolled * 40).toFixed(1)}px)`;

      for (const panel of panels) {
        const { ax, ay, az, pull } = panel.drift;
        const { tier, z, ry, rx } = panel.config;
        const s = panel.seed;

        panel.hover += (panel.target - panel.hover) * approach(0.12, dt);

        const x =
          Math.sin(t * 0.21 + s) * ax +
          Math.sin(t * 0.13 + s * 2.3) * ax * 0.45 +
          driftX * -pull;
        const y =
          Math.cos(t * 0.17 + s * 1.4) * ay +
          Math.sin(t * 0.088 + s) * ay * 0.55 +
          driftY * -pull * 0.72 +
          (tier === 'near'
            ? -scrolled * 26
            : tier === 'mid'
              ? scrolled * 8
              : scrolled * 30);
        const depth =
          z +
          Math.sin(t * 0.115 + s * 0.7) * az +
          panel.hover * 78 +
          (tier === 'near'
            ? scrolled * 80
            : tier === 'far'
              ? -scrolled * 70
              : scrolled * 10);

        panel.el.style.transform =
          `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${depth.toFixed(2)}px) ` +
          `rotateY(${(ry + Math.sin(t * 0.15 + s) * 2.4 + driftX * 2.2).toFixed(2)}deg) ` +
          `rotateX(${(rx + Math.cos(t * 0.125 + s * 1.9) * 1.7 - driftY * 1.6).toFixed(2)}deg)`;
      }

      for (const plane of planes) {
        plane.el.style.transform =
          `translate3d(${(Math.sin(t * plane.speed + plane.seed) * 22 + driftX * -plane.pull).toFixed(2)}px, ` +
          `${(Math.cos(t * plane.speed * 0.8 + plane.seed) * 14 + driftY * -plane.pull * 0.6).toFixed(2)}px, ${plane.z}px)`;
      }

      if (wide.matches) {
        for (const bead of beads) {
          bead.progress = (bead.progress + bead.speed * dt) % 1;
          // 0 is the panel end of the spoke, 1 the core — the bead runs inward.
          const remaining = 1 - bead.progress;
          bead.el.style.transform = `translate(${((bead.x - VIEW_W / 2) * remaining).toFixed(1)}px, ${((bead.y - VIEW_H / 2) * remaining).toFixed(1)}px)`;
          bead.el.style.opacity = (
            Math.sin(Math.PI * bead.progress) * 0.9
          ).toFixed(2);
        }
      }

      if (face) {
        face.style.transform =
          `rotateY(${(Math.sin(t * 0.24) * 20 + driftX * 8).toFixed(2)}deg) ` +
          `rotateX(${(Math.cos(t * 0.19) * 6 - driftY * 5).toFixed(2)}deg)`;
      }

      if (logo) {
        logo.style.transform =
          `translate(-50%, -50%) translate3d(${(driftX * -16).toFixed(2)}px, ` +
          `${(Math.sin(t * 0.28) * 7 + driftY * -11 - scrolled * 14).toFixed(2)}px, ` +
          `${(150 + Math.sin(t * 0.2) * 18 + scrolled * 60).toFixed(1)}px)`;
      }
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      untrack();
      wide.removeEventListener('change', onQueryChange);
      canHover.removeEventListener('change', onQueryChange);
    };
  }, [hostRef]);
}

/* ---------------------------------------------------------------- the scene */

export function HeroEcosystem() {
  const hostRef = useRef<HTMLDivElement>(null);
  useEcosystemDrift(hostRef);

  return (
    <div
      ref={hostRef}
      aria-hidden
      data-glow
      className="relative h-[clamp(300px,42vw,440px)] w-full [perspective-origin:50%_46%] [perspective:1500px]"
    >
      <div
        data-eco-rig
        className="absolute inset-0 will-change-transform [transform-style:preserve-3d]"
      >
        {/* Ambient wash, far behind everything, holding the scene together. */}
        <div
          className="animate-eco-glow-in pointer-events-none absolute [inset:-6%_-4%] bg-[radial-gradient(ellipse_55%_60%_at_50%_50%,rgba(124,58,237,0.2),rgba(37,99,235,0.08)_52%,rgba(5,5,12,0)_78%)] [transform:translateZ(-260px)]"
        />

        {/* Spokes, stretched with the stage so their ends stay on the panels. */}
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          aria-hidden
          className="animate-eco-lines-in pointer-events-none absolute inset-0 size-full [transform:translateZ(-120px)]"
        >
          <defs>
            <linearGradient id="nexEcoLine0" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="nexEcoLine1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.06" />
            </linearGradient>
          </defs>

          {PANELS.map((panel) => (
            <line
              key={panel.id}
              data-eco-linet={panel.tier}
              x1={VIEW_W / 2}
              y1={VIEW_H / 2}
              x2={(panel.left / 100) * VIEW_W}
              y2={(panel.top / 100) * VIEW_H}
              stroke={`url(#nexEcoLine${panel.spoke.gradient})`}
              strokeWidth="1"
              strokeDasharray="4 12"
              style={{
                animation: `nexEcoDash ${panel.spoke.dash}s linear infinite, nexEcoPulse ${panel.spoke.pulse}s ease-in-out infinite`,
              }}
            />
          ))}

          {PANELS.map((panel) => (
            <circle
              key={panel.id}
              data-eco-bead
              data-eco-linet={panel.tier}
              cx={VIEW_W / 2}
              cy={VIEW_H / 2}
              r="2.2"
              fill={panel.bead.color}
              opacity="0"
              className="will-change-[transform,opacity] [transform-box:view-box]"
            />
          ))}
        </svg>

        {/* Dust, three planes of it, drifting at their own depths. */}
        <div
          data-eco-motes
          aria-hidden
          className="animate-eco-motes-in pointer-events-none absolute inset-0 [transform-style:preserve-3d]"
        >
          {PLANES.map((plane) => (
            <div
              key={plane.tier}
              data-eco-plane={plane.tier}
              className="absolute inset-0 will-change-transform [transform-style:preserve-3d]"
              style={{ transform: `translateZ(${plane.z}px)` }}
            >
              {plane.at.map(([left, top], i) => (
                <span
                  key={i}
                  data-eco-mote
                  className="absolute rounded-full will-change-[transform,opacity]"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    width: plane.size,
                    height: plane.size,
                    background: plane.color,
                    color: plane.glow,
                    boxShadow: `0 0 ${plane.size * 3}px ${plane.size * 0.8}px currentColor`,
                    animation: `nexMote ${(plane.seconds + i * 0.63).toFixed(2)}s linear ${((i * 1.37) % 5).toFixed(2)}s infinite`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* The core mark, standing nearest the viewer. */}
        <div
          data-eco-logo
          className="animate-eco-logo-in absolute top-1/2 left-1/2 [transform-style:preserve-3d] [transform:translate(-50%,-50%)_translateZ(150px)]"
        >
          <div className="animate-core relative flex flex-col items-center gap-[9px]">
            {/* The badge turns in 3D, so it owns the perspective its face reads against. */}
            <span className="relative flex size-[clamp(66px,8.4vw,88px)] items-center justify-center [perspective-origin:50%_50%] [perspective:620px]">
              {/* Halo — centred with `translate` so the pulse keyframe owns `transform`. */}
              <span
                aria-hidden
                className="animate-logo-halo pointer-events-none absolute top-1/2 left-1/2 size-[150%] -translate-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.45)_0%,rgba(59,130,246,0.16)_45%,rgba(34,211,238,0)_72%)] blur-[10px]"
              />
              <span
                data-logo-3d
                className="animate-logo-breathe relative size-full [transform-style:preserve-3d]"
              >
                <span
                  data-eco-logo-face
                  className="relative flex size-full items-center justify-center overflow-hidden rounded-3xl border border-nex-violet/50 bg-[linear-gradient(150deg,rgba(124,58,237,0.34),rgba(37,99,235,0.2))] shadow-[0_18px_44px_-22px_rgba(124,58,237,0.85)] will-change-transform [backface-visibility:visible] [transform-style:preserve-3d]"
                >
                  {/* Specular sweep, clipped to the face. */}
                  <span
                    aria-hidden
                    className="animate-logo-shine pointer-events-none absolute top-[-20%] left-0 h-[140%] w-[45%] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.42)_50%,rgba(255,255,255,0)_100%)]"
                  />
                  <svg
                    viewBox="0 0 144 132"
                    className="relative h-[27px] w-[30px]"
                    aria-hidden
                  >
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
              </span>
            </span>
            <span className="rounded-[7px] bg-[rgba(5,5,12,0.88)] px-2.5 py-[3px] text-[clamp(10px,1.1vw,12px)] font-bold tracking-[0.18em] text-white">
              NEXOFFICE
            </span>
          </div>
        </div>

        {PANELS.map((panel, i) => (
          <div
            key={panel.id}
            data-eco-wrap
            data-eco-panel={panel.tier}
            className="absolute will-change-transform [transform-style:preserve-3d]"
            style={{
              left: `${panel.left}%`,
              top: `${panel.top}%`,
              width: panel.width,
              transform: `translate(-50%, -50%) translate3d(0, 0, ${panel.z}px) rotateY(${panel.ry}deg) rotateX(${panel.rx}deg)`,
            }}
          >
            <div
              className="animate-eco-card-in relative [transform-style:preserve-3d]"
              style={
                {
                  '--eco-x': panel.left < 50 ? '-70px' : '70px',
                  '--eco-y': panel.top < 50 ? '-46px' : '46px',
                  animationDelay: `${CARD_DELAY_BASE + i * CARD_DELAY_STEP}ms`,
                } as CSSProperties
              }
            >
              <div
                data-eco-card
                className="relative overflow-hidden rounded-[14px] border border-white/10 bg-[linear-gradient(155deg,rgba(18,18,34,0.86),rgba(9,9,20,0.72))] px-3 pt-[11px] pb-3 shadow-[0_26px_60px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.07)]"
              >
                {/* Accent wash, and the light catching the card's top edge. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[14px]"
                  style={{
                    background: `linear-gradient(150deg, ${panel.accent}1f, transparent 58%)`,
                  }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-[26%] bg-[linear-gradient(180deg,rgba(255,255,255,0.1),transparent)]"
                />

                <div className="relative">
                  <div className="mb-[9px] flex items-center gap-1.5">
                    <span
                      className="size-[5px] rounded-full"
                      style={{
                        background: panel.dot ?? panel.accent,
                        boxShadow: `0 0 8px ${panel.dot ?? panel.accent}`,
                      }}
                    />
                    <span className="text-[9.5px] font-bold tracking-[0.08em] whitespace-nowrap text-[#dfe1ef]">
                      {panel.title}
                    </span>
                    <span className="flex-1" />
                    <span className="flex gap-[3px]">
                      <span className="size-[3px] rounded-full bg-white/[0.28]" />
                      <span className="size-[3px] rounded-full bg-white/[0.28]" />
                    </span>
                  </div>
                  {panel.body}
                </div>
              </div>
            </div>

            <div
              data-eco-label
              className={`pointer-events-none absolute left-1/2 rounded-full border bg-[rgba(5,5,12,0.9)] px-2.5 py-1 text-[9.5px] font-extrabold tracking-[0.16em] whitespace-nowrap text-white ${
                panel.labelAbove
                  ? 'bottom-[calc(100%+9px)]'
                  : 'top-[calc(100%+9px)]'
              }`}
              style={{
                borderColor: `${panel.accent}66`,
                transform: 'translateX(-50%) translateZ(30px)',
              }}
            >
              {panel.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
