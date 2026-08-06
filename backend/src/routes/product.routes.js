import express from "express";
import {
  createProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  deleteProduct,
  getTrash,
  restoreProduct,
  permanentDeleteProduct,
} from "../controllers/product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "../schemas/product.schema.js";

const router = express.Router();

// Public — browsing the marketplace never requires login. Login is only
// required to buy, add to cart, wishlist, or manage a store.
router.get("/featured", getFeaturedProducts);
router.get("/", getAllProducts);
router.get("/get-products", authMiddleware, getMyProducts);

// Seller trash (recycle bin) — kept above "/:id" so "trash" is never
// mistaken for a product id.
router.get("/seller/trash", authMiddleware, getTrash);
router.patch("/seller/trash/:id/restore", authMiddleware, restoreProduct);
router.delete("/seller/trash/:id", authMiddleware, permanentDeleteProduct);

router.get("/:id", getProductById);

router.post("/", authMiddleware, validate(createProductSchema), createProduct);
router.put("/:id", authMiddleware, validate(updateProductSchema), updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;