// // // import { useEffect, useState } from "react";
// // // import { Link } from "react-router-dom";
// // // import { getActiveFlashSalesAPI } from "../../../api/flashSale.api";
// // // import { Icon, Card, ProductImageCard } from "../../../shared/components";

// // // const getTimeLeft = (targetDate) => {
// // //   const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
// // //   return {
// // //     days: Math.floor(diff / (1000 * 60 * 60 * 24)),
// // //     hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
// // //     minutes: Math.floor((diff / (1000 * 60)) % 60),
// // //     seconds: Math.floor((diff / 1000) % 60),
// // //     total: diff,
// // //   };
// // // };

// // // const pad = (num) => String(num).padStart(2, "0");

// // // const FlashSaleSection = () => {
// // //   const [sales, setSales] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });

// // //   useEffect(() => {
// // //     (async () => {
// // //       try {
// // //         const result = await getActiveFlashSalesAPI();
// // //         const activeSales = result.sales || [];
// // //         setSales(activeSales);

// // //         if (activeSales.length > 0) {
// // //           // Set countdown target to the earliest ending sale
// // //           const endTimes = activeSales.map((s) => new Date(s.endDate).getTime());
// // //           const nextTarget = Math.min(...endTimes);

// // //           const updateTimer = () => {
// // //             const time = getTimeLeft(nextTarget);
// // //             setTimeLeft(time);
// // //           };

// // //           updateTimer();
// // //           const interval = setInterval(updateTimer, 1000);
// // //           return () => clearInterval(interval);
// // //         }
// // //       } catch (err) {
// // //         console.error("Failed to load flash sales:", err.message);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     })();
// // //   }, []);

// // //   if (loading || sales.length === 0) return null;

// // //   return (
// // //     <section className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
// // //       <div className="mb-6 flex items-center justify-between gap-4">
// // //         <div className="flex items-center gap-2">
// // //           <Icon name="bolt" className="h-6 w-6 text-amber-500 fill-amber-500" />
// // //           <h2 className="text-2xl font-black tracking-normal text-slate-900">Flash Sale</h2>
// // //           <span className="hidden sm:inline-block text-sm text-slate-500 font-semibold ml-2">
// // //             Limited time amazing deals
// // //           </span>
// // //         </div>
// // //         <Link
// // //           to="/marketplace"
// // //           className="text-sm font-extrabold text-teal-700 transition hover:text-teal-800 inline-flex items-center gap-1"
// // //         >
// // //           View All Deals
// // //           <Icon name="arrowRight" className="h-4 w-4" />
// // //         </Link>
// // //       </div>

// // //       <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
// // //         {/* Countdown Box */}
// // //         <div className="flex flex-col justify-center items-center rounded-3xl bg-gradient-to-b from-[#0f766e] to-[#0b4f4a] p-6 text-white text-center shadow-lg min-h-[250px]">
// // //           <span className="text-sm font-bold uppercase tracking-wider text-teal-100/80">Ends in</span>
          
// // //           <div className="mt-6 flex items-center justify-center gap-2">
// // //             <div className="flex flex-col items-center">
// // //               <span className="text-3xl font-black tracking-tight">{pad(timeLeft.days)}</span>
// // //               <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Days</span>
// // //             </div>
// // //             <span className="text-2xl font-bold mb-4">:</span>
// // //             <div className="flex flex-col items-center">
// // //               <span className="text-3xl font-black tracking-tight">{pad(timeLeft.hours)}</span>
// // //               <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Hours</span>
// // //             </div>
// // //             <span className="text-2xl font-bold mb-4">:</span>
// // //             <div className="flex flex-col items-center">
// // //               <span className="text-3xl font-black tracking-tight">{pad(timeLeft.minutes)}</span>
// // //               <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Mins</span>
// // //             </div>
// // //             <span className="text-2xl font-bold mb-4">:</span>
// // //             <div className="flex flex-col items-center">
// // //               <span className="text-3xl font-black tracking-tight">{pad(timeLeft.seconds)}</span>
// // //               <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Secs</span>
// // //             </div>
// // //           </div>

// // //           <Link
// // //             to="/marketplace"
// // //             className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-extrabold text-[#0f766e] hover:bg-teal-50 transition w-full"
// // //           >
// // //             Shop Deals
// // //           </Link>
// // //         </div>

// // //         {/* Product Cards List */}
// // //         <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
// // //           {sales.slice(0, 4).map((sale) => {
// // //             const price = sale.product?.price || 0;
// // //             const discountPrice = (price * (1 - sale.discountPercent / 100)).toFixed(0);

