import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Card, Input } from "../../../shared/components";
import { CATEGORIES } from "../../../shared/constants/categories";
import { productSchema } from "../schemas/productSchema";
import productService from "../services/product.service";
import uploadService from "../services/upload.service";

const MAX_IMAGES = 4;

// Helper — get the initial images array from existing product data.
// Old products may only have imageUrl; new ones have images[].
const getInitialImages = (data) => {
  if (!data) return [];
  if (Array.isArray(data.images) && data.images.length > 0) return data.images;
  if (data.imageUrl) return [data.imageUrl];
  return [];
};

// If `initialData` (an existing product) is passed, the form runs in EDIT mode.
const ProductForm = ({ onProductAdded, onCancel, initialData }) => {
  const isEditMode = Boolean(initialData);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ── Image state ──────────────────────────────────────────
  const [imageSlots, setImageSlots] = useState(() =>
    getInitialImages(initialData).map((url) => ({ preview: url, url }))
  );
  const [uploadingCount, setUploadingCount] = useState(0);
  const [imageError, setImageError] = useState("");

  // ── Color state ──────────────────────────────────────────
  const [colorInput, setColorInput] = useState("");
  const [colors, setColors] = useState(
    Array.isArray(initialData?.colors) ? initialData.colors : []
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
      price: initialData?.price ?? "",
      discountPrice: initialData?.discountPrice ?? "",
      stock: initialData?.stock ?? "",
      images: getInitialImages(initialData),
      brand: initialData?.brand || "",
      colors: Array.isArray(initialData?.colors) ? initialData.colors : [],
    },
  });

  // ── Image helpers ─────────────────────────────────────────
  const syncImagesToForm = (slots) => {
    const urls = slots.filter((s) => s.url).map((s) => s.url);
    setValue("images", urls, { shouldValidate: true });
  };

  const handleFilesChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = MAX_IMAGES - imageSlots.length;
    if (remaining <= 0) {
      setImageError(`You can upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }
    const toUpload = files.slice(0, remaining);
    setImageError("");

    const newSlots = toUpload.map((file) => ({
      preview: URL.createObjectURL(file),
      url: "",
    }));
    setImageSlots((prev) => [...prev, ...newSlots]);
    setUploadingCount((c) => c + toUpload.length);

    try {
      const result = await uploadService.uploadImages(toUpload);
      const cloudUrls = result.urls || [];
      setImageSlots((prev) => {
        const filled = [...prev];
        let ci = 0;
        for (let i = 0; i < filled.length; i++) {
          if (filled[i].url === "" && ci < cloudUrls.length) {
            filled[i] = { ...filled[i], url: cloudUrls[ci++] };
          }
        }
        syncImagesToForm(filled);
        return filled;
      });
    } catch (err) {
      setImageSlots((prev) => {
        const reverted = prev.filter((s) => s.url !== "");
        syncImagesToForm(reverted);
        return reverted;
      });
      setImageError(err.message || "Failed to upload images. Please try again.");
    } finally {
      setUploadingCount((c) => c - toUpload.length);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index) => {
    setImageSlots((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      syncImagesToForm(updated);
      return updated;
    });
  };

  // ── Color helpers ─────────────────────────────────────────
  const pushColor = () => {
    const trimmed = colorInput.trim();
    if (!trimmed) return;
    if (colors.includes(trimmed)) {
      setColorInput("");
      return;
    }
    const updated = [...colors, trimmed];
    setColors(updated);
    setValue("colors", updated, { shouldValidate: true });
    setColorInput("");
  };

  const handleColorKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      pushColor();
    }
  };

  const removeColor = (c) => {
    const updated = colors.filter((x) => x !== c);
    setColors(updated);
    setValue("colors", updated, { shouldValidate: true });
  };

  // ── Submit ────────────────────────────────────────────────
  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...data,
        discountPrice: data.discountPrice === "" ? null : data.discountPrice,
        images: data.images,
        brand: data.brand || "",
        colors,
      };

      const result = isEditMode
        ? await productService.updateProduct(initialData._id, payload)
        : await productService.createProduct(payload);

      if (!isEditMode) {
        reset();
        setImageSlots([]);
        setColors([]);
      }
      onProductAdded(result.product);
    } catch (err) {
      setError(err.message || `Failed to ${isEditMode ? "update" : "add"} product`);
    } finally {
      setLoading(false);
    }
  };

  const isUploading = uploadingCount > 0;

  return (
    <Card className="p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#178f95]">
            {isEditMode ? "Edit listing" : "New listing"}
          </p>
          <h3 className="text-2xl font-extrabold text-[#17233f]">
            {isEditMode ? "Edit Product" : "Add Product"}
          </h3>
        </div>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Alert variant="error">{error}</Alert>

        {/* Title */}
        <Input
          id="title"
          label="Product Title"
          placeholder="e.g. Premium pet food"
          error={errors.title?.message}
          {...register("title")}
        />

        {/* Description */}
        <Input
          as="textarea"
          id="description"
          label="Description"
          rows={4}
          placeholder="Describe your product..."
          error={errors.description?.message}
          {...register("description")}
        />

        {/* Category, Stock, Price, Discount */}
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            as="select"
            id="category"
            label="Category"
            error={errors.category?.message}
            {...register("category")}
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </Input>

          <Input
            id="stock"
            label="Stock Quantity"
            type="number"
            placeholder="e.g. 50"
            error={errors.stock?.message}
            {...register("stock")}
          />
          <Input
            id="price"
            label="Price (Rs.)"
            type="number"
            step="0.01"
            placeholder="e.g. 1500"
            error={errors.price?.message}
            {...register("price")}
          />
          <Input
            id="discountPrice"
            label="Discount Price"
            type="number"
            step="0.01"
            placeholder="Optional"
            error={errors.discountPrice?.message}
            {...register("discountPrice")}
          />
        </div>

        {/* ── Brand ── */}
        <Input
          id="brand"
          label="Brand"
          placeholder="e.g. Nike, Samsung, Local (optional)"
          error={errors.brand?.message}
          {...register("brand")}
        />

        {/* ── Colors ── */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#17233f]">
            Available Colors
            <span className="ml-1 text-xs font-normal text-slate-400">
              (optional — type a color and press Enter or click + Add)
            </span>
          </label>

          {/* Color tags */}
          {colors.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {colors.map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1.5 rounded-full border border-[#178f95]/30 bg-teal-50 px-3 py-1 text-xs font-bold text-[#178f95]"
                >
                  <span
                    className="inline-block h-3 w-3 rounded-full border border-slate-200"
                    style={{ backgroundColor: c.toLowerCase() }}
                  />
                  {c}
                  <button
                    type="button"
                    onClick={() => removeColor(c)}
                    aria-label={`Remove ${c}`}
                    className="ml-0.5 text-red-400 hover:text-red-600"
                  >
                    &#x2715;
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Input + Add button */}
          <div className="flex gap-2">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              onKeyDown={handleColorKeyDown}
              placeholder="e.g. Red, Blue, Black..."
              className="h-10 flex-1 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-800 outline-none focus:border-[#178f95]"
            />
            <button
              type="button"
              onClick={pushColor}
              disabled={!colorInput.trim()}
              className="h-10 rounded-xl bg-[#178f95] px-4 text-sm font-bold text-white transition hover:bg-[#12757a] disabled:opacity-40"
            >
              + Add
            </button>
          </div>

          {errors.colors && (
            <p className="mt-2 text-xs font-medium text-red-600">
              {errors.colors.message}
            </p>
          )}
        </div>

        {/* ── Multi-Image Upload ── */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-[#17233f]">
              Product Images
              <span className="ml-1 text-xs font-normal text-slate-400">
                (min 1, max {MAX_IMAGES})
              </span>
            </label>
            <span className="text-xs font-semibold text-slate-400">
              {imageSlots.length}/{MAX_IMAGES} uploaded
            </span>
          </div>

          {imageSlots.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-3">
              {imageSlots.map((slot, idx) => (
                <div key={idx} className="relative h-24 w-24">
                  <img
                    src={slot.preview}
                    alt={`Product image ${idx + 1}`}
                    className={`h-24 w-24 rounded-xl border-2 object-cover transition ${
                      slot.url ? "border-[#178f95]" : "border-slate-200 opacity-50"
                    }`}
                  />
                  {!slot.url && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/70">
                      <svg
                        className="h-5 w-5 animate-spin text-[#178f95]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    </div>
                  )}
                  {slot.url && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      aria-label="Remove image"
                      className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-black text-white shadow hover:bg-red-600"
                    >
                      &#x2715;
                    </button>
                  )}
                  {idx === 0 && slot.url && (
                    <span className="absolute bottom-1 left-1 rounded-full bg-[#178f95] px-1.5 py-0.5 text-[10px] font-bold text-white">
                      Cover
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {imageSlots.length < MAX_IMAGES && (
            <label
              htmlFor="imageFiles"
              className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed px-4 py-3 text-sm font-semibold transition ${
                isUploading
                  ? "border-slate-200 text-slate-400"
                  : "border-[#178f95]/40 text-[#178f95] hover:border-[#178f95] hover:bg-teal-50/40"
              }`}
            >
              <span className="text-xl leading-none">+</span>
              <span>
                {isUploading
                  ? `Uploading ${uploadingCount} image${uploadingCount > 1 ? "s" : ""}...`
                  : `Add photos (${MAX_IMAGES - imageSlots.length} remaining)`}
              </span>
              <input
                id="imageFiles"
                type="file"
                accept="image/*"
                multiple
                disabled={isUploading}
                onChange={handleFilesChange}
                className="sr-only"
              />
            </label>
          )}

          <input type="hidden" {...register("images")} />

          {imageError && (
            <p className="mt-2 text-xs font-medium text-red-600">{imageError}</p>
          )}
          {errors.images && !imageError && (
            <p className="mt-2 text-xs font-medium text-red-600">
              {errors.images.message || errors.images.root?.message}
            </p>
          )}
        </div>

        {/* ── Submit ── */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="submit"
            disabled={loading || isUploading}
            size="lg"
            fullWidth
            className="flex-1"
          >
            {loading
              ? isEditMode ? "Saving..." : "Adding..."
              : isUploading
              ? "Waiting for images..."
              : isEditMode ? "Save Changes" : "Add Product"}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            disabled={loading}
            variant="secondary"
            size="lg"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProductForm;
