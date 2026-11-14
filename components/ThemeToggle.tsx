'use client';

import { useEffect, useState } from 'react';
import { ContrastIcon } from './Icons';

export function ThemeToggle({ label }: { label: string }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    // Swap every color at once instead of letting color transitions run
    // from the old theme, which briefly shows mismatched pairs.
    const freeze = document.createElement('style');
    freeze.textContent = '*,*::before,*::after{transition:none!important}';
    document.head.appendChild(freeze);
    root.dataset.theme = next;
    void getComputedStyle(root).color;
    requestAnimationFrame(() => requestAnimationFrame(() => freeze.remove()));
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable: the choice lasts for this page view */
    }
    setDark(next === 'dark');
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark ?? undefined}
      aria-label={label}
      title={label}
      className="inline-flex size-11 items-center justify-center rounded-full text-text-secondary transition-[color,background-color,border-color,scale] duration-150 ease-out motion-safe:active:scale-[0.96] hover:bg-bg-surface-hover hover:text-text-primary"
    >
      <ContrastIcon />
    </button>
  );
}
