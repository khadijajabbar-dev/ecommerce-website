// // // import { useEffect, useRef, useState } from "react";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import Icon from "./Icon";
// // // import { getAllProductsAPI } from "../../api/product.api";
// // // import cartService from "../../features/buyer/services/cart.service";

// // // const navLinks = [
// // //   { label: "Home", to: "/" },
// // //   { label: "Marketplace", to: "/marketplace" },
// // //   { label: "Blog", to: "/blog" },
// // // ];

// // // const pageLinks = [
// // //   { label: "About Us", to: "/about" },
// // //   { label: "Contact Us", to: "/contact" },
// // // ];

// // // const PublicNavbar = ({ activePage = "Home" }) => {
// // //   const navigate = useNavigate();
// // //   const [openProfile, setOpenProfile] = useState(false);
// // //   const [openPages, setOpenPages] = useState(false);
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [searching, setSearching] = useState(false);
// // //   const [auth, setAuth] = useState({ token: null, role: null });
// // //   const [cartCount, setCartCount] = useState(0);
// // //   const profileRef = useRef(null);
// // //   const pagesRef = useRef(null);

// // //   useEffect(() => {
// // //     const syncAuth = () => {
// // //       setAuth({
// // //         token: localStorage.getItem("token"),
// // //         role: localStorage.getItem("role"),
// // //       });
// // //     };
// // //     syncAuth();
// // //     window.addEventListener("storage", syncAuth);
// // //     window.addEventListener("auth-changed", syncAuth);
// // //     return () => {
// // //       window.removeEventListener("storage", syncAuth);
// // //       window.removeEventListener("auth-changed", syncAuth);
// // //     };
// // //   }, []);

// // //   useEffect(() => {
// // //     const onClick = (event) => {
// // //       if (profileRef.current && !profileRef.current.contains(event.target)) {
// // //         setOpenProfile(false);
// // //       }
// // //       if (pagesRef.current && !pagesRef.current.contains(event.target)) {
// // //         setOpenPages(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", onClick);
// // //     return () => document.removeEventListener("mousedown", onClick);
// // //   }, []);

// // //   const isBuyer = Boolean(auth.token && auth.role === "buyer");
// // //   const isSeller = Boolean(auth.token && auth.role === "seller");

// // //   useEffect(() => {
// // //     let cancelled = false;

// // //     const refreshCartCount = async () => {
// // //       if (!isBuyer) {
// // //         setCartCount(0);
// // //         return;
// // //       }
// // //       try {
// // //         const result = await cartService.getCart();
// // //         if (cancelled) return;
// // //         const total = (result.cart || []).reduce((sum, item) => sum + (item.quantity || 0), 0);
// // //         setCartCount(total);
// // //       } catch {
// // //         // non-critical — leave the last known count in place
// // //       }
// // //     };

// // //     (async () => {
// // //       await refreshCartCount();
// // //     })();

// // //     window.addEventListener("cart-changed", refreshCartCount);
// // //     return () => {
// // //       cancelled = true;
// // //       window.removeEventListener("cart-changed", refreshCartCount);
// // //     };
// // //   }, [isBuyer]);

// // //   const handleLogout = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("role");
// // //     window.dispatchEvent(new Event("auth-changed"));
// // //     setOpenProfile(false);
// // //     navigate("/login", { replace: true });
// // //   };

// // //   const handleSearchSubmit = async (event) => {
// // //     event.preventDefault();
// // //     const query = searchTerm.trim();

// // //     if (!query) {
// // //       navigate("/marketplace");
// // //       return;
// // //     }

// // //     setSearching(true);
// // //     try {
// // //       // Look up the product itself first, so the buyer lands directly on the
// // //       // product page instead of a filtered marketplace list.
// // //       const result = await getAllProductsAPI(1, 5, "all", query);
// // //       const matches = result.products || [];

// // //       if (matches.length === 1) {
// // //         navigate(`/product/${matches[0]._id}`);
// // //       } else if (matches.length > 1) {
// // //         // More than one product matches the term — an exact title match wins,
// // //         // otherwise send the buyer to the best (most recent) match.
// // //         const exact = matches.find(
// // //           (product) => product.title?.trim().toLowerCase() === query.toLowerCase()
// // //         );
// // //         navigate(`/product/${(exact || matches[0])._id}`);
// // //       } else {
// // //         // Nothing matched — fall back to the marketplace with the search
// // //         // term applied so the buyer can see "no results" and try again.
// // //         navigate(`/marketplace?search=${encodeURIComponent(query)}`);
// // //       }
// // //     } catch {
// // //       navigate(`/marketplace?search=${encodeURIComponent(query)}`);
// // //     } finally {
// // //       setSearching(false);
// // //       setSearchTerm("");
// // //     }
// // //   };

// // //   return (
// // //     <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
// // //       {/* Top Banner */}
// // //       <div className="bg-[#0b4f4a] py-2 text-center text-[11px] font-bold text-teal-50/90 shadow-inner">
// // //         <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4">
// // //           <span className="flex items-center gap-1.5">
// // //             <Icon name="truck" className="h-3.5 w-3.5 text-amber-300" />
// // //             Free Delivery on Orders Over $50
// // //           </span>
// // //           <span className="h-3 w-px bg-teal-800" />
// // //           <span className="flex items-center gap-1.5">
// // //             <Icon name="shieldCheck" className="h-3.5 w-3.5 text-amber-300" />
// // //             100% Genuine Products
// // //           </span>
// // //         </div>
// // //       </div>

