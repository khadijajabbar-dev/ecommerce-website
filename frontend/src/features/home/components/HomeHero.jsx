import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../../shared/components";

const slides = [
  {
    tag: "Your one-stop marketplace",
    title: (
      <>
        Shop smarter, <br />
        <span className="text-[#0f766e]">every day.</span>
      </>
    ),
    subtitle: "Discover quality products, unbeatable deals, and a seamless shopping experience.",
    image: "/summer_collection_hero.png",
  },
  {
    tag: "Latest Technology",
    title: (
      <>
        Upgrade Your Life, <br />
        <span className="text-[#0f766e]">effortlessly.</span>
      </>
    ),
    subtitle: "Premium gadgets, smart devices, and accessories designed for today.",
    image: "/tech_collection_hero.png",
  },
  {
    tag: "Modern Home Decor",
    title: (
      <>
        Elevate Your Space, <br />
        <span className="text-[#0f766e]">beautifully.</span>
      </>
    ),
    subtitle: "Minimalist furniture, smart lighting, and aesthetic home items.",
    image: "/home_collection_hero.png",
  },
];

const HomeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Autoplay Slider every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#ebf6f5] via-[#f3f9f9] to-[#ebf6f6] py-12 lg:py-16">
      {/* Abstract Background Shapes */}
      <div className="absolute -left-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#dbeceb] opacity-40 blur-2xl" />
      <div className="absolute -right-20 top-10 h-96 w-96 rounded-full bg-[#e3f2f1] opacity-60 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 min-h-[350px]">
          {/* Text Content */}
          <div className="lg:col-span-5 text-center lg:text-left transition-all duration-500 ease-in-out">
            <span className="inline-flex items-center rounded-full bg-[#0f766e]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0f766e]">
              {slide.tag}
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight text-[#17233f] sm:text-5xl lg:text-6xl min-h-[120px]">
              {slide.title}
            </h1>
            <p className="mt-4 text-base font-semibold leading-relaxed text-slate-500 max-w-md mx-auto lg:mx-0 min-h-[50px]">
              {slide.subtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a
                href="#featured-products"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[#0f766e] px-8 text-sm font-extrabold text-white shadow-lg shadow-[#0f766e]/20 transition hover:-translate-y-0.5 hover:bg-[#115e59]"
              >
                Shop Now
                <Icon name="arrowRight" className="h-5 w-5" />
              </a>
              <Link
                to="/marketplace"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#0f766e]/30 bg-white px-8 text-sm font-extrabold text-[#0f766e] transition hover:-translate-y-0.5 hover:bg-[#f6fbfb]"
              >
                Explore Marketplace
              </Link>
            </div>
          </div>

          {/* Premium Product Image Showcase */}
          <div className="lg:col-span-7 relative flex justify-center items-center">
            {/* Dots Pattern */}
            <div className="absolute left-6 bottom-6 flex gap-2 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-[#0f766e] w-6" : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Slider Left Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
              aria-label="Previous slide"
            >
              <span className="text-xl font-bold">‹</span>
            </button>

            {/* Main Visual Image container */}
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-white border border-[#dbeceb] transition-all duration-500 ease-in-out">
              <img
                src={slide.image}
                alt={slide.tag}
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Slider Right Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
              aria-label="Next slide"
            >
              <span className="text-xl font-bold">›</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
