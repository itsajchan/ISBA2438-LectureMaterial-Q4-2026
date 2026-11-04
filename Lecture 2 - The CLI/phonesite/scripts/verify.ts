import assert from "node:assert";
import { phones } from "../data/phones.ts";
import { computeTotals, PROMO_CODES, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "../lib/pricing.ts";
import { seededReviews, averageRating } from "../lib/reviews.ts";

assert.equal(phones.length, 30, "catalog has 30 phones");

const ids = new Set(phones.map((p) => p.id));
assert.equal(ids.size, 30, "phone ids are unique");

for (const p of phones) {
  assert(p.brand && p.name && p.price > 0, `${p.id} has brand/name/price`);
  assert(p.colors.length > 0, `${p.id} has colors`);
  assert(p.storage > 0 && p.ram > 0 && p.screen > 0 && p.battery > 0, `${p.id} has specs`);
  assert(p.rating >= 0 && p.rating <= 5, `${p.id} rating in range`);
  if (p.onSale) {
    assert(p.originalPrice !== undefined && p.originalPrice > p.price, `${p.id} sale price < original`);
  }
}

const sample = { phoneId: "x", color: "c", qty: 2 };
const priceOf = () => 100;
let t = computeTotals([sample], null, priceOf);
assert.equal(t.subtotal, 200, "subtotal");
assert.equal(t.discount, 0, "no discount without promo");
assert.equal(t.shipping, SHIPPING_FEE, "shipping fee below threshold");

const atThreshold = computeTotals([{ phoneId: "x", color: "c", qty: 5 }], null, priceOf);
assert.equal(atThreshold.subtotal, 500, "subtotal at threshold");
assert.equal(atThreshold.shipping, 0, "free shipping at threshold");
assert.ok(FREE_SHIPPING_THRESHOLD > 0);

t = computeTotals([{ phoneId: "x", color: "c", qty: 5 }], "SAVE10", priceOf);
assert.equal(t.discount, 50, "SAVE10 gives 10% off");
assert.equal(t.total, 450, "total with SAVE10");
assert.ok(PROMO_CODES.FREESHIP);

t = computeTotals([sample], "FREESHIP", priceOf);
assert.equal(t.shipping, 0, "FREESHIP zeroes shipping");

const invalid = computeTotals([sample], "BOGUS", priceOf);
assert.equal(invalid.discount, 0, "invalid promo ignored");

const phone = phones[0];
const seeded1 = seededReviews(phone);
const seeded2 = seededReviews(phone);
assert.ok(seeded1.length >= 2 && seeded1.length <= 4, "seeded review count 2-4");
assert.deepEqual(seeded1, seeded2, "seeded reviews deterministic");
for (const r of seeded1) {
  assert(r.rating >= 1 && r.rating <= 5, "seeded rating in range");
  assert(r.name && r.text, "seeded review has name/text");
}
const avg = averageRating([{ name: "a", rating: 4, text: "", date: "" }, { name: "b", rating: 5, text: "", date: "" }]);
assert.equal(avg, 4.5, "averageRating");

console.log("ALL CHECKS PASSED: 30 phones, pricing/promos/reviews logic verified");
