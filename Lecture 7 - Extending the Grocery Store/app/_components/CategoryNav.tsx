import { categories } from "../_data/catalog";

const navItems = ["Weekly Ad", ...categories.map((c) => c.name)];

export default function CategoryNav() {
  return (
    <nav className="bg-brand text-white" aria-label="Shop categories">
      <ul className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 text-sm font-semibold whitespace-nowrap">
        {navItems.map((category) => (
          <li key={category}>
            <a
              href="#categories"
              className="block px-3 py-2.5 hover:bg-brand-dark transition-colors"
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
