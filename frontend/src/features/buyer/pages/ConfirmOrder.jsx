


import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import buyerOrderService from "../services/order.service";
import { Button, Card } from "../../../shared/components";

const ConfirmOrder = () => {
  const { token } = useParams();

  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  const hasConfirmed = useRef(false);

  useEffect(() => {
    const confirm = async () => {
      if (hasConfirmed.current) return;
      hasConfirmed.current = true;

      try {
        const result = await buyerOrderService.confirmOrder(token);
        setMessage(result.message || "Order confirmed successfully!");
        setStatus("success");
      } catch (err) {
        setMessage(err.message || "Failed to confirm this order");
        setStatus("error");
      }
    };

    confirm();
  }, [token]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbfdfc] px-5 py-10 text-[#17233f]">
      <Card className="w-full max-w-md p-8 text-center">
        {status === "loading" && (
          <>
            <div className="mx-auto h-12 w-12 animate-pulse rounded-2xl bg-[#dff3f2]" />
            <p className="mt-4 text-sm font-semibold text-slate-500">Confirming your order...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e6f4ea] text-3xl font-black text-[#0f9d58]">
              ✓
            </div>
            <h2 className="mt-4 text-2xl font-extrabold">Order Confirmed!</h2>
            <p className="mt-2 text-sm text-slate-500">{message}</p>
            <p className="mt-2 text-sm text-slate-500">
              The seller has been notified and will process your order soon.
            </p>
            <Link to="/login">
              <Button className="mt-6" fullWidth>
                Go to Login
              </Button>
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl font-black text-red-600">
              !
            </div>
            <h2 className="mt-4 text-2xl font-extrabold">Confirmation Failed</h2>
            <p className="mt-2 text-sm text-slate-500">{message}</p>
            <Link to="/login">
              <Button className="mt-6" variant="secondary" fullWidth>
                Go to Login
              </Button>
            </Link>
          </>
        )}
      </Card>
    </main>
  );
};

export default ConfirmOrder;