const links = [
  { label: "Store Locator", href: "#locations" },
  { label: "Weekly Ad", href: "#deals" },
  { label: "Careers", href: "#" },
  { label: "Help Center", href: "#" },
];

export default function TopBar() {
  return (
    <div className="bg-stone-900 text-stone-200 text-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <p className="flex items-center gap-2">
          <span aria-hidden>🕒</span>
          Open Daily 8:00 AM – 10:00 PM
        </p>
        <p className="hidden items-center gap-2 md:flex">
          <span aria-hidden>📞</span>
          (555) 123-4567
        </p>
        <nav className="flex items-center gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
