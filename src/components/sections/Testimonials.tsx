import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  return (
    <Section id="testimonials" padding="compact" labelledBy="testimonials-title">
      <Reveal>
        <SectionHeading
          eyebrow="Clients"
          accent="sky"
          titleId="testimonials-title"
          title="What teams say after launch"
          className="max-w-[640px]"
        />
      </Reveal>

      <div className="mt-[34px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px]">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.name}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}
