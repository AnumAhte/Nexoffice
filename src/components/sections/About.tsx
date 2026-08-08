import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pillars, processSteps } from '@/data/about';
import {
  pillarAccent,
  pillarIconAccent,
  pillarStrokeAccent,
  stepAccent,
} from '@/lib/accents';
import { cn } from '@/lib/utils';

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <Reveal>
        <SectionHeading
          eyebrow="About Nexoffice"
          accent="violet"
          titleId="about-title"
          title="An engineering team, not a vendor queue"
          leadSpacing="wide"
          leadClassName="text-pretty"
          lead="We are a software house built around a small senior team: product engineers, AI specialists, and designers who work directly with founders and operations leads. Every engagement starts with the workflow we are replacing, not the stack we prefer."
          className="max-w-[720px]"
        />
      </Reveal>

      <ul className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px]">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;

          return (
            <Reveal
              key={pillar.title}
              as="li"
              index={index}
              className={cn(
                'rounded-[22px] border p-[30px] transition duration-300 ease-native hover:-translate-y-1.5',
                pillarAccent[pillar.accent],
              )}
            >
              <span
                className={cn(
                  'flex size-[46px] items-center justify-center rounded-[13px] border',
                  pillarIconAccent[pillar.accent],
                )}
              >
                <Icon
                  className={cn('size-[22px]', pillarStrokeAccent[pillar.accent])}
                />
              </span>
              <h3 className="mt-[18px] text-xl font-bold tracking-[-0.02em]">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[1.7] text-fg-body">
                {pillar.body}
              </p>
            </Reveal>
          );
        })}
      </ul>

      <ol className="mt-[54px] grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
        {processSteps.map((step, index) => (
          <Reveal
            key={step.label}
            as="li"
            index={index}
            className="rounded-[20px] border border-white/[0.08] bg-white/[0.04] p-[26px]"
          >
            <p
              className={cn(
                'text-xs font-bold tracking-[0.16em]',
                stepAccent[step.accent],
              )}
            >
              {step.label}
            </p>
            <p className="mt-3 text-[15px] leading-[1.65] text-fg-body">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