// // //       {/* Main Header Area — single row: logo | nav links | quick actions */}
// // //       <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
// // //         <div className="flex min-h-[64px] w-full flex-wrap items-center justify-between gap-4">

// // //           {/* Logo with Tagline */}
// // //           <Link to="/" className="flex items-center gap-3" aria-label="Easy Mart home">
// // //             <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eefaf9] text-[#0f766e] border border-teal-100 shadow-sm">
// // //               <Icon name="bag" className="h-6 w-6 fill-current" />
// // //             </span>
// // //             <div className="flex flex-col">
// // //               <span className="text-xl font-black leading-none tracking-tight text-[#17233f]">
// // //                 Easy Mart
// // //               </span>
// // //               <span className="mt-1 text-[10px] font-bold tracking-wide text-slate-400">
// // //                 Shop Smart, Live Better
// // //               </span>
// // //             </div>
// // //           </Link>

// // //           {/* Navigation Links (centered) */}
// // //           <nav className="order-3 flex w-full flex-wrap items-center justify-center gap-1 text-sm font-semibold text-slate-500 sm:order-2 sm:w-auto sm:gap-2 lg:gap-4">
// // //             {navLinks.map((link) => (
// // //               <Link
// // //                 key={link.label}
// // //                 to={link.to}
// // //                 className={`relative whitespace-nowrap rounded-xl px-3 py-2.5 transition hover:bg-teal-50/70 hover:text-teal-700 ${
// // //                   link.label === activePage ? "bg-teal-50 text-teal-700" : ""
// // //                 }`}
// // //               >
// // //                 {link.label}
// // //                 {link.label === activePage && (
// // //                   <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-teal-600" />
// // //                 )}
// // //               </Link>
// // //             ))}

// // //             <div className="relative" ref={pagesRef}>
// // //               <button
// // //                 type="button"
// // //                 onClick={() => setOpenPages((v) => !v)}
// // //                 className={`inline-flex items-center gap-1 whitespace-nowrap rounded-xl px-3 py-2.5 transition hover:bg-teal-50/70 hover:text-teal-700 ${
// // //                   pageLinks.some((p) => p.label === activePage) ? "bg-teal-50 text-teal-700" : ""
// // //                 }`}
// // //               >
// // //                 Pages
// // //                 <Icon
// // //                   name="chevronDown"
// // //                   className={`h-4 w-4 transition-transform ${openPages ? "rotate-180" : ""}`}
// // //                 />
// // //               </button>
// // //               {openPages && (
// // //                 <div className="absolute left-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
// // //                   {pageLinks.map((link) => (
// // //                     <Link
// // //                       key={link.label}
// // //                       to={link.to}
// // //                       onClick={() => setOpenPages(false)}
// // //                       className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
// // //                     >
// // //                       {link.label}
// // //                     </Link>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </nav>

// // //           {/* Quick actions: Wishlist, Cart, Account — same row as logo/nav */}
// // //           <div className="order-2 flex items-center gap-4 sm:order-3 sm:gap-5">

// // //             {/* Wishlist */}
// // //             <Link
// // //               to="/buyer/wishlist"
// // //               className="flex items-center gap-2 group transition"
// // //               aria-label="Wishlist"
// // //             >
// // //               <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 group-hover:text-teal-700 group-hover:bg-teal-50 transition border border-slate-100">
// // //                 <Icon name="heart" className="h-5 w-5" />
// // //               </span>
// // //             </Link>

// // //             {/* Cart with Badge */}
// // //             <Link
// // //               to="/buyer/cart"
// // //               className="flex items-center gap-2 group transition"
// // //               aria-label="Cart"
// // //             >
// // //               <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#eefaf9] text-[#0f766e] group-hover:bg-[#dff3f2] transition border border-teal-100">
// // //                 <Icon name="cart" className="h-5 w-5" />
// // //                 {cartCount > 0 && (
// // //                   <span className="absolute -right-1.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-teal-600 text-[9px] font-black text-white ring-2 ring-white">
// // //                     {cartCount > 99 ? "99+" : cartCount}
// // //                   </span>
// // //                 )}
// // //               </span>
// // //               <div className="hidden lg:flex flex-col text-left">
// // //                 <span className="text-[10px] font-bold text-slate-400 leading-none">Cart</span>
// // //                 <span className="text-xs font-extrabold text-slate-700 mt-1">My Cart</span>
// // //               </div>
// // //             </Link>

// // //             {/* Login/Register or Account dropdown */}
// // //             <div className="relative" ref={profileRef}>
// // //               {isBuyer || isSeller ? (
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => setOpenProfile((v) => !v)}
// // //                   className="flex items-center gap-2 group transition"
// // //                 >
// // //                   <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 group-hover:text-teal-700 transition border border-slate-100">
// // //                     <Icon name="user" className="h-5 w-5" />
// // //                   </span>
// // //                   <div className="hidden lg:flex flex-col text-left">
// // //                     <span className="text-[10px] font-bold text-slate-400 leading-none">Account</span>
// // //                     <span className="text-xs font-extrabold text-slate-700 mt-1 flex items-center gap-0.5">
// // //                       My Account <Icon name="chevronDown" className="h-3 w-3" />
// // //                     </span>
// // //                   </div>
// // //                 </button>
// // //               ) : (
// // //                 <Link to="/login" className="flex items-center gap-2 group transition">
// // //                   <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 group-hover:text-teal-700 transition border border-slate-100">
// // //                     <Icon name="user" className="h-5 w-5" />
// // //                   </span>
// // //                   <div className="hidden lg:flex flex-col text-left">
// // //                     <span className="text-[10px] font-bold text-slate-400 leading-none">Login / Register</span>
// // //                     <span className="text-xs font-extrabold text-slate-700 mt-1 flex items-center gap-0.5">
// // //                       My Account <Icon name="chevronDown" className="h-3 w-3" />
// // //                     </span>
// // //                   </div>
// // //                 </Link>
// // //               )}

