import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProductsAPI } from "../../../api/product.api";
import { Icon } from "../../../shared/components";

// Countdown always rolls over to the coming Sunday at midnight — so the
// banner always reads "Deals of the Week" and never shows an expired timer.
const getWeekEndTarget = () => {
  const now = new Date();
  const target = new Date(now);
  const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
  target.setDate(now.getDate() + daysUntilSunday);
  target.setHours(23, 59, 59, 0);
  return target;
};

const getTimeLeft = (target) => {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const pad = (value) => String(value).padStart(2, "0");

const SpecialDeals = () => {
  const target = useMemo(() => getWeekEndTarget(), []);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tick the countdown every second
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  // Pick the product with the biggest real discount to feature
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await getFeaturedProductsAPI();
        const discounted = (result.products || [])
          .filter((p) => p.discountPrice && p.discountPrice < p.price)
          .sort((a, b) => {
            const discA = (a.price - a.discountPrice) / a.price;
            const discB = (b.price - b.discountPrice) / b.price;
            return discB - discA;
          });
        setDeal(discounted[0] || null);
      } catch {
        setDeal(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const discountPercent = deal
    ? Math.round(((deal.price - deal.discountPrice) / deal.price) * 100)
    : 60;

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#0f766e] via-[#0d9488] to-[#134e4a] shadow-xl shadow-[#0f766e]/20">
        {/* Decorative circles */}
        <span className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <span className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/10" />

        <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-2 lg:items-center lg:p-14">
          {/* Left: copy + countdown */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-amber-300">
              Limited Time Offer
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl">
              Special Deals <br className="hidden sm:block" />
              Of The Week
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/80">
              {deal
                ? `Save ${discountPercent}% on "${deal.title}" — and other hand-picked items across the marketplace.`
                : "Get up to 60% off on selected items across the marketplace. Hurry up, offer ends soon."}
            </p>

            {/* Countdown */}
            <div className="mt-7 flex gap-3">
              {timeUnits.map((unit) => (
                <div
                  key={unit.label}
                  className="flex w-16 flex-col items-center rounded-2xl bg-white/95 py-2.5 shadow-lg sm:w-20"
                >
                  <span className="text-xl font-black text-[#0f766e] sm:text-2xl">
                    {pad(unit.value)}
                  </span>
                  <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to={deal ? `/product/${deal._id}` : "/marketplace"}
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-7 text-sm font-extrabold text-[#0f766e] shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-50"
            >
              Shop Now
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>

          {/* Right: featured deal product + discount badge */}
          <div className="relative flex items-center justify-center py-4">
            <div className="flex h-56 w-56 items-center justify-center rounded-full bg-white/10 sm:h-72 sm:w-72">
              {!loading && deal?.imageUrl ? (
                <img
                  src={deal.imageUrl}
                  alt={deal.title}
                  className="h-44 w-44 rounded-2xl object-cover shadow-2xl sm:h-56 sm:w-56"
                />
              ) : (
                <Icon name="bag" className="h-24 w-24 text-white/60" />
              )}
            </div>

            {/* Discount badge */}
            <div className="absolute right-2 top-2 flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-white bg-white text-center shadow-xl sm:right-6 sm:top-4 sm:h-28 sm:w-28">
              <span className="text-[10px] font-bold uppercase text-slate-400">Up To</span>
              <span className="text-2xl font-black text-[#0f766e] sm:text-3xl">
                {discountPercent}%
              </span>
              <span className="text-[10px] font-bold uppercase text-slate-400">Off</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialDeals;