export default function RatingStars({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const px = size === "sm" ? 14 : 20;
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - (i - 1)));
        return (
          <svg key={i} width={px} height={px} viewBox="0 0 20 20" className="shrink-0">
            <defs>
              <linearGradient id={`star-${i}-${Math.round(rating * 10)}`}>
                <stop offset={`${fill * 100}%`} stopColor="#FFC72C" />
                <stop offset={`${fill * 100}%`} stopColor="#E5E0D8" />
              </linearGradient>
            </defs>
            <path
              d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z"
              fill={`url(#star-${i}-${Math.round(rating * 10)})`}
            />
          </svg>
        );
      })}
    </span>
  );
}
