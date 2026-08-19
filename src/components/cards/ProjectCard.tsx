import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

/**
 * Media panel. The design marks this area as an image slot over a fixed
 * gradient; the gradient is exactly what shows until a screenshot is supplied
 * via `project.image`. Hovering the panel eases it in a little.
 */
function ProjectMedia({
  project,
  featured,
}: {
  project: Project;
  featured: boolean;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[linear-gradient(150deg,rgba(124,58,237,0.3),rgba(34,211,238,0.14))] transition-transform duration-[320ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:scale-[1.035]',
        featured ? 'h-[266px]' : 'h-[196px]',
      )}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={project.imageAlt ?? ''}
          fill
          sizes={
            featured
              ? '(max-width: 640px) 90vw, 566px'
              : '(max-width: 640px) 90vw, 400px'
          }
          className="object-cover"
        />
      ) : null}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

/**
 * A single portfolio card. Sized as a fixed-basis flex item so it works as a
 * snap target inside the carousel track; the featured card leads the rail on a
 * wider basis and a taller media panel.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const titleId = `project-${project.id}-title`;
  const featured = project.featured === true;

  return (
    <article
      aria-labelledby={titleId}
      data-glow
      className={cn(
        'relative snap-center overflow-hidden rounded-3xl border border-white/[0.09] bg-white/[0.04] transition duration-[350ms] ease-native hover:scale-[1.03] hover:border-nex-violet/55 hover:shadow-[0_30px_70px_rgba(124,58,237,0.4)]',
        featured
          ? 'flex-[0_0_clamp(300px,47vw,566px)]'
          : 'flex-[0_0_clamp(286px,30vw,400px)]',
      )}
    >
      <ProjectMedia project={project} featured={featured} />

      <div className="p-[22px]">
        {featured ? (
          <p className="mb-[11px] flex items-center gap-[9px] text-[11.5px] font-bold tracking-[0.18em] text-fg-badge uppercase">
            <span
              className="size-1.5 rounded-full bg-nex-violet shadow-[0_0_10px_3px_rgba(168,85,247,0.6)]"
              aria-hidden
            />
            Featured project
          </p>
        ) : null}

        <h3
          id={titleId}
          className={cn(
            'font-bold',
            featured
              ? 'text-[22px] tracking-[-0.022em]'
              : 'text-[19px] tracking-[-0.02em]',
          )}
        >
          {project.title}
        </h3>
        <p className="mt-[9px] text-[14.5px] leading-[1.6] text-fg-muted">
          {project.description}
        </p>

        <ul className="mt-3.5 flex flex-wrap gap-[7px]">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-nex-purple/30 bg-nex-purple/[0.16] px-[11px] py-[5px] text-xs font-semibold text-fg-badge"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