// // //               {openProfile && (isBuyer || isSeller) && (
// // //                 <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
// // //                   {isBuyer && (
// // //                     <>
// // //                       <Link
// // //                         to="/buyer/profile"
// // //                         onClick={() => setOpenProfile(false)}
// // //                         className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
// // //                       >
// // //                         My Profile
// // //                       </Link>
// // //                       <Link
// // //                         to="/buyer/orders"
// // //                         onClick={() => setOpenProfile(false)}
// // //                         className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
// // //                       >
// // //                         My Orders
// // //                       </Link>
// // //                     </>
// // //                   )}
// // //                   {isSeller && (
// // //                     <Link
// // //                       to="/seller-dashboard"
// // //                       onClick={() => setOpenProfile(false)}
// // //                       className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
// // //                     >
// // //                       Seller Dashboard
// // //                     </Link>
// // //                   )}
// // //                   <button
// // //                     type="button"
// // //                     onClick={handleLogout}
// // //                     className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
// // //                   >
// // //                     Log Out
// // //                   </button>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Full-width search bar — its own row below logo/nav/actions */}
// // //         <form onSubmit={handleSearchSubmit} className="mt-3">
// // //           <div className="relative w-full">
// // //             <Icon
// // //               name="search"
// // //               className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
// // //             />
// // //             <input
// // //               type="search"
// // //               value={searchTerm}
// // //               onChange={(event) => setSearchTerm(event.target.value)}
// // //               placeholder={searching ? "Searching..." : "Search for products, brands, and categories..."}
// // //               disabled={searching}
// // //               className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100 disabled:opacity-60"
// // //             />
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </header>
// // //   );
// // // };

// // // export default PublicNavbar;



// // import { useEffect, useRef, useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import Icon from "./Icon";
// // import { getAllProductsAPI } from "../../api/product.api";
// // import cartService from "../../features/buyer/services/cart.service";

// // const navLinks = [
// //   { label: "Home", to: "/" },
// //   { label: "Marketplace", to: "/marketplace" },
// //   { label: "Blog", to: "/blog" },
// // ];

// // const pageLinks = [
// //   { label: "About Us", to: "/about" },
// //   { label: "Contact Us", to: "/contact" },
// // ];

// // const PublicNavbar = ({ activePage = "Home" }) => {
// //   const navigate = useNavigate();
// //   const [openProfile, setOpenProfile] = useState(false);
// //   const [openPages, setOpenPages] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [searching, setSearching] = useState(false);
// //   const [auth, setAuth] = useState({ token: null, role: null });
// //   const [cartCount, setCartCount] = useState(0);
// //   const profileRef = useRef(null);
// //   const pagesRef = useRef(null);

// //   useEffect(() => {
// //     const syncAuth = () => {
// //       setAuth({
// //         token: localStorage.getItem("token"),
// //         role: localStorage.getItem("role"),
// //       });
// //     };
// //     syncAuth();
// //     window.addEventListener("storage", syncAuth);
// //     window.addEventListener("auth-changed", syncAuth);
// //     return () => {
// //       window.removeEventListener("storage", syncAuth);
// //       window.removeEventListener("auth-changed", syncAuth);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     const onClick = (event) => {
// //       if (profileRef.current && !profileRef.current.contains(event.target)) {
// //         setOpenProfile(false);
// //       }
// //       if (pagesRef.current && !pagesRef.current.contains(event.target)) {
// //         setOpenPages(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", onClick);
// //     return () => document.removeEventListener("mousedown", onClick);
// //   }, []);

// //   const isBuyer = Boolean(auth.token && auth.role === "buyer");
// //   const isSeller = Boolean(auth.token && auth.role === "seller");

// //   useEffect(() => {
// //     let cancelled = false;

// //     const refreshCartCount = async () => {
// //       if (!isBuyer) {
// //         setCartCount(0);
// //         return;
// //       }
// //       try {
// //         const result = await cartService.getCart();
// //         if (cancelled) return;
// //         const total = (result.cart || []).reduce((sum, item) => sum + (item.quantity || 0), 0);
// //         setCartCount(total);
// //       } catch {
// //         // non-critical — leave the last known count in place
// //       }
// //     };

// //     (async () => {
// //       await refreshCartCount();
// //     })();

// //     window.addEventListener("cart-changed", refreshCartCount);
// //     return () => {
// //       cancelled = true;
// //       window.removeEventListener("cart-changed", refreshCartCount);
// //     };
// //   }, [isBuyer]);

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("role");
// //     window.dispatchEvent(new Event("auth-changed"));
// //     setOpenProfile(false);
// //     navigate("/login", { replace: true });
// //   };

// //   const handleSearchSubmit = async (event) => {
// //     event.preventDefault();
// //     const query = searchTerm.trim();

// //     if (!query) {
// //       navigate("/marketplace");
// //       return;
// //     }

// //     setSearching(true);
// //     try {
// //       // Look up the product itself first, so the buyer lands directly on the
// //       // product page instead of a filtered marketplace list.
// //       const result = await getAllProductsAPI(1, 5, "all", query);
// //       const matches = result.products || [];

