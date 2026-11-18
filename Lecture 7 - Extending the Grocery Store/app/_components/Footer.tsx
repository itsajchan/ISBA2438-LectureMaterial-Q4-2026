import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Weekly Ad", href: "#" },
      { label: "Fresh Produce", href: "#" },
      { label: "Meat & Seafood", href: "#" },
      { label: "Bakery", href: "#" },
      { label: "Gift Cards", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Delivery", href: "#" },
      { label: "Curbside Pickup", href: "#" },
      { label: "A&A Rewards", href: "#" },
      { label: "Catering", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Community", href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Store Locator", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Return Policy", href: "#" },
      { label: "Admin", href: "/admin" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-8 bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <p className="text-2xl font-extrabold text-white">
            A&amp;A <span className="text-gold">Market</span>
          </p>
          <p className="mt-3 text-sm text-stone-400">
            Fresh food, friendly faces, and fair prices — proudly serving our
            neighbors since 1998.
          </p>
          <div className="mt-4 flex gap-3 text-xl" aria-label="Social media">
            <a href="#" aria-label="Facebook" className="hover:text-gold">
              📘
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gold">
              📸
            </a>
            <a href="#" aria-label="X" className="hover:text-gold">
              🐦
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-gold">
              ▶️
            </a>
          </div>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3 className="font-bold text-white">{column.title}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.href === "#" ? (
                    <a href={link.href} className="hover:text-gold">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="hover:text-gold">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-stone-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-stone-500 sm:flex-row">
          <p>© 2026 A&amp;A Market. All rights reserved.</p>
          <p>We accept 💳 💵 📱 at every register.</p>
        </div>
      </div>
    </footer>
  );
}
