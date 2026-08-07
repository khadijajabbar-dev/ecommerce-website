import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllBlogsAPI } from "../../../api/blog.api";
import { Icon, Pagination, PublicFooter, PublicNavbar } from "../../../shared/components";

const PAGE_SIZE = 9;

const BlogList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBlogs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getAllBlogsAPI(page, PAGE_SIZE);
      setBlogs(result.blogs || []);
      setTotalPages(result.pagination?.totalPages || 1);
    } catch (err) {
      setError(err.message || "Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    (async () => {
      await loadBlogs();
    })();
  }, [loadBlogs]);

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-page text-heading">
      <PublicNavbar activePage="Blog" />

      <section className="bg-primary">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <span className="inline-flex rounded-xl bg-card px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
              Easy Mart Blog
            </span>
            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.1] tracking-normal text-white sm:text-5xl">
              Stories, guides & updates from our sellers.
            </h1>
          </div>
          <div className="hidden lg:flex justify-end items-center">
            <img 
              src="/blog-banner.png" 
              alt="Blog" 
              className="w-full max-w-[400px] h-auto object-contain drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-72 animate-pulse rounded-2xl border border-[#e5e7eb] bg-alt" />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="rounded-[24px] bg-alt p-10 text-center text-sm font-semibold text-body">
            No blog posts yet — check back soon.
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-card shadow-lg shadow-slate-200/55 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
                >
                  <div className="flex h-44 items-center justify-center overflow-hidden bg-alt">
                    {blog.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <Icon name="messageCircle" className="h-12 w-12 text-primary/40" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="line-clamp-2 text-lg font-black text-[#17233f]">{blog.title}</h3>
                    {blog.excerpt && (
                      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[#64748b]">
                        {blog.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between text-xs font-semibold text-muted">
                      <span>{blog.author?.storeProfile?.storeName || "Easy Mart Seller"}</span>
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} className="mt-9" />
          </>
        )}
      </section>

      <PublicFooter />
    </main>
  );
};

export default BlogList;
