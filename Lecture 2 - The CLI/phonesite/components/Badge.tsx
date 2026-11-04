import type { ReactNode } from "react";

export default function Badge({
  children,
  variant = "sale",
}: {
  children: ReactNode;
  variant?: "sale" | "low-stock" | "new";
}) {
  const styles = {
    sale: "bg-price text-white",
    "low-stock": "bg-gold text-ink",
    new: "bg-brand text-white",
  } as const;
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
