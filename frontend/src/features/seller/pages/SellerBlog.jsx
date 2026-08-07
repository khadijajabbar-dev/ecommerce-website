import { useEffect, useState } from "react";
import { Navbar, Alert, Button, Card } from "../../../shared/components";
import blogService from "../services/blog.service";
import BlogForm from "../components/BlogForm";

const SellerBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const [mode, setMode] = useState("list"); // "list" | "create" | "edit"
  const [editingBlog, setEditingBlog] = useState(null);

  const fetchBlogs = async () => {
    setError("");
    try {
      const result = await blogService.getMyBlogs();
      setBlogs(result.blogs || []);
    } catch (err) {
      setError(err.message || "Failed to load your posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchBlogs();
    })();
  }, []);

  const handleSaved = () => {
    setMode("list");
    setEditingBlog(null);
    fetchBlogs();
  };

  const handleDelete = async (blogId) => {
    setDeletingId(blogId);
    try {
      await blogService.deleteBlog(blogId);
      setBlogs((prev) => prev.filter((b) => b._id !== blogId));
    } catch (err) {
      setError(err.message || "Failed to delete post");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
      <div className="mx-auto max-w-5xl">
        <Navbar badge="S" panel="Seller Panel" title="Blog" />

        {mode === "list" ? (
          <>
            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-primary">Content</p>
                <h2 className="text-2xl font-extrabold text-[#17233f]">Your Blog Posts</h2>
              </div>
              <Button onClick={() => setMode("create")}>Write New Post</Button>
            </div>

            {error && (
              <Alert variant="error" className="mt-4">
                {error}
              </Alert>
            )}

            {loading ? (
              <Card className="mt-6 p-8 text-center text-sm font-semibold text-body">
                Loading...
              </Card>
            ) : blogs.length === 0 ? (
              <Card className="mt-6 border-dashed border-border-main bg-alt p-8 text-center">
                <h3 className="text-xl font-extrabold">No posts yet</h3>
                <p className="mt-2 text-sm text-body">
                  Share updates, guides, or announcements with your shoppers.
                </p>
                <Button className="mt-4" onClick={() => setMode("create")}>
                  Write your first post
                </Button>
              </Card>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {blogs.map((blog) => (
                  <Card key={blog._id} as="article" className="overflow-hidden bg-card">
                    {blog.coverImage ? (
                      <img src={blog.coverImage} alt={blog.title} className="h-40 w-full object-cover" />
                    ) : (
                      <div className="flex h-40 w-full items-center justify-center bg-alt text-sm font-bold text-primary">
                        No Cover Image
                      </div>
                    )}

                    <div className="p-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          blog.isPublished
                            ? "bg-alt text-primary"
                            : "bg-[#fff0e8] text-[#17233f]"
                        }`}
                      >
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>

                      <h4 className="mt-3 line-clamp-2 text-lg font-extrabold text-[#17233f]">
                        {blog.title}
                      </h4>

                      {blog.excerpt && (
                        <p className="mt-2 line-clamp-2 text-sm text-body">{blog.excerpt}</p>
                      )}

                      <div className="mt-5 flex gap-2">
                        <Button
                          variant="secondary"
                          fullWidth
                          className="flex-1"
                          onClick={() => {
                            setEditingBlog(blog);
                            setMode("edit");
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(blog._id)}
                          disabled={deletingId === blog._id}
                          variant="danger"
                          fullWidth
                          className="flex-1"
                        >
                          {deletingId === blog._id ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="mt-6">
            <BlogForm
              initialData={mode === "edit" ? editingBlog : null}
              onSaved={handleSaved}
              onCancel={() => {
                setMode("list");
                setEditingBlog(null);
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default SellerBlog;
