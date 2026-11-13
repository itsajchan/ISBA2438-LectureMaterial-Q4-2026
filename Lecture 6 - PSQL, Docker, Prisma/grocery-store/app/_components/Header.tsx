import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:gap-8">
        <Logo />
        <form
          action="#"
          className="flex hidden flex-1 items-stretch overflow-hidden rounded-full border-2 border-brand sm:flex"
        >
          <input
            type="search"
            placeholder="Search fresh produce, meats, snacks…"
            className="w-full px-4 text-sm outline-none"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
          >
            Search
          </button>
        </form>
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <a
            href="#"
            className="hidden items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-stone-700 hover:text-brand md:flex"
          >
            <span className="text-xl" aria-hidden>
              👤
            </span>
            Sign In
          </a>
          <a
            href="#"
            className="relative flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-stone-700 hover:text-brand"
          >
            <span className="text-xl" aria-hidden>
              🛒
            </span>
            <span className="hidden sm:inline">Cart</span>
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-gold text-[11px] font-bold text-stone-900">
              0
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
