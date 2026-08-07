import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const heroImages = [
  "/hero-1.png",
  "/hero-2.png",
  "/hero-3.png"
];

const HomeHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="bg-page pt-2 pb-12 lg:pt-4 lg:pb-20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-alt rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-alt rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/3"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center lg:items-start lg:pt-8">
          
          {/* Text Content */}
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 bg-alt text-primary text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
              Big Savings
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-heading leading-[1.1] mb-6">
              Shop from Multiple Sellers, One Trusted Marketplace
            </h1>
            <p className="text-lg text-body mb-8 leading-relaxed">
              Discover millions of products at the best prices from trusted sellers around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/marketplace" 
                className="inline-flex justify-center items-center px-8 py-3.5 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative flex justify-center lg:justify-end h-[400px] sm:h-[550px] w-full mt-10 lg:mt-0">
            <div className="relative w-full max-w-[700px] h-full rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/50">
              {heroImages.map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt={`Hero display ${idx + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    idx === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
