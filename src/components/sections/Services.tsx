import { ServiceCard } from '@/components/cards/ServiceCard';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services } from '@/data/services';

export function Services() {
  return (
    <Section id="services" labelledBy="services-title">
      <Reveal>
        <SectionHeading
          eyebrow="Services"
          accent="sky"
          titleId="services-title"
          title="What we build"
          lead="Eight practices, one delivery team. Most engagements combine two or three."
          className="max-w-[680px]"
        />
      </Reveal>

      <ul className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(272px,1fr))] gap-4">
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </ul>
    </Section>
  );
}
