import { Link } from "react-router-dom";
import { Icon } from "../../../shared/components";

// Three promo cards shown just below Featured Products on the home page.
// Each links straight into the marketplace, pre-filtered by category where
// that makes sense.
const PROMO_BANNERS = [
  {
    tag: "New Arrivals",
    tagColor: "text-[#c65e45]",
    heading: "Check Out The Latest Collection",
    bg: "bg-[#fde8df]",
    iconBg: "bg-white/70 text-[#c65e45]",
    icon: "bag",
    to: "/marketplace",
  },
  {
    tag: "Men's Collection",
    tagColor: "text-[#355f99]",
    heading: "Style Starts Here",
    bg: "bg-[#e8f1ff]",
    iconBg: "bg-white/70 text-[#355f99]",
    icon: "shirt",
    to: "/marketplace?category=fashion",
  },
  {
    tag: "Big Sale",
    tagColor: "text-[#3f7d3a]",
    heading: "Up To 50% Off On Selected Items",
    bg: "bg-[#eef6e8]",
    iconBg: "bg-white/70 text-[#3f7d3a]",
    icon: "sofa",
    to: "/marketplace?category=home",
  },
];

const PromoBanners = () => {
  return (
    <section id="promo-banners" className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROMO_BANNERS.map((banner) => (
          <Link
            key={banner.tag}
            to={banner.to}
            className={`group relative flex min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl ${banner.bg}`}
          >
            <div className="relative z-10 max-w-[70%]">
              <p className={`text-sm font-extrabold ${banner.tagColor}`}>{banner.tag}</p>
              <h3 className="mt-2 text-xl font-black leading-snug text-slate-900">
                {banner.heading}
              </h3>
            </div>

            <span className="relative z-10 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-slate-900 shadow transition group-hover:gap-3">
              Shop Now
              <Icon name="arrowRight" className="h-3.5 w-3.5" />
            </span>

            <span
              className={`absolute -bottom-6 -right-6 flex h-32 w-32 items-center justify-center rounded-full ${banner.iconBg}`}
            >
              <Icon name={banner.icon} className="h-14 w-14" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PromoBanners;
