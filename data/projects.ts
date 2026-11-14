import type { Localized } from './i18n';

/**
 * Projects shown in the "Selected projects" grid, in display order.
 *
 * To add a project:
 * 1. Put a cover image at `assets/projects/<slug>.png` (or .jpg/.webp/.svg).
 *    Any size works; it is cropped to 16:10.
 * 2. Run `npm run assets` to generate `public/projects/<slug>-{640,960,1280}.webp`.
 * 3. Add an entry below with the same `slug`.
 */
export type Project = {
  slug: string;
  title: string;
  category: Localized;
  description: Localized;
  /** Short alt text describing what the cover image shows. */
  imageAlt: Localized;
  tech: string[];
  links: { repo?: string; demo?: string };
};

export const projects: Project[] = [
  {
    slug: 'adaptive-boss-fight',
    title: 'Adaptive Boss Fight',
    category: { tr: 'Oyun · Yapay zekâ', en: 'Game · AI' },
    description: {
      tr: 'Oyuncunun oynama tarzını telemetriyle ölçen, bir sinir ağıyla sınıflandıran ve taktiğini 1,5 saniyede buna göre değiştiren 2D boss savaşı.',
      en: 'A 2D boss fight that tracks player telemetry, classifies play style with a neural network and switches tactics within 1.5 seconds.',
    },
    imageAlt: {
      tr: 'Piksel sanatlı zindan sahnesinin yanında sınıflandırıcı çıktısı: Spammer olasılığı 0,89.',
      en: 'Pixel-art dungeon scene next to the classifier output: Spammer probability 0.89.',
    },
    tech: ['Unity', 'C#', 'Unity Sentis', 'ONNX', 'Python', 'TensorFlow'],
    links: { repo: 'https://github.com/Birkanzan/adaptive-boss-fight-unity' },
  },
  {
    slug: 'match3-game',
    title: 'Match-3 Game',
    category: { tr: 'Oyun', en: 'Game' },
    description: {
      tr: 'Seviyeleri ScriptableObject ile tanımlanan, hamle sayısını kendisi hesaplayan ve art arda eşleşmeleri kombo çarpanıyla puanlayan bir bulmaca oyunu.',
      en: 'A puzzle game with ScriptableObject levels, automatically balanced move limits and combo multipliers for cascading matches.',
    },
    imageAlt: {
      tr: 'Gökkuşağı arka planlı iki oyun ekranı: renkli taşlarla dolu 8×8 tahta ve skor paneli.',
      en: 'Two game screens with a rainbow background: an 8×8 board of colored gems and a score panel.',
    },
    tech: ['Unity 6', 'C#', 'URP', 'ScriptableObjects'],
    links: { repo: 'https://github.com/Birkanzan/match3-game' },
  },
  {
    slug: 'galaxy-shooter',
    title: 'Galaxy Shooter',
    category: { tr: 'Oyun', en: 'Game' },
    description: {
      tr: 'Güçlendirmeler, kalkan ve duraklatma menüsü içeren, Unity’de geliştirdiğim ilk 2D uzay nişancı oyunu.',
      en: 'My first Unity game: a 2D space shooter with power-ups, a shield and a pause menu.',
    },
    imageAlt: {
      tr: 'Yıldızlı arka planda düşman filosuna ateş eden kalkanlı uzay gemisi çizimi.',
      en: 'Illustration of a shielded spaceship firing at an enemy wave on a starfield.',
    },
    tech: ['Unity', 'C#', '2D Animation'],
    links: { repo: 'https://github.com/Birkanzan/Galaxy_Shooter' },
  },
  {
    slug: 'doc-intelligence',
    title: 'DocIntelligence',
    category: { tr: 'Backend', en: 'Backend' },
    description: {
      tr: 'Yüklenen belgeleri sıkıştıran, OCR ile metnini çıkaran ve ML.NET ile türüne göre sınıflandıran dağıtık bir .NET sistemi.',
      en: 'A distributed .NET system that compresses uploaded documents, extracts their text with OCR and classifies them with ML.NET.',
    },
    imageAlt: {
      tr: 'Akış şeması: PDF belgesi Web API’den RabbitMQ kuyruğuna, oradan OCR ve sınıflandırma servislerine gidiyor.',
      en: 'Flow diagram: a PDF goes from the Web API to a RabbitMQ queue, then to OCR and classification services.',
    },
    tech: ['.NET 9', 'RabbitMQ', 'CQRS', 'EF Core', 'Tesseract', 'ML.NET'],
    links: { repo: 'https://github.com/Birkanzan/DocIntelligence-CleanArchitecture' },
  },
  {
    slug: 'saas-finance-dashboard',
    title: 'SaaS Finance Dashboard',
    category: { tr: 'Full-stack web', en: 'Full-stack web' },
    description: {
      tr: 'Kimlik doğrulama, işlem ve bütçe takibi ile grafik raporlar sunan full-stack bir kişisel finans paneli.',
      en: 'A full-stack personal finance dashboard with authentication, transaction and budget tracking, and chart reports.',
    },
    imageAlt: {
      tr: 'Kenar menülü panel çizimi: üç özet kartı, aylık sütun grafiği ve halka grafik.',
      en: 'Dashboard illustration with a sidebar, three summary cards, a monthly bar chart and a donut chart.',
    },
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Auth.js', 'Tailwind CSS'],
    links: { repo: 'https://github.com/Birkanzan/saas-finance-dashboard' },
  },
  {
    slug: 'korfez-gezgini',
    title: 'Körfez Gezgini',
    category: { tr: 'Web', en: 'Web' },
    description: {
      tr: 'Edremit Körfezi’nde seçtiğin duraklar arasındaki gerçek yol mesafesini ve süresini haritada gösteren bir gezi rehberi.',
      en: 'A travel guide for the Gulf of Edremit that maps real driving distances and times between the stops you pick.',
    },
    imageAlt: {
      tr: 'Kıyı şeridi haritası çizimi: Ayvalık, Burhaniye, Edremit ve Akçay durakları bir rotayla bağlı.',
      en: 'Coastline map illustration: Ayvalık, Burhaniye, Edremit and Akçay connected by a route.',
    },
    tech: ['JavaScript', 'Leaflet', 'OpenStreetMap', 'HTML', 'CSS'],
    links: { demo: 'https://gezmek.vercel.app', repo: 'https://github.com/Birkanzan/gezmek' },
  },
];
