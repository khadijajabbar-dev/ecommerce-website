import { Icon } from "../../../shared/components";

const benefits = [
  {
    icon: "bag", // Using bag for sellers/marketplace
    title: "Multiple Sellers",
    description: "Wide range of products",
    color: "text-primary",
  },
  {
    icon: "tag", 
    title: "Best Prices",
    description: "Competitive prices daily",
    color: "text-accent",
  },
  {
    icon: "shieldCheck",
    title: "Secure Payments",
    description: "100% secure payments",
    color: "text-primary",
  },
  {
    icon: "truck",
    title: "Fast Delivery",
    description: "Quick & reliable delivery",
    color: "text-primary",
  },
];

const BenefitsRow = () => {
  return (
    <section className="mx-auto -mt-10 lg:-mt-20 relative z-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 lg:mb-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-card p-6 rounded-xl border border-border-main shadow-xl shadow-black/5">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.title}
            className={`flex items-center gap-4 ${
              index !== benefits.length - 1 ? "lg:border-r lg:border-border-main" : ""
            }`}
          >
            <span className={`flex shrink-0 ${benefit.color}`}>
              <Icon name={benefit.icon} className="h-8 w-8" />
            </span>
            <div>
              <h3 className="text-[15px] font-bold text-heading">{benefit.title}</h3>
              <p className="mt-1 text-[13px] text-body">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsRow;