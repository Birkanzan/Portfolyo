import type { MetadataRoute } from 'next';
import { localePath } from '@/data/i18n';
import { site } from '@/data/site';
import { withBase } from '@/lib/paths';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { tr: `${site.url}${withBase(localePath.tr)}`, en: `${site.url}${withBase(localePath.en)}` };
  return (['tr', 'en'] as const).map((locale) => ({
    url: languages[locale],
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === 'tr' ? 1 : 0.9,
    alternates: { languages },
  }));
}
