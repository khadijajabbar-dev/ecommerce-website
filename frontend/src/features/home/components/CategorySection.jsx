import { Link } from "react-router-dom";
import { Icon } from "../../../shared/components";
import { CATEGORIES } from "../../../shared/constants/categories";

const CategorySection = () => {
  return (
    <section id="categories" className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-teal-700">Browse Easy Mart</p>
          <h2 className="text-2xl font-black tracking-normal text-slate-900">Shop by Category</h2>
        </div>
        <Link
          to="/marketplace"
          className="hidden items-center gap-2 text-sm font-extrabold text-teal-700 transition hover:text-teal-800 sm:inline-flex"
        >
          View all categories
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CATEGORIES.map((category) => (
          <Link
            to={`/marketplace?category=${category.value}`}
            key={category.value}
            className="group flex min-h-28 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5"
          >
            <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${category.color}`}>
              <Icon name={category.icon} className="h-7 w-7" />
            </span>
            <span className="min-w-0 flex-1">
              <h3 className="font-black text-slate-900">{category.label}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">{category.description}</p>
            </span>
            <Icon
              name="arrowRight"
              className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-teal-700"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;