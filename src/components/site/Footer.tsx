import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-[color:var(--forest)] text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl">Spice Inn</div>
          <p className="mt-3 max-w-sm text-sm text-cream/80">
            Multi-cuisine flavours from Hyderabadi biryani to coastal seafood — freshly prepared in Vijayawada.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="tel:+919493353838" className="rounded-full bg-cream/10 px-4 py-2 text-sm font-medium hover:bg-cream/20">Call</a>
            <a href="https://wa.me/919493353838" target="_blank" rel="noreferrer" className="rounded-full bg-fresh px-4 py-2 text-sm font-semibold">WhatsApp</a>
          </div>
        </div>
        <div className="text-sm">
          <div className="mb-3 text-xs uppercase tracking-widest text-cream/60">Visit</div>
          <p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0" /> r.r. gardens, 59A, 21-3/3, High School Rd, Guru Nanak Colony, Vijayawada 520007</p>
          <p className="mt-3 flex gap-2"><Phone className="h-4 w-4" /> +91 94933 53838</p>
          <p className="mt-3 flex gap-2"><Clock className="h-4 w-4" /> 11:00 AM – 11:00 PM</p>
        </div>
        <div className="text-sm">
          <div className="mb-3 text-xs uppercase tracking-widest text-cream/60">Explore</div>
          <ul className="space-y-2">
            <li><Link to="/menu" className="hover:text-gold">Menu</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/reviews" className="hover:text-gold">Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} Spice Inn Multi Cuisine Restaurant. All rights reserved.
      </div>
    </footer>
  );
}
