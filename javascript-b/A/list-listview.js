// list-listview.js

// 1) Sample data (10 products) + ID
const products = [
  { id: 101, name: "Aurora Headphones", price: 79.99, availability: true },
  { id: 102, name: "Nebula Keyboard", price: 119.0, availability: false },
  { id: 103, name: "Pulse Mouse", price: 29.5, availability: true },
  { id: 104, name: "Slate Monitor Stand", price: 44.99, availability: true },
  { id: 105, name: "Ion USB-C Hub", price: 34.0, availability: false },
  { id: 106, name: "Nova Desk Lamp", price: 52.75, availability: true },
  { id: 107, name: "Orbit Webcam", price: 66.0, availability: true },
  { id: 108, name: "Echo Bluetooth Speaker", price: 89.99, availability: false },
  { id: 109, name: "Drift Laptop Sleeve", price: 24.99, availability: true },
  { id: 110, name: "Zen Chair Cushion", price: 39.99, availability: true },
];

// 2) Helpers
function formatCurrency(value) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function availabilityBadge(isAvailable) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset";

  if (isAvailable) {
    return `
      <span class="${base} bg-emerald-500/10 text-emerald-300 ring-emerald-500/30">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        Available
      </span>
    `;
  }

  return `
    <span class="${base} bg-rose-500/10 text-rose-300 ring-rose-500/30">
      <span class="h-1.5 w-1.5 rounded-full bg-rose-400"></span>
      Unavailable
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

function createRow(product) {
  // Assign product id to the row container (requested)
  return `
    <div
      class="px-4 py-4 hover:bg-zinc-900/60 transition-colors"
      data-product-id="${product.id}"
      role="listitem"
    >
      <div class="grid grid-cols-12 gap-3 items-center">
        <!-- ID (desktop only) -->
        <div class="hidden sm:block col-span-2">
          <p class="text-sm text-zinc-200 font-medium">${product.id}</p>
        </div>

        <!-- Name -->
        <div class="col-span-12 sm:col-span-4">
          <p class="text-base sm:text-sm font-semibold text-sky-400 leading-snug">
            ${escapeHtml(product.name)}
          </p>

          <!-- Mobile-only details -->
          <div class="mt-2 sm:hidden flex flex-col gap-2">
            <p class="text-sm text-zinc-200">
              <span class="text-zinc-400">ID:</span>
              <span class="font-medium">${product.id}</span>
            </p>
            <p class="text-sm text-zinc-200">
              <span class="text-zinc-400">Price:</span>
              <span class="font-medium">${formatCurrency(product.price)}</span>
            </p>
            <div>${availabilityBadge(product.availability)}</div>

            <button
              id="btn-${product.id}"
              type="button"
              class="mt-1 inline-flex w-fit items-center justify-center rounded-xl bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-white transition"
            >
              Show ID
            </button>
          </div>
        </div>

        <!-- Price (desktop only) -->
        <div class="hidden sm:block col-span-2">
          <p class="text-sm text-zinc-200 font-medium">${formatCurrency(product.price)}</p>
        </div>

        <!-- Availability (desktop only) -->
        <div class="hidden sm:block col-span-2">
          ${availabilityBadge(product.availability)}
        </div>

        <!-- Action (desktop only) -->
        <div class="hidden sm:flex col-span-2 justify-end">
          <button
            id="btn-${product.id}"
            type="button"
            class="inline-flex items-center justify-center rounded-xl bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-white transition"
          >
            Show ID
          </button>
        </div>
      </div>
    </div>
  `;
}

// 3) Render
function renderList(items) {
  const listRoot = document.getElementById("listRoot");
  const emptyState = document.getElementById("emptyState");
  const productCount = document.getElementById("productCount");

  productCount.textContent = String(items.length);

  if (!items.length) {
    listRoot.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  listRoot.innerHTML = items.map(createRow).join("");
}

// 4) Modal logic
const modalBackdrop = document.getElementById("modalBackdrop");
const modalId = document.getElementById("modalId");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalOkBtn = document.getElementById("modalOkBtn");

function openModal(productId) {
  modalId.textContent = String(productId);
  modalBackdrop.classList.remove("hidden");
  modalBackdrop.classList.add("flex");
}

function closeModal() {
  modalBackdrop.classList.add("hidden");
  modalBackdrop.classList.remove("flex");
}

modalCloseBtn.addEventListener("click", closeModal);
modalOkBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalBackdrop.classList.contains("hidden")) closeModal();
});

// 5) Button click handler (event delegation)
document.addEventListener("click", (e) => {
  const btn = e.target.closest('button[id^="btn-"]');
  if (!btn) return;

  const idStr = btn.id.replace("btn-", "");
  const productId = Number(idStr);

  // Show popup with the clicked product ID (requested)
  openModal(productId);
});

// 6) Init
renderList(products);
