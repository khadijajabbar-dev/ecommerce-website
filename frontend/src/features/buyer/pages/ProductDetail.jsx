import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import buyerProductService from "../services/product.service";
import cartService from "../services/cart.service";
import { getSocket } from "../../../lib/socket";
import { Alert, Button, Card, Icon, PublicNavbar, PublicFooter } from "../../../shared/components";
import { getCategoryLabel } from "../../../shared/constants/categories";

// --- Image Slider ------------------------------------------------------------
// Shows all product images with prev/next arrows and dot indicators.
// Falls back gracefully to a single imageUrl or a "No image" placeholder.
const ImageSlider = ({ images = [], title = "" }) => {
  const [current, setCurrent] = useState(0);

  // Normalise: prefer images[], fall back to nothing
  const slides = images.length > 0 ? images : [];

  if (slides.length === 0) {
    return (
      <div className="flex min-h-[320px] items-center justify-center bg-alt text-muted">
        No image available
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  return (
    <div className="relative select-none overflow-hidden bg-alt">
      {/* Main image */}
      <img
        key={current}
        src={slides[current]}
        alt={`${title} - image ${current + 1}`}
        className="max-h-[480px] min-h-[320px] w-full object-cover transition-opacity duration-300"
      />

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card text-body shadow-md transition hover:bg-page hover:text-heading"
          >
            <span className="text-xl font-bold leading-none">‹</span>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card text-body shadow-md transition hover:bg-page hover:text-heading"
          >
            <span className="text-xl font-bold leading-none">›</span>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`h-2.5 rounded-full shadow transition-all duration-300 ${
                i === current
                  ? "w-6 bg-primary"
                  : "w-2.5 bg-card/80 hover:bg-card"
              }`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail strip */}
      {slides.length > 1 && (
        <div className="flex gap-2 overflow-x-auto bg-page p-3">
          {slides.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Thumbnail ${i + 1}`}
              className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                i === current
                  ? "border-primary"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
// -----------------------------------------------------------------------------

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isBuyer = Boolean(token && role === "buyer");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const requireLogin = (nextPath) => {
    navigate(`/login?redirect=${encodeURIComponent(nextPath)}`);
  };

  const fetchProduct = async () => {
    setError("");
    try {
      const result = await buyerProductService.getProductById(id);
      setProduct(result.product);
    } catch (err) {
      setError(err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const checkWishlist = async () => {
    if (!isBuyer) return;
    try {
      const result = await cartService.getWishlist();
      setIsWishlisted((result.wishlist || []).some((p) => p._id === id));
    } catch {
      // non-critical
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([fetchProduct(), checkWishlist()]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isBuyer]);

  // Live stock updates
  useEffect(() => {
    const socket = getSocket();
    const handleStockUpdate = ({ productId, stock, isActive }) => {
      if (String(productId) !== String(id)) return;
      setProduct((current) => (current ? { ...current, stock, isActive } : current));
    };

    if (token) socket.auth = { token };
    socket.connect();
    socket.on("product:stock", handleStockUpdate);

    return () => {
      socket.off("product:stock", handleStockUpdate);
    };
  }, [id, token]);

  const handleAddToCart = async () => {
    if (!isBuyer) { requireLogin(`/product/${id}`); return; }
    setActionMessage("");
    try {
      await cartService.addToCart(id, quantity);
      setActionMessage("Added to cart!");
    } catch (err) {
      setActionMessage(err.message || "Failed to add to cart");
    }
  };

  const handleBuyNow = () => {
    if (!isBuyer) { requireLogin(`/buy-now/${id}`); return; }
    navigate(`/buy-now/${id}`);
  };

  const handleToggleWishlist = async () => {
    if (!isBuyer) { requireLogin(`/product/${id}`); return; }
    try {
      const result = await cartService.toggleWishlist(id);
      setIsWishlisted(Boolean(result.wishlisted));
    } catch (err) {
      setActionMessage(err.message || "Failed to update wishlist");
    }
  };

  // Build the images array - prefer the new images[] field, fall back to
  // the legacy imageUrl so existing products still show correctly.
  const getProductImages = (p) => {
    if (Array.isArray(p.images) && p.images.length > 0) return p.images;
    if (p.imageUrl) return [p.imageUrl];
    return [];
  };

  const price = product?.discountPrice ?? product?.price;

  return (
    <main className="min-h-screen bg-page text-heading">
      <PublicNavbar activePage="Marketplace" />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary"
        >
          <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
          Back
        </button>

        {loading && (
          <Card className="p-10 text-center text-sm font-semibold text-body">
            Loading product...
          </Card>
        )}

        {!loading && error && <Alert variant="error">{error}</Alert>}

        {!loading && product && (
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            {/* -- Image slider -- */}
            <Card className="overflow-hidden p-0">
              <ImageSlider
                images={getProductImages(product)}
                title={product.title}
              />
            </Card>

            {/* -- Product info -- */}
            <Card className="p-6 sm:p-8">
              <span className="inline-flex rounded-full bg-alt px-3 py-1 text-xs font-black text-primary">
                {getCategoryLabel(product.category)}
              </span>
              <h1 className="mt-4 text-3xl font-black text-heading">{product.title}</h1>
              <p className="mt-3 text-sm leading-7 text-body">
                {product.description || "No description provided for this product."}
              </p>

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <span className="text-3xl font-black text-primary">Rs. {price}</span>
                {product.discountPrice != null && product.discountPrice < product.price && (
                  <span className="text-lg font-semibold text-muted line-through">
                    Rs. {product.price}
                  </span>
                )}
              </div>

              <p className={`mt-3 text-sm font-bold ${product.stock > 0 ? "text-emerald-600" : "text-red-600"}`}>
                {product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}
                <span className="ml-2 text-xs font-semibold text-muted">(live)</span>
              </p>

              {product.seller?.storeProfile?.storeName && (
                <p className="mt-2 text-sm font-semibold text-body">
                  Sold by {product.seller.storeProfile.storeName}
                </p>
              )}

              {/* Brand */}
              {product.brand && (
                <p className="mt-2 text-sm font-semibold text-body">
                  Brand: <span className="font-bold text-slate-700">{product.brand}</span>
                </p>
              )}

              {/* Colors */}
              {Array.isArray(product.colors) && product.colors.length > 0 && (
                <div className="mt-3">
                  <p className="mb-2 text-sm font-semibold text-body">Available Colors</p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <span
                        key={c}
                        className="flex items-center gap-1.5 rounded-full border border-border-main bg-page px-3 py-1 text-xs font-bold text-slate-700"
                      >
                        <span
                          className="inline-block h-3 w-3 rounded-full border border-border-main"
                          style={{ backgroundColor: c.toLowerCase() }}
                        />
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {actionMessage && (
                <p className="mt-4 rounded-xl bg-alt px-4 py-3 text-sm font-semibold text-primary">
                  {actionMessage}
                </p>
              )}

              <div className="mt-6">
                <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="qty">
                  Quantity
                </label>
                <input
                  id="qty"
                  type="number"
                  min={1}
                  max={Math.max(1, product.stock || 1)}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                  className="h-11 w-28 rounded-xl border border-border-main px-3 text-sm font-semibold outline-none focus:border-primary"
                />
              </div>

              <div className="mt-6 grid gap-3">
                <Button size="lg" fullWidth variant="accent" onClick={handleBuyNow} disabled={product.stock <= 0}>
                  {isBuyer ? "Buy Now" : "Login to Buy"}
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  Add to Cart
                </Button>
                <Button size="lg" variant="ghost" fullWidth onClick={handleToggleWishlist}>
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>
              </div>

              {!isBuyer && (
                <p className="mt-4 text-center text-xs font-semibold text-muted">
                  Buying, cart and wishlist require a buyer login / signup.
                </p>
              )}
            </Card>
          </div>
        )}
      </div>

      <PublicFooter />
    </main>
  );
};

export default ProductDetail;
