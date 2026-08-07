import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Icon, ProductImageCard } from "../../../shared/components";
import { getCategoryLabel } from "../../../shared/constants/categories";

const ProductGrid = ({
  products,
  wishlistIds = [],
  onToggleWishlist,
  onAddToCart,
  requireAuth = true,
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isBuyer = Boolean(token && role === "buyer");

  const goBuy = (productId) => {
    const path = `/buy-now/${productId}`;
    if (!requireAuth || isBuyer) {
      navigate(path);
      return;
    }
    navigate(`/login?redirect=${encodeURIComponent(path)}`);
  };

  if (!products || products.length === 0) {
    return (
      <Card className="border-dashed border-border-main bg-alt/40 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-alt text-xl font-black text-primary">
          !
        </div>
        <h3 className="mt-4 text-xl font-extrabold text-heading">No products available</h3>
        <p className="mt-2 text-sm leading-6 text-body">
          Sellers haven&apos;t listed any products yet. Please check back soon.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => {
        const isWishlisted = wishlistIds.includes(product._id);
        const price = product.discountPrice ?? product.price;

        return (
          <Card
            key={product._id}
            as="article"
            className="relative overflow-hidden bg-card transition hover:-translate-y-1 hover:shadow-lg"
          >
            {onToggleWishlist && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onToggleWishlist(product._id);
                }}
                aria-label="Toggle wishlist"
                className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full text-lg shadow-md transition ${
                  isWishlisted ? "bg-accent text-white" : "bg-card text-muted hover:text-red-500"
                }`}
              >
                <Icon name="heart" className="h-4 w-4" filled={isWishlisted} />
              </button>
            )}

            <Link to={`/product/${product._id}`} className="block">
              <div className="flex h-48 items-center justify-center overflow-hidden bg-alt">
                <ProductImageCard product={product} fallbackIcon="package" fallbackIconClassName="h-12 w-12 text-primary" />
              </div>
            </Link>

            <div className="p-5">
              <span className="inline-flex rounded-full bg-alt px-2.5 py-1 text-[11px] font-black text-primary">
                {getCategoryLabel(product.category)}
              </span>
              <Link to={`/product/${product._id}`}>
                <h3 className="mt-2 line-clamp-1 text-lg font-extrabold text-heading">{product.title}</h3>
              </Link>
              <p className="mt-1 line-clamp-2 text-sm text-body">
                {product.description || "Quality product from Easy Mart sellers."}
              </p>

              <div className="mt-4 flex items-end justify-between gap-2">
                <div>
                  <span className="text-xl font-black text-primary">Rs. {price}</span>
                  {product.discountPrice != null && product.discountPrice < product.price && (
                    <span className="ml-2 text-sm font-semibold text-muted line-through">
                      Rs. {product.price}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-bold ${product.stock > 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="accent" onClick={() => goBuy(product._id)} fullWidth disabled={product.stock <= 0}>
                  Buy Now
                </Button>
                {onAddToCart && (
                  <Button
                    onClick={() => onAddToCart(product._id)}
                    variant="secondary"
                    fullWidth
                    disabled={product.stock <= 0}
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductGrid;
