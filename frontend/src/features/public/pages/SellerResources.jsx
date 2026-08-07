import { PublicNavbar, PublicFooter } from "../../../shared/components";

const SellerResources = () => {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <PublicNavbar />
      
      <main className="flex-1">
        <section className="bg-primary pt-12 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex rounded-xl bg-card px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
              Seller Resources
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-normal text-white sm:text-5xl">
              Grow your business
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-xl font-medium text-heading">
            Access guides, tips, and tools to help you succeed as a seller on Easy Mart.
          </div>
          
      <div className="space-y-8">
        <p className="text-body leading-relaxed">
          Whether you're a new seller listing your first product, or an established brand looking to scale, our Seller Resources hub provides everything you need to maximize your sales on Easy Mart.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white border border-border-main rounded-xl">
            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-4 text-xl font-black">1</div>
            <h3 className="text-lg font-bold text-heading mb-2">Listing Optimization</h3>
            <p className="text-sm text-body">Learn how to take professional product photos, write SEO-friendly descriptions, and price your items competitively to rank higher in search results.</p>
          </div>
          <div className="p-6 bg-white border border-border-main rounded-xl">
            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-4 text-xl font-black">2</div>
            <h3 className="text-lg font-bold text-heading mb-2">Managing Inventory</h3>
            <p className="text-sm text-body">Discover best practices for using the Seller Dashboard to track stock levels, fulfill orders quickly, and avoid stockouts during peak seasons.</p>
          </div>
          <div className="p-6 bg-white border border-border-main rounded-xl">
            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-4 text-xl font-black">3</div>
            <h3 className="text-lg font-bold text-heading mb-2">Running Flash Sales</h3>
            <p className="text-sm text-body">A step-by-step guide to applying for Flash Sales, setting competitive discounts, and driving massive traffic to your store.</p>
          </div>
          <div className="p-6 bg-white border border-border-main rounded-xl">
            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-4 text-xl font-black">4</div>
            <h3 className="text-lg font-bold text-heading mb-2">Customer Service Tips</h3>
            <p className="text-sm text-body">Learn how to communicate effectively with buyers, handle returns gracefully, and maintain a 5-star seller rating.</p>
          </div>
        </div>

        <div className="bg-alt p-6 rounded-xl text-center mt-8">
          <h3 className="font-bold text-heading mb-2">Need direct support?</h3>
          <p className="text-sm text-body mb-4">Our dedicated Seller Support team is available 24/7.</p>
          <button className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition">Contact Seller Support</button>
        </div>
      </div>
    
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};

export default SellerResources;
