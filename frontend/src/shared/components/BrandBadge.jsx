const sizes = {
  sm: "h-8 w-8 text-sm",
  md: "h-12 w-12 text-xl",
  lg: "h-14 w-14 text-2xl",
};

const BrandBadge = ({ label = "E", size = "md", className = "" }) => {
  return (
    <div
      className={`mx-auto flex items-center justify-center rounded-full bg-[#17233f] font-black text-white ring-2 ring-[#f4b942] ${
        sizes[size] || sizes.md
      } ${className}`}
    >
      {label}
    </div>
  );
};

export default BrandBadge;
