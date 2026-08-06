import {
  createBlogAPI,
  getMyBlogsAPI,
  updateBlogAPI,
  deleteBlogAPI,
} from "../../../api/blog.api";

class BlogService {
  createBlog(blogData) {
    return createBlogAPI(blogData);
  }

  getMyBlogs() {
    return getMyBlogsAPI();
  }

  updateBlog(blogId, blogData) {
    return updateBlogAPI(blogId, blogData);
  }

  deleteBlog(blogId) {
    return deleteBlogAPI(blogId);
  }
}

export default new BlogService();