// // //             return (
// // //               <Card
// // //                 key={sale._id}
// // //                 className="group overflow-hidden bg-white p-4 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
// // //               >
// // //                 <div className="relative">
// // //                   {/* Discount percentage tag */}
// // //                   <span className="absolute left-0 top-0 z-10 rounded-lg bg-red-500 px-2 py-1 text-xs font-black text-white">
// // //                     -{sale.discountPercent}%
// // //                   </span>

// // //                   <Link to={`/product/${sale.product?._id}`} className="block aspect-square overflow-hidden rounded-2xl bg-slate-50">
// // //                     <ProductImageCard
// // //                       product={sale.product}
// // //                       className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
// // //                       fallbackIconClassName="h-12 w-12 text-[#178f95]/40"
// // //                     />
// // //                   </Link>
// // //                 </div>

// // //                 <div className="mt-4 flex-1 flex flex-col justify-between">
// // //                   <div>
// // //                     <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
// // //                       {sale.seller?.storeProfile?.storeName || "EasyMart Store"}
// // //                     </span>
// // //                     <Link
// // //                       to={`/product/${sale.product?._id}`}
// // //                       className="mt-1 block font-bold text-slate-900 hover:text-teal-700 transition line-clamp-2 text-sm"
// // //                     >
// // //                       {sale.product?.title}
// // //                     </Link>

// // //                     {/* Star Rating Placeholder */}
// // //                     <div className="mt-1.5 flex items-center gap-1 text-amber-400">
// // //                       {Array.from({ length: 5 }).map((_, i) => (
// // //                         <Icon key={i} name="star" className="h-3.5 w-3.5 fill-current" />
// // //                       ))}
// // //                       <span className="text-[11px] font-bold text-slate-400 ml-1">(120)</span>
// // //                     </div>
// // //                   </div>

// // //                   <div className="mt-3.5">
// // //                     <div className="flex items-baseline gap-2">
// // //                       <span className="text-base font-black text-[#0f766e]">Rs. {discountPrice}</span>
// // //                       <span className="text-xs font-semibold text-slate-400 line-through">Rs. {price}</span>
// // //                     </div>
// // //                     {/* Units Sold Indicator */}
// // //                     <div className="mt-2 text-[11px] font-bold text-[#178f95] bg-[#eefaf9] px-2 py-0.5 rounded inline-block">
// // //                       10+ sold
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </Card>
// // //             );
// // //           })}
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default FlashSaleSection;




// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { getActiveFlashSalesAPI } from "../../../api/flashSale.api";
// // import { Icon, Card, ProductImageCard } from "../../../shared/components";

// // const getTimeLeft = (targetDate) => {
// //   const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
// //   return {
// //     days: Math.floor(diff / (1000 * 60 * 60 * 24)),
// //     hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
// //     minutes: Math.floor((diff / (1000 * 60)) % 60),
// //     seconds: Math.floor((diff / 1000) % 60),
// //     total: diff,
// //   };
// // };

// // const pad = (num) => String(num).padStart(2, "0");

// // const FlashSaleSection = () => {
// //   const [sales, setSales] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const result = await getActiveFlashSalesAPI();
// //         const activeSales = result.sales || [];
// //         setSales(activeSales);

// //         if (activeSales.length > 0) {
// //           const endTimes = activeSales.map((s) => new Date(s.endDate).getTime());
// //           const nextTarget = Math.min(...endTimes);

// //           const updateTimer = () => {
// //             const time = getTimeLeft(nextTarget);
// //             setTimeLeft(time);
// //           };

// //           updateTimer();
// //           const interval = setInterval(updateTimer, 1000);
// //           return () => clearInterval(interval);
// //         }
// //       } catch (err) {
// //         console.error("Failed to load flash sales:", err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     })();
// //   }, []);

// //   if (loading || sales.length === 0) return null;

// //   return (
// //     <section className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
// //       <div className="mb-6 flex items-center justify-between gap-4">
// //         <div className="flex items-center gap-2">
// //           <Icon name="bolt" className="h-6 w-6 text-amber-500 fill-amber-500" />
// //           <h2 className="text-2xl font-black tracking-normal text-slate-900">Flash Sale</h2>
// //           <span className="hidden sm:inline-block text-sm text-slate-500 font-semibold ml-2">
// //             Limited time amazing deals
// //           </span>
// //         </div>
// //         <Link
// //           to="/marketplace"
// //           className="text-sm font-extrabold text-teal-700 transition hover:text-teal-800 inline-flex items-center gap-1"
// //         >
// //           View All Deals
// //           <Icon name="arrowRight" className="h-4 w-4" />
// //         </Link>
// //       </div>

