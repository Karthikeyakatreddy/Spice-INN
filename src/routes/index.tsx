import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Flame, ChevronRight, Phone, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import heroBiryani from "@/assets/hero-biryani.jpg";
import curry from "@/assets/dish-curry.jpg";
import tandoori from "@/assets/dish-tandoori.jpg";
import noodles from "@/assets/dish-noodles.jpg";
import seafood from "@/assets/dish-seafood.jpg";
import spice from "@/assets/spice-float.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spice Inn — Premium Multi Cuisine Restaurant, Vijayawada" },
      { name: "description", content: "Enjoy delicious Indian, Chinese, Biryani, Seafood & Tandoori at Spice Inn Vijayawada. Dine-in, takeaway, delivery. 4.7★ from 399 reviews." },
    ],
  }),
  component: HomePage,
});

const categories = [
  { name: "Biryani", img: heroBiryani },
  { name: "Curries", img: curry },
  { name: "Seafood", img: seafood },
  { name: "Rice & Noodles", img: noodles },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative mx-auto mt-6 w-[min(1200px,94%)]">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-card px-6 py-10 shadow-soft md:px-12 md:py-16">
          {/* floating spice */}
          <motion.img
            src={spice}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 w-48 opacity-70 md:w-64"
            animate={{ rotate: [0, 8, -4, 0] }}
            transition={{ duration: 14, repeat: Infinity }}
          />
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="chip-pill"
              >
                <Flame className="h-3.5 w-3.5 text-spice" /> Vijayawada's loved multi-cuisine kitchen
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-5 font-display text-5xl leading-[1.05] text-foreground md:text-7xl"
              >
                Enjoy Delicious <span className="text-spice">Multi Cuisine</span> Food at <span className="italic text-forest">Spice Inn</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg"
              >
                Freshly prepared Indian, Chinese, Biryani, Curries, Seafood and Tandoori specials — crafted with hand-picked spices, served in Vijayawada.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                <Link to="/menu" className="rounded-full px-6 py-3 text-sm font-semibold btn-gold">Order Now</Link>
                <Link to="/menu" className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary">View Menu</Link>
                <a href="https://wa.me/919493353838" target="_blank" rel="noreferrer" className="rounded-full px-6 py-3 text-sm font-semibold text-cream" style={{ background: "var(--fresh)" }}>WhatsApp Order</a>
              </motion.div>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[color:var(--gold)] text-[color:var(--gold)]" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">4.7</span>
                  <span className="text-sm text-muted-foreground">· 399 reviews</span>
                </div>
                <div className="hidden h-6 w-px bg-border md:block" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" /> +91 94933 53838
                </div>
              </div>
            </div>

            {/* Right hero food card */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative mx-auto aspect-square w-[90%] max-w-[520px]"
              >
                <div className="absolute inset-0 rounded-full bg-[color:var(--forest)]" />
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                >
                  <img src={heroBiryani} alt="Hyderabadi chicken biryani" width={1280} height={1280} className="h-full w-full rounded-full object-cover p-3" />
                </motion.div>
                {/* Floating badges */}
                <motion.div
                  className="absolute -left-4 top-6 rounded-2xl bg-card px-4 py-3 shadow-soft"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Today's Special</div>
                  <div className="font-display text-lg">Chicken Biryani</div>
                  <div className="text-xs text-spice font-semibold">₹320</div>
                </motion.div>
                <motion.div
                  className="absolute -right-2 bottom-10 rounded-2xl bg-[color:var(--gold)] px-4 py-3 shadow-gold"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <div className="text-[10px] uppercase tracking-widest text-[color:var(--deepred)]">Free Parking</div>
                  <div className="text-sm font-bold text-[color:var(--deepred)]">Dine · Takeaway · Delivery</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto mt-16 w-[min(1200px,94%)]">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-spice">Explore</div>
            <h2 className="font-display text-3xl md:text-4xl">Popular Categories</h2>
          </div>
          <Link to="/menu" className="hidden items-center gap-1 text-sm font-semibold text-forest md:inline-flex">
            See all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="card-soft group overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="font-display text-lg">{c.name}</span>
                <Link to="/menu" className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold transition group-hover:bg-forest group-hover:text-cream">View</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT BAND */}
      <section className="mx-auto mt-20 w-[min(1200px,94%)]">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-[2rem] bg-[color:var(--forest)] p-8 text-cream md:p-12">
            <div className="text-xs uppercase tracking-widest text-[color:var(--gold)]">About</div>
            <h2 className="mt-2 font-display text-3xl md:text-5xl">A family-friendly multi-cuisine kitchen</h2>
            <p className="mt-4 max-w-2xl text-cream/80">
              Spice Inn brings together the comfort of home-style curries and the boldness of street-side specials. From Hyderabadi biryani to coastal seafood and sizzling tandoor, every plate is freshly made.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              {["Dine-in", "Takeaway", "Delivery", "Free Parking"].map((s) => (
                <div key={s} className="rounded-2xl bg-cream/10 px-4 py-3 text-center">{s}</div>
              ))}
            </div>
          </div>
          <div className="card-soft p-8">
            <div className="text-xs uppercase tracking-widest text-spice">Price Range</div>
            <div className="mt-2 font-display text-5xl">₹200<span className="text-2xl text-muted-foreground">–</span>₹1,200</div>
            <p className="mt-2 text-sm text-muted-foreground">per person — value across cuisines.</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-spice" /> Guru Nanak Colony, Vijayawada</div>
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-spice" /> +91 94933 53838</div>
            </div>
            <Link to="/about" className="mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold btn-forest">More about us</Link>
          </div>
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="mx-auto mt-20 w-[min(1200px,94%)]">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-spice">Tasting Notes</div>
            <h2 className="font-display text-3xl md:text-4xl">Chef's Picks</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Butter Chicken", price: 360, img: curry },
            { name: "Tandoori Platter", price: 520, img: tandoori },
            { name: "Prawns Pepper Fry", price: 480, img: seafood },
          ].map((d, i) => (
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="card-soft overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={d.img} alt={d.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="font-display text-xl">{d.name}</h3>
                  <div className="text-sm text-muted-foreground">Signature dish</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-spice">₹{d.price}</div>
                  <Link to="/menu" className="text-xs font-semibold text-forest">Add to cart →</Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-20 w-[min(1200px,94%)]">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[color:var(--deepred)] p-10 text-cream md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[color:var(--spice)]/40 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl md:text-5xl">Hungry already? Order in one tap.</h2>
              <p className="mt-3 text-cream/80">Send your order on WhatsApp and we'll confirm in minutes.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a href="https://wa.me/919493353838" target="_blank" rel="noreferrer" className="rounded-full px-6 py-3 text-sm font-semibold text-cream" style={{ background: "var(--fresh)" }}>Order on WhatsApp</a>
              <Link to="/menu" className="rounded-full px-6 py-3 text-sm font-semibold btn-gold">Browse Menu</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
