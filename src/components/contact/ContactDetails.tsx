import { contactChannels } from '@/data/site';

const ROW =
  'flex items-center gap-3.5 rounded-2xl border border-white/[0.09] bg-white/[0.04] px-[18px] py-4';
const LABEL = 'text-[15px] font-semibold';

/** Email / phone / location rows. Only the first two are actionable. */
export function ContactDetails() {
  return (
    <ul className="mt-7 flex flex-col gap-3">
      {contactChannels.map((channel) => {
        const Icon = channel.icon;
        const content = (
          <>
            <Icon className="size-[19px] flex-none stroke-nex-cyan-soft" />
            <span className={LABEL}>{channel.label}</span>
          </>
        );

        return (
          <li key={channel.label}>
            {channel.href ? (
              <a
                href={channel.href}
                className={`${ROW} text-fg transition-colors duration-[250ms] ease-native hover:border-nex-cyan/50 hover:text-white`}
              >
                {content}
              </a>
            ) : (
              <div className={ROW}>{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Placeholder for the Karachi map embed. Swap the inner markup for an
 * `<iframe>` when the Google Maps key is available; the frame, radius and
 * border stay as they are.
 */
export function MapSlot() {
  return (
    <div className="relative mt-4 h-[210px] overflow-hidden rounded-[18px] border border-white/[0.09] bg-[linear-gradient(150deg,rgba(124,58,237,0.16),rgba(34,211,238,0.08))]">
      <div
        className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:34px_34px]"
        aria-hidden
      />
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
        <span
          className="animate-pulse-pin size-4 rounded-full bg-nex-cyan shadow-[0_0_0_8px_rgba(34,211,238,0.18),0_0_24px_rgba(34,211,238,0.8)]"
          aria-hidden
        />
        <span className="text-[13px] font-bold tracking-[0.04em] text-fg-map">
          Karachi · Google Map embed slot
        </span>
      </div>
    </div>
  );
}
