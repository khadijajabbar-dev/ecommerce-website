import { PublicNavbar, PublicFooter } from "../../../shared/components";

const Faqs = () => {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <PublicNavbar />
      
      <main className="flex-1">
        <section className="bg-primary pt-12 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex rounded-xl bg-card px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
              Frequently Asked Questions
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-normal text-white sm:text-5xl">
              We are here to help
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-xl font-medium text-heading">
            Find answers to common questions about ordering, shipping, returns, and more.
          </div>
          
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-border-main">
          <h3 className="text-lg font-bold text-heading mb-2">How can I track my order?</h3>
          <p className="text-body text-sm leading-relaxed">Once your order has been dispatched, you will receive a tracking number via email. You can also view the status of your order at any time by logging into your Easy Mart account and navigating to 'My Orders'.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border-main">
          <h3 className="text-lg font-bold text-heading mb-2">What payment methods do you accept?</h3>
          <p className="text-body text-sm leading-relaxed">We accept Visa, Mastercard, American Express, PayPal, and Cash on Delivery (COD) in select regions. All transactions are securely encrypted.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border-main">
          <h3 className="text-lg font-bold text-heading mb-2">Can I cancel or change my order?</h3>
          <p className="text-body text-sm leading-relaxed">Orders can only be modified or canceled before they are shipped. If your order status is 'Processing', please contact our support team immediately to request a change.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border-main">
          <h3 className="text-lg font-bold text-heading mb-2">How do I contact customer service?</h3>
          <p className="text-body text-sm leading-relaxed">You can reach us through our Contact Us page, send an email to support@easymart.com, or use the live chat feature available 24/7 on our website.</p>
        </div>
      </div>
    
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};

export default Faqs;
