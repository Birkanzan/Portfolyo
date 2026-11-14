import { dictionaries, localePath, type Locale } from '@/data/i18n';
import { projects } from '@/data/projects';
import { site, skills } from '@/data/site';
import { withBase } from '@/lib/paths';
import { CopyEmail } from './CopyEmail';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  CodeIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PlayIcon,
} from './Icons';
import { PixelBoard } from './PixelBoard';
import { ProjectCard } from './ProjectCard';
import { ThemeToggle } from './ThemeToggle';

const container = 'mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8';

export function HomePage({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const other: Locale = locale === 'tr' ? 'en' : 'tr';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: t.hero.role,
    url: `${site.url}${withBase(localePath[locale])}`,
    email: `mailto:${site.email}`,
    sameAs: [site.github, site.linkedin],
    knowsAbout: ['Unity', 'C#', 'Game development', '.NET', 'Next.js'],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <a
        href="#main"
        className="sr-only z-50 rounded-full border border-transparent bg-accent-solid px-5 py-3 font-medium text-text-on-accent focus:not-sr-only focus:fixed focus:start-4 focus:top-3"
      >
        {t.skip}
      </a>

      <header className="sticky top-0 z-40 border-b border-border-separator bg-bg-page">
        <div className={`${container} flex h-16 items-center justify-between gap-4`}>
          <a href={withBase(localePath[locale])} aria-label={t.nav.home} className="-ms-1 inline-flex min-h-11 items-center gap-2.5 rounded-lg ps-1 pe-2 font-semibold tracking-[-0.01em]">
            <img src={withBase('/icon.svg')} alt="" width={28} height={28} className="rounded-md" />
            <span>{site.name}</span>
          </a>

          <div className="flex items-center gap-1 sm:gap-4">
            <nav aria-label={t.nav.label} className="hidden sm:block">
              <ul className="flex items-center gap-1 text-body-sm">
                {(['projects', 'about', 'contact'] as const).map((id) => (
                  <li key={id}>
                    <a href={`#${id}`} className="inline-flex min-h-11 items-center rounded-full px-3 text-text-secondary transition-colors hover:bg-bg-surface-hover hover:text-text-primary">
                      {t.nav[id]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-1">
              <a
                href={withBase(localePath[other])}
                hrefLang={other}
                lang={other}
                aria-label={`${t.lang.short} – ${t.lang.switchLabel}`}
                className="inline-flex size-11 items-center justify-center rounded-full font-mono text-caption font-medium text-text-secondary transition-colors hover:bg-bg-surface-hover hover:text-text-primary"
              >
                {t.lang.short}
              </a>
              <ThemeToggle label={t.theme.dark} />
            </div>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="outline-none">
        {/* Hero */}
        <section id="top" aria-labelledby="hero-title">
          <div className={`${container} grid items-center gap-12 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 lg:pt-32 lg:pb-32`}>
            <div className="max-w-[44rem]">
              <p className="font-mono text-caption font-medium uppercase tracking-[0.08em] text-accent-text">{t.hero.role}</p>
              <h1 id="hero-title" className="mt-5 text-display font-semibold tracking-[-0.035em]">
                {site.name}
              </h1>
              <p className="mt-6 max-w-[36rem] text-lead text-text-secondary">{t.hero.lead}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-transparent bg-accent-solid px-6 font-medium text-text-on-accent transition-[color,background-color,border-color,scale] duration-150 ease-out motion-safe:active:scale-[0.96] hover:bg-accent-solid-hover"
                >
                  {t.hero.primary}
                  <ArrowDownIcon />
                </a>
                <a
                  href="#contact"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border-strong px-6 font-medium transition-[color,background-color,border-color,scale] duration-150 ease-out motion-safe:active:scale-[0.96] hover:bg-bg-surface-hover"
                >
                  {t.hero.secondary}
                </a>
              </div>
            </div>
            <PixelBoard className="hidden lg:block" />
          </div>
        </section>

        {/* Projects */}
        <section id="projects" aria-labelledby="projects-title" className="border-t border-border-separator bg-bg-surface">
          <div className={`${container} py-20 sm:py-28`}>
            <div className="max-w-prose">
              <h2 id="projects-title" className="text-title font-semibold tracking-[-0.02em]">{t.projects.title}</h2>
              <p className="mt-4 text-lead text-text-secondary">{t.projects.intro}</p>
            </div>
            <ul role="list" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  locale={locale}
                  labels={t.projects}
                  icons={{ repo: <CodeIcon />, demo: <PlayIcon /> }}
                  priority={i === 0}
                />
              ))}
            </ul>
          </div>
        </section>

        {/* About */}
        <section id="about" aria-labelledby="about-title" className="border-t border-border-separator">
          <div className={`${container} grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20`}>
            <div className="reveal">
              <h2 id="about-title" className="text-title font-semibold tracking-[-0.02em]">{t.about.title}</h2>
              <div className="mt-6 max-w-prose space-y-5">
                {t.about.bio.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <a
                href={site.katas}
                className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-accent-text underline decoration-accent-text/40 underline-offset-4 transition-colors hover:decoration-current"
              >
                {t.about.katas}
                <ArrowUpRightIcon />
              </a>
            </div>

            <div className="reveal">
              <h3 className="text-heading font-semibold">{t.about.skillsTitle}</h3>
              <dl className="mt-6 divide-y divide-border-separator border-y border-border-separator">
                {skills.map((s) => (
                  <div key={s.group.en} className="grid gap-3 py-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                    <dt className="text-body-sm font-medium">{s.group[locale]}</dt>
                    <dd>
                      <ul role="list" className="flex flex-wrap gap-2">
                        {s.items.map((item) => (
                          <li key={item} className="whitespace-nowrap rounded-md bg-bg-sunken px-2.5 py-1 font-mono text-caption text-text-secondary">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-title" className="border-t border-border-separator">
          <div className={`${container} py-20 sm:py-28`}>
            <div className="reveal rounded-3xl border border-border bg-bg-surface px-5 py-10 sm:p-12 lg:p-16">
              <h2 id="contact-title" className="text-title font-semibold tracking-[-0.02em]">{t.contact.title}</h2>
              <p className="mt-4 max-w-prose text-lead text-text-secondary">{t.contact.lead}</p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-12 max-w-full items-center justify-center gap-2.5 rounded-full border border-transparent bg-accent-solid px-5 py-2 text-center sm:px-6 font-medium text-text-on-accent transition-[color,background-color,border-color,scale] duration-150 ease-out motion-safe:active:scale-[0.96] hover:bg-accent-solid-hover"
                >
                  <MailIcon />
                  <span>
                    {site.email.split('@')[0]}@<wbr />
                    {site.email.split('@')[1]}
                  </span>
                </a>
                <CopyEmail email={site.email} labels={t.contact} />
              </div>

              <ul role="list" className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
                <li>
                  <a href={site.github} className="inline-flex min-h-11 items-center gap-2 font-medium text-accent-text underline decoration-accent-text/40 underline-offset-4 transition-colors hover:decoration-current">
                    <GitHubIcon />
                    {t.contact.github}
                  </a>
                </li>
                <li>
                  <a href={site.linkedin} className="inline-flex min-h-11 items-center gap-2 font-medium text-accent-text underline decoration-accent-text/40 underline-offset-4 transition-colors hover:decoration-current">
                    <LinkedInIcon />
                    {t.contact.linkedin}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border-separator">
        <div className={`${container} flex flex-wrap items-center justify-between gap-4 py-8 text-body-sm text-text-secondary`}>
          <p>© {new Date().getFullYear()} {site.name}</p>
          <a href="#top" className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 transition-colors hover:bg-bg-surface-hover hover:text-text-primary">
            <ArrowUpIcon />
            {t.footer.top}
          </a>
        </div>
      </footer>
    </>
  );
}
