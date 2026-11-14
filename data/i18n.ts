export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];
export type Localized = Record<Locale, string>;

export const localePath: Record<Locale, string> = { tr: '/', en: '/en/' };

const tr = {
  meta: {
    title: 'Birkan Zan — Oyun Geliştirici',
    description:
      'Unity ve C# ile oyun geliştiren Birkan Zan’ın portfolyosu: oyuncuya uyum sağlayan yapay zekâlı bir boss savaşı, match-3 bulmaca oyunu ve full-stack projeler.',
    ogLocale: 'tr_TR',
  },
  skip: 'İçeriğe geç',
  nav: { label: 'Ana menü', projects: 'Projeler', about: 'Hakkımda', contact: 'İletişim', home: 'Birkan Zan, ana sayfa' },
  lang: { switchLabel: 'Switch to English', short: 'EN' },
  theme: { dark: 'Koyu tema' },
  hero: {
    role: 'Oyun Geliştirici',
    lead: 'Unity ve C# ile oyun geliştiriyorum. Oyun sistemlerini temiz bir mimariyle kuruyor, oyuncunun nasıl oynadığına uyum sağlayan mekanikler tasarlıyorum.',
    primary: 'Projeleri incele',
    secondary: 'İletişime geç',
  },
  projects: {
    title: 'Seçili projeler',
    intro: 'Oyun sistemleri, oyun içi yapay zekâ ve full-stack geliştirme üzerine çalışmalarım.',
    tech: 'Kullanılan teknolojiler',
    repo: 'Kaynak kod',
    demo: 'Canlı demo',
  },
  about: {
    title: 'Hakkımda',
    bio: [
      'Ben Birkan; Unity ve C# ile oyun geliştiriyorum. Oyun sistemlerini birbirine sıkı bağlı olmayan, olay tabanlı parçalar hâlinde kurmayı ve ScriptableObject gibi araçlarla tasarım tarafının kolayca ayarlayabileceği hâle getirmeyi seviyorum.',
      'Son projemde oyuncunun oynama tarzını telemetriyle ölçen ve bir sinir ağıyla sınıflandıran bir boss geliştirdim. Oyunların dışında .NET ile dağıtık backend servisleri ve Next.js ile web uygulamaları da yazıyorum. Bu deneyim, oyun projelerinde araç ve altyapı tarafında işime yarıyor.',
    ],
    skillsTitle: 'Yetenekler',
    katas: 'C# alıştırma çözümlerimi GitHub’da incele',
  },
  contact: {
    title: 'İletişim',
    lead: 'Bir oyun projesi, iş birliği ya da iş fırsatı için bana e-posta gönderebilirsin.',
    copy: 'E-postayı kopyala',
    copied: 'E-posta adresi kopyalandı',
    copyFailed: 'Kopyalanamadı. Adresi seçip elle kopyalayabilirsin.',
    github: 'GitHub profilim',
    linkedin: 'LinkedIn profilim',
  },
  footer: { top: 'Başa dön' },
  notFound: {
    title: 'Sayfa bulunamadı',
    body: 'Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.',
    back: 'Ana sayfaya dön',
  },
};

const en: typeof tr = {
  meta: {
    title: 'Birkan Zan — Game Developer',
    description:
      'Portfolio of Birkan Zan, a game developer working in Unity and C#: an adaptive AI boss fight, a match-3 puzzle game and full-stack projects.',
    ogLocale: 'en_US',
  },
  skip: 'Skip to content',
  nav: { label: 'Main menu', projects: 'Projects', about: 'About', contact: 'Contact', home: 'Birkan Zan, home' },
  lang: { switchLabel: 'Türkçeye geç', short: 'TR' },
  theme: { dark: 'Dark theme' },
  hero: {
    role: 'Game Developer',
    lead: 'I build games with Unity and C#. I structure game systems with clean architecture and design mechanics that adapt to how people play.',
    primary: 'View projects',
    secondary: 'Get in touch',
  },
  projects: {
    title: 'Selected projects',
    intro: 'Work on game systems, in-game AI and full-stack development.',
    tech: 'Technologies used',
    repo: 'Source code',
    demo: 'Live demo',
  },
  about: {
    title: 'About',
    bio: [
      'I’m Birkan, a game developer working in Unity and C#. I like building game systems as loosely coupled, event-driven parts and exposing them through tools like ScriptableObjects so designers can tune them easily.',
      'In my latest project I built a boss that measures how you play through telemetry and classifies your style with a neural network. Outside games, I write distributed backend services in .NET and web apps in Next.js, which helps me with tooling and infrastructure on game projects.',
    ],
    skillsTitle: 'Skills',
    katas: 'Browse my C# kata solutions on GitHub',
  },
  contact: {
    title: 'Contact',
    lead: 'Send me an email about a game project, a collaboration or a job opportunity.',
    copy: 'Copy email',
    copied: 'Email address copied',
    copyFailed: 'Couldn’t copy. Select the address to copy it manually.',
    github: 'GitHub profile',
    linkedin: 'LinkedIn profile',
  },
  footer: { top: 'Back to top' },
  notFound: {
    title: 'Page not found',
    body: 'The page you’re looking for may have moved or never existed.',
    back: 'Go to the home page',
  },
};

export const dictionaries = { tr, en };
export type Dictionary = typeof tr;
