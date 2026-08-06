import express from "express";
import upload from "../middleware/upload.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { uploadImage, uploadImages } from "../controllers/upload.controller.js";

const router = express.Router();

// Single image — field name must be "image"
router.post("/image", authMiddleware, upload.single("image"), uploadImage);

// Multiple images (up to 4) — field name must be "images"
router.post("/images", authMiddleware, upload.array("images", 4), uploadImages);

export default router;