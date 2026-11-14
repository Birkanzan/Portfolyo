import type { Metadata, Viewport } from 'next';
import { dictionaries, localePath, type Locale } from '@/data/i18n';
import { site } from '@/data/site';
import { withBase } from '@/lib/paths';

export function buildMetadata(locale: Locale): Metadata {
  const t = dictionaries[locale].meta;
  const page = (l: Locale) => `${site.url}${withBase(localePath[l])}`;
  const url = page(locale);
  return {
    metadataBase: new URL(site.url),
    title: t.title,
    description: t.description,
    authors: [{ name: site.name, url: site.github }],
    alternates: {
      canonical: url,
      languages: {
        tr: page('tr'),
        en: page('en'),
        'x-default': page('tr'),
      },
    },
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      title: t.title,
      description: t.description,
      locale: t.ogLocale,
      alternateLocale: locale === 'tr' ? 'en_US' : 'tr_TR',
      images: [{ url: withBase('/og.png'), width: 1200, height: 630, alt: t.title }],
    },
    twitter: { card: 'summary_large_image', title: t.title, description: t.description, images: [withBase('/og.png')] },
    icons: {
      icon: [
        { url: withBase('/favicon.ico'), sizes: '32x32' },
        { url: withBase('/icon.svg'), type: 'image/svg+xml' },
      ],
      apple: withBase('/apple-touch-icon.png'),
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fffcfa' },
    { media: '(prefers-color-scheme: dark)', color: '#110e0b' },
  ],
};
