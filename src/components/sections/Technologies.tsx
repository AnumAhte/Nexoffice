import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { technologies } from '@/data/technologies';
import { badgeAccent, chipAccentHover } from '@/lib/accents';
import { cn } from '@/lib/utils';

export function Technologies() {
  return (
    <Section id="technologies" padding="compact" labelledBy="technologies-title">
      <Reveal>
        <SectionHeading
          eyebrow="Technologies"
          accent="violet"
          titleId="technologies-title"
          title="The stack we standardise on"
          className="max-w-[640px]"
        />
      </Reveal>

      <ul className="mt-[34px] grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5">
        {technologies.map((tech, index) => (
          <Reveal
            key={tech.name}
            as="li"
            index={index}
            className={cn(
              'flex items-center gap-[13px] rounded-[18px] border border-white/[0.08] bg-white/[0.035] p-5 transition duration-300 ease-native hover:-translate-y-[5px]',
              chipAccentHover[tech.accent],
            )}
          >
            <span
              className={cn(
                'flex size-9 flex-none items-center justify-center rounded-[10px] font-extrabold text-white',
                tech.badge.length > 1 ? 'text-[13px]' : 'text-sm',
                badgeAccent[tech.accent],
              )}
              aria-hidden
            >
              {tech.badge}
            </span>
            <span className="text-[14.5px] font-semibold">{tech.name}</span>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
