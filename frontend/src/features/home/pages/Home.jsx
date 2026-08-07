import BenefitsRow from "../components/BenefitsRow";
import FlashSaleSection from "../components/FlashSaleSection";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";
import SpecialDeals from "../components/SpecialDeals";
import PromoBanners from "../components/PromoBanners";
import Testimonials from "../components/Testimonials";
import NewsletterSection from "../components/NewsletterSection";
import HomeHero from "../components/HomeHero";
import { PublicCTA, PublicFooter, PublicNavbar } from "../../../shared/components";

const Home = () => {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-heading">
      <PublicNavbar />
      <HomeHero />
      <BenefitsRow />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-[250px] shrink-0">
            <CategorySection />
          </aside>
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col gap-10 min-w-0">
            <FlashSaleSection />
            <FeaturedProducts />
          </div>
        </div>
      </div>

      <SpecialDeals />
      <PromoBanners />
      <Testimonials />
      <NewsletterSection />
      <PublicCTA
        heading="Why wait? Your next favorite find is here."
        subtitle="Explore thousands of products from trusted sellers in our Marketplace."
      />
      <PublicFooter />
    </main>
  );
};

export default Home;