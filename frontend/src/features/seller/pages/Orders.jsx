

import { useEffect, useState } from "react";
import sellerOrderService from "../services/order.service";
import sellerService from "../services/seller.service";
import { getSocket } from "../../../lib/socket";
import { Alert, Button, Card, Navbar } from "../../../shared/components";

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700",
  processing: "bg-blue-50 text-blue-700",
  shipped: "bg-indigo-50 text-indigo-700",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-700",
};

const PAYMENT_LABELS = {
  cod: "Cash on Delivery",
  card: "Card",
  easypaisa: "EasyPaisa",
  jazzcash: "JazzCash",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dispatchingId, setDispatchingId] = useState(null);
  const [deliveringId, setDeliveringId] = useState(null);
  const [newOrderBanner, setNewOrderBanner] = useState("");

  const fetchOrders = async () => {
    setError("");
    try {
      const result = await sellerOrderService.getSellerOrders();
      setOrders(result.orders || []);
    } catch (err) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchOrders();
    })();
  }, []);

  // Real-time: join this seller's private room and listen for new orders
  // (fired the moment a buyer confirms an order for one of their products).
  useEffect(() => {
    let socket;

    const setupSocket = async () => {
      try {
        const meResult = await sellerService.getMe();
        const sellerId = meResult.user._id;

        socket = getSocket();
        socket.connect();
        socket.emit("join-seller-room", sellerId);

        socket.on("new-order", (data) => {
          setNewOrderBanner(
            `New order: ${data.productTitle} (Qty ${data.quantity}) from ${data.contactName}`
          );
          fetchOrders(); // refresh the list so the new order appears
        });
      } catch {
        // If this fails, the page still works — just without live updates
      }
    };

    setupSocket();

    return () => {
      if (socket) {
        socket.off("new-order");
        socket.disconnect();
      }
    };
  }, []);

  const handleDispatch = async (orderId) => {
    setDispatchingId(orderId);
    try {
      const result = await sellerOrderService.dispatchOrder(orderId);
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? result.order : order))
      );
    } catch (err) {
      setError(err.message || "Failed to dispatch order");
    } finally {
      setDispatchingId(null);
    }
  };

  const handleDeliver = async (orderId) => {
    setDeliveringId(orderId);
    try {
      const result = await sellerOrderService.deliverOrder(orderId);
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? result.order : order))
      );
    } catch (err) {
      setError(err.message || "Failed to mark order as delivered");
    } finally {
      setDeliveringId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
      <div className="mx-auto max-w-5xl">
        <Navbar badge="S" panel="Seller Panel" title="Orders Received" />

        {newOrderBanner && (
          <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-[#178f95]/30 bg-[#dff3f2] px-5 py-3">
            <p className="text-sm font-bold text-[#12757a]">🔔 {newOrderBanner}</p>
            <button
              type="button"
              onClick={() => setNewOrderBanner("")}
              className="text-sm font-bold text-[#178f95] hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {error && (
          <Alert variant="error" className="mt-6">
            {error}
          </Alert>
        )}

        {loading ? (
          <Card className="mt-6 p-8 text-center text-sm font-semibold text-slate-500">
            Loading orders...
          </Card>
        ) : orders.length === 0 ? (
          <Card className="mt-6 border-dashed border-[#178f95]/30 bg-[#f6fbfb] p-8 text-center">
            <h3 className="text-xl font-extrabold">No orders yet</h3>
            <p className="mt-2 text-sm text-slate-500">
              Orders placed by buyers for your products will show up here once
              they've confirmed via email.
            </p>
          </Card>
        ) : (
          <div className="mt-6 space-y-4">
            {orders.map((order) => (
              <Card key={order._id} className="flex flex-col gap-4 p-5 sm:flex-row">
                {order.productImage ? (
                  <img
                    src={order.productImage}
                    alt={order.productTitle}
                    className="h-20 w-20 rounded-xl object-cover bg-[#dff3f2]"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-[#dff3f2] text-xs font-bold text-[#178f95]">
                    No Image
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-extrabold">{order.productTitle}</h4>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                        STATUS_STYLES[order.status] || "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    Qty: <span className="font-bold text-[#17233f]">{order.quantity}</span> ·
                    Total: <span className="font-bold text-[#178f95]">Rs. {order.totalAmount}</span> ·
                    Payment: <span className="font-bold text-[#17233f]">{PAYMENT_LABELS[order.paymentType]}</span>
                  </p>

                  <div className="mt-3 grid gap-1 text-sm text-slate-500 sm:grid-cols-2">
                    <p>
                      <span className="font-semibold text-[#17233f]">Buyer:</span>{" "}
                      {order.buyer?.firstName} {order.buyer?.lastName} ({order.buyer?.email})
                    </p>
                    <p>
                      <span className="font-semibold text-[#17233f]">Contact:</span>{" "}
                      {order.contactName} — {order.contactPhone}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-semibold text-[#17233f]">Shipping Address:</span>{" "}
                      {order.shippingAddress}
                    </p>
                  </div>

                  <p className="mt-2 text-xs font-semibold text-slate-400">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  {order.status === "pending" && (
                    <Button
                      className="mt-3"
                      onClick={() => handleDispatch(order._id)}
                      disabled={dispatchingId === order._id}
                    >
                      {dispatchingId === order._id ? "Dispatching..." : "Mark as Dispatched"}
                    </Button>
                  )}

                  {order.status === "shipped" && (
                    <Button
                      className="mt-3"
                      onClick={() => handleDeliver(order._id)}
                      disabled={deliveringId === order._id}
                    >
                      {deliveringId === order._id ? "Marking as Delivered..." : "Mark as Delivered"}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Orders;
