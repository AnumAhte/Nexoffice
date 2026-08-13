import Image from 'next/image';
import type { Project } from '@/types';

/**
 * Media panel. The design marks this area as an image slot over a fixed
 * gradient; the gradient is exactly what shows until a screenshot is supplied
 * via `project.image`.
 */
function ProjectMedia({ project }: { project: Project }) {
  return (
    <div className="relative h-[196px] bg-[linear-gradient(150deg,rgba(124,58,237,0.3),rgba(34,211,238,0.14))]">
      {project.image ? (
        <Image
          src={project.image}
          alt={project.imageAlt ?? ''}
          fill
          sizes="(max-width: 640px) 90vw, 400px"
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
 * snap target inside the carousel track.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const titleId = `project-${project.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className="flex-[0_0_clamp(286px,30vw,400px)] snap-center overflow-hidden rounded-3xl border border-white/[0.09] bg-white/[0.04] transition duration-[350ms] ease-native hover:scale-[1.03] hover:border-nex-violet/55 hover:shadow-[0_30px_70px_rgba(124,58,237,0.4)]"
    >
      <ProjectMedia project={project} />

      <div className="p-[22px]">
        <h3 id={titleId} className="text-[19px] font-bold tracking-[-0.02em]">
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
