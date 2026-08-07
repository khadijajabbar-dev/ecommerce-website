const variants = {
  primary: "bg-alt text-primary border border-border-main",
  accent: "bg-accent text-white",
  success: "bg-green-50 text-green-600 border border-green-200",
  error: "bg-red-50 text-red-600 border border-red-200",
  warning: "bg-orange-50 text-orange-600 border border-orange-200",
  info: "bg-blue-50 text-blue-600 border border-blue-200",
  muted: "bg-page text-muted border border-border-main",
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