// //       <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
// //         {/* Countdown Box */}
// //         <div className="flex flex-col justify-center items-center rounded-3xl bg-gradient-to-b from-[#0f766e] to-[#0b4f4a] p-6 text-white text-center shadow-lg min-h-[250px]">
// //           <span className="text-sm font-bold uppercase tracking-wider text-teal-100/80">Ends in</span>
          
// //           <div className="mt-6 flex items-center justify-center gap-2">
// //             <div className="flex flex-col items-center">
// //               <span className="text-3xl font-black tracking-tight">{pad(timeLeft.days)}</span>
// //               <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Days</span>
// //             </div>
// //             <span className="text-2xl font-bold mb-4">:</span>
// //             <div className="flex flex-col items-center">
// //               <span className="text-3xl font-black tracking-tight">{pad(timeLeft.hours)}</span>
// //               <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Hours</span>
// //             </div>
// //             <span className="text-2xl font-bold mb-4">:</span>
// //             <div className="flex flex-col items-center">
// //               <span className="text-3xl font-black tracking-tight">{pad(timeLeft.minutes)}</span>
// //               <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Mins</span>
// //             </div>
// //             <span className="text-2xl font-bold mb-4">:</span>
// //             <div className="flex flex-col items-center">
// //               <span className="text-3xl font-black tracking-tight">{pad(timeLeft.seconds)}</span>
// //               <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Secs</span>
// //             </div>
// //           </div>

// //           <Link
// //             to="/marketplace"
// //             className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-extrabold text-[#0f766e] hover:bg-teal-50 transition w-full"
// //           >
// //             Shop Deals
// //           </Link>
// //         </div>

// //         {/* Product Cards List */}
// //         <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
// //           {sales.slice(0, 4).map((sale) => {
// //             const price = sale.product?.price || 0;
// //             const discountPrice = (price * (1 - sale.discountPercent / 100)).toFixed(0);

// //             return (
// //               <Card
// //                 key={sale._id}
// //                 className="group overflow-hidden bg-white p-4 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
// //               >
// //                 <div className="relative">
// //                   {/* Discount percentage tag */}
// //                   <span className="absolute left-0 top-0 z-10 rounded-lg bg-red-500 px-2 py-1 text-xs font-black text-white">
// //                     -{sale.discountPercent}%
// //                   </span>

// //                   <Link to={`/product/${sale.product?._id}`} className="block aspect-square overflow-hidden rounded-2xl bg-slate-50">
// //                     <ProductImageCard
// //                       product={sale.product}
// //                       className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
// //                       fallbackIconClassName="h-12 w-12 text-[#178f95]/40"
// //                     />
// //                   </Link>
// //                 </div>

// //                 <div className="mt-4 flex-1 flex flex-col justify-between">
// //                   <div>
// //                     <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
// //                       {sale.seller?.storeProfile?.storeName || "EasyMart Store"}
// //                     </span>
// //                     <Link
// //                       to={`/product/${sale.product?._id}`}
// //                       className="mt-1 block font-bold text-slate-900 hover:text-teal-700 transition line-clamp-2 text-sm"
// //                     >
// //                       {sale.product?.title}
// //                     </Link>
// //                   </div>

// //                   <div className="mt-3.5">
// //                     <div className="flex items-baseline gap-2">
// //                       <span className="text-base font-black text-[#0f766e]">Rs. {discountPrice}</span>
// //                       <span className="text-xs font-semibold text-slate-400 line-through">Rs. {price}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </Card>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default FlashSaleSection;



// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getActiveFlashSalesAPI } from "../../../api/flashSale.api";
// import { Icon, Card, ProductImageCard } from "../../../shared/components";

// const getTimeLeft = (targetDate) => {
//   const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
//   return {
//     days: Math.floor(diff / (1000 * 60 * 60 * 24)),
//     hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
//     minutes: Math.floor((diff / (1000 * 60)) % 60),
//     seconds: Math.floor((diff / 1000) % 60),
//     total: diff,
//   };
// };

// const pad = (num) => String(num).padStart(2, "0");

// const FlashSaleSection = () => {
//   const [sales, setSales] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });

//   useEffect(() => {
//     (async () => {
//       try {
//         const result = await getActiveFlashSalesAPI();
//         const activeSales = result.sales || [];
//         setSales(activeSales);

