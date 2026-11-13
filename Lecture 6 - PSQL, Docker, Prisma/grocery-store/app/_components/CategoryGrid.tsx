import { categories } from "../_data/catalog";

export default function CategoryGrid() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          Shop by Category
        </h2>
        <a
          href="#"
          className="text-sm font-semibold text-brand hover:text-brand-dark"
        >
          View All →
        </a>
      </div>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {categories.map((category) => (
          <li key={category.name}>
            <a
              href="#"
              className="flex flex-col items-center gap-3 rounded-xl border border-stone-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                className={`grid h-16 w-16 place-items-center rounded-full text-3xl ${category.color}`}
                aria-hidden
              >
                {category.emoji}
              </span>
              <span className="text-sm font-semibold">{category.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