// //       if (matches.length === 1) {
// //         navigate(`/product/${matches[0]._id}`);
// //       } else if (matches.length > 1) {
// //         // More than one product matches the term — an exact title match wins,
// //         // otherwise send the buyer to the best (most recent) match.
// //         const exact = matches.find(
// //           (product) => product.title?.trim().toLowerCase() === query.toLowerCase()
// //         );
// //         navigate(`/product/${(exact || matches[0])._id}`);
// //       } else {
// //         // Nothing matched — fall back to the marketplace with the search
// //         // term applied so the buyer can see "no results" and try again.
// //         navigate(`/marketplace?search=${encodeURIComponent(query)}`);
// //       }
// //     } catch {
// //       navigate(`/marketplace?search=${encodeURIComponent(query)}`);
// //     } finally {
// //       setSearching(false);
// //       setSearchTerm("");
// //     }
// //   };

// //   return (
// //     <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
// //       {/* Top Banner */}
// //       <div className="bg-[#0b4f4a] py-2 text-center text-[11px] font-bold text-teal-50/90 shadow-inner">
// //         <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4">
// //           <span className="flex items-center gap-1.5">
// //             <Icon name="truck" className="h-3.5 w-3.5 text-amber-300" />
// //             Free Delivery on Orders Over $50
// //           </span>
// //           <span className="h-3 w-px bg-teal-800" />
// //           <span className="flex items-center gap-1.5">
// //             <Icon name="shieldCheck" className="h-3.5 w-3.5 text-amber-300" />
// //             100% Genuine Products
// //           </span>
// //         </div>
// //       </div>

// //       {/* Main Header Area — single row: logo | nav links | quick actions */}
// //       <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
// //         <div className="flex min-h-[64px] w-full flex-wrap items-center justify-between gap-4">

// //           {/* Logo with Tagline */}
// //           <Link to="/" className="flex items-center gap-3" aria-label="Easy Mart home">
// //             <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eefaf9] text-[#0f766e] border border-teal-100 shadow-sm">
// //               <Icon name="bag" className="h-6 w-6 fill-current" />
// //             </span>
// //             <div className="flex flex-col">
// //               <span className="text-xl font-black leading-none tracking-tight text-[#17233f]">
// //                 Easy Mart
// //               </span>
// //               <span className="mt-1 text-[10px] font-bold tracking-wide text-slate-400">
// //                 Shop Smart, Live Better
// //               </span>
// //             </div>
// //           </Link>

// //           {/* Navigation Links (centered) */}
// //           <nav className="order-3 flex w-full flex-wrap items-center justify-center gap-1 text-sm font-semibold text-slate-500 sm:order-2 sm:w-auto sm:gap-2 lg:gap-4">
// //             {navLinks.map((link) => (
// //               <Link
// //                 key={link.label}
// //                 to={link.to}
// //                 className={`relative whitespace-nowrap rounded-xl px-3 py-2.5 transition hover:bg-teal-50/70 hover:text-teal-700 ${
// //                   link.label === activePage ? "bg-teal-50 text-teal-700" : ""
// //                 }`}
// //               >
// //                 {link.label}
// //                 {link.label === activePage && (
// //                   <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-teal-600" />
// //                 )}
// //               </Link>
// //             ))}

// //             <div className="relative" ref={pagesRef}>
// //               <button
// //                 type="button"
// //                 onClick={() => setOpenPages((v) => !v)}
// //                 className={`inline-flex items-center gap-1 whitespace-nowrap rounded-xl px-3 py-2.5 transition hover:bg-teal-50/70 hover:text-teal-700 ${
// //                   pageLinks.some((p) => p.label === activePage) ? "bg-teal-50 text-teal-700" : ""
// //                 }`}
// //               >
// //                 Pages
// //                 <Icon
// //                   name="chevronDown"
// //                   className={`h-4 w-4 transition-transform ${openPages ? "rotate-180" : ""}`}
// //                 />
// //               </button>
// //               {openPages && (
// //                 <div className="absolute left-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
// //                   {pageLinks.map((link) => (
// //                     <Link
// //                       key={link.label}
// //                       to={link.to}
// //                       onClick={() => setOpenPages(false)}
// //                       className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
// //                     >
// //                       {link.label}
// //                     </Link>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           </nav>

// //           {/* Quick actions: Wishlist, Cart, Account — same row as logo/nav */}
// //           <div className="order-2 flex items-center gap-4 sm:order-3 sm:gap-5">

// //             {/* Wishlist */}
// //             <Link
// //               to="/buyer/wishlist"
// //               className="flex items-center gap-2 group transition"
// //               aria-label="Wishlist"
// //             >
// //               <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 group-hover:text-teal-700 group-hover:bg-teal-50 transition border border-slate-100">
// //                 <Icon name="heart" className="h-5 w-5" />
// //               </span>
// //             </Link>

// //             {/* Cart with Badge */}
// //             <Link
// //               to="/buyer/cart"
// //               className="flex items-center gap-2 group transition"
// //               aria-label="Cart"
// //             >
// //               <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#eefaf9] text-[#0f766e] group-hover:bg-[#dff3f2] transition border border-teal-100">
// //                 <Icon name="cart" className="h-5 w-5" />
// //                 {cartCount > 0 && (
// //                   <span className="absolute -right-1.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-teal-600 text-[9px] font-black text-white ring-2 ring-white">
// //                     {cartCount > 99 ? "99+" : cartCount}
// //                   </span>
// //                 )}
// //               </span>
// //               <div className="hidden lg:flex flex-col text-left">
// //                 <span className="text-[10px] font-bold text-slate-400 leading-none">Cart</span>
// //                 <span className="text-xs font-extrabold text-slate-700 mt-1">My Cart</span>
// //               </div>
// //             </Link>

