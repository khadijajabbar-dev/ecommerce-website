import { useEffect, useState } from "react";
import { Navbar, Alert, Button, Card, Badge } from "../../../shared/components";
import flashSaleService from "../services/flashSale.service";
import FlashSaleForm from "../components/FlashSaleForm";

const FlashSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const [mode, setMode] = useState("list"); // "list" | "create" | "edit"
  const [editingSale, setEditingSale] = useState(null);

  const fetchSales = async () => {
    setError("");
    try {
      const result = await flashSaleService.getMyFlashSales();
      setSales(result.sales || []);
    } catch (err) {
      setError(err.message || "Failed to load flash sales");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchSales();
    })();
  }, []);

  const handleSaved = () => {
    setMode("list");
    setEditingSale(null);
    fetchSales();
  };

  const handleDelete = async (saleId) => {
    if (!window.confirm("Are you sure you want to delete this flash sale?")) return;
    setDeletingId(saleId);
    try {
      await flashSaleService.deleteFlashSale(saleId);
      setSales((prev) => prev.filter((s) => s._id !== saleId));
    } catch (err) {
      setError(err.message || "Failed to delete flash sale");
    } finally {
      setDeletingId(null);
    }
  };

  const getStatus = (start, end, isActive) => {
    if (!isActive) return { label: "Inactive", variant: "error" };
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (now < startDate) return { label: "Upcoming", variant: "warning" };
    if (now > endDate) return { label: "Expired", variant: "error" };
    return { label: "Active", variant: "success" };
  };

  return (
    <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
      <div className="mx-auto max-w-5xl">
        <Navbar badge="S" panel="Seller Panel" title="Flash Sales" />

        {mode === "list" ? (
          <>
            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#178f95]">Promotions</p>
                <h2 className="text-2xl font-extrabold text-[#17233f]">Your Flash Sales</h2>
              </div>
              <Button onClick={() => setMode("create")}>Create Flash Sale</Button>
            </div>

            {error && (
              <Alert variant="error" className="mt-4">
                {error}
              </Alert>
            )}

            {loading ? (
              <Card className="mt-6 p-8 text-center text-sm font-semibold text-slate-500">
                Loading...
              </Card>
            ) : sales.length === 0 ? (
              <Card className="mt-6 border-dashed border-[#178f95]/30 bg-[#f6fbfb] p-8 text-center">
                <h3 className="text-xl font-extrabold">No flash sales yet</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Drive urgent sales by discounting products for a limited time.
                </p>
                <Button className="mt-4" onClick={() => setMode("create")}>
                  Create your first sale
                </Button>
              </Card>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {sales.map((sale) => {
                  const status = getStatus(sale.startDate, sale.endDate, sale.isActive);
                  const price = sale.product?.price || 0;
                  const discountPrice = (price * (1 - sale.discountPercent / 100)).toFixed(0);

                  return (
                    <Card key={sale._id} as="article" className="overflow-hidden bg-white flex flex-col justify-between">
                      <div>
                        {sale.product?.imageUrl ? (
                          <img src={sale.product.imageUrl} alt={sale.product.title} className="h-40 w-full object-cover" />
                        ) : (
                          <div className="flex h-40 w-full items-center justify-center bg-[#dff3f2] text-sm font-bold text-[#178f95]">
                            No Image
                          </div>
                        )}

                        <div className="p-5">
                          <div className="flex items-center justify-between gap-2">
                            <Badge variant={status.variant} size="xs">
                              {status.label}
                            </Badge>
                            <span className="text-xs font-bold text-[#0f766e] bg-[#eefaf9] px-2 py-0.5 rounded">
                              {sale.discountPercent}% OFF
                            </span>
                          </div>

                          <h4 className="mt-3 line-clamp-2 text-lg font-extrabold text-[#17233f]">
                            {sale.product?.title || "Unknown Product"}
                          </h4>

                          <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-lg font-black text-[#0f766e]">Rs. {discountPrice}</span>
                            <span className="text-sm font-semibold text-slate-400 line-through">Rs. {price}</span>
                          </div>

                          <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500">
                            <div>
                              <span className="text-slate-400">Start:</span>{" "}
                              {new Date(sale.startDate).toLocaleString()}
                            </div>
                            <div>
                              <span className="text-slate-400">End:</span>{" "}
                              {new Date(sale.endDate).toLocaleString()}
                            </div>
                            {sale.quantity !== null && (
                              <div>
                                <span className="text-slate-400">Limit Quantity:</span>{" "}
                                {sale.quantity} units
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-5 pt-0 flex gap-2">
                        <Button
                          variant="secondary"
                          fullWidth
                          className="flex-1"
                          onClick={() => {
                            setEditingSale(sale);
                            setMode("edit");
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(sale._id)}
                          disabled={deletingId === sale._id}
                          variant="danger"
                          fullWidth
                          className="flex-1"
                        >
                          {deletingId === sale._id ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div className="mt-6">
            <FlashSaleForm
              initialData={mode === "edit" ? editingSale : null}
              onSaved={handleSaved}
              onCancel={() => {
                setMode("list");
                setEditingSale(null);
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default FlashSales;
