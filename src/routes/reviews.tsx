import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Spice Inn Multi Cuisine" },
      { name: "description", content: "4.7 stars from 399 guest reviews. Read what guests say about Spice Inn." },
    ],
  }),
  component: ReviewsPage,
});

const SEED = [
  { name: "Aarav S.", rating: 5, comment: "The Hyderabadi biryani was perfectly spiced and the tandoori platter was smoky-good. Will return!" },
  { name: "Priya R.", rating: 5, comment: "Best butter chicken in Vijayawada. Service was warm, parking was easy." },
  { name: "Karthik N.", rating: 4, comment: "Prawns pepper fry is a must-try. Cozy ambience and great value." },
  { name: "Meera T.", rating: 5, comment: "We took a family of 8 — everyone loved it. Veg options are also brilliant." },
  { name: "Rahul V.", rating: 4, comment: "Quick delivery on WhatsApp, food arrived hot and sealed. Highly recommend." },
  { name: "Sneha K.", rating: 5, comment: "Loved the paneer butter masala and Hakka noodles. Will definitely come back." },
];

function ReviewsPage() {
  const [reviews, setReviews] = useState(SEED);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const submit = () => {
    if (!name.trim() || !comment.trim()) return toast.error("Add your name and review");
    setReviews([{ name, rating, comment }, ...reviews]);
    setName(""); setComment(""); setRating(5);
    toast.success("Thanks for your review!");
  };

  return (
    <SiteLayout>
      <section className="mx-auto mt-6 w-[min(1100px,94%)]">
        <div className="grid items-center gap-8 rounded-[2rem] bg-card p-8 shadow-soft md:grid-cols-[auto_1fr] md:p-12">
          <div className="text-center">
            <div className="font-display text-7xl text-spice">4.7</div>
            <div className="mt-1 flex justify-center">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[color:var(--gold)] text-[color:var(--gold)]" />)}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">399 reviews</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-spice">Guest Reviews</div>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">Loved by Vijayawada</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">Real reviews from guests who dined and ordered with us.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-[min(1100px,94%)] gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <article key={i} className="card-soft p-6">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className={`h-3.5 w-3.5 ${j < r.rating ? "fill-[color:var(--gold)] text-[color:var(--gold)]" : "text-border"}`} />
              ))}
            </div>
            <p className="mt-3 text-sm text-foreground/90">"{r.comment}"</p>
            <div className="mt-4 text-xs font-semibold text-muted-foreground">— {r.name}</div>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-10 w-[min(1100px,94%)]">
        <div className="card-soft p-6 md:p-8">
          <h2 className="font-display text-2xl">Leave a review</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="h-11 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-forest" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button key={i} onClick={() => setRating(i + 1)} aria-label={`Rate ${i + 1}`}>
                  <Star className={`h-6 w-6 ${i < rating ? "fill-[color:var(--gold)] text-[color:var(--gold)]" : "text-border"}`} />
                </button>
              ))}
            </div>
          </div>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience…" rows={3} className="mt-3 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest" />
          <button onClick={submit} className="mt-3 rounded-full px-6 py-3 text-sm font-semibold btn-forest">Submit Review</button>
        </div>
      </section>
    </SiteLayout>
  );
}
