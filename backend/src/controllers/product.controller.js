import productService from "../services/product.service.js";
import { getIO } from "../socket/socket.js";

// ==========================
// Create Product
// ==========================
export const createProduct = async (req, res, next) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "Only sellers can add products",
      });
    }

    const result = await productService.createProduct(req.user.id, req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Get a single product by ID (product detail page)
// ==========================
export const getProductById = async (req, res, next) => {
  try {
    const result = await productService.getProductById(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Get all products from every seller (buyer browsing, paginated)
// ==========================
export const getAllProducts = async (req, res, next) => {
  try {
    const { page, limit, category, search } = req.query;
    const result = await productService.getAllProducts({ page, limit, category, search });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
// ==========================
// Get a handful of products per category for the public marketplace page
// (no login required to browse)
// ==========================
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const result = await productService.getFeaturedProducts();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Get logged-in seller's products
// ==========================
export const getMyProducts = async (req, res, next) => {
  try {
    const result = await productService.getMyProducts(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Update Product
// ==========================
export const updateProduct = async (req, res, next) => {
  try {
    const result = await productService.updateProduct(
      req.user.id,
      req.params.id,
      req.body
    );
    getIO()?.emit("product:stock", {
      productId: String(result.product._id),
      stock: result.product.stock,
      isActive: result.product.isActive,
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Delete Product (moves it to trash)
// ==========================
export const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteProduct(
      req.user.id,
      req.params.id
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Get logged-in seller's trashed products
// ==========================
export const getTrash = async (req, res, next) => {
  try {
    const result = await productService.getTrash(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Restore a product out of the trash
// ==========================
export const restoreProduct = async (req, res, next) => {
  try {
    const result = await productService.restoreProduct(
      req.user.id,
      req.params.id
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Permanently delete a product that is already in the trash
// ==========================
export const permanentDeleteProduct = async (req, res, next) => {
  try {
    const result = await productService.permanentDeleteProduct(
      req.user.id,
      req.params.id
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};