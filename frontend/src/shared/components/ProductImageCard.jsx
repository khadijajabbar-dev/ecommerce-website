import { useState } from "react";
import Icon from "./Icon";

// Accepts a `product` object directly (reads product.images[], falling back
// to the legacy product.imageUrl) so every card can be updated with a single
// prop instead of re-deriving the slide list in each place it's used.
const ProductImageCard = ({
  product,
  alt,
  className = "h-full w-full object-cover",
  fallbackIcon = "bag",
  fallbackIconClassName = "h-14 w-14 text-primary/40",
}) => {
  const [current, setCurrent] = useState(0);

  const slides =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images
      : product?.imageUrl
      ? [product.imageUrl]
      : [];

  if (slides.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Icon name={fallbackIcon} className={fallbackIconClassName} />
      </div>
    );
  }

  const stop = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const goPrev = (event) => {
    stop(event);
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  };

  const goNext = (event) => {
    stop(event);
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  };

  return (
    <div className="group/slider relative h-full w-full overflow-hidden">
      <img src={slides[current]} alt={alt || product?.title} loading="lazy" className={className} />

      {slides.length > 1 && (
        <>
          {/* Prev / Next arrows — same look as the homepage hero slider:
              solid white circle, soft shadow, always visible */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-card text-body shadow-md transition hover:bg-page hover:text-heading"
          >
            <span className="text-sm font-bold leading-none">‹</span>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-card text-body shadow-md transition hover:bg-page hover:text-heading"
          >
            <span className="text-sm font-bold leading-none">›</span>
          </button>

          {/* Dot indicators — active dot stretches into a teal pill, same as the hero slider */}
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(event) => {
                  stop(event);
                  setCurrent(i);
                }}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full shadow transition-all duration-300 ${
                  i === current ? "w-4 bg-primary" : "w-1.5 bg-card/80 hover:bg-card"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductImageCard;
