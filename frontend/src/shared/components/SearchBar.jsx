const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  ...props
}) => {
  return (
    <div className={`relative ${className}`}>
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-muted">
        &#9906;
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-border-main bg-card px-10 text-sm text-[#17233f] outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
        {...props}
      />
    </div>
  );
};

export default SearchBar;
