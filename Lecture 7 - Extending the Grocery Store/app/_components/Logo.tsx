export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#" className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand font-extrabold text-white text-lg shadow-sm">
        A&amp;A
      </span>
      <span className="leading-none">
        <span className="block text-xl font-extrabold tracking-tight text-brand">
          A&amp;A
        </span>
        <span className="block text-[11px] font-semibold uppercase tracking-widest text-stone-500">
          Market
        </span>
      </span>
    </a>
  );
}
