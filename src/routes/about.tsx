import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Car, Utensils, Truck, Users, Wallet, Star } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Spice Inn Multi Cuisine Restaurant" },
      { name: "description", content: "Family-friendly multi-cuisine restaurant in Vijayawada. Dine-in, takeaway, delivery. Free parking. ₹200–₹1,200 per person." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="mx-auto mt-6 w-[min(1100px,94%)]">
        <div className="rounded-[2rem] bg-card p-8 shadow-soft md:p-14">
          <div className="text-xs uppercase tracking-widest text-spice">About Spice Inn</div>
          <h1 className="mt-2 font-display text-4xl md:text-6xl">Where every cuisine feels like home</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            From slow-cooked Hyderabadi biryani to coastal seafood, fiery Indo-Chinese and smoky tandoor —
            Spice Inn is a multi-cuisine kitchen serving Vijayawada with warmth, freshness and value.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-10 grid w-[min(1100px,94%)] gap-5 md:grid-cols-3">
        {[
          { Icon: Utensils, title: "Dine-in", desc: "Cozy seating for families & groups." },
          { Icon: Truck, title: "Delivery & Takeaway", desc: "Hot, sealed and delivered fresh." },
          { Icon: Car, title: "Free Parking", desc: "Hassle-free parking on premises." },
          { Icon: Users, title: "Family Friendly", desc: "Spacious, welcoming, all-ages." },
          { Icon: Wallet, title: "Great Value", desc: "₹200–₹1,200 per person across cuisines." },
          { Icon: Star, title: "4.7★ Rated", desc: "Loved by 399+ guests." },
        ].map(({ Icon, title, desc }) => (
          <div key={title} className="card-soft p-6">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--gold)]/20 text-spice">
              <Icon className="h-5 w-5" />
            </div>
            <div className="mt-4 font-display text-xl">{title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
