import { Geist, Geist_Mono } from 'next/font/google';

export const geistSans = Geist({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-geist-sans',
  display: 'swap',
});

export const geistMono = Geist_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-geist-mono',
  // Small labels only: if the file is not ready at first paint, keep the
  // system monospace for this view instead of swapping and repainting.
  display: 'optional',
  preload: false,
});
