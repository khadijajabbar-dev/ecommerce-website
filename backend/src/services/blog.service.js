import Blog from "../models/blog.model.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const slugify = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

class BlogService {
  // =========================
  // Create a new blog post (any logged-in seller)
  // =========================
  async createBlog(authorId, blogData) {
    const { title, excerpt, content, coverImage, isPublished } = blogData;

    if (!title || !content) {
      throw createError("Title and content are required", 400);
    }

    // Make sure the slug is unique — append a short suffix if the base
    // slug (or an earlier collision) is already taken.
    const baseSlug = slugify(title) || "post";
    let slug = baseSlug;
    let suffix = 1;
    while (await Blog.exists({ slug })) {
      suffix += 1;
      slug = `${baseSlug}-${suffix}`;
    }

    const blog = await Blog.create({
      author: authorId,
      title,
      slug,
      excerpt: excerpt || "",
      content,
      coverImage: coverImage || "",
      isPublished: isPublished === undefined ? true : isPublished,
    });

    return {
      success: true,
      message: "Blog post published successfully",
      blog,
    };
  }

  // =========================
  // Get all published posts (public, paginated)
  // =========================
  async getAllBlogs({ page = 1, limit = 9 }) {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const limitNumber = Math.max(1, parseInt(limit, 10) || 9);
    const skip = (pageNumber - 1) * limitNumber;

    const filter = { isPublished: true };

    const [blogs, totalBlogs] = await Promise.all([
      Blog.find(filter)
        .populate("author", "storeProfile.storeName")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),
      Blog.countDocuments(filter),
    ]);

    return {
      success: true,
      blogs,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.max(1, Math.ceil(totalBlogs / limitNumber)),
        totalBlogs,
        limit: limitNumber,
      },
    };
  }

  // =========================
  // Get a single published post by slug (public detail page)
  // =========================
  async getBlogBySlug(slug) {
    const blog = await Blog.findOne({ slug, isPublished: true }).populate(
      "author",
      "storeProfile.storeName"
    );

    if (!blog) {
      throw createError("Blog post not found", 404);
    }

    return { success: true, blog };
  }

  // =========================
  // Get all posts written by the logged-in seller (published or not)
  // =========================
  async getMyBlogs(authorId) {
    const blogs = await Blog.find({ author: authorId }).sort({ createdAt: -1 });
    return { success: true, blogs };
  }

  // =========================
  // Update a post (only its own author)
  // =========================
  async updateBlog(authorId, blogId, blogData) {
    const blog = await Blog.findOne({ _id: blogId, author: authorId });

    if (!blog) {
      throw createError("Blog post not found", 404);
    }

    const { title, excerpt, content, coverImage, isPublished } = blogData;

    if (title !== undefined && title !== blog.title) {
      blog.title = title;
      // Re-slugify on title change, keeping it unique.
      const baseSlug = slugify(title) || "post";
      let slug = baseSlug;
      let suffix = 1;
      while (await Blog.exists({ slug, _id: { $ne: blog._id } })) {
        suffix += 1;
        slug = `${baseSlug}-${suffix}`;
      }
      blog.slug = slug;
    }
    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (content !== undefined) blog.content = content;
    if (coverImage !== undefined) blog.coverImage = coverImage;
    if (isPublished !== undefined) blog.isPublished = isPublished;

    await blog.save();

    return {
      success: true,
      message: "Blog post updated successfully",
      blog,
    };
  }

  // =========================
  // Delete a post (only its own author)
  // =========================
  async deleteBlog(authorId, blogId) {
    const blog = await Blog.findOneAndDelete({ _id: blogId, author: authorId });

    if (!blog) {
      throw createError("Blog post not found", 404);
    }

    return {
      success: true,
      message: "Blog post deleted successfully",
    };
  }
}

export default new BlogService();
