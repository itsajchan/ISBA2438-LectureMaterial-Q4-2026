"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  categories,
  colorOptions,
  emojiOptions,
  type Product,
} from "../_data/catalog";

const inputClasses =
  "w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

const draftKey = "aa-new-product-draft";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftReady, setDraftReady] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0].name);
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [was, setWas] = useState("");
  const [badge, setBadge] = useState("");
  const [emoji, setEmoji] = useState(emojiOptions[0]);
  const [color, setColor] = useState(colorOptions[0].value);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch(() => {
        setError("Could not load products. Is the server running?");
        setProducts([]);
      });
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = localStorage.getItem(draftKey);
        if (raw) {
          const draft = JSON.parse(raw);
          if (typeof draft.name === "string") setName(draft.name);
          if (typeof draft.price === "string") setPrice(draft.price);
          if (typeof draft.unit === "string") setUnit(draft.unit);
          if (typeof draft.was === "string") setWas(draft.was);
          if (typeof draft.badge === "string") setBadge(draft.badge);
          if (
            typeof draft.category === "string" &&
            categories.some((c) => c.name === draft.category)
          ) {
            setCategory(draft.category);
          }
          if (
            typeof draft.emoji === "string" &&
            emojiOptions.includes(draft.emoji)
          ) {
            setEmoji(draft.emoji);
          }
          if (
            typeof draft.color === "string" &&
            colorOptions.some((c) => c.value === draft.color)
          ) {
            setColor(draft.color);
          }
        }
      } catch {
        setError("Saved draft was unreadable and has been ignored.");
      } finally {
        setDraftReady(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!draftReady || editingId) return;
    if (!name && !price) {
      localStorage.removeItem(draftKey);
      return;
    }
    localStorage.setItem(
      draftKey,
      JSON.stringify({ name, category, unit, price, was, badge, emoji, color })
    );
  }, [
    draftReady,
    editingId,
    name,
    category,
    unit,
    price,
    was,
    badge,
    emoji,
    color,
  ]);

  function resetForm() {
    setEditingId(null);
    setName("");
    setCategory(categories[0].name);
    setUnit("");
    setPrice("");
    setWas("");
    setBadge("");
    setEmoji(emojiOptions[0]);
    setColor(colorOptions[0].value);
    localStorage.removeItem(draftKey);
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setName(product.name);
    setCategory(product.category);
    setUnit(product.unit);
    setPrice(String(product.price));
    setWas(String(product.was));
    setBadge(product.badge);
    setEmoji(product.emoji);
    setColor(product.color);
    document
      .getElementById("add-product")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const payload = {
      name,
      category,
      unit,
      price: Number(price),
      was: was ? Number(was) : undefined,
      badge,
      emoji,
      color,
    };

    const res = await fetch(
      editingId ? `/api/products/${editingId}` : "/api/products",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }

    setProducts((current) =>
      editingId
        ? current!.map((p) => (p.id === editingId ? data.product : p))
        : [data.product, ...current!]
    );
    resetForm();
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((current) => current!.filter((p) => p.id !== id));
      if (editingId === id) resetForm();
    }
  }

  const [filter, setFilter] = useState("All Categories");
  const visibleProducts =
    filter === "All Categories"
      ? (products ?? [])
      : (products ?? []).filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand font-extrabold text-white">
              A&amp;A
            </span>
            <div>
              <p className="font-extrabold text-brand">A&amp;A Market</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                Admin Dashboard
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="rounded-full border-2 border-brand px-4 py-1.5 text-xs font-bold text-brand transition hover:bg-brand hover:text-white"
          >
            ← Back to Store
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {error && (
          <p className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm font-medium text-brand-dark">
            {error}
          </p>
        )}

        <section
          id="add-product"
          className="mb-8 rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-extrabold">
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Saved through the products API — data is stored in
            <code className="mx-1 rounded bg-stone-100 px-1 py-0.5 text-xs">
              data/products.json
            </code>
            on the server. Partially completed forms are kept in your browser
            and restored if the page reloads.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <label className="block text-sm font-medium">
              Name
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Organic Bananas"
                className={`mt-1 ${inputClasses}`}
              />
            </label>
            <label className="block text-sm font-medium">
              Category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`mt-1 ${inputClasses}`}
              >
                {categories.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium">
              Unit
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g. per lb"
                className={`mt-1 ${inputClasses}`}
              />
            </label>
            <label className="block text-sm font-medium">
              Sale Price ($)
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className={`mt-1 ${inputClasses}`}
              />
            </label>
            <label className="block text-sm font-medium">
              Original Price ($)
              <input
                type="number"
                min="0"
                step="0.01"
                value={was}
                onChange={(e) => setWas(e.target.value)}
                placeholder="Optional — defaults to sale price"
                className={`mt-1 ${inputClasses}`}
              />
            </label>
            <label className="block text-sm font-medium">
              Badge
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Save 20% — defaults to New"
                className={`mt-1 ${inputClasses}`}
              />
            </label>
            <label className="block text-sm font-medium">
              Icon
              <select
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                className={`mt-1 ${inputClasses}`}
              >
                {emojiOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium">
              Card Color
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className={`mt-1 ${inputClasses}`}
              >
                {colorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-4">
              <button
                type="submit"
                className="rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark"
              >
                {editingId ? "Save Changes" : "Add Product"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border-2 border-stone-300 px-6 py-2.5 text-sm font-bold text-stone-600 transition hover:bg-stone-100"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-xl border border-stone-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-stone-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-extrabold">Product Catalog</h2>
              <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand">
                {visibleProducts.length} products
              </span>
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-600">
              Filter by category
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              >
                <option value="All Categories">All Categories</option>
                {categories.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Unit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sale Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Original Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Badge
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products === null ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-stone-400">
                      Loading products…
                    </td>
                  </tr>
                ) : visibleProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-stone-400">
                      No products yet — add your first product above.
                    </td>
                  </tr>
                ) : (
                  visibleProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-stone-50">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg ${product.color}`}
                            aria-hidden
                          >
                            {product.emoji}
                          </span>
                          <span className="font-semibold">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-stone-500">
                        {product.category}
                      </td>
                      <td className="px-6 py-3 text-stone-500">
                        {product.unit}
                      </td>
                      <td className="px-6 py-3 font-bold text-brand">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-3 text-stone-400 line-through">
                        ${product.was.toFixed(2)}
                      </td>
                      <td className="px-6 py-3">
                        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-600">
                          {product.badge}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(product)}
                            className="rounded-full border border-stone-300 px-3 py-1 text-xs font-bold text-stone-600 hover:bg-stone-100"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(product.id)}
                            className="rounded-full border border-red-200 px-3 py-1 text-xs font-bold text-brand hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
