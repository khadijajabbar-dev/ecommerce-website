const InfoRow = ({
  label,
  value,
  valueClassName = "text-[#17233f]",
  stacked = false,
  className = "",
}) => {
  return (
    <div
      className={`rounded-2xl bg-alt px-4 py-3 ${
        stacked ? "" : "flex items-center justify-between gap-4"
      } ${className}`}
    >
      <span className={stacked ? "text-xs font-bold uppercase tracking-[0.18em] text-muted" : "text-sm font-semibold text-body"}>
        {label}
      </span>
      <span className={`${stacked ? "mt-1 block font-extrabold" : "text-sm font-black"} ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
};

export default InfoRow;
