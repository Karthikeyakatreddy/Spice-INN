import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const count = useCart((s) => s.lines.reduce((a, l) => a + l.qty, 0));
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-4 z-50 mx-auto w-[min(1200px,94%)]"
    >
      <nav className="flex items-center justify-between rounded-full border border-border bg-card/85 px-3 py-2 pl-6 backdrop-blur-xl shadow-soft">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-full btn-forest">
            <span className="font-display text-lg text-cream">S</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg text-foreground">Spice Inn</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Multi Cuisine</div>
          </div>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "rounded-full px-4 py-2 text-sm font-medium bg-forest text-cream" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground transition hover:bg-secondary/70"
            aria-label="Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-spice px-1 text-[10px] font-semibold text-cream">
                {count}
              </span>
            )}
          </Link>
          <Link to="/menu" className="hidden rounded-full px-4 py-2 text-sm font-semibold btn-gold sm:inline-flex">
            Order Now
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full bg-secondary md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 rounded-3xl border border-border bg-card p-3 shadow-soft md:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-medium hover:bg-secondary"
            >
              {l.label}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
