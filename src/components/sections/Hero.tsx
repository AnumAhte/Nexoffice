import { HeroNetwork } from '@/components/hero/HeroNetwork';
import { ButtonLink } from '@/components/ui/Button';
import { CountUp } from '@/components/ui/CountUp';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { heroStats } from '@/data/site';

export function Hero() {
  return (
    <Section
      id="home"
      padding="hero"
      labelledBy="hero-title"
      className="flex flex-col items-center gap-[26px] text-center"
    >
      <Reveal index={0}>
        <p className="inline-flex items-center gap-2.5 rounded-full border border-nex-purple/40 bg-nex-purple/10 px-4 py-2 text-[13px] font-semibold text-fg-badge">
          <span
            className="animate-pulse-dot size-[7px] rounded-full bg-nex-cyan shadow-[0_0_10px_#22D3EE]"
            aria-hidden
          />
          Software house · AI &amp; enterprise systems · Karachi
        </p>
      </Reveal>

      <Reveal index={1}>
        <h1
          id="hero-title"
          className="max-w-[940px] text-[clamp(38px,6vw,76px)] leading-[1.04] font-extrabold tracking-[-0.04em] text-balance"
        >
          Building <span className="text-brand-gradient">Intelligent Software</span>{' '}
          for Modern Businesses
        </h1>
      </Reveal>

      <Reveal index={2}>
        <p className="max-w-[660px] text-[clamp(16px,1.5vw,19px)] leading-[1.65] text-pretty text-fg-lead">
          Nexoffice designs and ships custom web platforms, AI products, and ERP
          systems for companies that need software to carry real operational
          weight. From first architecture call to production deployment.
        </p>
      </Reveal>

      <Reveal index={3}>
        <div className="flex flex-wrap justify-center gap-3.5">
          <ButtonLink href="#portfolio">View Projects</ButtonLink>
          <ButtonLink href="#contact" variant="ghost">
            Contact Us
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal index={4} className="mt-2 w-full max-w-[780px]">
        <HeroNetwork />
      </Reveal>

      <Reveal index={5} className="mt-[22px] w-full">
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
          {heroStats.map((stat) => (
            <li
              key={stat.label}
              className="rounded-[18px] border border-white/[0.08] bg-white/[0.04] p-[22px]"
            >
              <CountUp
                count={stat.count}
                suffix={stat.suffix}
                className="text-[30px] font-extrabold tracking-[-0.03em] text-white"
              />
              <p className="mt-1 text-[13px] text-fg-meta">{stat.label}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
