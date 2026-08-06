import blogService from "../services/blog.service.js";

// ==========================
// Create Blog Post (seller only)
// ==========================
export const createBlog = async (req, res, next) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "Only sellers can write blog posts",
      });
    }

    const result = await blogService.createBlog(req.user.id, req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Get all published posts (public)
// ==========================
export const getAllBlogs = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await blogService.getAllBlogs({ page, limit });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Get logged-in seller's own posts
// ==========================
export const getMyBlogs = async (req, res, next) => {
  try {
    const result = await blogService.getMyBlogs(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Get a single published post by slug (public detail page)
// ==========================
export const getBlogBySlug = async (req, res, next) => {
  try {
    const result = await blogService.getBlogBySlug(req.params.slug);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Update Blog Post
// ==========================
export const updateBlog = async (req, res, next) => {
  try {
    const result = await blogService.updateBlog(req.user.id, req.params.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Delete Blog Post
// ==========================
export const deleteBlog = async (req, res, next) => {
  try {
    const result = await blogService.deleteBlog(req.user.id, req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};