// //             {/* Login/Register or Account dropdown */}
// //             <div className="relative" ref={profileRef}>
// //               {isBuyer || isSeller ? (
// //                 <button
// //                   type="button"
// //                   onClick={() => setOpenProfile((v) => !v)}
// //                   className="flex items-center gap-2 group transition"
// //                 >
// //                   <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 group-hover:text-teal-700 transition border border-slate-100">
// //                     <Icon name="user" className="h-5 w-5" />
// //                   </span>
// //                   <div className="hidden lg:flex flex-col text-left">
// //                     <span className="text-[10px] font-bold text-slate-400 leading-none">Account</span>
// //                     <span className="text-xs font-extrabold text-slate-700 mt-1 flex items-center gap-0.5">
// //                       My Account <Icon name="chevronDown" className="h-3 w-3" />
// //                     </span>
// //                   </div>
// //                 </button>
// //               ) : (
// //                 <Link to="/login" className="flex items-center gap-2 group transition">
// //                   <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 group-hover:text-teal-700 transition border border-slate-100">
// //                     <Icon name="user" className="h-5 w-5" />
// //                   </span>
// //                   <div className="hidden lg:flex flex-col text-left">
// //                     <span className="text-[10px] font-bold text-slate-400 leading-none">Login / Register</span>
// //                     <span className="text-xs font-extrabold text-slate-700 mt-1 flex items-center gap-0.5">
// //                       My Account <Icon name="chevronDown" className="h-3 w-3" />
// //                     </span>
// //                   </div>
// //                 </Link>
// //               )}

// //               {openProfile && (isBuyer || isSeller) && (
// //                 <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
// //                   {isBuyer && (
// //                     <>
// //                       <Link
// //                         to="/buyer/profile"
// //                         onClick={() => setOpenProfile(false)}
// //                         className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
// //                       >
// //                         My Profile
// //                       </Link>
// //                       <Link
// //                         to="/buyer/orders"
// //                         onClick={() => setOpenProfile(false)}
// //                         className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
// //                       >
// //                         My Orders
// //                       </Link>
// //                     </>
// //                   )}
// //                   {isSeller && (
// //                     <Link
// //                       to="/seller-dashboard"
// //                       onClick={() => setOpenProfile(false)}
// //                       className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
// //                     >
// //                       Seller Dashboard
// //                     </Link>
// //                   )}
// //                   <button
// //                     type="button"
// //                     onClick={handleLogout}
// //                     className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
// //                   >
// //                     Log Out
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Search bar — centered, own row below logo/nav/actions */}
// //         <form onSubmit={handleSearchSubmit} className="mt-3 flex justify-center">
// //           <div className="relative w-full max-w-2xl">
// //             <Icon
// //               name="search"
// //               className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
// //             />
// //             <input
// //               type="search"
// //               value={searchTerm}
// //               onChange={(event) => setSearchTerm(event.target.value)}
// //               placeholder={searching ? "Searching..." : "Search for products, brands, and categories..."}
// //               disabled={searching}
// //               className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100 disabled:opacity-60"
// //             />
// //           </div>
// //         </form>
// //       </div>
// //     </header>
// //   );
// // };

// // export default PublicNavbar;


// import { useEffect, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Icon from "./Icon";
// import { getAllProductsAPI } from "../../api/product.api";
// import cartService from "../../features/buyer/services/cart.service";

// const navLinks = [
//   { label: "Home", to: "/" },
//   { label: "Marketplace", to: "/marketplace" },
//   { label: "Flash Sales", to: "/flash-sales" },
//   { label: "Blog", to: "/blog" },
// ];

// const pageLinks = [
//   { label: "About Us", to: "/about" },
//   { label: "Contact Us", to: "/contact" },
// ];

// const PublicNavbar = ({ activePage = "Home" }) => {
//   const navigate = useNavigate();
//   const [openProfile, setOpenProfile] = useState(false);
//   const [openPages, setOpenPages] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searching, setSearching] = useState(false);
//   const [auth, setAuth] = useState({ token: null, role: null });
//   const [cartCount, setCartCount] = useState(0);
//   const profileRef = useRef(null);
//   const pagesRef = useRef(null);

//   useEffect(() => {
//     const syncAuth = () => {
//       setAuth({
//         token: localStorage.getItem("token"),
//         role: localStorage.getItem("role"),
//       });
//     };
//     syncAuth();
//     window.addEventListener("storage", syncAuth);
//     window.addEventListener("auth-changed", syncAuth);
//     return () => {
//       window.removeEventListener("storage", syncAuth);
//       window.removeEventListener("auth-changed", syncAuth);
//     };
//   }, []);

//   useEffect(() => {
//     const onClick = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setOpenProfile(false);
//       }
//       if (pagesRef.current && !pagesRef.current.contains(event.target)) {
//         setOpenPages(false);
//       }
//     };
//     document.addEventListener("mousedown", onClick);
//     return () => document.removeEventListener("mousedown", onClick);
//   }, []);

//   const isBuyer = Boolean(auth.token && auth.role === "buyer");
//   const isSeller = Boolean(auth.token && auth.role === "seller");

//   useEffect(() => {
//     let cancelled = false;

