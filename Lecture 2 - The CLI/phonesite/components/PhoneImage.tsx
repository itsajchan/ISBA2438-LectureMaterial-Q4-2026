export default function PhoneImage({
  seed,
  label,
  className,
}: {
  seed: string;
  label: string;
  className?: string;
}) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  const hue = Math.abs(h) % 360;
  const id = `g-${Math.abs(h).toString(36)}`;
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={label}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue}, 45%, 88%)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 40) % 360}, 55%, 70%)`} />
        </linearGradient>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue}, 70%, 42%)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 60) % 360}, 65%, 26%)`} />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="12" fill={`url(#${id})`} />
      <rect x="38" y="14" width="44" height="92" rx="8" fill="#111" />
      <rect x="41" y="17" width="38" height="86" rx="5" fill={`url(#${id}-s)`} />
      <circle cx="60" cy="24" r="2.5" fill="#000" opacity="0.6" />
      <text
        x="60"
        y="66"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#fff"
        fontFamily="system-ui, sans-serif"
      >
        {label.slice(0, 12)}
      </text>
      <rect x="48" y="20" width="10" height="3" rx="1.5" fill="#000" opacity="0.4" />
      <circle cx="86" cy="26" r="7" fill="#1a1a1a" opacity="0.85" />
      <circle cx="86" cy="26" r="3.5" fill={`hsl(${(hue + 120) % 360}, 60%, 60%)`} />
    </svg>
  );
}
