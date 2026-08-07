// import { lazy, Suspense } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
// import PublicRoute from "./PublicRoute";

// const Home = lazy(() => import("../features/home/pages/Home"));
// const About = lazy(() => import("../features/about/pages/About"));
// const Contact = lazy(() => import("../features/contact/pages/Contact"));
// const Marketplace = lazy(() => import("../features/marketplace/pages/Marketplace"));
// const BlogList = lazy(() => import("../features/blog/pages/BlogList"));
// const BlogDetail = lazy(() => import("../features/blog/pages/BlogDetail"));
// const Signup = lazy(() => import("../features/auth/pages/Signup"));
// const Login = lazy(() => import("../features/auth/pages/Login"));
// const VerifyOTP = lazy(() => import("../features/auth/pages/VerifyOTP"));

// const SellerDashboard = lazy(() => import("../features/seller/pages/SellerDashboard"));
// const AddProduct = lazy(() => import("../features/seller/pages/AddProduct"));
// const EditProduct = lazy(() => import("../features/seller/pages/EditProduct"));
// const SellerProfile = lazy(() => import("../features/seller/pages/SellerProfile"));
// const SellerOrders = lazy(() => import("../features/seller/pages/Orders"));
// const SellerBlog = lazy(() => import("../features/seller/pages/SellerBlog"));
// const Trash = lazy(() => import("../features/seller/pages/Trash"));
// const FlashSales = lazy(() => import("../features/seller/pages/FlashSales"));

// const BuyerProfile = lazy(() => import("../features/buyer/pages/BuyerProfile"));
// const Cart = lazy(() => import("../features/buyer/pages/Cart"));
// const Wishlist = lazy(() => import("../features/buyer/pages/Wishlist"));
// const ProductDetail = lazy(() => import("../features/buyer/pages/ProductDetail"));
// const BuyNow = lazy(() => import("../features/buyer/pages/BuyNow"));
// const BuyerOrders = lazy(() => import("../features/buyer/pages/Orders"));
// const ConfirmOrder = lazy(() => import("../features/buyer/pages/ConfirmOrder"));
// const TrackOrder = lazy(() => import("../features/buyer/pages/TrackOrder"));
// const FlashSalesPage = lazy(() => import("../features/flashsales/pages/FlashSalesPage"));


// const RouteFallback = () => (
//   <div className="flex min-h-screen items-center justify-center bg-page text-sm font-semibold text-body">
//     Loading page...
//   </div>
// );

// const AppRoutes = () => {
//   return (
//     <Suspense fallback={<RouteFallback />}>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/marketplace" element={<Marketplace />} />
//         <Route path="/blog" element={<BlogList />} />
//         <Route path="/blog/:slug" element={<BlogDetail />} />
//         <Route path="/product/:id" element={<ProductDetail />} />
//         <Route path="/flashsales" element={<FlashSalesPage />} />

//         <Route
//           path="/signup"
//           element={
//             <PublicRoute>
//               <Signup />
//             </PublicRoute>
//           }
//         />

//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           }
//         />

//         <Route
//           path="/otp-verification"
//           element={
//             <PublicRoute>
//               <VerifyOTP />
//             </PublicRoute>
//           }
//         />

//         {/* Seller */}
//         <Route
//           path="/seller-dashboard"
//           element={
//             <ProtectedRoute role="seller">
//               <SellerDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/seller/add-product"
//           element={
//             <ProtectedRoute role="seller">
//               <AddProduct />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/seller/edit-product/:id"
//           element={
//             <ProtectedRoute role="seller">
//               <EditProduct />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/seller/profile"
//           element={
//             <ProtectedRoute role="seller">
//               <SellerProfile />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/seller/orders"
//           element={
//             <ProtectedRoute role="seller">
//               <SellerOrders />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/seller/blog"
//           element={
//             <ProtectedRoute role="seller">
//               <SellerBlog />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/seller/trash"
//           element={
//             <ProtectedRoute role="seller">
//               <Trash />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/seller/flash-sales"
//           element={
//             <ProtectedRoute role="seller">
//               <FlashSales />
//             </ProtectedRoute>
//           }
//         />

//         {/* Buyer dashboard removed — redirect to home marketplace experience */}
//         <Route path="/" element={<Navigate to="/" replace />} />

//         <Route
//           path="/buyer/profile"
//           element={
//             <ProtectedRoute role="buyer">
//               <BuyerProfile />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/buyer/cart"
//           element={
//             <ProtectedRoute role="buyer">
//               <Cart />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/buyer/wishlist"
//           element={
//             <ProtectedRoute role="buyer">
//               <Wishlist />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/buy-now/:id"
//           element={
//             <ProtectedRoute role="buyer">
//               <BuyNow />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/buyer/orders"
//           element={
//             <ProtectedRoute role="buyer">
//               <BuyerOrders />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/order/confirm/:token" element={<ConfirmOrder />} />

//         <Route
//           path="/buyer/orders/:id/track"
//           element={
//             <ProtectedRoute role="buyer">
//               <TrackOrder />
//             </ProtectedRoute>
//           }
//         />