//     const refreshCartCount = async () => {
//       if (!isBuyer) {
//         setCartCount(0);
//         return;
//       }
//       try {
//         const result = await cartService.getCart();
//         if (cancelled) return;
//         const total = (result.cart || []).reduce((sum, item) => sum + (item.quantity || 0), 0);
//         setCartCount(total);
//       } catch {
//         // non-critical — leave the last known count in place
//       }
//     };

//     (async () => {
//       await refreshCartCount();
//     })();

//     window.addEventListener("cart-changed", refreshCartCount);
//     return () => {
//       cancelled = true;
//       window.removeEventListener("cart-changed", refreshCartCount);
//     };
//   }, [isBuyer]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     window.dispatchEvent(new Event("auth-changed"));
//     setOpenProfile(false);
//     navigate("/login", { replace: true });
//   };

//   const handleSearchSubmit = async (event) => {
//     event.preventDefault();
//     const query = searchTerm.trim();

//     if (!query) {
//       navigate("/marketplace");
//       return;
//     }

//     setSearching(true);
//     try {
//       // Look up the product itself first, so the buyer lands directly on the
//       // product page instead of a filtered marketplace list.
//       const result = await getAllProductsAPI(1, 5, "all", query);
//       const matches = result.products || [];

//       if (matches.length === 1) {
//         navigate(`/product/${matches[0]._id}`);
//       } else if (matches.length > 1) {
//         // More than one product matches the term — an exact title match wins,
//         // otherwise send the buyer to the best (most recent) match.
//         const exact = matches.find(
//           (product) => product.title?.trim().toLowerCase() === query.toLowerCase()
//         );
//         navigate(`/product/${(exact || matches[0])._id}`);
//       } else {
//         // Nothing matched — fall back to the marketplace with the search
//         // term applied so the buyer can see "no results" and try again.
//         navigate(`/marketplace?search=${encodeURIComponent(query)}`);
//       }
//     } catch {
//       navigate(`/marketplace?search=${encodeURIComponent(query)}`);
//     } finally {
//       setSearching(false);
//       setSearchTerm("");
//     }
//   };

//   return (
//     <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
//       {/* Top Banner */}
//       <div className="bg-[#0b4f4a] py-2 text-center text-[11px] font-bold text-teal-50/90 shadow-inner">
//         <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4">
//           <span className="flex items-center gap-1.5">
//             <Icon name="truck" className="h-3.5 w-3.5 text-amber-300" />
//             Free Delivery on Orders Over $50
//           </span>
//           <span className="h-3 w-px bg-teal-800" />
//           <span className="flex items-center gap-1.5">
//             <Icon name="shieldCheck" className="h-3.5 w-3.5 text-amber-300" />
//             100% Genuine Products
//           </span>
//         </div>
//       </div>

//       {/* Main Header Area — single row: logo | nav links | quick actions */}
//       <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
//         <div className="flex min-h-[64px] w-full flex-wrap items-center justify-between gap-4">

//           {/* Logo with Tagline */}
//           <Link to="/" className="flex items-center gap-3" aria-label="Easy Mart home">
//             <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eefaf9] text-[#0f766e] border border-teal-100 shadow-sm">
//               <Icon name="bag" className="h-6 w-6 fill-current" />
//             </span>
//             <div className="flex flex-col">
//               <span className="text-xl font-black leading-none tracking-tight text-[#17233f]">
//                 Easy Mart
//               </span>
//               <span className="mt-1 text-[10px] font-bold tracking-wide text-slate-400">
//                 Shop Smart, Live Better
//               </span>
//             </div>
//           </Link>

//           {/* Navigation Links (centered) */}
//           <nav className="order-3 flex w-full flex-wrap items-center justify-center gap-1 text-sm font-semibold text-slate-500 sm:order-2 sm:w-auto sm:gap-2 lg:gap-4">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.label}
//                 to={link.to}
//                 className={`relative whitespace-nowrap rounded-xl px-3 py-2.5 transition hover:bg-teal-50/70 hover:text-teal-700 ${
//                   link.label === activePage ? "bg-teal-50 text-teal-700" : ""
//                 }`}
//               >
//                 {link.label}
//                 {link.label === activePage && (
//                   <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-teal-600" />
//                 )}
//               </Link>
//             ))}

//             <div className="relative" ref={pagesRef}>
//               <button
//                 type="button"
//                 onClick={() => setOpenPages((v) => !v)}
//                 className={`inline-flex items-center gap-1 whitespace-nowrap rounded-xl px-3 py-2.5 transition hover:bg-teal-50/70 hover:text-teal-700 ${
//                   pageLinks.some((p) => p.label === activePage) ? "bg-teal-50 text-teal-700" : ""
//                 }`}
//               >
//                 Pages
//                 <Icon
//                   name="chevronDown"
//                   className={`h-4 w-4 transition-transform ${openPages ? "rotate-180" : ""}`}
//                 />
//               </button>
//               {openPages && (
//                 <div className="absolute left-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
//                   {pageLinks.map((link) => (
//                     <Link
//                       key={link.label}
//                       to={link.to}
//                       onClick={() => setOpenPages(false)}
//                       className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//                     >
//                       {link.label}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </nav>

//           {/* Quick actions: Wishlist, Cart, Account — same row as logo/nav */}
//           <div className="order-2 flex items-center gap-4 sm:order-3 sm:gap-5">

//             {/* Wishlist */}
//             <Link
//               to="/buyer/wishlist"
//               className="flex items-center gap-2 group transition"
//               aria-label="Wishlist"
//             >
//               <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 group-hover:text-teal-700 group-hover:bg-teal-50 transition border border-slate-100">
//                 <Icon name="heart" className="h-5 w-5" />
//               </span>
//             </Link>

