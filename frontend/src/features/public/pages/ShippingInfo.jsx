import { PublicNavbar, PublicFooter } from "../../../shared/components";

const ShippingInfo = () => {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <PublicNavbar />
      
      <main className="flex-1">
        <section className="bg-primary pt-12 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex rounded-xl bg-card px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
              Shipping Information
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-normal text-white sm:text-5xl">
              Fast and reliable delivery
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-xl font-medium text-heading">
            Get details on our shipping options, delivery times, and international shipping rates.
          </div>
          
      <div className="space-y-6 text-body leading-relaxed">
        <h2 className="text-2xl font-bold text-heading">Shipping Options & Delivery Times</h2>
        <p>
          Easy Mart partners with top-tier logistics providers to ensure your orders reach you quickly and safely. Delivery times depend on your location and the shipping method chosen at checkout.
        </p>
        
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-border-main rounded-xl">
            <thead>
              <tr className="bg-alt text-left text-sm font-semibold text-heading">
                <th className="px-6 py-3 border-b border-border-main">Method</th>
                <th className="px-6 py-3 border-b border-border-main">Estimated Time</th>
                <th className="px-6 py-3 border-b border-border-main">Cost</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="px-6 py-4 border-b border-border-main">Standard Shipping</td>
                <td className="px-6 py-4 border-b border-border-main">3-5 Business Days</td>
                <td className="px-6 py-4 border-b border-border-main">Free over $50</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b border-border-main">Express Shipping</td>
                <td className="px-6 py-4 border-b border-border-main">1-2 Business Days</td>
                <td className="px-6 py-4 border-b border-border-main">$15.00</td>
              </tr>
              <tr>
                <td className="px-6 py-4">International Shipping</td>
                <td className="px-6 py-4">7-14 Business Days</td>
                <td className="px-6 py-4">Calculated at checkout</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-heading mt-6">Order Processing</h3>
        <p>
          All orders are processed within 24 hours. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.
        </p>

        <h3 className="text-xl font-bold text-heading mt-6">Customs, Duties and Taxes</h3>
        <p>
          Easy Mart is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
        </p>
      </div>
    
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};

export default ShippingInfo;
