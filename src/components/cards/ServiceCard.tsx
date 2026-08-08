import { Reveal } from '@/components/ui/Reveal';
import { iconStrokeAccent, iconTileAccent, cardAccentHover } from '@/lib/accents';
import { cn } from '@/lib/utils';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  /** Position in the grid, for the staggered reveal. */
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Reveal
      as="li"
      index={index}
      className={cn(
        'relative rounded-[20px] border border-white/[0.08] bg-white/[0.035] p-7 transition duration-300 ease-native hover:-translate-y-2',
        cardAccentHover[service.accent],
      )}
    >
      <span
        className={cn(
          'flex size-11 items-center justify-center rounded-xl border',
          iconTileAccent[service.accent],
        )}
      >
        <Icon className={cn('size-[21px]', iconStrokeAccent[service.accent])} />
      </span>
      <h3 className="mt-[18px] text-lg font-bold tracking-[-0.015em]">
        {service.title}
      </h3>
      <p className="mt-[9px] text-[14.5px] leading-[1.65] text-fg-muted">
        {service.body}
      </p>
    </Reveal>
  );
}
