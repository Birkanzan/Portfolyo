import type { Metadata } from 'next';
import { RootDocument } from '@/components/RootDocument';
import { dictionaries, localePath } from '@/data/i18n';
import { withBase } from '@/lib/paths';

export const metadata: Metadata = {
  title: '404 — Birkan Zan',
  robots: { index: false },
};

export default function GlobalNotFound() {
  const { tr, en } = dictionaries;
  return (
    <RootDocument locale="tr">
      <main className="mx-auto flex min-h-dvh max-w-prose flex-col justify-center gap-10 px-4 py-16">
        <p className="font-mono text-caption font-medium text-accent-text">404</p>
        <section>
          <h1 className="text-title font-semibold tracking-[-0.02em]">{tr.notFound.title}</h1>
          <p className="mt-3 text-text-secondary">{tr.notFound.body}</p>
          <a href={withBase(localePath.tr)} className="mt-4 inline-flex min-h-11 items-center font-medium text-accent-text underline decoration-accent-text/40 underline-offset-4">
            {tr.notFound.back}
          </a>
        </section>
        <section lang="en">
          <h2 className="text-heading font-semibold">{en.notFound.title}</h2>
          <p className="mt-2 text-text-secondary">{en.notFound.body}</p>
          <a href={withBase(localePath.en)} className="mt-4 inline-flex min-h-11 items-center font-medium text-accent-text underline decoration-accent-text/40 underline-offset-4">
            {en.notFound.back}
          </a>
        </section>
      </main>
    </RootDocument>
  );
}
