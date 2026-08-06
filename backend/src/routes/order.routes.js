


import express from "express";
import {
  buyNow,
  checkoutCart,
  confirmOrder,
  dispatchOrder,
  deliverOrder,
  getSellerOrders,
  getBuyerOrders,
  getOrderById,
} from "../controllers/order.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { buyNowSchema, checkoutSchema } from "../schemas/order.schema.js";

const router = express.Router();

router.post("/buy-now", authMiddleware, validate(buyNowSchema), buyNow);
router.post("/checkout", authMiddleware, validate(checkoutSchema), checkoutCart);

// Public — reached by clicking the link inside the confirmation email
router.get("/confirm/:token", confirmOrder);

router.patch("/:id/dispatch", authMiddleware, dispatchOrder);
router.patch("/:id/deliver", authMiddleware, deliverOrder);
router.get("/seller-orders", authMiddleware, getSellerOrders);
router.get("/my-orders", authMiddleware, getBuyerOrders);
router.get("/:id", authMiddleware, getOrderById);

export default router;