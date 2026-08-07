import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getActiveFlashSalesAPI } from "../../../api/flashSale.api";
import { Icon, Card, ProductImageCard } from "../../../shared/components";

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

const FlashSaleSection = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });

  useEffect(() => {
    (async () => {
      try {
        const result = await getActiveFlashSalesAPI();
        const activeSales = result.sales || [];
        setSales(activeSales);

        if (activeSales.length > 0) {
          const endTimes = activeSales.map((s) => new Date(s.endDate).getTime());
          const nextTarget = Math.min(...endTimes);

          const updateTimer = () => {
            const time = getTimeLeft(nextTarget);
            setTimeLeft(time);
          };

          updateTimer();
          const interval = setInterval(updateTimer, 1000);
          return () => clearInterval(interval);
        }
      } catch (err) {
        console.error("Failed to load flash sales:", err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || sales.length === 0) return null;

  return (
    <section className="w-full">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-heading flex items-center gap-2">
            <Icon name="bolt" className="h-6 w-6 text-accent fill-accent" />
            Flash Deals
          </h2>
          <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1 rounded-full border border-red-100 hidden sm:flex">
            <span className="text-sm font-bold text-red-600">Ends in:</span>
            <div className="flex items-center gap-1 text-sm font-bold text-red-600">
              <span className="bg-red-600 text-white px-1.5 rounded text-xs py-0.5">{pad(timeLeft.hours)}</span>
              <span>:</span>
              <span className="bg-red-600 text-white px-1.5 rounded text-xs py-0.5">{pad(timeLeft.minutes)}</span>
              <span>:</span>
              <span className="bg-red-600 text-white px-1.5 rounded text-xs py-0.5">{pad(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>
        <Link
          to="/flash-sales"
          className="text-[13px] font-semibold text-primary hover:text-primary"
        >
          View all
        </Link>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {sales.slice(0, 4).map((sale) => {
          const price = sale.product?.price || 0;
          const discountPrice = (price * (1 - sale.discountPercent / 100)).toFixed(0);

          return (
            <Card
              key={sale._id}
              className="group overflow-hidden bg-card p-4 hover:shadow-xl transition-all duration-300 flex flex-col justify-between rounded-xl border border-border-main"
            >
              <div className="relative">
                {/* Discount percentage tag */}
                <span className="absolute left-2 top-2 z-10 rounded bg-accent px-2 py-1 text-xs font-bold text-white">
                  -{sale.discountPercent}%
                </span>

                <Link to={`/product/${sale.product?._id}`} className="block aspect-square overflow-hidden rounded-lg bg-page mb-4">
                  <ProductImageCard
                    product={sale.product}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    fallbackIconClassName="h-12 w-12 text-muted"
                  />
                </Link>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    to={`/product/${sale.product?._id}`}
                    className="block font-medium text-heading hover:text-primary transition line-clamp-2 text-sm mb-1"
                  >
                    {sale.product?.title}
                  </Link>

                  {/* Star Rating Placeholder */}
                  <div className="flex items-center gap-1 text-accent mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="star" className="h-3 w-3 fill-current" />
                    ))}
                    <span className="text-xs text-muted ml-1">(120)</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-primary">Rs. {discountPrice}</span>
                    <span className="text-xs text-muted line-through">Rs. {price}</span>
                  </div>
                  <button className="h-8 w-8 rounded-full bg-alt text-primary flex items-center justify-center hover:bg-primary hover:text-white transition">
                    <Icon name="cart" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default FlashSaleSection;
