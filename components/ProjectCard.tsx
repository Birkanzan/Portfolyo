import type { ReactNode } from 'react';
import type { Locale } from '@/data/i18n';
import type { Project } from '@/data/projects';
import { withBase } from '@/lib/paths';

type Labels = { tech: string; repo: string; demo: string };

export function ProjectCard({
  project,
  locale,
  labels,
  icons,
  priority = false,
}: {
  project: Project;
  locale: Locale;
  labels: Labels;
  icons: { repo: ReactNode; demo: ReactNode };
  priority?: boolean;
}) {
  const { slug, title, links } = project;
  const titleId = `project-${slug}`;
  const linkClass =
    'inline-flex min-h-11 items-center gap-2 font-medium text-accent-text underline decoration-accent-text/40 underline-offset-4 transition-colors hover:decoration-current';

  return (
    <li className="reveal">
      <article
        aria-labelledby={titleId}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-page transition-colors hover:border-border-strong"
      >
        <div className="aspect-[16/10] overflow-hidden border-b border-border-separator bg-bg-sunken">
          <img
            src={withBase(`/projects/${slug}-640.webp`)}
            srcSet={[640, 960, 1280].map((w) => `${withBase(`/projects/${slug}-${w}.webp`)} ${w}w`).join(', ')}
            sizes="(min-width: 1152px) 352px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
            width={1280}
            height={800}
            alt={project.imageAlt[locale]}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="size-full object-cover transition-transform duration-700 ease-out-quart motion-safe:group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-caption font-medium text-accent-text">{project.category[locale]}</p>
          <h3 id={titleId} className="mt-2 text-heading font-semibold tracking-[-0.01em]">
            {title}
          </h3>
          <p className="mt-3 text-body-sm text-text-secondary">{project.description[locale]}</p>

          <ul role="list" aria-label={labels.tech} className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech} className="whitespace-nowrap rounded-md bg-bg-sunken px-2 py-0.5 font-mono text-caption text-text-secondary">
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-x-6 pt-5">
            {links.demo && (
              <a href={links.demo} className={linkClass}>
                {icons.demo}
                <span>
                  {labels.demo}
                  <span className="sr-only">: {title}</span>
                </span>
              </a>
            )}
            {links.repo && (
              <a href={links.repo} className={linkClass}>
                {icons.repo}
                <span>
                  {labels.repo}
                  <span className="sr-only">: {title}</span>
                </span>
              </a>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}
