import React from "react";

export default function Pagination({
  currentPage,
  totalItems, 
  onPageChange,
  itemsPerPage = 7,
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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

      {/* 페이지 번호 리스트 */}
      {pages.map((page) => (
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
