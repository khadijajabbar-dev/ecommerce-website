


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogsAPI } from "../../../api/blog.api";
import { Card } from "../../../shared/components";

const MOCK_BLOGS = [
  {
    _id: "mock-1",
    title: "Top 10 Summer Fashion Trends",
    coverImage: "/summer_trends_blog.png",
    createdAt: new Date("2026-07-25").toISOString(),
    excerpt: "Discover the hottest styles...",
    slug: "top-10-summer-fashion-trends",
  },
  {
    _id: "mock-2",
    title: "How to Choose the Right Laptop",
    coverImage: "/laptop_guide_blog.png",
    createdAt: new Date("2026-07-22").toISOString(),
    excerpt: "A buyer's guide to choosing laptops...",
    slug: "how-to-choose-the-right-laptop",
  },
  {
    _id: "mock-3",
    title: "Best Skincare Routine for Glowing Skin",
    coverImage: "/skincare_routine_blog.png",
    createdAt: new Date("2026-07-20").toISOString(),
    excerpt: "Simple steps for healthy skin...",
    slug: "best-skincare-routine-for-glowing-skin",
  },
];

const NewsletterSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await getAllBlogsAPI(1, 3);
        const dbBlogs = result.blogs || [];
        
        // If we don't have enough blogs in DB, fill up with high quality mockups
        if (dbBlogs.length < 3) {
          const filled = [...dbBlogs, ...MOCK_BLOGS.slice(dbBlogs.length)];
          setBlogs(filled);
        } else {
          setBlogs(dbBlogs.slice(0, 3));
        }
      } catch {
        setBlogs(MOCK_BLOGS);
      }
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="mx-auto mt-12 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        
        {/* Left Side: Latest from Blog */}
        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black tracking-normal text-slate-900">Latest from Blog</h2>
            <Link
              to="/blog"
              className="text-sm font-extrabold text-teal-700 transition hover:text-teal-800"
            >
              View All
            </Link>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            {blogs.map((blog) => (
              <Card
                key={blog._id}
                as="article"
                className="overflow-hidden bg-white p-2 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <Link
                  to={`/blog/${blog.slug}`}
                  className="block aspect-[16/10] overflow-hidden rounded-xl bg-slate-50"
                >
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#dff3f2] text-sm font-bold text-[#178f95]">
                      No Image
                    </div>
                  )}
                </Link>
                <div className="mt-3 px-1 pb-1 flex-1 flex flex-col justify-between">
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="block font-bold text-slate-900 hover:text-teal-700 transition line-clamp-2 text-sm leading-tight"
                  >
                    {blog.title}
                  </Link>
                  <p className="mt-2 text-[11px] font-semibold text-slate-400">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    • 5 min read
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Side: Subscribe to Our Newsletter */}
        <div className="flex flex-col justify-between rounded-3xl bg-[#eefaf9] p-6 sm:p-8 relative overflow-hidden shadow-sm">
          {/* Background circles */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#dff3f2] opacity-50 blur-xl" />

          <div className="relative z-10 flex flex-col justify-between h-full gap-6">
            <div>
              <h3 className="text-xl font-black text-slate-900">Subscribe to Our Newsletter</h3>
              <p className="mt-2 text-sm font-semibold text-slate-500 max-w-sm">
                Get the latest updates on new products and upcoming sales
              </p>
            </div>

            {subscribed ? (
              <div className="rounded-2xl bg-white p-4 text-center border border-teal-100 shadow-sm">
                <span className="text-2xl">🎉</span>
                <h4 className="mt-2 font-bold text-teal-800">Thanks for subscribing!</h4>
                <p className="mt-1 text-xs font-semibold text-slate-400">
                  We'll keep you updated with the best deals.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative mt-2">
                <div className="flex items-center rounded-2xl border border-slate-200/60 bg-white p-1.5 shadow-sm focus-within:border-teal-600 transition">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent px-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    className="h-10 shrink-0 rounded-xl bg-[#0f766e] px-5 text-xs font-bold text-white shadow-md shadow-[#0f766e]/20 hover:bg-[#115e59] transition"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}

            <div className="flex items-end justify-between gap-4 mt-auto">
              <span className="text-xs font-semibold text-slate-400">
                We respect your privacy. Unsubscribe anytime.
              </span>
              
              {/* Mail/Envelope Illustration */}
              <div className="hidden sm:block shrink-0 w-24 h-20 relative">
                <svg viewBox="0 0 120 100" fill="none" className="w-full h-full drop-shadow-md">
                  {/* Envelope body back */}
                  <path d="M10 40 L10 90 L110 90 L110 40 Z" fill="#9ed3ce" opacity="0.6" />
                  
                  {/* Letter paper */}
                  <rect x="25" y="10" width="70" height="55" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="2" />
                  {/* Letter content lines */}
                  <line x1="35" y1="22" x2="85" y2="22" stroke="#d4af37" strokeWidth="4" strokeLinecap="round" />
                  <line x1="35" y1="34" x2="75" y2="34" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                  <line x1="35" y1="44" x2="85" y2="44" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                  <line x1="35" y1="54" x2="65" y2="54" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />

                  {/* Envelope front fold side flaps */}
                  <path d="M10 40 L60 70 L10 90 Z" fill="#b0e0db" />
                  <path d="M110 40 L60 70 L110 90 Z" fill="#b0e0db" />
                  
                  {/* Envelope front fold bottom flap */}
                  <path d="M10 90 L60 65 L110 90 Z" fill="#a4d7d2" />
                  
                  {/* Envelope open top flap */}
                  <path d="M10 40 L60 15 L110 40 Z" fill="#8bc7c1" opacity="0.4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NewsletterSection;