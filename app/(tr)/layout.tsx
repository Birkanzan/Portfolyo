import type { ReactNode } from 'react';
import { RootDocument } from '@/components/RootDocument';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata('tr');
export { viewport } from '@/lib/metadata';

export default function TurkishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="tr">{children}</RootDocument>;
}
