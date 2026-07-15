export default function Pagination({
  currentPage,
  totalItems, 
  onPageChange,
  itemsPerPage = 7,
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex justify-center items-center mt-[1.4815vh] gap-[1.1458vw] text-gray400 text-[1.1111vh]">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        &lt;
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`transition-colors ${
            currentPage === page
              ? "text-white font-bold underline underline-offset-[0.5vh] decoration-[0.1vh]"
              : "hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        &gt;
      </button>
    </div>
  );
}