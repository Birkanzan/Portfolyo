export const site = {
  name: 'Birkan Zan',
  email: 'birkanzan6@gmail.com',
  github: 'https://github.com/Birkanzan',
  linkedin: 'https://www.linkedin.com/in/birkanzan/',
  katas: 'https://github.com/Birkanzan/csharp-katas',
  /** Production URL, used for canonical links, sitemap and Open Graph. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://birkanzan.vercel.app').replace(/\/$/, ''),
} as const;

export const skills: { group: { tr: string; en: string }; items: string[] }[] = [
  { group: { tr: 'Oyun geliştirme', en: 'Game development' }, items: ['Unity', 'C#', 'URP', 'ScriptableObjects', '2D Animation', 'Unity Sentis'] },
  { group: { tr: 'Yapay zekâ ve veri', en: 'AI and data' }, items: ['Python', 'TensorFlow / Keras', 'ONNX', 'ML.NET'] },
  { group: { tr: 'Backend', en: 'Backend' }, items: ['.NET 9', 'EF Core', 'RabbitMQ', 'CQRS / MediatR', 'SQL Server'] },
  { group: { tr: 'Web', en: 'Web' }, items: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Prisma', 'PostgreSQL'] },
];
