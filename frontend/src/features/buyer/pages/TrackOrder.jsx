import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import buyerOrderService from "../services/order.service";
import { Alert, Card, Navbar } from "../../../shared/components";

const STEPS = [
  { key: "awaiting_confirmation", label: "Order Placed" },
  { key: "pending", label: "Confirmed" },
  { key: "shipped", label: "Dispatched" },
  { key: "delivered", label: "Delivered" },
];

const getStepIndex = (status) => {
  if (status === "cancelled") return -1;
  const index = STEPS.findIndex((step) => step.key === status);
  return index === -1 ? 0 : index;
};

const TrackOrder = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await buyerOrderService.getOrderById(id);
        setOrder(result.order);
      } catch (err) {
        setError(err.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const currentStep = order ? getStepIndex(order.status) : 0;

  return (
    <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
      <div className="mx-auto max-w-3xl">
        <Navbar badge="B" panel="Buyer Panel" title="Track Order" />

        {loading ? (
          <Card className="mt-6 p-8 text-center text-sm font-semibold text-body">
            Loading order...
          </Card>
        ) : error ? (
          <Alert variant="error" className="mt-6">
            {error}
          </Alert>
        ) : (
          <>
            <Card className="mt-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              {order.productImage ? (
                <img
                  src={order.productImage}
                  alt={order.productTitle}
                  className="h-20 w-20 rounded-xl object-cover bg-alt"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-alt text-xs font-bold text-primary">
                  No Image
                </div>
              )}
              <div>
                <h3 className="font-extrabold">{order.productTitle}</h3>
                <p className="mt-1 text-sm text-body">
                  Qty: {order.quantity} · Total: <span className="font-bold text-primary">Rs. {order.totalAmount}</span>
                </p>
              </div>
            </Card>

            <Card className="mt-6 p-6">
              {order.status === "cancelled" ? (
                <Alert variant="error">This order has been cancelled.</Alert>
              ) : (
                <div className="flex items-center justify-between">
                  {STEPS.map((step, index) => {
                    const reached = index <= currentStep;
                    return (
                      <div key={step.key} className="flex flex-1 flex-col items-center text-center">
                        <div className="flex w-full items-center">
                          <div
                            className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-black ${
                              reached ? "bg-primary text-white" : "bg-alt text-muted"
                            }`}
                          >
                            {index + 1}
                          </div>
                        </div>
                        <p
                          className={`mt-2 text-xs font-bold ${
                            reached ? "text-primary" : "text-muted"
                          }`}
                        >
                          {step.label}
                        </p>
                        {index < STEPS.length - 1 && (
                          <div
                            className={`mt-[-32px] ml-[calc(50%+20px)] h-0.5 w-[calc(100%-40px)] ${
                              index < currentStep ? "bg-primary" : "bg-alt"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-8 grid gap-2 rounded-2xl bg-alt p-4 text-sm text-body">
                <p>
                  <span className="font-semibold text-[#17233f]">Shipping Address:</span>{" "}
                  {order.shippingAddress}
                </p>
                <p>
                  <span className="font-semibold text-[#17233f]">Contact:</span>{" "}
                  {order.contactName} — {order.contactPhone}
                </p>
                <p>
                  <span className="font-semibold text-[#17233f]">Order Placed:</span>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                {order.dispatchedAt && (
                  <p>
                    <span className="font-semibold text-[#17233f]">Dispatched:</span>{" "}
                    {new Date(order.dispatchedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </Card>
          </>
        )}
      </div>
    </main>
  );
};

export default TrackOrder;