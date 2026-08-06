import { Link } from "react-router-dom";
import Icon from "./Icon";

const socials = ["facebook", "instagram", "twitter", "pinterest"];

const columns = [
  {
    heading: "MarketPlace",
    links: [
      { label: "All Products", to: "/marketplace" },
      { label: "Featured Deals", to: "/#featured-products" },
      { label: "Categories", to: "/marketplace" },
    ],
  },
  {
    heading: "Customer Service",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "My Orders", to: "/buyer/orders" },
      { label: "My Wishlist", to: "/buyer/profile" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Become a Seller", to: "/signup" },
      { label: "Login", to: "/login" },
    ],
  },
];

const PublicFooter = () => {
  return (
    <footer className="border-t border-[#e5e7eb] bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f766e] to-[#134e4a] text-white before:absolute before:-right-0.5 before:-top-0.5 before:h-2.5 before:w-2.5 before:rounded-full before:bg-[#d4af37] before:ring-2 before:ring-white">
                <Icon name="bag" className="h-5 w-5" />
              </span>

              <span className="text-xl font-black text-[#17233f]">
                Easy Mart
              </span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-[#64748b]">
              Your one-stop online shop for quality products at the best prices.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#17233f] transition hover:border-teal-700 hover:text-teal-700"
                  aria-label={social}
                >
                  <Icon name={social} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Columns */}
          {columns.map((column) => (
            <div key={column.heading}>
              <h4 className="text-sm font-black uppercase tracking-wide text-[#17233f]">
                {column.heading}
              </h4>

              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm font-medium text-[#64748b] transition hover:text-teal-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-[#e5e7eb] pt-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-[#64748b]">
            &copy; 2026 Easy Mart. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs font-bold text-[#64748b]">
            <Icon
              name="shieldCheck"
              className="h-4 w-4 text-teal-700"
            />
            Secure payments &amp; verified sellers
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;