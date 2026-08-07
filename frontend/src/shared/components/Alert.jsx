const variants = {
  error: "border-red-200 bg-red-50 text-red-600",
  success: "border-emerald-200 bg-green-50 text-green-600",
  info: "border-transparent bg-alt text-body",
};

const Alert = ({ children, variant = "info", className = "" }) => {
  if (!children) return null;

  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
        variants[variant] || variants.info
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Alert;
