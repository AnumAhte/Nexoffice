import { ContactDetails, MapSlot } from '@/components/contact/ContactDetails';
import { ContactForm } from '@/components/contact/ContactForm';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Contact() {
  return (
    <Section id="contact" padding="compactDeep" labelledBy="contact-title">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[22px]">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            accent="cyan"
            titleId="contact-title"
            title="Tell us what you are building"
            lead="Send the brief and we will reply within one business day with a scope, a timeline, and an honest view of what we would do first."
          />
          <ContactDetails />
          <MapSlot />
        </Reveal>

        <ContactForm />
      </div>
    </Section>
  );
}
