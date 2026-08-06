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
    <main className="min-h-screen bg-[#fbfdfc] text-[#17233f]">
      <PublicNavbar activePage="Blog" />

      <section className="bg-gradient-to-br from-white via-[#f7fcfc] to-[#fff7f1]">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <span className="inline-flex rounded-xl bg-[#dff3f2] px-4 py-2 text-sm font-extrabold text-[#178f95]">
            Easy Mart Blog
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.1] tracking-normal text-[#17233f] sm:text-5xl">
            Stories, guides & updates from our sellers.
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-72 animate-pulse rounded-2xl border border-[#e5e7eb] bg-[#f6fbfb]" />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="rounded-[24px] bg-[#f6fbfb] p-10 text-center text-sm font-semibold text-slate-500">
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
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-lg shadow-slate-200/55 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
                >
                  <div className="flex h-44 items-center justify-center overflow-hidden bg-[#f6fbfb]">
                    {blog.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <Icon name="messageCircle" className="h-12 w-12 text-[#178f95]/40" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="line-clamp-2 text-lg font-black text-[#17233f]">{blog.title}</h3>
                    {blog.excerpt && (
                      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[#64748b]">
                        {blog.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-400">
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
