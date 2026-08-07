import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogBySlugAPI } from "../../../api/blog.api";
import { Icon, PublicFooter, PublicNavbar } from "../../../shared/components";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const result = await getBlogBySlugAPI(slug);
        setBlog(result.blog);
      } catch (err) {
        setError(err.message || "Failed to load this post");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  return (
    <main className="min-h-screen bg-[#fbfdfc] text-[#17233f]">
      <PublicNavbar activePage="Blog" />

      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary">
          <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
          Back to Blog
        </Link>

        {loading && (
          <div className="mt-8 space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded-xl bg-alt" />
            <div className="h-64 animate-pulse rounded-2xl bg-alt" />
          </div>
        )}

        {!loading && error && (
          <p className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && blog && (
          <article className="mt-6">
            <h1 className="text-3xl font-black leading-tight tracking-normal text-[#17233f] sm:text-4xl">
              {blog.title}
            </h1>

            <div className="mt-4 flex items-center gap-3 text-sm font-semibold text-muted">
              <span>{blog.author?.storeProfile?.storeName || "Easy Mart Seller"}</span>
              <span>•</span>
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>

            {blog.coverImage && (
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="mt-6 h-72 w-full rounded-2xl object-cover sm:h-96"
              />
            )}

            <div className="mt-8 whitespace-pre-line text-base leading-8 text-[#334155]">
              {blog.content}
            </div>
          </article>
        )}
      </section>

      <PublicFooter />
    </main>
  );
};

export default BlogDetail;
