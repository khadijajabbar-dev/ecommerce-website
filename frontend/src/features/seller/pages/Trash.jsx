import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Navbar } from "../../../shared/components";
import productService from "../services/product.service";

const Trash = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [restoringId, setRestoringId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmingId, setConfirmingId] = useState(null);

  const fetchTrash = async () => {
    setError("");
    try {
      const result = await productService.getTrash();
      setProducts(result.products || []);
    } catch (err) {
      setError(err.message || "Failed to load trash");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchTrash();
    })();
  }, []);

  const handleRestore = async (productId) => {
    setError("");
    setRestoringId(productId);
    try {
      await productService.restoreProduct(productId);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      setError(err.message || "Failed to restore product");
    } finally {
      setRestoringId(null);
    }
  };

  const handlePermanentDelete = async (productId) => {
    setError("");
    setDeletingId(productId);
    try {
      await productService.permanentDeleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      setError(err.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
      setConfirmingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
      <div className="mx-auto max-w-5xl">
        <Navbar badge="S" panel="Seller Panel" title="Trash" />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-[#178f95]">Recycle Bin</p>
            <h2 className="text-2xl font-extrabold text-[#17233f]">Deleted Products</h2>
            <p className="mt-1 text-sm text-slate-500">
              Products you delete land here first. Restore them any time, or remove
              them for good.
            </p>
          </div>
          <Link to="/seller-dashboard#products">
            <Button variant="secondary">Back to Products</Button>
          </Link>
        </div>

        {error && (
          <Alert variant="error" className="mt-4">
            {error}
          </Alert>
        )}

        {loading ? (
          <Card className="mt-6 p-8 text-center text-sm font-semibold text-slate-500">
            Loading trash...
          </Card>
        ) : products.length === 0 ? (
          <Card className="mt-6 border-dashed border-[#178f95]/30 bg-[#f6fbfb] p-8 text-center">
            <h3 className="text-xl font-extrabold">Trash is empty</h3>
            <p className="mt-2 text-sm text-slate-500">
              Deleted products will show up here so you can restore them if you
              change your mind.
            </p>
          </Card>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <Card
                key={product._id}
                as="article"
                className="overflow-hidden bg-white opacity-90"
              >
                <div className="relative">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-44 w-full grayscale object-cover"
                    />
                  ) : (
                    <div className="flex h-44 w-full items-center justify-center bg-[#f1f1f1] text-sm font-bold text-slate-400">
                      No Image
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold text-white">
                    In Trash
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#f1f1f1] px-3 py-1 text-xs font-bold capitalize text-slate-500">
                      {product.category}
                    </span>
                    <span className="rounded-full bg-[#fff0e8] px-3 py-1 text-xs font-bold text-[#17233f]">
                      Stock {product.stock}
                    </span>
                  </div>

                  <h4 className="mt-4 line-clamp-2 text-lg font-extrabold text-[#17233f]">
                    {product.title}
                  </h4>

                  {product.deletedAt && (
                    <p className="mt-2 text-xs font-semibold text-slate-400">
                      Deleted on {new Date(product.deletedAt).toLocaleDateString()}
                    </p>
                  )}

                  <div className="mt-4 flex items-end gap-2">
                    {product.discountPrice ? (
                      <>
                        <span className="text-2xl font-black text-[#178f95]">
                          Rs. {product.discountPrice}
                        </span>
                        <span className="pb-1 text-sm font-semibold text-slate-400 line-through">
                          Rs. {product.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-black text-[#178f95]">
                        Rs. {product.price}
                      </span>
                    )}
                  </div>

                  {confirmingId === product._id ? (
                    <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-3">
                      <p className="text-xs font-semibold text-red-700">
                        Delete this product permanently? This can&apos;t be undone.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button
                          variant="danger"
                          fullWidth
                          className="flex-1"
                          disabled={deletingId === product._id}
                          onClick={() => handlePermanentDelete(product._id)}
                        >
                          {deletingId === product._id ? "Deleting..." : "Yes, Delete"}
                        </Button>
                        <Button
                          variant="secondary"
                          fullWidth
                          className="flex-1"
                          onClick={() => setConfirmingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5 flex gap-2">
                      <Button
                        onClick={() => handleRestore(product._id)}
                        disabled={restoringId === product._id}
                        fullWidth
                        className="flex-1"
                      >
                        {restoringId === product._id ? "Restoring..." : "Restore"}
                      </Button>
                      <Button
                        variant="danger"
                        fullWidth
                        className="flex-1"
                        onClick={() => setConfirmingId(product._id)}
                      >
                        Delete Permanently
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Trash;