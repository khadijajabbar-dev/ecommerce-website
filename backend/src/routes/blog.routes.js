import express from "express";
import {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createBlogSchema, updateBlogSchema } from "../schemas/blog.schema.js";

const router = express.Router();

// Public — reading the blog never requires login.
router.get("/", getAllBlogs);
router.get("/mine", authMiddleware, getMyBlogs);
router.get("/:slug", getBlogBySlug);

router.post("/", authMiddleware, validate(createBlogSchema), createBlog);
router.put("/:id", authMiddleware, validate(updateBlogSchema), updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;