import express from "express";
import {
  createFlashSale,
  getActiveFlashSales,
  getMyFlashSales,
  updateFlashSale,
  deleteFlashSale,
} from "../controllers/flashSale.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createFlashSaleSchema, updateFlashSaleSchema } from "../schemas/flashSale.schema.js";

const router = express.Router();

// Public — get currently active flash sales
router.get("/", getActiveFlashSales);
router.get("/mine", authMiddleware, getMyFlashSales);

router.post("/", authMiddleware, validate(createFlashSaleSchema), createFlashSale);
router.put("/:id", authMiddleware, validate(updateFlashSaleSchema), updateFlashSale);
router.delete("/:id", authMiddleware, deleteFlashSale);

export default router;
