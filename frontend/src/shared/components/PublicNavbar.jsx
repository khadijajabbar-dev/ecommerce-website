import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { getAllProductsAPI } from "../../api/product.api";
import cartService from "../../features/buyer/services/cart.service";

const navLinks = [
  { label: "Home", to: "/", isButton: true },
  { label: "Marketplace", to: "/marketplace", badge: "New", badgeColor: "bg-primary" },
  { label: "Flash Sales", to: "/flash-sales", badge: "Hot", badgeColor: "bg-primary" },
  { label: "Blog", to: "/blog" },
];

const pageLinks = [
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const PublicNavbar = ({ activePage = "Home" }) => {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const [openPages, setOpenPages] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [auth, setAuth] = useState({ token: null, role: null });
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const pagesRef = useRef(null);

  useEffect(() => {
    const syncAuth = () => {
      setAuth({
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role"),
      });
    };
    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth-changed", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth-changed", syncAuth);
    };
  }, []);

  useEffect(() => {
    const onClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
      if (pagesRef.current && !pagesRef.current.contains(event.target)) {
        setOpenPages(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isBuyer = Boolean(auth.token && auth.role === "buyer");
  const isSeller = Boolean(auth.token && auth.role === "seller");

  useEffect(() => {
    let cancelled = false;

    const refreshCartCount = async () => {
      if (!isBuyer) {
        setCartCount(0);
        return;
      }
      try {
        const result = await cartService.getCart();
        if (cancelled) return;
        const total = (result.cart || []).reduce((sum, item) => sum + (item.quantity || 0), 0);
        setCartCount(total);
      } catch {
        // non-critical
      }
    };

    (async () => {
      await refreshCartCount();
    })();

    window.addEventListener("cart-changed", refreshCartCount);
    return () => {
      cancelled = true;
      window.removeEventListener("cart-changed", refreshCartCount);
    };
  }, [isBuyer]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("auth-changed"));
    setOpenProfile(false);
    navigate("/login", { replace: true });
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const query = searchTerm.trim();

    if (!query) {
      navigate("/marketplace");
      return;
    }

    setSearching(true);
    try {
      const result = await getAllProductsAPI(1, 5, "all", query);
      const matches = result.products || [];

      if (matches.length === 1) {
        navigate(`/product/${matches[0]._id}`);
      } else if (matches.length > 1) {
        const exact = matches.find(
          (product) => product.title?.trim().toLowerCase() === query.toLowerCase()
        );
        navigate(`/product/${(exact || matches[0])._id}`);
      } else {
        navigate(`/marketplace?search=${encodeURIComponent(query)}`);
      }
    } catch {
      navigate(`/marketplace?search=${encodeURIComponent(query)}`);
    } finally {
      setSearching(false);
      setSearchTerm("");
    }
  };

  return (
    <header className="absolute top-4 w-full px-4 sm:px-6 lg:px-8 z-50 pointer-events-none">
      <div className="mx-auto max-w-7xl pointer-events-auto">
        <div className="relative overflow-hidden rounded-[32px] bg-white shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-gray-100 p-4 sm:p-6 lg:px-8 lg:py-6">
          
          {/* Subtle Background Blobs (Decoration) */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 flex flex-col gap-5">
            {/* TOP ROW: Logo, Nav Links, Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Easy Mart home">
                <Icon name="bag" className="w-9 h-9 text-primary" filled />
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-800 leading-none tracking-tight">
                    Easy<span className="text-primary font-light">Mart</span>
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-1">Shop Smart, Live Easy</span>
                </div>
              </Link>

              {/* Center Navigation Links (Hidden on mobile) */}
              <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[15px] font-bold text-slate-700">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`relative transition flex items-center gap-2 ${
                      link.isButton 
                        ? "bg-primary text-white px-5 py-2 rounded-xl shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-105 active:scale-95" 
                        : "hover:text-primary"
                    }`}
                  >
                    {link.isButton && <Icon name="home" className="w-4 h-4" />}
                    {link.label}
                    {link.badge && (
                      <span className={`absolute -top-2.5 -right-3.5 px-1.5 py-0.5 text-[9px] font-black text-white rounded-md uppercase tracking-wider ${link.badgeColor}`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}

                <div className="relative" ref={pagesRef}>
                  <button
                    type="button"
                    onClick={() => setOpenPages((v) => !v)}
                    className="flex items-center gap-1 hover:text-primary transition"
                  >
                    Pages
                    <Icon name="chevronDown" className={`h-4 w-4 transition-transform ${openPages ? "rotate-180" : ""}`} />
                  </button>
                  {openPages && (
                    <div className="absolute left-0 top-full mt-4 w-44 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl animate-fade-in-up">
                      {pageLinks.map((link) => (
                        <Link
                          key={link.label}
                          to={link.to}
                          onClick={() => setOpenPages(false)}
                          className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-primary transition"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </nav>

              {/* Quick Actions (Right) */}
              <div className="flex items-center gap-3 sm:gap-4">
                
                {/* Mobile Menu Button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((v) => !v)}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-slate-600 shadow-sm md:hidden"
                >
                  <Icon name={mobileMenuOpen ? "close" : "menu"} className="h-5 w-5" />
                </button>

                {/* Wishlist */}
                <Link to="/buyer/wishlist" className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-slate-600 shadow-sm hover:border-primary hover:text-primary transition group">
                  <Icon name="heart" className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-white">0</span>
                </Link>

                {/* Cart */}
                <Link to="/buyer/cart" className="flex items-center gap-3 group">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-slate-600 shadow-sm group-hover:border-primary group-hover:text-primary transition">
                    <Icon name="cart" className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-white">
                      {cartCount > 99 ? "99+" : cartCount || 0}
                    </span>
                  </div>
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="text-[10px] font-bold text-gray-400 leading-none">Cart</span>
                    <span className="text-xs font-extrabold text-slate-800 mt-1 transition group-hover:text-primary">My Cart</span>
                  </div>
                </Link>

                {/* Account / Login */}
                <div className="relative" ref={profileRef}>
                  <button onClick={() => setOpenProfile(!openProfile)} className="flex items-center gap-3 group text-left">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-slate-600 shadow-sm group-hover:border-primary group-hover:text-primary transition">
                      <Icon name="user" className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="hidden lg:flex flex-col text-left">
                      <span className="text-[10px] font-bold text-gray-400 leading-none">
                        {isBuyer || isSeller ? "Account" : "Get Started"}
                      </span>
                      <span className="text-xs font-extrabold text-slate-800 mt-1 transition group-hover:text-primary">
                        {isBuyer || isSeller ? "My Account" : "Login & Signup"}
                      </span>
                    </div>
                  </button>

                  {/* Profile Dropdown */}
                  {openProfile && (
                    <div className="absolute right-0 top-full mt-4 w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl animate-fade-in-up">
                      {isBuyer && (
                        <>
                          <Link to="/buyer/profile" onClick={() => setOpenProfile(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-primary transition">My Profile</Link>
                          <Link to="/buyer/orders" onClick={() => setOpenProfile(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-primary transition">My Orders</Link>
                        </>
                      )}
                      {isSeller && (
                        <Link to="/seller-dashboard" onClick={() => setOpenProfile(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-primary transition">Seller Dashboard</Link>
                      )}
                      {(isBuyer || isSeller) ? (
                        <button type="button" onClick={handleLogout} className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50 transition">Log Out</button>
                      ) : (
                        <Link to="/login" onClick={() => setOpenProfile(false)} className="block w-full rounded-xl px-3 py-2.5 text-center text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition">Login / Register</Link>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* BOTTOM ROW: Search Bar */}
            <div className="flex justify-center mt-2 px-2 sm:px-4">
              <form onSubmit={handleSearchSubmit} className="flex w-full max-w-4xl items-center rounded-[24px] border border-primary/40 bg-white shadow-sm focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary transition overflow-hidden h-[52px]">
                
                {/* All Categories Dropdown (Visual only for now, matches design) */}
                <button type="button" className="hidden sm:flex items-center justify-center gap-2 px-6 h-full border-r border-gray-200 text-sm font-bold text-slate-700 hover:bg-gray-50 transition shrink-0 bg-page/30">
                  <Icon name="grid" className="w-4 h-4 text-gray-500" />
                  All Categories
                  <Icon name="chevronDown" className="w-4 h-4 ml-1 text-gray-400" />
                </button>

                {/* Input */}
                <div className="flex-1 flex items-center h-full px-4 sm:px-6 gap-3 bg-white relative">
                  <Icon name="search" className="w-5 h-5 text-gray-400 shrink-0" />
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for products, brands, and categories..."
                    className="w-full h-full text-[15px] font-medium text-slate-700 outline-none placeholder:text-gray-400 bg-transparent"
                  />
                </div>

                {/* Search Button */}
                <button type="submit" className="h-full px-8 bg-primary text-white hover:bg-primary/90 transition flex items-center justify-center shrink-0">
                  <Icon name="search" className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Mobile Navigation Dropdown */}
            {mobileMenuOpen && (
              <nav className="flex flex-col gap-2 mt-4 border-t border-gray-100 pt-4 md:hidden">
                {[...navLinks, ...pageLinks].map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-orange-50 hover:text-primary transition flex items-center gap-2"
                  >
                    {link.isButton && <Icon name="home" className="w-4 h-4 text-primary" />}
                    {link.label}
                    {link.badge && (
                      <span className={`px-1.5 py-0.5 text-[9px] font-black text-white rounded-md uppercase tracking-wider ${link.badgeColor}`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;