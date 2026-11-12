import type { ComponentProps } from "react";

export default function RainbowButton({ children, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      {...props}
      className="cursor-pointer rounded-full border-0 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold tracking-wide text-white shadow-lg shadow-purple-500/40 transition duration-300 ease-out hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 hover:brightness-110 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-400/60"
    >
      {children}
    </button>
  );
}
