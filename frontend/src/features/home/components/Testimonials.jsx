import { Link } from "react-router-dom";
import { Icon } from "../../../shared/components";

// Static testimonials — there's no review/rating system tied to real orders
// yet, so these are illustrative placeholder quotes matching the site's tone.
const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    rating: 4.5,
    quote: "Amazing quality and fast delivery. Highly recommend ShopEase!",
    initials: "SJ",
    color: "bg-[#fde8df] text-[#c65e45]",
  },
  {
    name: "Michael Brown",
    rating: 5,
    quote: "Best shopping experience ever. Great products and support.",
    initials: "MB",
    color: "bg-[#e8f1ff] text-[#355f99]",
  },
  {
    name: "Emily Davis",
    rating: 4.5,
    quote: "I love the variety and discounts. I always find what I need.",
    initials: "ED",
    color: "bg-[#fdecef] text-[#bd5555]",
  },
  {
    name: "David Wilson",
    rating: 4.5,
    quote: "Trusted store with authentic products. Will shop again!",
    initials: "DW",
    color: "bg-[#eef6e8] text-[#3f7d3a]",
  },
];

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => {
        const filled = star <= Math.floor(rating);
        const half = !filled && star - rating < 1 && star - rating > 0;
        return (
          <span key={star} className="relative inline-block h-4 w-4">
            <Icon name="star" className="absolute inset-0 h-4 w-4 text-slate-200" filled />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: half ? "50%" : "100%" }}
              >
                <Icon name="star" className="h-4 w-4 text-accent" filled />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black tracking-normal text-[#17233f]">
          What Our Customers Say
        </h2>
        <Link
          to="/marketplace"
          className="hidden items-center gap-2 text-sm font-extrabold text-primary transition hover:text-primary sm:inline-flex"
        >
          View All
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="flex flex-col justify-between rounded-2xl border border-border-main bg-card p-5 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div>
              <StarRating rating={t.rating} />
              <p className="mt-3 text-sm leading-6 text-body">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-black ${t.color}`}
              >
                {t.initials}
              </span>
              <span className="text-sm font-bold text-heading">{t.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;