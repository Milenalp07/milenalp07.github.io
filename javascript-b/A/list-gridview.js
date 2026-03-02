// list-gridview.js

// --- Sample data (10 products) ---
const products = [
  { name: "Aurora Headphones", price: 89.99, availability: true },
  { name: "Nebula Mechanical Keyboard", price: 129.0, availability: true },
  { name: "Carbon USB-C Hub", price: 34.5, availability: false },
  { name: "Slate Laptop Stand", price: 42.0, availability: true },
  { name: "Ion Smart Bulb (2-pack)", price: 24.99, availability: true },
  { name: "Midnight Desk Mat", price: 19.95, availability: false },
  { name: "Pulse Wireless Mouse", price: 49.99, availability: true },
  { name: "Arctic Water Bottle", price: 14.0, availability: true },
  { name: "Orbit Bluetooth Speaker", price: 59.99, availability: false },
  { name: "Zen Monitor Light Bar", price: 39.99, availability: true },
];

function formatPrice(value) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function availabilityBadge(isAvailable) {
  const label = isAvailable ? "Available" : "Unavailable";
  const classes = isAvailable
    ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
    : "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30";

  return `
    <span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes}">
      ${label}
    </span>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createCard(product) {
  return `
    <article
      class="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 shadow-lg shadow-black/20 transition
             hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/60"
    >
      <div class="flex items-start justify-between gap-3">
        <h2 class="text-base font-semibold text-blue-300 leading-snug">
          ${escapeHtml(product.name)}
        </h2>
        ${availabilityBadge(product.availability)}
      </div>

      <div class="mt-4 flex items-baseline justify-between gap-3">
        <div class="text-xs uppercase tracking-wider text-zinc-500">Price</div>
        <div class="text-lg font-semibold text-zinc-100">
          ${formatPrice(product.price)}
        </div>
      </div>

      <div class="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/30 p-3">
        <div class="flex items-center justify-between">
          <span class="text-sm text-zinc-300">Status</span>
          <span class="text-sm ${
            product.availability ? "text-emerald-300" : "text-rose-300"
          }">
            ${product.availability ? "In stock" : "Out of stock"}
          </span>
        </div>
      </div>
    </article>
  `;
}

function renderGrid(productsData) {
  const gridEl = document.getElementById("productGrid");
  if (!gridEl) return;

  gridEl.innerHTML = productsData.map(createCard).join("");
}

renderGrid(products);
