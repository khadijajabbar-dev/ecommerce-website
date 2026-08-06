import Product from "../models/product.model.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class ProductService {
  // =========================
  // Create a new product (seller only)
  // =========================
  async createProduct(sellerId, productData) {
    const {
      title,
      description,
      category,
      price,
      discountPrice,
      stock,
      imageUrl,
      images,
      brand,
      colors,
    } = productData;

    if (!title || !category || price === undefined || stock === undefined) {
      throw createError("Please fill in all required product details", 400);
    }

    const imagesArray = Array.isArray(images) && images.length > 0
      ? images.slice(0, 4)
      : imageUrl
      ? [imageUrl]
      : [];

    const product = await Product.create({
      seller: sellerId,
      title,
      description: description || "",
      category,
      price,
      discountPrice: discountPrice || null,
      stock,
      imageUrl: imagesArray[0] || imageUrl || "",
      images: imagesArray,
      brand: brand || "",
      colors: Array.isArray(colors) ? colors.filter(Boolean) : [],
    });

    return {
      success: true,
      message: "Product added successfully",
      product,
    };
  }

  // =========================
  // Get a single product by ID (buyer-facing product detail page)
  // =========================
  async getProductById(productId) {
    const product = await Product.findById(productId).populate(
      "seller",
      "storeProfile.storeName"
    );

    if (!product) {
      throw createError("Product not found", 404);
    }

    return { success: true, product };
  }

  // Get all products from all sellers (buyer-facing, paginated), optionally
  // narrowed down to a single category and/or a search term.
  async getAllProducts({ page = 1, limit = 12, category = "", search = "" }) {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const limitNumber = Math.max(1, parseInt(limit, 10) || 12);
    const skip = (pageNumber - 1) * limitNumber;

    const filter = { isActive: true };
    if (category && category !== "all") {
      filter.category = category;
    }
    if (search && search.trim()) {
      filter.title = { $regex: search.trim(), $options: "i" };
    }

    const [products, totalProducts] = await Promise.all([
      Product.find(filter)
        .populate("seller", "storeProfile.storeName")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),
      Product.countDocuments(filter),
    ]);

    return {
      success: true,
      products,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.max(1, Math.ceil(totalProducts / limitNumber)),
        totalProducts,
        limit: limitNumber,
      },
    };
  }


  // =========================
  // Get a small spread of products (a handful per category) for the
  // public home page — no login required to view these.
  // =========================
  async getFeaturedProducts(perCategory = 4) {
    const categories = ["fashion", "electronics", "grocery", "beauty", "home", "jewellery", "other"];

    const groups = await Promise.all(
      categories.map((category) =>
        Product.find({ isActive: true, category })
          .populate("seller", "storeProfile.storeName")
          .sort({ createdAt: -1 })
          .limit(perCategory)
      )
    );

    let products = groups.flat();

    // Fallback: if very few sellers have listed products yet, just grab the
    // most recent active products regardless of category so the home page
    // never looks empty.
    if (products.length < 4) {
      products = await Product.find({ isActive: true })
        .populate("seller", "storeProfile.storeName")
        .sort({ createdAt: -1 })
        .limit(12);
    }

    return { success: true, products };
  }

  // =========================
  // Get all products belonging to a seller
  // =========================
  async getMyProducts(sellerId) {
    const products = await Product.find({ seller: sellerId, isActive: true }).sort({
      createdAt: -1,
    });

    return {
      success: true,
      products,
    };
  }

  // =========================
  // Update a product (only its own seller)
  // =========================
  async updateProduct(sellerId, productId, productData) {
    const product = await Product.findOne({ _id: productId, seller: sellerId });

    if (!product) {
      throw createError("Product not found", 404);
    }

    const {
      title,
      description,
      category,
      price,
      discountPrice,
      stock,
      imageUrl,
      images,
      brand,
      colors,
      isActive,
    } = productData;

    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (category !== undefined) product.category = category;
    if (price !== undefined) product.price = price;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (stock !== undefined) product.stock = stock;
    if (isActive !== undefined) product.isActive = isActive;
    if (brand !== undefined) product.brand = brand;
    if (Array.isArray(colors)) product.colors = colors.filter(Boolean);

    // Update images — accept new array or fall back to legacy single imageUrl
    if (Array.isArray(images) && images.length > 0) {
      const imagesArray = images.slice(0, 4);
      product.images = imagesArray;
      product.imageUrl = imagesArray[0];
    } else if (imageUrl !== undefined) {
      product.imageUrl = imageUrl;
      // Keep existing images array in sync with the single imageUrl
      if (imageUrl) {
        product.images = [imageUrl];
      }
    }

    await product.save();

    return {
      success: true,
      message: "Product updated successfully",
      product,
    };
  }

  // =========================
  // Delete a product (only its own seller) — moves it to the trash
  // =========================
  async deleteProduct(sellerId, productId) {
    // Soft delete: keep the document in the database (past orders still
    // reference it) but mark it inactive and stamp when it was trashed, so
    // it disappears from listings but can still be restored later.
    const product = await Product.findOneAndUpdate(
      { _id: productId, seller: sellerId },
      { isActive: false, deletedAt: new Date() },
      { new: true }
    );

    if (!product) {
      throw createError("Product not found", 404);
    }

    return {
      success: true,
      message: "Product moved to trash",
    };
  }

  // =========================
  // Get everything currently in a seller's trash
  // =========================
  async getTrash(sellerId) {
    const products = await Product.find({
      seller: sellerId,
      isActive: false,
      deletedAt: { $ne: null },
    }).sort({ deletedAt: -1 });

    return {
      success: true,
      products,
    };
  }

  // =========================
  // Restore a trashed product back to the seller's active listings
  // =========================
  async restoreProduct(sellerId, productId) {
    const product = await Product.findOneAndUpdate(
      { _id: productId, seller: sellerId, isActive: false },
      { isActive: true, deletedAt: null },
      { new: true }
    );

    if (!product) {
      throw createError("Product not found in trash", 404);
    }

    return {
      success: true,
      message: "Product restored successfully",
      product,
    };
  }

  // =========================
  // Permanently delete a product that is already in the trash
  // =========================
  async permanentDeleteProduct(sellerId, productId) {
    const product = await Product.findOneAndDelete({
      _id: productId,
      seller: sellerId,
      isActive: false,
    });

    if (!product) {
      throw createError("Product not found in trash", 404);
    }

    return {
      success: true,
      message: "Product permanently deleted",
    };
  }
}

export default new ProductService();