//         if (activeSales.length > 0) {
//           const endTimes = activeSales.map((s) => new Date(s.endDate).getTime());
//           const nextTarget = Math.min(...endTimes);

//           const updateTimer = () => {
//             const time = getTimeLeft(nextTarget);
//             setTimeLeft(time);
//           };

//           updateTimer();
//           const interval = setInterval(updateTimer, 1000);
//           return () => clearInterval(interval);
//         }
//       } catch (err) {
//         console.error("Failed to load flash sales:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   if (loading || sales.length === 0) return null;

//   return (
//     <section className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
//       <div className="mb-6 flex items-center justify-between gap-4">
//         <div className="flex items-center gap-2">
//           <Icon name="bolt" className="h-6 w-6 text-amber-500 fill-amber-500" />
//           <h2 className="text-2xl font-black tracking-normal text-slate-900">Flash Sale</h2>
//           <span className="hidden sm:inline-block text-sm text-slate-500 font-semibold ml-2">
//             Limited time amazing deals
//           </span>
//         </div>
//         {/* ✅ Updated link */}
//         <Link
//           to="/flashsales"
//           className="text-sm font-extrabold text-teal-700 transition hover:text-teal-800 inline-flex items-center gap-1"
//         >
//           View All Deals
//           <Icon name="arrowRight" className="h-4 w-4" />
//         </Link>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
//         {/* Countdown Box */}
//         <div className="flex flex-col justify-center items-center rounded-3xl bg-gradient-to-b from-[#0f766e] to-[#0b4f4a] p-6 text-white text-center shadow-lg min-h-[250px]">
//           <span className="text-sm font-bold uppercase tracking-wider text-teal-100/80">Ends in</span>
          
//           <div className="mt-6 flex items-center justify-center gap-2">
//             <div className="flex flex-col items-center">
//               <span className="text-3xl font-black tracking-tight">{pad(timeLeft.days)}</span>
//               <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Days</span>
//             </div>
//             <span className="text-2xl font-bold mb-4">:</span>
//             <div className="flex flex-col items-center">
//               <span className="text-3xl font-black tracking-tight">{pad(timeLeft.hours)}</span>
//               <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Hours</span>
//             </div>
//             <span className="text-2xl font-bold mb-4">:</span>
//             <div className="flex flex-col items-center">
//               <span className="text-3xl font-black tracking-tight">{pad(timeLeft.minutes)}</span>
//               <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Mins</span>
//             </div>
//             <span className="text-2xl font-bold mb-4">:</span>
//             <div className="flex flex-col items-center">
//               <span className="text-3xl font-black tracking-tight">{pad(timeLeft.seconds)}</span>
//               <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Secs</span>
//             </div>
//           </div>

//           {/* ✅ Updated link */}
//           <Link
//             to="/flashsales"
//             className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-extrabold text-[#0f766e] hover:bg-teal-50 transition w-full"
//           >
//             Shop Deals
//           </Link>
//         </div>

//         {/* Product Cards List (Highlights only) */}
//         <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//           {sales.slice(0, 4).map((sale) => {
//             const price = sale.product?.price || 0;
//             const discountPrice = (price * (1 - sale.discountPercent / 100)).toFixed(0);

//             return (
//               <Card
//                 key={sale._id}
//                 className="group overflow-hidden bg-white p-4 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
//               >
//                 <div className="relative">
//                   <span className="absolute left-0 top-0 z-10 rounded-lg bg-red-500 px-2 py-1 text-xs font-black text-white">
//                     -{sale.discountPercent}%
//                   </span>

//                   <Link to={`/product/${sale.product?._id}`} className="block aspect-square overflow-hidden rounded-2xl bg-slate-50">
//                     <ProductImageCard
//                       product={sale.product}
//                       className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
//                       fallbackIconClassName="h-12 w-12 text-[#178f95]/40"
//                     />
//                   </Link>
//                 </div>

//                 <div className="mt-4 flex-1 flex flex-col justify-between">
//                   <div>
//                     <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
//                       {sale.seller?.storeProfile?.storeName || "EasyMart Store"}
//                     </span>
//                     <Link
//                       to={`/product/${sale.product?._id}`}
//                       className="mt-1 block font-bold text-slate-900 hover:text-teal-700 transition line-clamp-2 text-sm"
//                     >
//                       {sale.product?.title}
//                     </Link>
//                   </div>

//                   <div className="mt-3.5">
//                     <div className="flex items-baseline gap-2">
//                       <span className="text-base font-black text-[#0f766e]">Rs. {discountPrice}</span>
//                       <span className="text-xs font-semibold text-slate-400 line-through">Rs. {price}</span>
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FlashSaleSection;



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getActiveFlashSalesAPI } from "../../../api/flashSale.api";
import { Icon, Card, ProductImageCard } from "../../../shared/components";