//             {/* Cart with Badge */}
//             <Link
//               to="/buyer/cart"
//               className="flex items-center gap-2 group transition"
//               aria-label="Cart"
//             >
//               <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#eefaf9] text-[#0f766e] group-hover:bg-[#dff3f2] transition border border-teal-100">
//                 <Icon name="cart" className="h-5 w-5" />
//                 {cartCount > 0 && (
//                   <span className="absolute -right-1.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-teal-600 text-[9px] font-black text-white ring-2 ring-white">
//                     {cartCount > 99 ? "99+" : cartCount}
//                   </span>
//                 )}
//               </span>
//               <div className="hidden lg:flex flex-col text-left">
//                 <span className="text-[10px] font-bold text-slate-400 leading-none">Cart</span>
//                 <span className="text-xs font-extrabold text-slate-700 mt-1">My Cart</span>
//               </div>
//             </Link>

//             {/* Login/Register or Account dropdown */}
//             <div className="relative" ref={profileRef}>
//               {isBuyer || isSeller ? (
//                 <button
//                   type="button"
//                   onClick={() => setOpenProfile((v) => !v)}
//                   className="flex items-center gap-2 group transition"
//                 >
//                   <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 group-hover:text-teal-700 transition border border-slate-100">
//                     <Icon name="user" className="h-5 w-5" />
//                   </span>
//                   <div className="hidden lg:flex flex-col text-left">
//                     <span className="text-[10px] font-bold text-slate-400 leading-none">Account</span>
//                     <span className="text-xs font-extrabold text-slate-700 mt-1 flex items-center gap-0.5">
//                       My Account <Icon name="chevronDown" className="h-3 w-3" />
//                     </span>
//                   </div>
//                 </button>
//               ) : (
//                 <Link to="/login" className="flex items-center gap-2 group transition">
//                   <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 group-hover:text-teal-700 transition border border-slate-100">
//                     <Icon name="user" className="h-5 w-5" />
//                   </span>
//                   <div className="hidden lg:flex flex-col text-left">
//                     <span className="text-[10px] font-bold text-slate-400 leading-none">Login / Register</span>
//                     <span className="text-xs font-extrabold text-slate-700 mt-1 flex items-center gap-0.5">
//                       My Account <Icon name="chevronDown" className="h-3 w-3" />
//                     </span>
//                   </div>
//                 </Link>
//               )}

//               {openProfile && (isBuyer || isSeller) && (
//                 <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
//                   {isBuyer && (
//                     <>
//                       <Link
//                         to="/buyer/profile"
//                         onClick={() => setOpenProfile(false)}
//                         className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//                       >
//                         My Profile
//                       </Link>
//                       <Link
//                         to="/buyer/orders"
//                         onClick={() => setOpenProfile(false)}
//                         className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//                       >
//                         My Orders
//                       </Link>
//                     </>
//                   )}
//                   {isSeller && (
//                     <Link
//                       to="/seller-dashboard"
//                       onClick={() => setOpenProfile(false)}
//                       className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//                     >
//                       Seller Dashboard
//                     </Link>
//                   )}
//                   <button
//                     type="button"
//                     onClick={handleLogout}
//                     className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
//                   >
//                     Log Out
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Search bar — centered, own row below logo/nav/actions */}
//         <form onSubmit={handleSearchSubmit} className="mt-3 flex justify-center">
//           <div className="relative w-full max-w-2xl">
//             <Icon
//               name="search"
//               className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
//             />
//             <input
//               type="search"
//               value={searchTerm}
//               onChange={(event) => setSearchTerm(event.target.value)}
//               placeholder={searching ? "Searching..." : "Search for products, brands, and categories..."}
//               disabled={searching}
//               className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100 disabled:opacity-60"
//             />
//           </div>
//         </form>
//       </div>
//     </header>
//   );
// };

// export default PublicNavbar;



