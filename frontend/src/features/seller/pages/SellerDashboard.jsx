import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sellerService from "../services/seller.service";
import productService from "../services/product.service";
import sellerOrderService from "../services/order.service";
import StoreSetupForm from "../components/StoreSetupForm";
import ProductList from "../components/ProductList";
import SalesChart from "../components/SalesChart";
import { Alert, Badge, Card, Icon } from "../../../shared/components";

const sidebarLinks = [
  { label: "Overview", icon: "grid", to: "/seller-dashboard" },
  { label: "Products", icon: "package", to: "/seller-dashboard#products" },
  { label: "Orders", icon: "cart", to: "/seller/orders" },
  { label: "Blog", icon: "messageCircle", to: "/seller/blog" },
  { label: "Flash Sales", icon: "bolt", to: "/seller/flash-sales" },
  { label: "Trash", icon: "trash", to: "/seller/trash" },
  { label: "Store Setting", icon: "shieldCheck", to: "/seller/profile" },
];

const STATUS_VARIANT = {
  pending: "warning",
  processing: "accent",
  shipped: "primary",
  delivered: "success",
  cancelled: "error",
};

const monthLabel = (date) => date.toLocaleString("en-US", { month: "short" });

const SellerDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Lock background scroll while the mobile sidebar drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("auth-changed"));
    navigate("/login", { replace: true });
  };

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await sellerService.getMe();
      setUser(result.user);
    } catch (err) {
      setError(err.message || "Failed to load profile");
      if (err.message?.toLowerCase().includes("token")) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    setDataLoading(true);
    try {
      const [productsResult, ordersResult] = await Promise.all([
        productService.getMyProducts(),
        sellerOrderService.getSellerOrders(),
      ]);
      setProducts(productsResult.products || []);
      setOrders(ordersResult.orders || []);
    } catch (err) {
      console.error("Failed to load dashboard data:", err.message);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user?.isStoreSetup) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchDashboardData();
    }
  }, [user?.isStoreSetup]);

  // Scroll to the Products section — only fires when the "Products"
  // sidebar link is explicitly clicked (not on page load, refresh, or
  // navigating back to this page with a stale #products in the URL).
  const scrollToProducts = (e) => {
    e.preventDefault();
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ---- Real stats, computed from actual orders/products (no fake numbers) ----
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const lifetimeValue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const avgOrderValue = totalOrders > 0 ? lifetimeValue / totalOrders : 0;
    return { totalOrders, lifetimeValue, avgOrderValue };
  }, [orders]);

  const chartPoints = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return { key: `${d.getFullYear()}-${d.getMonth()}`, label: monthLabel(d), value: 0 };
    });
    orders.forEach((order) => {
      const d = new Date(order.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const bucket = months.find((m) => m.key === key);
      if (bucket) bucket.value += order.totalAmount || 0;
    });
    return months;
  }, [orders]);

  const topProducts = useMemo(() => {
    const soldByProduct = {};
    orders.forEach((order) => {
      const key = order.product || order.productTitle;
      if (!soldByProduct[key]) {
        soldByProduct[key] = {
          title: order.productTitle,
          image: order.productImage,
          quantity: 0,
          productId: order.product,
        };
      }
      soldByProduct[key].quantity += order.quantity || 0;
    });

    return Object.values(soldByProduct)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 3)
      .map((item) => {
        const matchedProduct = products.find((p) => p._id === item.productId);
        return { ...item, stock: matchedProduct?.stock };
      });
  }, [orders, products]);

  const latestOrders = orders.slice(0, 6);

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    return products.filter((p) => p.title.toLowerCase().includes(search.trim().toLowerCase()));
  }, [products, search]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fbfdfc] px-5 text-[#17233f]">
        <Card className="p-8 text-center">
          <div className="mx-auto h-12 w-12 animate-pulse rounded-2xl bg-alt" />
          <p className="mt-4 text-sm font-semibold text-body">Loading your seller dashboard...</p>
        </Card>
      </main>
    );
  }

  if (error && !user) {
    return (
      <main className="min-h-screen bg-[#fbfdfc] px-5 py-8 text-[#17233f]">
        <Alert variant="error" className="mx-auto max-w-4xl">
          {error}
        </Alert>
      </main>
    );
  }

  if (user && !user.isStoreSetup) {
    return <StoreSetupForm onStoreCreated={(updatedUser) => setUser(updatedUser)} />;
  }

  // Shared sidebar nav content — reused by the permanent desktop sidebar
  // and the mobile slide-in drawer so the two never drift out of sync.
  const sidebarNav = (onNavigate) => (
    <>
      <Link to="/" className="mb-8 flex items-center gap-2.5 px-1" onClick={onNavigate}>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-card/15">
          <Icon name="bag" className="h-5 w-5" />
        </span>
        <span className="text-lg font-black text-white">NaturaMart</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {sidebarLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            onClick={(e) => {
              if (link.label === "Products") scrollToProducts(e);
              onNavigate?.();
            }}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition ${
              link.label === "Overview" ? "bg-card text-primary shadow-lg" : "text-page/85 hover:bg-card/10 text-white"
            }`}
          >
            <Icon name={link.icon} className="h-4.5 w-4.5" />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-6 rounded-2xl bg-card/10 p-5 ring-1 ring-white/15">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-alt0 text-white">
          <Icon name="shieldCheck" className="h-5 w-5" />
        </span>
        <h4 className="mt-3 text-sm font-black text-white">Store Status</h4>
        <p className="mt-1 text-xs leading-5 text-page/80">
          Your store is live and visible to every buyer on NaturaMart.
        </p>
        <Link
          to="/seller/profile"
          onClick={onNavigate}
          className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-lg bg-card text-xs font-bold text-primary"
        >
          Profile
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-page text-heading lg:flex">
      {/* ---------------- Mobile / tablet top bar (hidden on lg+) ---------------- */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-primary px-4 py-3.5 text-white shadow-md lg:hidden">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-card/15">
            <Icon name="bag" className="h-4.5 w-4.5" />
          </span>
          <span className="text-base font-black">NaturaMart</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open dashboard menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-card/10"
        >
          <Icon name="menu" className="h-5 w-5" />
        </button>
      </div>

      {/* ---------------- Mobile drawer overlay + panel (hidden on lg+) ---------------- */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close dashboard menu"
            onClick={() => setMobileNavOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 max-w-[80vw] flex-col overflow-y-auto bg-primary p-5 text-white shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close dashboard menu"
              className="mb-4 ml-auto flex h-9 w-9 items-center justify-center rounded-xl bg-card/10"
            >
              <Icon name="close" className="h-4.5 w-4.5" />
            </button>
            {sidebarNav(() => setMobileNavOpen(false))}
          </aside>
        </div>
      )}

      {/* ---------------- Sidebar (desktop, lg+ only) ---------------- */}
      <aside className="hidden w-64 shrink-0 flex-col bg-primary p-5 text-white lg:flex">
        {sidebarNav()}
      </aside>

      {/* ---------------- Main content ---------------- */}
      <div className="flex-1 px-5 py-6 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Top bar */}
          <div className="flex items-center justify-end gap-3">
              <Link
                to="/seller/add-product"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-md shadow-primary/20 transition hover:bg-primary"
              >
                <Icon name="package" className="h-4 w-4" />
                Add Product
              </Link>
              <Link to="/seller/profile" aria-label="Go to my profile">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="h-11 w-11 rounded-xl object-cover shadow-md shadow-primary/20"
                  />
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-sm font-black text-white">
                    {(user?.firstName?.[0] || "S").toUpperCase()}
                  </span>
                )}
              </Link>
            </div>

          {/* Welcome */}
          <div className="mt-7">
            <h1 className="text-3xl font-black tracking-tight text-heading">
              Welcome back, {user?.firstName || "Seller"}!
            </h1>
            <p className="mt-1 text-sm font-medium text-body">
              Here's your current sales overview.
            </p>
          </div>

          {/* Stat cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-accent p-6 text-white shadow-xl shadow-accent/20">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wide text-white/80">Avg. Order Value</p>
                <Icon name="trendingUp" className="h-5 w-5 text-white" />
              </div>
              <p className="mt-3 text-3xl font-black">Rs. {stats.avgOrderValue.toFixed(0)}</p>
              <p className="mt-1 text-xs font-semibold text-white/70">Across {stats.totalOrders} confirmed orders</p>
            </div>

            <Card className="p-6 rounded-2xl border border-border-main shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wide text-muted">Total Orders</p>
                <Icon name="cart" className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-3 text-3xl font-black text-heading">{stats.totalOrders}</p>
              <p className="mt-1 text-xs font-semibold text-muted">Confirmed &amp; paid orders</p>
            </Card>

            <Card className="p-6 rounded-2xl border border-border-main shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wide text-muted">Lifetime Value</p>
                <Icon name="gem" className="h-5 w-5 text-accent" />
              </div>
              <p className="mt-3 text-3xl font-black text-heading">Rs. {stats.lifetimeValue.toFixed(0)}</p>
              <p className="mt-1 text-xs font-semibold text-muted">Total revenue to date</p>
            </Card>
          </div>

          {/* Chart + Top products */}
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <Card className="p-6 rounded-2xl border border-border-main shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-heading">Sales Overtime</h3>
                <Badge variant="primary">Last 6 months</Badge>
              </div>
              {dataLoading ? (
                <div className="animate-pulse mt-4 h-56 w-full rounded-xl bg-alt" />
              ) : (
                <SalesChart points={chartPoints} />
              )}
            </Card>

            <Card className="p-6 rounded-2xl border border-border-main shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-heading">Top Selling Products</h3>
                <Link to="/seller-dashboard#products" onClick={scrollToProducts} className="text-xs font-bold text-primary">
                  See all
                </Link>
              </div>

              <div className="mt-4 space-y-4">
                {dataLoading ? (
                  Array.from({ length: 3 }).map((_, i) => <div key={i} className="animate-pulse bg-alt h-14 rounded-xl" />)
                ) : topProducts.length === 0 ? (
                  <p className="text-sm font-semibold text-muted">No sales yet — once orders come in, your best sellers show up here.</p>
                ) : (
                  topProducts.map((item) => (
                    <div key={item.title} className="flex items-center gap-3">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="h-12 w-12 rounded-xl object-cover" />
                      ) : (
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-alt text-primary">
                          <Icon name="bag" className="h-5 w-5" />
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-heading">{item.title}</p>
                        <p className="text-xs font-semibold text-muted">{item.quantity} sold</p>
                      </div>
                      {item.stock !== undefined && (
                        <Badge variant={item.stock > 0 ? "success" : "error"} size="xs">
                          {item.stock > 0 ? `${item.stock} left` : "Out of stock"}
                        </Badge>
                      )}
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Latest Orders */}
          <Card className="mt-6 p-6 rounded-2xl border border-border-main shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-heading">Latest Orders</h3>
              <Link to="/seller/orders" className="text-xs font-bold text-primary">
                View all orders
              </Link>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="text-xs font-bold uppercase tracking-wide text-muted">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Product</th>
                    <th className="pb-3">Order Date</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-main">
                  {dataLoading ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-muted">Loading orders...</td>
                    </tr>
                  ) : latestOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center font-semibold text-muted">
                        No orders yet.
                      </td>
                    </tr>
                  ) : (
                    latestOrders.map((order) => (
                      <tr key={order._id}>
                        <td className="py-3 font-bold text-heading">#{order._id.slice(-6).toUpperCase()}</td>
                        <td className="py-3 font-medium text-body">{order.productTitle}</td>
                        <td className="py-3 font-medium text-body">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 font-bold text-primary">Rs. {order.totalAmount}</td>
                        <td className="py-3">
                          <Badge variant={STATUS_VARIANT[order.status] || "muted"} className="capitalize">
                            {order.status?.replace("_", " ")}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* (b) "My Products" card header — "View Trash" quick link add hua */}
          <Card id="products" className="mt-6 p-6 rounded-2xl border border-border-main shadow-sm">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-primary">Inventory</p>
                <h3 className="text-2xl font-extrabold text-heading">My Products</h3>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search your products..."
                  className="h-10 w-56 rounded-xl border border-border-main px-3 text-sm font-medium outline-none focus:border-primary"
                />
                <Link to="/seller/trash" className="text-xs font-bold text-primary">
                  View Trash
                </Link>
              </div>
            </div>

            {dataLoading ? (
              <div className="rounded-[24px] bg-page border border-border-main p-8 text-center text-sm font-semibold text-body">
                Loading products...
              </div>
            ) : (
              <ProductList
                products={filteredProducts}
                onProductDeleted={(id) => setProducts((prev) => prev.filter((p) => p._id !== id))}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;