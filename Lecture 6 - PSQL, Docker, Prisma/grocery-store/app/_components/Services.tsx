const services = [
  {
    title: "Grocery Delivery",
    body: "Same-day delivery to your door in as little as 2 hours.",
    emoji: "🚚",
  },
  {
    title: "Curbside Pickup",
    body: "Order online, park, and we will bring it out to your car.",
    emoji: "🛍️",
  },
  {
    title: "A&A Rewards",
    body: "Earn points on every purchase and unlock member-only prices.",
    emoji: "⭐",
  },
  {
    title: "In-Store Bakery",
    body: "Fresh bread, cakes, and pastries baked every morning.",
    emoji: "🥖",
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="mb-6 text-2xl font-extrabold sm:text-3xl">
        More Than a Grocery Store
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <li
            key={service.title}
            className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <span className="text-3xl" aria-hidden>
              {service.emoji}
            </span>
            <h3 className="mt-3 font-bold">{service.title}</h3>
            <p className="mt-1 text-sm text-stone-500">{service.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
