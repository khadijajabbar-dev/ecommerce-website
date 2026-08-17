import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getActiveFlashSalesAPI } from "../../../api/flashSale.api";
import { Icon, ProductImageCard, PublicFooter, PublicNavbar } from "../../../shared/components";

const getTimeLeft = (targetDate) => {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    total: diff,
  };
};

const pad = (num) => String(num).padStart(2, "0");

// Small per-card countdown so each deal shows its own remaining time,
// without forcing the whole page to re-render every second.
const DealCountdown = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(endDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(endDate)), 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  if (timeLeft.total <= 0) {
    return <span className="text-[11px] font-bold text-muted">Deal ended</span>;
  }

  return (
    <div className="flex items-center gap-1 text-[11px] font-black text-primary">
      <Icon name="bolt" className="h-3.5 w-3.5 fill-accent text-accent" />
      {timeLeft.days > 0 && <span>{timeLeft.days}d</span>}
      <span>{pad(timeLeft.hours)}h</span>
      <span>{pad(timeLeft.minutes)}m</span>
      <span>{pad(timeLeft.seconds)}s</span>
      <span className="font-semibold text-muted">left</span>
    </div>
  );
};

const FlashSalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const result = await getActiveFlashSalesAPI();
        setSales(result.sales || []);
      } catch (err) {
        setError(err.message || "Failed to load flash sales");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Earliest-ending sale drives the hero banner countdown.
  const heroEndDate = useMemo(() => {
    if (sales.length === 0) return null;
    return sales.reduce(
      (earliest, sale) =>
        new Date(sale.endDate).getTime() < new Date(earliest).getTime() ? sale.endDate : earliest,
      sales[0].endDate
    );
  }, [sales]);

  return (
    <main className="min-h-screen bg-[#fbfdfc] text-[#17233f]">
      <PublicNavbar activePage="Flash Sales" />

      <section className="relative overflow-hidden bg-primary">
        <span className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-card/10" />
        <span className="pointer-events-none absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-card/10" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-primary shadow-sm">
              <Icon name="bolt" className="h-3.5 w-3.5 fill-primary" />
              Flash Sales
            </span>
            <h1 className="mt-5 max-w-2xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              Live deals from every seller, all in one place.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
              These are limited-time, limited-stock discounts posted directly by our sellers. Grab
              them before the timer runs out.
            </p>

            {heroEndDate && (
              <div className="mt-7 inline-flex flex-col items-start gap-2 rounded-2xl bg-card px-6 py-4 shadow-xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-heading">
                  Next deal ends in
                </span>
                <DealCountdown endDate={heroEndDate} />
              </div>
            )}
          </div>
          
          <div className="hidden lg:flex justify-end items-center h-full">
            <img 
              src="/flash-sales-hero-img.png" 
              alt="Flash Sales" 
              className="w-full max-w-[550px] h-full max-h-[350px] object-contain drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="h-64 animate-pulse rounded-2xl border border-[#e5e7eb] bg-alt" />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && sales.length === 0 && (
          <div className="rounded-[24px] bg-alt p-10 text-center">
            <h3 className="text-xl font-extrabold text-[#17233f]">No flash sales right now</h3>
            <p className="mt-2 text-sm font-semibold text-body">
              Sellers haven&apos;t posted any active flash sales at the moment — check back soon,
              or browse the full marketplace instead.
            </p>
            <Link
              to="/marketplace"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-extrabold text-white transition hover:bg-primary"
            >
              Explore Marketplace
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        )}

        {!loading && !error && sales.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {sales.map((sale) => {
              const price = sale.product?.price || 0;
              const discountPrice = (price * (1 - sale.discountPercent / 100)).toFixed(0);

              return (
                <Link
                  key={sale._id}
                  to={`/product/${sale.product?._id}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-card p-4 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-page">
                    <span className="absolute left-0 top-0 z-10 rounded-lg bg-accent px-2 py-1 text-xs font-black text-white">
                      -{sale.discountPercent}%
                    </span>
                    <ProductImageCard
                      product={sale.product}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      fallbackIconClassName="h-10 w-10 text-primary/40"
                    />
                  </div>

                  <div className="mt-3 flex flex-1 flex-col justify-between">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">
                        {sale.seller?.storeProfile?.storeName || "EasyMart Store"}
                      </span>
                      <h3 className="mt-1 line-clamp-2 text-sm font-bold text-heading">
                        {sale.product?.title}
                      </h3>
                    </div>

                    <div className="mt-2.5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-black text-primary">Rs. {discountPrice}</span>
                        <span className="text-xs font-semibold text-muted line-through">
                          Rs. {price}
                        </span>
                      </div>
                      <div className="mt-1.5">
                        <DealCountdown endDate={sale.endDate} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <PublicFooter />
    </main>
  );
};

export default FlashSalesPage;
