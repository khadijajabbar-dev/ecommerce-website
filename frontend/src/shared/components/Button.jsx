const variants = {
  primary:
    "bg-[#0f766e] text-white shadow-lg shadow-[#0f766e]/20 hover:bg-[#115e59]",
  secondary:
    "border border-[#0f766e]/25 bg-white text-[#0f766e] hover:bg-[#f0fdfa]",
  danger: "bg-red-50 text-red-600 hover:bg-red-100",
  ghost: "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
};

const sizes = {
  sm: "h-9 rounded-lg px-4 text-sm",
  md: "h-11 rounded-xl px-5 text-sm",
  lg: "h-[52px] rounded-xl px-5 text-sm",
  xl: "h-14 rounded-xl px-5 text-sm",
};

const Button = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 font-bold transition disabled:opacity-60 ${
        variants[variant] || variants.primary
      } ${sizes[size] || sizes.md} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
