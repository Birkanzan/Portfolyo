'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckIcon, CopyIcon } from './Icons';

type Labels = { copy: string; copied: string; copyFailed: string };

/** Fallback for browsers or contexts that deny the async Clipboard API. */
function legacyCopy(text: string) {
  const active = document.activeElement as HTMLElement | null;
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  field.remove();
  active?.focus();
  return ok;
}

export function CopyEmail({ email, labels }: { email: string; labels: Labels }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      ok = legacyCopy(email);
    }
    if (ok) {
      setState('copied');
      timer.current = setTimeout(() => setState('idle'), 4000);
    } else {
      setState('failed');
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong px-6 font-medium text-text-primary transition-[color,background-color,border-color,scale] duration-150 ease-out motion-safe:active:scale-[0.96] hover:bg-bg-surface-hover"
      >
        <span className="icon-swap" data-state={state === 'copied' ? 'on' : 'off'}>
          <CopyIcon className="icon-off" />
          <CheckIcon className="icon-on" />
        </span>
        {labels.copy}
      </button>
      <p role="status" className="min-h-[1.55em] text-body-sm text-text-secondary">
        {state === 'copied' ? labels.copied : state === 'failed' ? labels.copyFailed : ''}
      </p>
    </div>
  );
}
