import { Reveal } from '@/components/ui/Reveal';
import { avatarAccent, quoteAccentHover } from '@/lib/accents';
import { cn, initials } from '@/lib/utils';
import type { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export function TestimonialCard({
  testimonial,
  index = 0,
}: TestimonialCardProps) {
  return (
    <Reveal
      as="figure"
      index={index}
      className={cn(
        'm-0 rounded-[22px] border border-white/[0.09] bg-white/[0.04] p-7 transition duration-300 ease-native hover:-translate-y-1.5',
        quoteAccentHover[testimonial.accent],
      )}
    >
      <blockquote className="m-0 text-base leading-[1.7] text-fg-quote">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-[13px]">
        <span
          className={cn(
            'flex size-[42px] flex-none items-center justify-center rounded-full text-sm font-extrabold text-white',
            avatarAccent[testimonial.accent],
          )}
          aria-hidden
        >
          {initials(testimonial.name)}
        </span>
        <span>
          <span className="block text-[14.5px] font-bold">
            {testimonial.name}
          </span>
          <span className="block text-[13px] text-fg-meta">
            {testimonial.role}
          </span>
        </span>
      </figcaption>
    </Reveal>
  );
}
