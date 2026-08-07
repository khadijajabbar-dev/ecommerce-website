import { Link } from "react-router-dom";
import Icon from "./Icon";

const PublicFooter = () => {
  return (
    <footer className="bg-primary-dark text-white pt-12 pb-8 mt-auto">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          
          {/* About Us */}
          <div>
            <h4 className="text-[17px] font-bold mb-4 tracking-wide">About Us</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-sm text-white/80 hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span> About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-white/80 hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span> Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-white/80 hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span> Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-[17px] font-bold mb-4 tracking-wide">Customer Service</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/contact" className="text-sm text-white/80 hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span> Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-sm text-white/80 hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span> FAQs
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-sm text-white/80 hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span> Return Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping-info" className="text-sm text-white/80 hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span> Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Seller Zone */}
          <div>
            <h4 className="text-[17px] font-bold mb-4 tracking-wide">Seller Zone</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/login" className="text-sm text-white/80 hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span> Seller Portal
                </Link>
              </li>
              <li>
                <Link to="/signup?role=seller" className="text-sm text-white/80 hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span> Become a Seller
                </Link>
              </li>
              <li>
                <Link to="/seller-resources" className="text-sm text-white/80 hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span> Seller Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <h4 className="text-[17px] font-bold mb-4 tracking-wide">Legal & Privacy</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/terms-conditions" className="text-sm text-white/80 hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span> Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm text-white/80 hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-sm text-white/80 hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span> Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Payment Methods & Secure Badges */}
          <div className="flex items-center gap-5 flex-wrap">
            <span className="text-2xl font-black italic tracking-tighter">VISA</span>
            
            {/* Minimalist Mastercard Logo */}
            <div className="flex items-center -space-x-2.5 opacity-90">
              <div className="w-6 h-6 rounded-full bg-red-600 mix-blend-screen"></div>
              <div className="w-6 h-6 rounded-full bg-yellow-500 mix-blend-screen"></div>
            </div>

            <span className="px-2 py-0.5 bg-white text-primary-dark text-xs font-black rounded uppercase">COD</span>

            <div className="flex items-center gap-2 ml-2 pl-4 border-l border-white/20">
              <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                <Icon name="lock" className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="shieldCheck" className="h-4 w-4" />
                <span className="font-bold text-sm tracking-wide">Secure Payments</span>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a href="#" className="w-7 h-7 rounded bg-[#3b5998] flex items-center justify-center hover:opacity-80 transition">
              <span className="font-bold text-white text-[13px]">f</span>
            </a>
            <a href="#" className="w-7 h-7 rounded bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center hover:opacity-80 transition">
              <div className="w-3.5 h-3.5 rounded-[4px] border-2 border-white flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </a>
            <a href="#" className="w-7 h-7 rounded bg-[#bd081c] flex items-center justify-center hover:opacity-80 transition">
              <span className="font-black text-white text-[13px] leading-none">P</span>
            </a>
            <a href="#" className="w-7 h-7 rounded bg-[#ff0000] flex items-center justify-center hover:opacity-80 transition">
              <span className="text-white text-[10px]">▶</span>
            </a>
            <a href="#" className="w-7 h-7 rounded bg-[#1da1f2] flex items-center justify-center hover:opacity-80 transition">
              <span className="font-black text-white text-[13px]">t</span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;