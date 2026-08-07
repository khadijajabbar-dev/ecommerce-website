import { PublicNavbar, PublicFooter } from "../../../shared/components";

const ReturnPolicy = () => {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <PublicNavbar />
      
      <main className="flex-1">
        <section className="bg-primary pt-12 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex rounded-xl bg-card px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
              Return Policy
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-normal text-white sm:text-5xl">
              Hassle-free returns
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-xl font-medium text-heading">
            Learn about our 30-day return policy and how to initiate a return easily.
          </div>
          
      <div className="space-y-6 text-body leading-relaxed">
        <h2 className="text-2xl font-bold text-heading">Our 30-Day Guarantee</h2>
        <p>
          We want you to be completely satisfied with your purchase on Easy Mart. If for any reason you are not happy with your order, you can return most items within 30 days of delivery for a full refund or exchange.
        </p>
        
        <h3 className="text-xl font-bold text-heading mt-6">Conditions for Returns</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Items must be unused, unworn, and in the same condition that you received them.</li>
          <li>Items must be returned in their original packaging with all tags attached.</li>
          <li>Certain goods such as perishable items, personal care goods, and customized products are exempt from being returned.</li>
        </ul>

        <h3 className="text-xl font-bold text-heading mt-6">How to Initiate a Return</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Log into your Easy Mart account and go to 'My Orders'.</li>
          <li>Select the item you wish to return and click 'Request Return'.</li>
          <li>Print the generated return shipping label and attach it to your package.</li>
          <li>Drop off the package at your nearest designated courier location.</li>
        </ol>

        <h3 className="text-xl font-bold text-heading mt-6">Refunds</h3>
        <p>
          Once your return is received and inspected, we will send you an email notification. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.
        </p>
      </div>
    
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};

export default ReturnPolicy;
