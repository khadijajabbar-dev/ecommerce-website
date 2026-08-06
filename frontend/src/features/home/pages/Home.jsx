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
    <main className="min-h-screen bg-[#fbfdfc] text-[#17233f]">
      <PublicNavbar />
      <HomeHero />
      <BenefitsRow />
      <CategorySection />
     <FlashSaleSection />
     <FeaturedProducts />
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