import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { getAllProductsAPI } from "../../api/product.api";
import cartService from "../../features/buyer/services/cart.service";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Marketplace", to: "/marketplace" },
  { label: "Flash Sales", to: "/flash-sales" },
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
        // non-critical — leave the last known count in place
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
      // Look up the product itself first, so the buyer lands directly on the
      // product page instead of a filtered marketplace list.
      const result = await getAllProductsAPI(1, 5, "all", query);
      const matches = result.products || [];

      if (matches.length === 1) {
        navigate(`/product/${matches[0]._id}`);
      } else if (matches.length > 1) {
        // More than one product matches the term — an exact title match wins,
        // otherwise send the buyer to the best (most recent) match.
        const exact = matches.find(
          (product) => product.title?.trim().toLowerCase() === query.toLowerCase()
        );
        navigate(`/product/${(exact || matches[0])._id}`);
      } else {
        // Nothing matched — fall back to the marketplace with the search
        // term applied so the buyer can see "no results" and try again.
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
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
      {/* Top Banner */}
      <div className="bg-[#0b4f4a] py-2 text-center text-[11px] font-bold text-teal-50/90 shadow-inner">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4">
          <span className="flex items-center gap-1.5">
            <Icon name="truck" className="h-3.5 w-3.5 text-amber-300" />
            Free Delivery on Orders Over $50
          </span>
          <span className="h-3 w-px bg-teal-800" />
          <span className="flex items-center gap-1.5">
            <Icon name="shieldCheck" className="h-3.5 w-3.5 text-amber-300" />
            100% Genuine Products
          </span>
        </div>
      </div>

      {/* Main Header Area — single row: logo | nav links | quick actions */}
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-h-[64px] w-full flex-wrap items-center justify-between gap-4">

          {/* Logo with Tagline */}
          <Link to="/" className="flex items-center gap-3" aria-label="Easy Mart home">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eefaf9] text-[#0f766e] border border-teal-100 shadow-sm">
              <Icon name="bag" className="h-6 w-6 fill-current" />
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-black leading-none tracking-tight text-[#17233f]">
                Easy Mart
              </span>
              <span className="mt-1 text-[10px] font-bold tracking-wide text-slate-400">
                Shop Smart, Live Better
              </span>
            </div>
          </Link>

          {/* Navigation Links (centered) — hidden on mobile, shown from md+ */}
          <nav className="order-3 hidden w-full flex-wrap items-center justify-center gap-1 text-sm font-semibold text-slate-500 md:order-2 md:flex md:w-auto md:gap-2 lg:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`relative whitespace-nowrap rounded-xl px-3 py-2.5 transition hover:bg-teal-50/70 hover:text-teal-700 ${
                  link.label === activePage ? "bg-teal-50 text-teal-700" : ""
                }`}
              >
                {link.label}
                {link.label === activePage && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-teal-600" />
                )}
              </Link>
            ))}

            <div className="relative" ref={pagesRef}>
              <button
                type="button"
                onClick={() => setOpenPages((v) => !v)}
                className={`inline-flex items-center gap-1 whitespace-nowrap rounded-xl px-3 py-2.5 transition hover:bg-teal-50/70 hover:text-teal-700 ${
                  pageLinks.some((p) => p.label === activePage) ? "bg-teal-50 text-teal-700" : ""
                }`}
              >
                Pages
                <Icon
                  name="chevronDown"
                  className={`h-4 w-4 transition-transform ${openPages ? "rotate-180" : ""}`}
                />
              </button>
              {openPages && (
                <div className="absolute left-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                  {pageLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={() => setOpenPages(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Quick actions: Wishlist, Cart, Account — same row as logo/nav */}
          <div className="order-2 flex items-center gap-4 sm:order-3 sm:gap-5">

            {/* Mobile menu toggle — only visible below md */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 border border-slate-100 md:hidden"
            >
              <Icon name={mobileMenuOpen ? "close" : "menu"} className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/buyer/wishlist"
              className="flex items-center gap-2 group transition"
              aria-label="Wishlist"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 group-hover:text-teal-700 group-hover:bg-teal-50 transition border border-slate-100">
                <Icon name="heart" className="h-5 w-5" />
              </span>
            </Link>

            {/* Cart with Badge */}
            <Link
              to="/buyer/cart"
              className="flex items-center gap-2 group transition"
              aria-label="Cart"
            >
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#eefaf9] text-[#0f766e] group-hover:bg-[#dff3f2] transition border border-teal-100">
                <Icon name="cart" className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-teal-600 text-[9px] font-black text-white ring-2 ring-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </span>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-[10px] font-bold text-slate-400 leading-none">Cart</span>
                <span className="text-xs font-extrabold text-slate-700 mt-1">My Cart</span>
              </div>
            </Link>

            {/* Login/Register or Account dropdown */}
            <div className="relative" ref={profileRef}>
              {isBuyer || isSeller ? (
                <button
                  type="button"
                  onClick={() => setOpenProfile((v) => !v)}
                  className="flex items-center gap-2 group transition"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 group-hover:text-teal-700 transition border border-slate-100">
                    <Icon name="user" className="h-5 w-5" />
                  </span>
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="text-[10px] font-bold text-slate-400 leading-none">Account</span>
                    <span className="text-xs font-extrabold text-slate-700 mt-1 flex items-center gap-0.5">
                      My Account <Icon name="chevronDown" className="h-3 w-3" />
                    </span>
                  </div>
                </button>
              ) : (
                <Link to="/login" className="flex items-center gap-2 group transition">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 group-hover:text-teal-700 transition border border-slate-100">
                    <Icon name="user" className="h-5 w-5" />
                  </span>
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="text-[10px] font-bold text-slate-400 leading-none">Get Started</span>
                    <span className="text-xs font-extrabold text-slate-700 mt-1">Login & Signup</span>
                  </div>
                </Link>
              )}

              {openProfile && (isBuyer || isSeller) && (
                <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                  {isBuyer && (
                    <>
                      <Link
                        to="/buyer/profile"
                        onClick={() => setOpenProfile(false)}
                        className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/buyer/orders"
                        onClick={() => setOpenProfile(false)}
                        className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        My Orders
                      </Link>
                    </>
                  )}
                  {isSeller && (
                    <Link
                      to="/seller-dashboard"
                      onClick={() => setOpenProfile(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Seller Dashboard
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search bar — centered, own row below logo/nav/actions */}
        <form onSubmit={handleSearchSubmit} className="mt-3 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <Icon
              name="search"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={searching ? "Searching..." : "Search for products, brands, and categories..."}
              disabled={searching}
              className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100 disabled:opacity-60"
            />
          </div>
        </form>

        {/* Mobile dropdown menu — nav + page links, only below md */}
        {mobileMenuOpen && (
          <nav className="mt-3 flex flex-col gap-1 border-t border-slate-100 pt-3 text-sm font-semibold text-slate-600 md:hidden">
            {[...navLinks, ...pageLinks].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-3 py-2.5 transition hover:bg-teal-50/70 hover:text-teal-700 ${
                  link.label === activePage ? "bg-teal-50 text-teal-700" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default PublicNavbar;