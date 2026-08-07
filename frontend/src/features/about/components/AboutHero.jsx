import { Link } from "react-router-dom";
import { Icon } from "../../../shared/components";

const AboutHero = () => {
  return (
    <section className="overflow-hidden bg-primary">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-xl bg-card px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
            About Easy Mart
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-normal text-white sm:text-5xl lg:text-6xl">
            We make online shopping simple, smart, and reliable.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/90">
            Easy Mart helps you discover quality products from trusted sellers
            with secure payments and fast delivery, every time.
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/marketplace"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-primary px-8 text-sm font-extrabold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary"
            >
              Explore Marketplace
              <Icon name="arrowRight" className="h-5 w-5" />
            </Link>
            <a
              href="#contact-us"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-primary/45 bg-card px-8 text-sm font-extrabold text-primary transition hover:-translate-y-0.5 hover:bg-alt"
            >
              Contact Us
              <Icon name="arrowRight" className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="relative flex justify-center items-center h-full min-h-[350px] sm:min-h-[430px]">
          <img 
            src="/about-banner.png" 
            alt="About Easy Mart" 
            className="w-full max-w-[500px] h-auto object-contain drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500 mix-blend-normal"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
