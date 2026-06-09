import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart, GST_RATE, DELIVERY_FEE, buildWhatsAppOrder } from "@/lib/cart-store";
import { Minus, Plus, Trash2, ShoppingBag, ClipboardCopy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Spice Inn" }, { name: "description", content: "Review your Spice Inn cart and place your order." }] }),
  component: CartPage,
});

function CartPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState<"Dine-in" | "Takeaway" | "Delivery">("Delivery");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash");
  const [notes, setNotes] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [waUrl, setWaUrl] = useState("");

  const subtotal = cart.subtotal();
  const gst = Math.round(subtotal * GST_RATE);
  const delivery = orderType === "Delivery" && subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + gst + delivery;

  const checkout = () => {
    if (cart.lines.length === 0) return toast.error("Your cart is empty");
    if (!name.trim() || !phone.trim()) return toast.error("Please enter name and phone");
    if (orderType === "Delivery" && !address.trim()) return toast.error("Please enter delivery address");
    const url = buildWhatsAppOrder({ name, phone, orderType, address, payment, notes, lines: cart.lines, subtotal, gst, delivery, total });
    setWaUrl(url);
    setDialogOpen(true);
  };

  const confirmSend = () => {
    cart.clear();
    setDialogOpen(false);
    toast.success("Order sent to WhatsApp!");
    setTimeout(() => navigate({ to: "/" }), 800);
  };

  if (cart.lines.length === 0) {
    return (
      <SiteLayout>
        <section className="mx-auto mt-10 w-[min(900px,94%)]">
          <div className="card-soft grid place-items-center p-16 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <h1 className="mt-4 font-display text-3xl">Your cart is empty</h1>
            <p className="mt-2 text-muted-foreground">Add some delicious dishes from our menu.</p>
            <Link to="/menu" className="mt-6 rounded-full px-6 py-3 text-sm font-semibold btn-gold">Browse Menu</Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto mt-6 grid w-[min(1200px,94%)] gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="card-soft p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-3xl">Your Cart</h1>
            <button onClick={() => { cart.clear(); toast("Cart cleared"); }} className="text-xs font-semibold text-spice hover:underline">Clear cart</button>
          </div>
          <div className="mt-6 divide-y divide-border">
            {cart.lines.map((l) => (
              <div key={l.item.id} className="flex items-center gap-4 py-4">
                <img src={l.item.image} alt={l.item.name} className="h-20 w-20 rounded-2xl object-cover" />
                <div className="flex-1">
                  <div className="font-semibold">{l.item.name}</div>
                  <div className="text-xs text-muted-foreground">{l.item.category}</div>
                  <div className="mt-1 text-sm font-bold text-spice">₹{l.item.price}</div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-secondary px-2 py-1">
                  <button onClick={() => cart.dec(l.item.id)} className="grid h-7 w-7 place-items-center rounded-full bg-card"><Minus className="h-3 w-3" /></button>
                  <span className="min-w-5 text-center text-sm font-semibold">{l.qty}</span>
                  <button onClick={() => cart.inc(l.item.id)} className="grid h-7 w-7 place-items-center rounded-full bg-card"><Plus className="h-3 w-3" /></button>
                </div>
                <div className="w-20 text-right font-semibold">₹{l.qty * l.item.price}</div>
                <button onClick={() => cart.remove(l.item.id)} className="grid h-9 w-9 place-items-center rounded-full text-spice hover:bg-secondary"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </div>

        <aside className="card-soft p-6 md:p-8">
          <h2 className="font-display text-2xl">Checkout</h2>
          <div className="mt-4 space-y-3">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-forest" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" inputMode="tel" className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-forest" />
            <div className="flex gap-2">
              {(["Dine-in", "Takeaway", "Delivery"] as const).map((t) => (
                <button key={t} onClick={() => setOrderType(t)} className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold ${orderType === t ? "bg-forest text-cream" : "bg-secondary"}`}>{t}</button>
              ))}
            </div>
            {orderType === "Delivery" && (
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Delivery address" rows={2} className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest" />
            )}
            <select value={payment} onChange={(e) => setPayment(e.target.value)} className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm">
              <option>Cash</option><option>Google Pay</option><option>Card</option>
            </select>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes (optional)" rows={2} className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest" />
          </div>

          <div className="mt-5 space-y-1.5 border-t border-border pt-4 text-sm">
            <Row label="Subtotal" value={`₹${subtotal}`} />
            <Row label={`GST (${Math.round(GST_RATE * 100)}%)`} value={`₹${gst}`} />
            <Row label="Delivery" value={delivery ? `₹${delivery}` : "Free"} />
            <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-base font-bold">
              <span>Total</span><span className="text-spice">₹{total}</span>
            </div>
          </div>

          <button onClick={checkout} className="mt-5 w-full rounded-full px-6 py-3 text-sm font-semibold btn-gold">
            Place Order via WhatsApp
          </button>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">You'll be redirected to WhatsApp to confirm your order.</p>
        </aside>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Confirm your order</DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-4 text-sm">
            <p className="text-muted-foreground">
              Tap <strong>Open WhatsApp</strong> to send your order via wa.me. If WhatsApp is
              blocked in this browser, scan the QR code below with your phone instead.
            </p>
            <div className="flex gap-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                onClick={confirmSend}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold btn-gold"
              >
                <ExternalLink className="h-4 w-4" /> Open WhatsApp
              </a>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(waUrl);
                    toast.success("WhatsApp link copied!");
                  } catch {
                    toast.error("Could not copy link automatically");
                  }
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-4 py-3 text-sm font-semibold hover:bg-secondary/80"
              >
                <ClipboardCopy className="h-4 w-4" /> Copy Link
              </button>
            </div>
            {waUrl && (
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-secondary/40 p-4">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(waUrl)}`}
                  alt="WhatsApp order QR code"
                  width={220}
                  height={220}
                  className="rounded-xl bg-white p-2"
                />
                <p className="text-center text-xs text-muted-foreground">
                  Scan with your phone camera to open WhatsApp with your order pre-filled.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground"><span>{label}</span><span className="font-medium text-foreground">{value}</span></div>
  );
}
