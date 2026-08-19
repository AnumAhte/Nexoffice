/**
 * Hairline rule between sections, with a highlight that sweeps along it. Sits
 * on the same 1240px rail as the content it separates.
 */
export function SectionDivider() {
  return (
    <div aria-hidden className="relative z-1 mx-auto max-w-[1240px] px-6">
      <div className="relative h-px overflow-hidden bg-[linear-gradient(90deg,rgba(168,85,247,0)_0%,rgba(168,85,247,0.2)_32%,rgba(34,211,238,0.2)_68%,rgba(34,211,238,0)_100%)]">
        <div className="animate-sheen absolute inset-y-0 left-0 w-[32%] bg-[linear-gradient(90deg,transparent,rgba(216,201,255,0.8),transparent)]" />
      </div>
    </div>
  );
}
