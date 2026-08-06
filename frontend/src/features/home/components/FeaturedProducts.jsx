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
    <section id="featured-products" className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black tracking-normal text-[#17233f]">Featured Products</h2>
        <Link
          to="/marketplace"
          className="hidden items-center gap-2 text-sm font-extrabold text-[#178f95] transition hover:text-[#12757a] sm:inline-flex"
        >
          View all products
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
      </div>

      {message && (
        <p className="mb-4 rounded-2xl border border-[#178f95]/30 bg-[#f6fbfb] px-4 py-3 text-sm font-semibold text-[#178f95]">
          {message}
        </p>
      )}

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-2xl border border-[#e5e7eb] bg-[#f6fbfb]"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="rounded-[24px] bg-[#f6fbfb] p-8 text-center text-sm font-semibold text-slate-500">
          No products listed yet — check back soon.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const isWishlisted = wishlistIds.includes(product._id);

            return (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="group relative rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
              >
                {/* Wishlist heart — every product on the home page can be saved too */}
                <button
                  type="button"
                  onClick={(e) => handleToggleWishlist(e, product._id)}
                  aria-label="Toggle wishlist"
                  className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition ${
                    isWishlisted ? "bg-red-500 text-white" : "bg-white text-slate-400 hover:text-red-500"
                  }`}
                >
                  <Icon name="heart" className="h-3.5 w-3.5" filled={isWishlisted} />
                </button>

                <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-[#f6fbfb]">
                  <ProductImageCard
                    product={product}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="min-w-0">
                      <h3 className="line-clamp-1 text-sm font-black text-[#17233f]">
                        {product.title}
                      </h3>
                      <p className="mt-1 text-xs font-medium capitalize text-[#64748b]">
                        {getCategoryLabel(product.category)}
                      </p>
                    </span>
                  </div>
                  <div className="mt-3 flex items-end gap-2">
                    {product.discountPrice ? (
                      <>
                        <span className="text-lg font-black text-[#178f95]">
                          Rs. {product.discountPrice}
                        </span>
                        <span className="pb-0.5 text-xs font-semibold text-slate-400 line-through">
                          Rs. {product.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-black text-[#178f95]">Rs. {product.price}</span>
                    )}
                  </div>
                  {product.seller?.storeProfile?.storeName && (
                    <p className="mt-2 text-xs font-semibold text-slate-400">
                      Sold by {product.seller.storeProfile.storeName}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
