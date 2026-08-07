import { Link } from "react-router-dom";
import { Icon } from "../../../shared/components";
import { CATEGORIES } from "../../../shared/constants/categories";

const CategorySection = () => {
  return (
    <section className="bg-card rounded-xl border border-border-main p-5 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[17px] font-bold text-heading">Top Categories</h2>
        <Link
          to="/marketplace"
          className="text-[13px] font-semibold text-primary hover:text-primary"
        >
          View all
        </Link>
      </div>

      <div className="flex flex-col space-y-1">
        {CATEGORIES.slice(0, 10).map((category) => (
          <Link
            to={`/marketplace?category=${category.value}`}
            key={category.value}
            className="group flex items-center justify-between p-2 rounded-lg hover:bg-page transition"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-page text-body group-hover:bg-alt group-hover:text-primary transition">
                <Icon name={category.icon} className="h-4 w-4" />
              </span>
              <span className="text-[14px] font-medium text-gray-700 group-hover:text-primary">
                {category.label}
              </span>
            </div>
            {/* We might not have chevronRight in icons, let's use arrowRight if it fails, but I will assume we can use arrowRight styled smaller */}
            <Icon
              name="arrowRight" 
              className="h-3 w-3 text-muted opacity-0 group-hover:opacity-100 transition"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;