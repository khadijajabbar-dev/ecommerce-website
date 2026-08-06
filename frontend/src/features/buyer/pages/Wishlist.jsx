

// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import cartService from "../services/cart.service";
// import { Alert, Button, Card, ProductImageCard, PublicFooter, PublicNavbar } from "../../../shared/components";

// const Wishlist = () => {
//   const navigate = useNavigate();
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const loadWishlist = async () => {
//     setError("");
//     try {
//       const result = await cartService.getWishlist();
//       setWishlist(result.wishlist || []);
//     } catch (err) {
//       setError(err.message || "Failed to load your wishlist");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       await loadWishlist();
//     })();
//   }, []);

//   const handleRemoveFromWishlist = async (productId) => {
//     try {
//       const result = await cartService.toggleWishlist(productId);
//       setWishlist(result.wishlist || []);
//       setMessage("Item removed from wishlist");
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       setError(err.message || "Failed to remove item");
//     }
//   };

//   const handleAddToCart = async (productId) => {
//     try {
//       await cartService.addToCart(productId, 1);
//       // Remove from wishlist after adding to cart
//       const result = await cartService.toggleWishlist(productId);
//       setWishlist(result.wishlist || []);
//       setMessage("Item moved to cart! 🎉");
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       setError(err.message || "Failed to add item to cart");
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#fbfdfc] text-[#17233f]">
//       <PublicNavbar />

//       <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//         <div className="mb-6">
//           <h1 className="text-3xl font-black text-slate-900">My Wishlist</h1>
//           <p className="mt-1 text-sm text-slate-500">
//             View and manage the products you've saved.
//           </p>
//         </div>

//         {error && (
//           <Alert variant="error" className="mb-6">
//             {error}
//           </Alert>
//         )}

//         {message && (
//           <Alert variant="success" className="mb-6">
//             {message}
//           </Alert>
//         )}

//         {loading ? (
//           <Card className="p-8 text-center text-sm font-semibold text-slate-500">
//             Loading your wishlist...
//           </Card>
//         ) : wishlist.length === 0 ? (
//           <Card className="border-dashed border-[#178f95]/30 bg-[#f6fbfb] p-8 text-center">
//             <h3 className="text-xl font-extrabold">Your wishlist is empty</h3>
//             <p className="mt-2 text-sm text-slate-500">
//               Browse products and tap the heart icon to save them here.
//             </p>
//             <Button className="mt-4" onClick={() => navigate("/marketplace")}>
//               Browse Products
//             </Button>
//           </Card>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {wishlist.map((product) => (
//               <Card key={product._id} className="overflow-hidden bg-white flex flex-col justify-between p-4">
//                 <div>
//                   <Link to={`/product/${product._id}`} className="block aspect-square overflow-hidden rounded-2xl bg-slate-50">
//                     <ProductImageCard product={product} fallbackIconClassName="h-12 w-12 text-[#178f95]/40" />
//                   </Link>

//                   <div className="mt-4">
//                     <Link
//                       to={`/product/${product._id}`}
//                       className="block font-bold text-slate-900 hover:text-teal-700 transition line-clamp-2 text-sm"
//                     >
//                       {product.title}
//                     </Link>
//                     <p className="mt-1.5 text-base font-black text-[#0f766e]">
//                       Rs. {product.discountPrice || product.price}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-5 flex gap-2">
//                   <Button size="sm" onClick={() => handleAddToCart(product._id)} fullWidth>
//                     Add to Cart
//                   </Button>
//                   <Button size="sm" variant="danger" onClick={() => handleRemoveFromWishlist(product._id)} fullWidth>
//                     Remove
//                   </Button>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>

//       <PublicFooter />
//     </main>
//   );
// };

// export default Wishlist;


import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartService from "../services/cart.service";
import { Alert, Button, Card, ProductImageCard, PublicFooter, PublicNavbar } from "../../../shared/components";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadWishlist = async () => {
    setError("");
    try {
      const result = await cartService.getWishlist();
      setWishlist(result.wishlist || []);
    } catch (err) {
      setError(err.message || "Failed to load your wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await loadWishlist();
    })();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const result = await cartService.toggleWishlist(productId);
      setWishlist(result.wishlist || []);
      setMessage("Item removed from wishlist");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to remove item");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await cartService.addToCart(productId, 1);
      // Remove from wishlist after adding to cart
      const result = await cartService.toggleWishlist(productId);
      setWishlist(result.wishlist || []);
      setMessage("Item moved to cart! 🎉");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to add item to cart");
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfdfc] text-[#17233f]">
      <PublicNavbar />

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-900">My Wishlist</h1>
          <p className="mt-1 text-sm text-slate-500">
            View and manage the products you've saved.
          </p>
        </div>

        {error && (
          <Alert variant="error" className="mb-6">
            {error}
          </Alert>
        )}

        {message && (
          <Alert variant="success" className="mb-6">
            {message}
          </Alert>
        )}

        {loading ? (
          <Card className="p-8 text-center text-sm font-semibold text-slate-500">
            Loading your wishlist...
          </Card>
        ) : wishlist.length === 0 ? (
          <Card className="border-dashed border-[#178f95]/30 bg-[#f6fbfb] p-8 text-center">
            <h3 className="text-xl font-extrabold">Your wishlist is empty</h3>
            <p className="mt-2 text-sm text-slate-500">
              Browse products and tap the heart icon to save them here.
            </p>
            <Button className="mt-4" onClick={() => navigate("/marketplace")}>
              Browse Products
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((product) => (
              <Card key={product._id} className="overflow-hidden bg-white flex flex-col justify-between p-4">
                <div>
                  <Link to={`/product/${product._id}`} className="block aspect-square overflow-hidden rounded-2xl bg-slate-50">
                    <ProductImageCard product={product} fallbackIconClassName="h-12 w-12 text-[#178f95]/40" />
                  </Link>

                  <div className="mt-4">
                    <Link
                      to={`/product/${product._id}`}
                      className="block font-bold text-slate-900 hover:text-teal-700 transition line-clamp-2 text-sm"
                    >
                      {product.title}
                    </Link>
                    <p className="mt-1.5 text-base font-black text-[#0f766e]">
                      Rs. {product.discountPrice || product.price}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <Button size="sm" onClick={() => handleAddToCart(product._id)} fullWidth>
                    Add to Cart
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleRemoveFromWishlist(product._id)} fullWidth>
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <PublicFooter />
    </main>
  );
};

export default Wishlist;