//         {/* Legacy chat routes removed */}
//         <Route path="/chat/*" element={<Navigate to="/" replace />} />
//         <Route path="/buyer/chat" element={<Navigate to="/" replace />} />
//         <Route path="/seller/chat/*" element={<Navigate to="/seller-dashboard" replace />} />
//       </Routes>
//     </Suspense>
//   );
// };

// export default AppRoutes;



import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const Home = lazy(() => import("../features/home/pages/Home"));
const About = lazy(() => import("../features/about/pages/About"));
const Contact = lazy(() => import("../features/contact/pages/Contact"));
const Marketplace = lazy(() => import("../features/marketplace/pages/Marketplace"));
const FlashSalesPublic = lazy(() => import("../features/flashsale/pages/FlashSales"));
const BlogList = lazy(() => import("../features/blog/pages/BlogList"));
const BlogDetail = lazy(() => import("../features/blog/pages/BlogDetail"));
const Signup = lazy(() => import("../features/auth/pages/Signup"));
const Login = lazy(() => import("../features/auth/pages/Login"));
const VerifyOTP = lazy(() => import("../features/auth/pages/VerifyOTP"));

// Public Static Pages
const Careers = lazy(() => import("../features/public/pages/Careers"));
const Faqs = lazy(() => import("../features/public/pages/Faqs"));
const ReturnPolicy = lazy(() => import("../features/public/pages/ReturnPolicy"));
const ShippingInfo = lazy(() => import("../features/public/pages/ShippingInfo"));
const SellerResources = lazy(() => import("../features/public/pages/SellerResources"));
const TermsConditions = lazy(() => import("../features/public/pages/TermsConditions"));
const PrivacyPolicy = lazy(() => import("../features/public/pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("../features/public/pages/CookiePolicy"));

const SellerDashboard = lazy(() => import("../features/seller/pages/SellerDashboard"));
const AddProduct = lazy(() => import("../features/seller/pages/AddProduct"));
const EditProduct = lazy(() => import("../features/seller/pages/EditProduct"));
const SellerProfile = lazy(() => import("../features/seller/pages/SellerProfile"));
const SellerOrders = lazy(() => import("../features/seller/pages/Orders"));
const SellerBlog = lazy(() => import("../features/seller/pages/SellerBlog"));
const Trash = lazy(() => import("../features/seller/pages/Trash"));
const SellerFlashSales = lazy(() => import("../features/seller/pages/FlashSales"));

const BuyerProfile = lazy(() => import("../features/buyer/pages/BuyerProfile"));
const Cart = lazy(() => import("../features/buyer/pages/Cart"));
const Wishlist = lazy(() => import("../features/buyer/pages/Wishlist"));
const ProductDetail = lazy(() => import("../features/buyer/pages/ProductDetail"));
const BuyNow = lazy(() => import("../features/buyer/pages/BuyNow"));
const BuyerOrders = lazy(() => import("../features/buyer/pages/Orders"));
const ConfirmOrder = lazy(() => import("../features/buyer/pages/ConfirmOrder"));
const TrackOrder = lazy(() => import("../features/buyer/pages/TrackOrder"));

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-page text-sm font-semibold text-body">
    Loading page...
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/flash-sales" element={<FlashSalesPublic />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/shipping-info" element={<ShippingInfo />} />
        <Route path="/seller-resources" element={<SellerResources />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/otp-verification"
          element={
            <PublicRoute>
              <VerifyOTP />
            </PublicRoute>
          }
        />

        {/* Seller */}
        <Route
          path="/seller-dashboard"
          element={
            <ProtectedRoute role="seller">
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/add-product"
          element={
            <ProtectedRoute role="seller">
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/edit-product/:id"
          element={
            <ProtectedRoute role="seller">
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/profile"
          element={
            <ProtectedRoute role="seller">
              <SellerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/orders"
          element={
            <ProtectedRoute role="seller">
              <SellerOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/blog"
          element={
            <ProtectedRoute role="seller">
              <SellerBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/trash"
          element={
            <ProtectedRoute role="seller">
              <Trash />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/flash-sales"
          element={
            <ProtectedRoute role="seller">
              <SellerFlashSales />
            </ProtectedRoute>
          }
        />

        {/* Buyer dashboard removed — redirect to home marketplace experience */}
        <Route path="/" element={<Navigate to="/" replace />} />

        <Route
          path="/buyer/profile"
          element={
            <ProtectedRoute role="buyer">
              <BuyerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buyer/cart"
          element={
            <ProtectedRoute role="buyer">
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buyer/wishlist"
          element={
            <ProtectedRoute role="buyer">
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buy-now/:id"
          element={
            <ProtectedRoute role="buyer">
              <BuyNow />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buyer/orders"
          element={
            <ProtectedRoute role="buyer">
              <BuyerOrders />
            </ProtectedRoute>
          }
        />

        <Route path="/order/confirm/:token" element={<ConfirmOrder />} />

        <Route
          path="/buyer/orders/:id/track"
          element={
            <ProtectedRoute role="buyer">
              <TrackOrder />
            </ProtectedRoute>
          }
        />

        {/* Legacy chat routes removed */}
        <Route path="/chat/*" element={<Navigate to="/" replace />} />
        <Route path="/buyer/chat" element={<Navigate to="/" replace />} />
        <Route path="/seller/chat/*" element={<Navigate to="/seller-dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;