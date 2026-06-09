import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem } from "./menu-data";

export type CartLine = { item: MenuItem; qty: number };

type CartState = {
  lines: CartLine[];
  add: (item: MenuItem) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (item) =>
        set((s) => {
          const ex = s.lines.find((l) => l.item.id === item.id);
          if (ex) return { lines: s.lines.map((l) => (l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l)) };
          return { lines: [...s.lines, { item, qty: 1 }] };
        }),
      remove: (id) => set((s) => ({ lines: s.lines.filter((l) => l.item.id !== id) })),
      inc: (id) => set((s) => ({ lines: s.lines.map((l) => (l.item.id === id ? { ...l, qty: l.qty + 1 } : l)) })),
      dec: (id) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (l.item.id === id ? { ...l, qty: l.qty - 1 } : l))
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((a, l) => a + l.qty, 0),
      subtotal: () => get().lines.reduce((a, l) => a + l.qty * l.item.price, 0),
    }),
    { name: "spiceinn-cart" }
  )
);

export const WA_PHONE = "919493353838";
export const GST_RATE = 0.05;
export const DELIVERY_FEE = 40;

export function buildWhatsAppOrder(opts: {
  name: string;
  phone: string;
  orderType: "Dine-in" | "Takeaway" | "Delivery";
  address?: string;
  payment: string;
  notes?: string;
  lines: CartLine[];
  subtotal: number;
  gst: number;
  delivery: number;
  total: number;
}) {
  const items = opts.lines
    .map((l, i) => `${i + 1}. ${l.item.name} x ${l.qty} - ₹${l.item.price * l.qty}`)
    .join("\n");
  const msg = `Hello Spice Inn,
I want to place an order.

Customer Name: ${opts.name}
Phone: ${opts.phone}
Order Type: ${opts.orderType}
${opts.orderType === "Delivery" ? `Address: ${opts.address ?? ""}` : ""}

Order Items:
${items}

Subtotal: ₹${opts.subtotal}
GST: ₹${opts.gst}
Delivery Charge: ₹${opts.delivery}
Total: ₹${opts.total}

Payment Method: ${opts.payment}
Notes: ${opts.notes ?? "-"}

Please confirm my order.`;
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
}
