import type { ReactNode } from 'react';
import '@/app/globals.css';
import { geistMono, geistSans } from '@/lib/fonts';
import type { Locale } from '@/data/i18n';

/**
 * Runs before first paint so the stored or system theme applies without a
 * flash. The data-theme attribute is the only switch the CSS reads.
 */
const themeScript = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t})()`;

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} dir="ltr" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
