/**
 * Fixed ambient layer behind every section: three drifting colour orbs and a
 * faint grid that fades out below the fold. Purely decorative and never
 * interactive, so it is hidden from assistive tech and ignores pointer events.
 */
export function BackgroundFX() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="animate-drift absolute -top-[18%] -left-[10%] size-[720px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.34)_0%,rgba(124,58,237,0)_70%)] will-change-transform" />
      <div className="animate-drift-2 absolute top-[12%] -right-[14%] size-[640px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.28)_0%,rgba(59,130,246,0)_70%)] will-change-transform" />
      <div className="absolute -bottom-[20%] left-[28%] size-[680px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.18)_0%,rgba(34,211,238,0)_72%)]" />
      <div
        className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:72px_72px] [-webkit-mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_20%,transparent_75%)] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_20%,transparent_75%)]"
      />
    </div>
  );
}
