/**
 * Decorative 8×8 "game board" for the hero. Rendered at build time with a
 * seeded pattern, so it costs no client JavaScript. A few accent cells blink
 * gently when the user allows motion.
 */
const SIZE = 8;
const CELL = 44;
const GAP = 8;

function seeded(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function PixelBoard({ className = '' }: { className?: string }) {
  const rnd = seeded(42);
  const cells = Array.from({ length: SIZE * SIZE }, (_, i) => {
    const r = rnd();
    const kind = r < 0.5 ? 'base' : r < 0.78 ? 'subtle' : r < 0.93 ? 'border' : 'solid';
    return { x: i % SIZE, y: Math.floor(i / SIZE), kind, delay: (rnd() * 1.5).toFixed(2) };
  });
  const span = SIZE * CELL + (SIZE - 1) * GAP;
  const fill = {
    base: 'fill-bg-sunken',
    subtle: 'fill-accent-subtle-hover',
    border: 'fill-accent-border',
    solid: 'fill-accent-solid',
  } as const;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={span}
      height={span}
      viewBox={`0 0 ${span} ${span}`}
      className={`max-w-full ${className}`}
    >
      {cells.map((c) => (
        <rect
          key={`${c.x}-${c.y}`}
          x={c.x * (CELL + GAP)}
          y={c.y * (CELL + GAP)}
          width={CELL}
          height={CELL}
          rx={8}
          className={`${fill[c.kind as keyof typeof fill]} ${c.kind === 'solid' ? 'pixel-blink' : ''}`}
          style={c.kind === 'solid' ? { animationDelay: `${c.delay}s` } : undefined}
        />
      ))}
    </svg>
  );
}
