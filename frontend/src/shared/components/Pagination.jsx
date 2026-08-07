const Pagination = ({ currentPage, totalPages, onPageChange, className = "" }) => {
  if (!totalPages || totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 rounded-xl border border-border-main bg-card px-4 text-sm font-bold text-primary transition hover:bg-alt disabled:cursor-not-allowed disabled:opacity-40"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`h-10 w-10 rounded-xl text-sm font-bold transition ${
            page === currentPage
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "border border-border-main bg-card text-[#17233f] hover:bg-alt"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 rounded-xl border border-border-main bg-card px-4 text-sm font-bold text-primary transition hover:bg-alt disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;