const stores = [
  {
    name: "A&A Market — Downtown",
    address: "123 Main Street, Springfield, CA 90210",
    hours: "8:00 AM – 10:00 PM Daily",
    phone: "(555) 123-4567",
  },
  {
    name: "A&A Market — Westside",
    address: "456 Oak Avenue, Springfield, CA 90211",
    hours: "8:00 AM – 10:00 PM Daily",
    phone: "(555) 234-5678",
  },
  {
    name: "A&A Market — Northgate",
    address: "789 Pine Road, Springfield, CA 90212",
    hours: "9:00 AM – 9:00 PM Daily",
    phone: "(555) 345-6789",
  },
];

export default function Locations() {
  return (
    <section id="locations" className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="mb-6 text-2xl font-extrabold sm:text-3xl">
        Visit a Store Near You
      </h2>
      <ul className="grid gap-4 md:grid-cols-3">
        {stores.map((store) => (
          <li
            key={store.name}
            className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <h3 className="font-bold text-brand">{store.name}</h3>
            <dl className="mt-3 space-y-2 text-sm text-stone-600">
              <div className="flex gap-2">
                <dt aria-hidden>📍</dt>
                <dd>{store.address}</dd>
              </div>
              <div className="flex gap-2">
                <dt aria-hidden>🕒</dt>
                <dd>{store.hours}</dd>
              </div>
              <div className="flex gap-2">
                <dt aria-hidden>📞</dt>
                <dd>{store.phone}</dd>
              </div>
            </dl>
            <a
              href="#"
              className="mt-4 inline-block rounded-full border-2 border-brand px-4 py-1.5 text-xs font-bold text-brand transition hover:bg-brand hover:text-white"
            >
              Get Directions
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
