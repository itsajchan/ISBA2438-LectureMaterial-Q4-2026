import { formatUSD } from "@/lib/format";

export default function PriceTag({
  price,
  originalPrice,
  large = false,
}: {
  price: number;
  originalPrice?: number;
  large?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className={`font-extrabold text-price ${
          large ? "text-3xl" : "text-lg"
        } bg-yellow-100 px-1.5 py-0.5 rounded border border-yellow-300`}
      >
        {formatUSD(price)}
      </span>
      {originalPrice !== undefined && (
        <span className={`text-gray-400 line-through ${large ? "text-lg" : "text-sm"}`}>
          {formatUSD(originalPrice)}
        </span>
      )}
    </div>
  );
}
