import { useEffect, useState } from "react";
import { Alert, Button, Card } from "../../../shared/components";
import flashSaleService from "../services/flashSale.service";
import productService from "../services/product.service";

const FlashSaleForm = ({ initialData, onSaved, onCancel }) => {
  const isEdit = Boolean(initialData);

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [form, setForm] = useState({
    product: initialData?.product?._id || initialData?.product || "",
    discountPercent: initialData?.discountPercent || "",
    startDate: initialData?.startDate
      ? new Date(initialData.startDate).toISOString().slice(0, 16)
      : "",
    endDate: initialData?.endDate
      ? new Date(initialData.endDate).toISOString().slice(0, 16)
      : "",
    quantity: initialData?.quantity || "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const result = await productService.getMyProducts();
        setProducts(result.products || []);
      } catch (err) {
        console.error("Failed to load products:", err.message);
      } finally {
        setLoadingProducts(false);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        product: form.product,
        discountPercent: Number(form.discountPercent),
        startDate: form.startDate,
        endDate: form.endDate,
        quantity: form.quantity ? Number(form.quantity) : null,
      };

      if (isEdit) {
        await flashSaleService.updateFlashSale(initialData._id, payload);
      } else {
        await flashSaleService.createFlashSale(payload);
      }

      onSaved();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // Find the selected product to show a price preview
  const selectedProduct = products.find((p) => p._id === form.product);
  const discountedPrice =
    selectedProduct && form.discountPercent
      ? (selectedProduct.price * (1 - Number(form.discountPercent) / 100)).toFixed(0)
      : null;

  return (
    <Card className="mx-auto max-w-2xl bg-white p-6 sm:p-8">
      <div className="mb-6">
        <button
          onClick={onCancel}
          className="mb-4 text-sm font-bold text-[#178f95] hover:underline"
        >
          ← Back to Flash Sales
        </button>
        <h2 className="text-2xl font-extrabold text-[#17233f]">
          {isEdit ? "Edit Flash Sale" : "Create Flash Sale"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {isEdit
            ? "Update the details of your flash sale."
            : "Set up a time-limited discount on one of your products."}
        </p>
      </div>

      {error && (
        <Alert variant="error" className="mb-5">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Select Product */}
        <div>
          <label
            htmlFor="flash-product"
            className="mb-1.5 block text-sm font-bold text-[#17233f]"
          >
            Select Product
          </label>
          {loadingProducts ? (
            <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
          ) : (
            <select
              id="flash-product"
              name="product"
              value={form.product}
              onChange={handleChange}
              required
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none focus:border-[#0f766e] transition"
            >
              <option value="">Choose a product...</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title} — Rs. {p.price}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Discount % */}
        <div>
          <label
            htmlFor="flash-discount"
            className="mb-1.5 block text-sm font-bold text-[#17233f]"
          >
            Discount %
          </label>
          <input
            id="flash-discount"
            name="discountPercent"
            type="number"
            min="1"
            max="99"
            value={form.discountPercent}
            onChange={handleChange}
            required
            placeholder="e.g. 25"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none focus:border-[#0f766e] transition"
          />
          {discountedPrice && (
            <p className="mt-1.5 text-xs font-semibold text-[#178f95]">
              Flash price: <span className="text-[#0f766e]">Rs. {discountedPrice}</span>{" "}
              <span className="text-slate-400 line-through">Rs. {selectedProduct.price}</span>
            </p>
          )}
        </div>

        {/* Start & End Date */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="flash-start"
              className="mb-1.5 block text-sm font-bold text-[#17233f]"
            >
              Start Date
            </label>
            <input
              id="flash-start"
              name="startDate"
              type="datetime-local"
              value={form.startDate}
              onChange={handleChange}
              required
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none focus:border-[#0f766e] transition"
            />
          </div>
          <div>
            <label
              htmlFor="flash-end"
              className="mb-1.5 block text-sm font-bold text-[#17233f]"
            >
              End Date
            </label>
            <input
              id="flash-end"
              name="endDate"
              type="datetime-local"
              value={form.endDate}
              onChange={handleChange}
              required
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none focus:border-[#0f766e] transition"
            />
          </div>
        </div>

        {/* Quantity (optional) */}
        <div>
          <label
            htmlFor="flash-qty"
            className="mb-1.5 block text-sm font-bold text-[#17233f]"
          >
            Quantity{" "}
            <span className="font-medium text-slate-400">(optional)</span>
          </label>
          <input
            id="flash-qty"
            name="quantity"
            type="number"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Leave empty for unlimited"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none focus:border-[#0f766e] transition"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={saving} fullWidth>
            {saving
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
              ? "Update Sale"
              : "Create Sale"}
          </Button>
          <Button variant="ghost" onClick={onCancel} fullWidth>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default FlashSaleForm;
