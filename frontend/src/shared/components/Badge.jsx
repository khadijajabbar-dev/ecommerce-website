const variants = {
  primary: "bg-teal-50 text-teal-700 border border-teal-200",
  secondary: "bg-amber-50 text-amber-700 border border-amber-200",
  accent: "bg-blue-50 text-blue-700 border border-blue-200",
  success: "bg-green-50 text-green-700 border border-green-200",
  error: "bg-red-50 text-red-700 border border-red-200",
  warning: "bg-orange-50 text-orange-700 border border-orange-200",
  muted: "bg-slate-100 text-slate-600 border border-slate-200",
};

const sizes = {
  xs: "text-[10px] px-1.5 py-0.5",
  sm: "text-xs px-2.5 py-1",
};

const Badge = ({ children, variant = "primary", size = "sm", className = "" }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-bold ${
        variants[variant] || variants.primary
      } ${sizes[size] || sizes.sm} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;