import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getAllProductsAPI } from "../../../api/product.api";
import cartService from "../../buyer/services/cart.service";
import { CATEGORIES, getCategoryLabel } from "../../../shared/constants/categories";
import { Icon, Pagination, ProductImageCard, PublicFooter, PublicNavbar } from "../../../shared/components";

const PAGE_SIZE = 9;

const isLoggedIn = () => Boolean(localStorage.getItem("token"));
const isBuyer = () => localStorage.getItem("role") === "buyer";

const Marketplace = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const searchTerm = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [wishlistIds, setWishlistIds] = useState([]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getAllProductsAPI(page, PAGE_SIZE, activeCategory, searchTerm);
      setProducts(result.products || []);
      setTotalPages(result.pagination?.totalPages || 1);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [page, activeCategory, searchTerm]);

  useEffect(() => {
    (async () => {
      await loadProducts();
    })();
  }, [loadProducts]);

  // Only fetch the buyer's wishlist if they're actually logged in as a buyer
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

  const handleCategoryChange = (categoryValue) => {
    const next = new URLSearchParams();
    if (categoryValue !== "all") next.set("category", categoryValue);
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Browsing is public — buying, wishlisting, or adding to cart requires an
  // account, so unauthenticated shoppers get sent to login first.
  const handleBuyNow = (productId) => {
    if (!isLoggedIn()) {
      navigate(`/login?redirect=${encodeURIComponent(`/buy-now/${productId}`)}`);
      return;
    }
    navigate(`/buy-now/${productId}`);
  };

  const handleAddToCart = async (productId) => {
    if (!isLoggedIn() || !isBuyer()) {
      navigate(`/login?redirect=${encodeURIComponent(`/product/${productId}`)}`);
      return;
    }
    setCartMessage("");
    try {
      await cartService.addToCart(productId, 1);
      setCartMessage("Added to your cart.");
    } catch (err) {
      setCartMessage(err.message || "Failed to add to cart");
    }
  };

  const handleToggleWishlist = async (productId) => {
    if (!isLoggedIn() || !isBuyer()) {
      navigate(`/login?redirect=${encodeURIComponent(`/product/${productId}`)}`);
      return;
    }
    try {
      const result = await cartService.toggleWishlist(productId);
      setWishlistIds((result.wishlist || []).map((p) => p._id));
    } catch (err) {
      setCartMessage(err.message || "Failed to update wishlist");
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfdfc] text-[#17233f]">
      <PublicNavbar activePage="Marketplace" />

      <section className="bg-gradient-to-br from-white via-[#f7fcfc] to-[#fff7f1]">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <span className="inline-flex rounded-xl bg-[#dff3f2] px-4 py-2 text-sm font-extrabold text-[#178f95]">
            Easy Mart Marketplace
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.1] tracking-normal text-[#17233f] sm:text-5xl">
            Explore quality products without signing in.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#64748b]">
            Browse every category and every seller in one place. Login is only
            needed when you want to buy, save, or manage orders.
          </p>
        </div>
      </section>

      <section id="products" className="mx-auto w-full max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black text-[#178f95]">Public Marketplace</p>
            <h2 className="mt-1 text-3xl font-black tracking-normal text-[#17233f]">
              {searchTerm
                ? `Search results for "${searchTerm}"`
                : activeCategory === "all"
                ? "All Products"
                : getCategoryLabel(activeCategory)}
            </h2>
          </div>
        </div>

        {/* Category filter — same category list sellers pick from when listing a product */}
        <div className="mb-7 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleCategoryChange("all")}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-extrabold transition ${
              activeCategory === "all"
                ? "border-[#178f95] bg-[#178f95] text-white"
                : "border-[#e5e7eb] bg-white text-[#64748b] hover:border-[#178f95] hover:text-[#178f95]"
            }`}
          >
            <Icon name="grid" className="h-4 w-4" />
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => handleCategoryChange(category.value)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-extrabold transition ${
                activeCategory === category.value
                  ? "border-[#178f95] bg-[#178f95] text-white"
                  : "border-[#e5e7eb] bg-white text-[#64748b] hover:border-[#178f95] hover:text-[#178f95]"
              }`}
            >
              <Icon name={category.icon} className="h-4 w-4" />
              {category.label}
            </button>
          ))}
        </div>

        {cartMessage && (
          <p className="mb-5 rounded-2xl border border-[#178f95]/30 bg-[#f6fbfb] px-4 py-3 text-sm font-semibold text-[#178f95]">
            {cartMessage}
          </p>
        )}

        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-80 animate-pulse rounded-2xl border border-[#e5e7eb] bg-[#f6fbfb]" />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="rounded-[24px] bg-[#f6fbfb] p-10 text-center text-sm font-semibold text-slate-500">
            {searchTerm
              ? `No products matched "${searchTerm}" — try a different search.`
              : "No products found in this category yet — try another category."}
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const isWishlisted = wishlistIds.includes(product._id);

                return (
                  <article
                    key={product._id}
                    className="relative flex flex-col rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-lg shadow-slate-200/55 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
                  >
                    {/* Wishlist heart — works on every product card */}
                    <button
                      type="button"
                      onClick={() => handleToggleWishlist(product._id)}
                      aria-label="Toggle wishlist"
                      className={`absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition ${
                        isWishlisted ? "bg-red-500 text-white" : "bg-white text-slate-400 hover:text-red-500"
                      }`}
                    >
                      <Icon name="heart" className="h-4 w-4" filled={isWishlisted} />
                    </button>

                    {/* Clicking the card (image/title) opens the full product page */}
                    <Link to={`/product/${product._id}`} className="block">
                      <div className="flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-[#f6fbfb]">
                        <ProductImageCard product={product} />
                      </div>
                      <div className="mt-5 flex items-start justify-between gap-4">
                        <span className="min-w-0">
                          <span className="rounded-full bg-[#dff3f2] px-3 py-1 text-xs font-black capitalize text-[#178f95]">
                            {getCategoryLabel(product.category)}
                          </span>
                          <h3 className="mt-3 line-clamp-1 text-xl font-black text-[#17233f]">
                            {product.title}
                          </h3>
                        </span>
                        <span className="shrink-0 text-xl font-black text-[#178f95]">
                          Rs. {product.discountPrice || product.price}
                        </span>
                      </div>
                      {product.description && (
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#64748b]">
                          {product.description}
                        </p>
                      )}
                      {product.seller?.storeProfile?.storeName && (
                        <p className="mt-2 text-xs font-semibold text-slate-400">
                          Sold by {product.seller.storeProfile.storeName}
                        </p>
                      )}
                    </Link>

                    <div className="mt-5 flex flex-1 items-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleBuyNow(product._id)}
                        disabled={product.stock <= 0}
                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#178f95] text-sm font-extrabold text-white transition hover:bg-[#12757a] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {product.stock <= 0 ? "Out of Stock" : isLoggedIn() ? "Buy Now" : "Login to Buy"}
                        <Icon name="arrowRight" className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product._id)}
                        disabled={product.stock <= 0}
                        aria-label="Add to cart"
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#178f95]/30 text-[#178f95] transition hover:bg-[#dff3f2] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Icon name="cart" className="h-5 w-5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-9"
            />
          </>
        )}
      </section>

      <PublicFooter />
    </main>
  );
};

export default Marketplace;