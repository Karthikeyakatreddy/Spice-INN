import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Minus, Leaf, Drumstick, X, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { MENU, CATEGORIES } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Spice Inn Multi Cuisine, Vijayawada" },
      { name: "description", content: "Browse the full Spice Inn menu — biryani, curries, tandoori, seafood, noodles and more. Order online or on WhatsApp." },
    ],
  }),
  component: MenuPage,
});

const GALLERY = Array.from({ length: 8 }, (_, i) => `/menu/menu-${i + 1}.jpg`);

function MenuPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [veg, setVeg] = useState<"all" | "veg" | "nonveg">("all");
  const [sort, setSort] = useState<"none" | "asc" | "desc">("none");
  const cart = useCart();

  const items = useMemo(() => {
    let list = MENU.filter((m) => m.available);
    if (q) list = list.filter((m) => m.name.toLowerCase().includes(q.toLowerCase()));
    if (cat !== "All") list = list.filter((m) => m.category === cat);
    if (veg !== "all") list = list.filter((m) => (veg === "veg" ? m.isVeg : !m.isVeg));
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [q, cat, veg, sort]);

  return (
    <SiteLayout>
      <section className="mx-auto mt-6 w-[min(1200px,94%)]">
        <div className="rounded-[2rem] bg-card p-6 shadow-soft md:p-10">
          <div className="text-xs uppercase tracking-widest text-spice">Digital Menu</div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Pick your cravings</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">Search, filter and add to cart. Veg & non-veg, all freshly prepared.</p>

          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search dishes…"
                className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm outline-none focus:border-forest"
              />
            </div>
            <select value={veg} onChange={(e) => setVeg(e.target.value as any)} className="h-12 rounded-full border border-border bg-background px-4 text-sm">
              <option value="all">Veg & Non-Veg</option>
              <option value="veg">Veg only</option>
              <option value="nonveg">Non-Veg only</option>
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="h-12 rounded-full border border-border bg-background px-4 text-sm">
              <option value="none">Sort</option>
              <option value="asc">Price: Low → High</option>
              <option value="desc">Price: High → Low</option>
            </select>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {["All", ...CATEGORIES].map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  cat === c ? "bg-forest text-cream" : "bg-secondary text-foreground hover:bg-secondary/70"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 w-[min(1200px,94%)]">
        {items.length === 0 ? (
          <div className="card-soft p-10 text-center text-muted-foreground">No dishes match your filters.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((m, i) => {
              const line = cart.lines.find((l) => l.item.id === m.id);
              return (
                <motion.article
                  key={m.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.04 }}
                  whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
                  className="card-soft group overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                    <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-card/90 px-2 py-1 text-[10px] font-semibold backdrop-blur">
                      {m.isVeg ? <Leaf className="h-3 w-3 text-fresh" /> : <Drumstick className="h-3 w-3 text-spice" />}
                      {m.isVeg ? "Veg" : "Non-Veg"}
                    </div>
                    <div className="absolute right-3 top-3 rounded-full bg-[color:var(--gold)] px-3 py-1 text-xs font-bold text-[color:var(--deepred)]">₹{m.price}</div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg leading-tight">{m.name}</h3>
                      <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">{m.category}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{m.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex gap-0.5" aria-label={`Spice level ${m.spiceLevel}`}>
                        {Array.from({ length: 3 }).map((_, idx) => (
                          <span key={idx} className={`h-1.5 w-4 rounded-full ${idx < m.spiceLevel ? "bg-spice" : "bg-secondary"}`} />
                        ))}
                      </div>
                      {line ? (
                        <div className="flex items-center gap-2 rounded-full bg-forest px-2 py-1 text-cream">
                          <button onClick={() => cart.dec(m.id)} className="grid h-7 w-7 place-items-center rounded-full bg-cream/10 hover:bg-cream/20"><Minus className="h-3 w-3" /></button>
                          <span className="min-w-5 text-center text-sm font-semibold">{line.qty}</span>
                          <button onClick={() => cart.inc(m.id)} className="grid h-7 w-7 place-items-center rounded-full bg-cream/10 hover:bg-cream/20"><Plus className="h-3 w-3" /></button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { cart.add(m); toast.success(`${m.name} added to cart`); }}
                          className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold btn-gold"
                        >
                          <Plus className="h-3 w-3" /> Add
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>

      {/* GALLERY */}
      <MenuGallery />
    </SiteLayout>
  );
}

function MenuGallery() {
  const [active, setActive] = useState<number | null>(null);
  const [available, setAvailable] = useState<string[]>(GALLERY);

  const next = () => setActive((i) => (i === null ? null : (i + 1) % available.length));
  const prev = () => setActive((i) => (i === null ? null : (i - 1 + available.length) % available.length));

  return (
    <section className="mx-auto mt-20 w-[min(1200px,94%)]">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-spice">Original Menu</div>
          <h2 className="font-display text-3xl md:text-4xl">Tap to view full menu</h2>
          <p className="mt-1 text-sm text-muted-foreground">Drop your restaurant menu images into <code className="rounded bg-secondary px-1.5 py-0.5">public/menu/menu-1.jpg</code> … <code className="rounded bg-secondary px-1.5 py-0.5">menu-8.jpg</code>.</p>
        </div>
        <a href="https://wa.me/919493353838" target="_blank" rel="noreferrer" className="hidden rounded-full px-5 py-2.5 text-sm font-semibold text-cream md:inline-flex" style={{ background: "var(--fresh)" }}>Order on WhatsApp</a>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {GALLERY.map((src, i) => (
          <motion.button
            key={src}
            whileHover={{ y: -6 }}
            onClick={() => setActive(i)}
            className="card-soft group overflow-hidden bg-secondary"
          >
            <div className="grid aspect-[3/4] place-items-center bg-secondary p-2">
              <img
                src={src}
                alt={`Spice Inn menu page ${i + 1}`}
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  setAvailable((a) => a.filter((p) => p !== src));
                }}
                className="h-full w-full object-contain transition group-hover:scale-[1.02]"
              />
              {!available.includes(src) && (
                <div className="grid h-full w-full place-items-center text-center text-xs text-muted-foreground">
                  <div>
                    <div className="font-display text-lg">Menu page {i + 1}</div>
                    <div>Add image at<br />public/menu/menu-{i + 1}.jpg</div>
                  </div>
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-6 text-center md:hidden">
        <a href="https://wa.me/919493353838" target="_blank" rel="noreferrer" className="inline-flex rounded-full px-6 py-3 text-sm font-semibold text-cream" style={{ background: "var(--fresh)" }}>Order on WhatsApp</a>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-[color:var(--deepred)]/90 p-4"
            onClick={() => setActive(null)}
          >
            <button onClick={() => setActive(null)} className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"><X className="h-4 w-4" /></button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 grid h-12 w-12 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"><ChevronLeft /></button>
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              src={GALLERY[active]}
              alt="Menu enlarged"
              className="max-h-[88vh] max-w-[94vw] rounded-3xl bg-cream object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => ((e.currentTarget as HTMLImageElement).src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800'><rect width='100%' height='100%' fill='%23F8F4EC'/><text x='50%' y='50%' font-family='serif' font-size='28' text-anchor='middle' fill='%234F5A3F'>Add menu image here</text></svg>")}
            />
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 grid h-12 w-12 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"><ChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
