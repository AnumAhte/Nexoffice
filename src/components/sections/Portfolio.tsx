import { PortfolioCarousel } from '@/components/portfolio/PortfolioCarousel';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { carouselConfig, projects } from '@/data/projects';
import { numberWord } from '@/lib/utils';

export function Portfolio() {
  return (
    <Section id="portfolio" bleed labelledBy="portfolio-title">
      <PortfolioCarousel
        projects={projects}
        autoSlide={carouselConfig.autoSlide}
        autoSlideMs={carouselConfig.autoSlideMs}
        header={
          <Reveal className="flex-[1_1_380px]">
            <SectionHeading
              eyebrow="Portfolio"
              accent="cyan"
              titleId="portfolio-title"
              title={`${numberWord(projects.length)} products, shipped and running`}
              lead="Commerce platforms, AI systems, and internal tools. Drag the row, use the arrows, or let it run."
              leadClassName="max-w-[620px]"
            />
          </Reveal>
        }
      />
    </Section>
  );
}
