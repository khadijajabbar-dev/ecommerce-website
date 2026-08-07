import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProductsAPI } from "../../../api/product.api";
import cartService from "../../buyer/services/cart.service";
import { getCategoryLabel } from "../../../shared/constants/categories";
import { Icon, ProductImageCard } from "../../../shared/components";

// Home page shows a real, live sample pulled from every seller's listings —
// just enough to feel alive. The full, filterable catalog lives on
// /marketplace.
const HOME_PREVIEW_COUNT = 8;

const isLoggedIn = () => Boolean(localStorage.getItem("token"));
const isBuyer = () => localStorage.getItem("role") === "buyer";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wishlistIds, setWishlistIds] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const result = await getFeaturedProductsAPI();
        setProducts((result.products || []).slice(0, HOME_PREVIEW_COUNT));
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isLoggedIn() || !isBuyer()) return;
    (async () => {
      try {
        const result = await cartService.getWishlist();
        setWishlistIds((result.wishlist || []).map((p) => p._id));
      } catch {
        // non-critical
      }
    })();
  }, []);

  const handleToggleWishlist = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn() || !isBuyer()) {
      window.location.assign(`/login?redirect=${encodeURIComponent(`/product/${productId}`)}`);
      return;
    }
    try {
      const result = await cartService.toggleWishlist(productId);
      setWishlistIds((result.wishlist || []).map((p) => p._id));
    } catch (err) {
      setMessage(err.message || "Failed to update wishlist");
    }
  };

  return (
    <section className="w-full">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <h2 className="text-xl font-bold text-heading flex items-center gap-2">
          Top Selling Products
        </h2>
        <Link
          to="/marketplace"
          className="text-[13px] font-semibold text-primary hover:text-primary"
        >
          View all
        </Link>
      </div>

      {message && (
        <p className="mb-4 rounded-xl border border-border-main bg-alt px-4 py-3 text-sm font-semibold text-primary">
          {message}
        </p>
      )}

      {loading && (
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-xl border border-border-main bg-alt"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="rounded-xl bg-page border border-border-main p-8 text-center text-sm font-semibold text-body">
          No products listed yet — check back soon.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const isWishlisted = wishlistIds.includes(product._id);

            return (
              <div
                key={product._id}
                className="group relative rounded-xl border border-border-main bg-card p-4 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Wishlist heart */}
                <button
                  type="button"
                  onClick={(e) => handleToggleWishlist(e, product._id)}
                  aria-label="Toggle wishlist"
                  className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition bg-card/80 backdrop-blur ${
                    isWishlisted ? "text-red-500" : "text-muted hover:text-red-500"
                  }`}
                >
                  <Icon name="heart" className="h-3.5 w-3.5" filled={isWishlisted} />
                </button>

                <div className="relative mb-4">
                  <Link to={`/product/${product._id}`} className="block aspect-square overflow-hidden rounded-lg bg-page">
                    <ProductImageCard
                      product={product}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      fallbackIconClassName="h-12 w-12 text-muted"
                    />
                  </Link>
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      to={`/product/${product._id}`}
                      className="block font-medium text-heading hover:text-primary transition line-clamp-2 text-sm mb-1"
                    >
                      {product.title}
                    </Link>
                    
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2 line-clamp-1">
                      {getCategoryLabel(product.category)}
                    </p>

                    {/* Star Rating Placeholder */}
                    <div className="flex items-center gap-1 text-accent mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon key={i} name="star" className="h-3 w-3 fill-current" />
                      ))}
                      <span className="text-xs text-muted ml-1">(45)</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.discountPrice ? (
                        <>
                          <span className="text-[15px] font-bold text-primary">Rs. {product.discountPrice}</span>
                          <span className="text-xs text-muted line-through">Rs. {product.price}</span>
                        </>
                      ) : (
                        <span className="text-[15px] font-bold text-primary">Rs. {product.price}</span>
                      )}
                    </div>
                    <Link
                      to={`/product/${product._id}`} 
                      className="h-8 w-8 rounded-full bg-alt text-primary flex items-center justify-center hover:bg-primary hover:text-white transition"
                    >
                      <Icon name="cart" className="h-4 w-4" />
                    </Link>
                  </div>
                  
                  {product.seller?.storeProfile?.storeName && (
                    <p className="mt-3 text-[11px] font-semibold text-muted border-t border-border-main pt-2">
                      Sold by {product.seller.storeProfile.storeName}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