const getTimeLeft = (targetDate) => {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    total: diff,
  };
};

const pad = (num) => String(num).padStart(2, "0");

const FlashSaleSection = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });

  useEffect(() => {
    (async () => {
      try {
        const result = await getActiveFlashSalesAPI();
        const activeSales = result.sales || [];
        setSales(activeSales);

        if (activeSales.length > 0) {
          // Set countdown target to the earliest ending sale
          const endTimes = activeSales.map((s) => new Date(s.endDate).getTime());
          const nextTarget = Math.min(...endTimes);

          const updateTimer = () => {
            const time = getTimeLeft(nextTarget);
            setTimeLeft(time);
          };

          updateTimer();
          const interval = setInterval(updateTimer, 1000);
          return () => clearInterval(interval);
        }
      } catch (err) {
        console.error("Failed to load flash sales:", err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || sales.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Icon name="bolt" className="h-6 w-6 text-amber-500 fill-amber-500" />
          <h2 className="text-2xl font-black tracking-normal text-slate-900">Flash Sale</h2>
          <span className="hidden sm:inline-block text-sm text-slate-500 font-semibold ml-2">
            Limited time amazing deals
          </span>
        </div>
        <Link
          to="/flash-sales"
          className="text-sm font-extrabold text-teal-700 transition hover:text-teal-800 inline-flex items-center gap-1"
        >
          View All Deals
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Countdown Box */}
        <div className="flex flex-col justify-center items-center rounded-3xl bg-gradient-to-b from-[#0f766e] to-[#0b4f4a] p-6 text-white text-center shadow-lg min-h-[250px]">
          <span className="text-sm font-bold uppercase tracking-wider text-teal-100/80">Ends in</span>
          
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black tracking-tight">{pad(timeLeft.days)}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Days</span>
            </div>
            <span className="text-2xl font-bold mb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black tracking-tight">{pad(timeLeft.hours)}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Hours</span>
            </div>
            <span className="text-2xl font-bold mb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black tracking-tight">{pad(timeLeft.minutes)}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Mins</span>
            </div>
            <span className="text-2xl font-bold mb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black tracking-tight">{pad(timeLeft.seconds)}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-100/70 mt-1">Secs</span>
            </div>
          </div>

          <Link
            to="/flash-sales"
            className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-extrabold text-[#0f766e] hover:bg-teal-50 transition w-full"
          >
            Shop Deals
          </Link>
        </div>

        {/* Product Cards List */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {sales.slice(0, 4).map((sale) => {
            const price = sale.product?.price || 0;
            const discountPrice = (price * (1 - sale.discountPercent / 100)).toFixed(0);

            return (
              <Card
                key={sale._id}
                className="group overflow-hidden bg-white p-4 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative">
                  {/* Discount percentage tag */}
                  <span className="absolute left-0 top-0 z-10 rounded-lg bg-red-500 px-2 py-1 text-xs font-black text-white">
                    -{sale.discountPercent}%
                  </span>

                  <Link to={`/product/${sale.product?._id}`} className="block aspect-square overflow-hidden rounded-2xl bg-slate-50">
                    <ProductImageCard
                      product={sale.product}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      fallbackIconClassName="h-12 w-12 text-[#178f95]/40"
                    />
                  </Link>
                </div>

                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {sale.seller?.storeProfile?.storeName || "EasyMart Store"}
                    </span>
                    <Link
                      to={`/product/${sale.product?._id}`}
                      className="mt-1 block font-bold text-slate-900 hover:text-teal-700 transition line-clamp-2 text-sm"
                    >
                      {sale.product?.title}
                    </Link>

                    {/* Star Rating Placeholder */}
                    <div className="mt-1.5 flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon key={i} name="star" className="h-3.5 w-3.5 fill-current" />
                      ))}
                      <span className="text-[11px] font-bold text-slate-400 ml-1">(120)</span>
                    </div>
                  </div>

                  <div className="mt-3.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-[#0f766e]">Rs. {discountPrice}</span>
                      <span className="text-xs font-semibold text-slate-400 line-through">Rs. {price}</span>
                    </div>
                    {/* Units Sold Indicator */}
                    <div className="mt-2 text-[11px] font-bold text-[#178f95] bg-[#eefaf9] px-2 py-0.5 rounded inline-block">
                      10+ sold
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection;
