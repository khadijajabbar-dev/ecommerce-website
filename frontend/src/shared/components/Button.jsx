const variants = {
  primary:
    "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark",
  accent:
    "bg-accent text-white shadow-lg shadow-accent/20 hover:bg-accent-dark",
  secondary:
    "border border-primary/25 bg-card text-primary hover:bg-alt",
  danger: "bg-red-50 text-red-600 hover:bg-red-100",
  ghost: "border border-border-main bg-card text-body hover:bg-page",
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
