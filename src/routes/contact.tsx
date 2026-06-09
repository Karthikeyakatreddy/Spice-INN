import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Phone, MessageCircle, MapPin, Clock, Car, Navigation } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Spice Inn Vijayawada" },
      { name: "description", content: "Call, WhatsApp, or visit Spice Inn at Guru Nanak Colony, Vijayawada. Open daily 11AM–11PM. Free parking." },
    ],
  }),
  component: ContactPage,
});

const ADDRESS = "r.r. gardens, 59A, 21-3/3, High School Rd, Guru Nanak Colony, Vijayawada, Andhra Pradesh 520007";

function ContactPage() {
  const mapsQuery = encodeURIComponent(ADDRESS);
  return (
    <SiteLayout>
      <section className="mx-auto mt-6 grid w-[min(1200px,94%)] gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="card-soft p-8">
          <div className="text-xs uppercase tracking-widest text-spice">Contact</div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Visit us in Vijayawada</h1>
          <p className="mt-3 text-muted-foreground">We'd love to host you. Dine-in, takeaway or delivery — your call.</p>

          <div className="mt-6 space-y-4 text-sm">
            <Item icon={<MapPin className="h-4 w-4" />} title="Address">{ADDRESS}</Item>
            <Item icon={<Phone className="h-4 w-4" />} title="Phone">+91 94933 53838</Item>
            <Item icon={<Clock className="h-4 w-4" />} title="Opening Hours">Daily · 11:00 AM – 11:00 PM</Item>
            <Item icon={<Car className="h-4 w-4" />} title="Parking">Free parking available on premises</Item>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <a href="tel:+919493353838" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold btn-forest"><Phone className="h-4 w-4" /> Call</a>
            <a href="https://wa.me/919493353838" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-cream" style={{ background: "var(--fresh)" }}><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold btn-gold"><Navigation className="h-4 w-4" /> Directions</a>
          </div>
        </div>

        <div className="card-soft overflow-hidden">
          <iframe
            title="Spice Inn location"
            src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
            className="h-full min-h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </SiteLayout>
  );
}

function Item({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[color:var(--gold)]/20 text-spice">{icon}</div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
        <div className="mt-0.5 font-medium text-foreground">{children}</div>
      </div>
    </div>
  );
}
