import { useState, useMemo, useRef } from "react";
import Pagination from "../Pagination";
import { MOCK_REVIEWS, BADGE_COLORS } from "../../mocks/reviewdata";

export default function ReviewList({ selectedReviewId, onSelectReview }) {
  // 상태 관리 (목록 관련)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [isLatestSort, setIsLatestSort] = useState(true);
  const [reviews] = useState(MOCK_REVIEWS);

  // 휠 스크롤 디바운스용 참조
  const wheelTimeoutRef = useRef(null);

  // 정렬 토글 핸들러
  const toggleSort = () => {
    setIsLatestSort((prev) => !prev);
    setCurrentPage(1);
  };

  // 날짜 기준 리뷰 정렬
  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      if (a.date === b.date) return 0;
      return isLatestSort
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date);
    });
  }, [reviews, isLatestSort]);

  // 페이지네이션 연산
  const totalDataCount = sortedReviews.length;
  const totalPages = Math.ceil(totalDataCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedReviews.slice(startIndex, startIndex + itemsPerPage);

  // 마우스 휠 페이지 이동 핸들러
  const handleWheel = (e) => {
    if (wheelTimeoutRef.current) return;

    if (e.deltaY > 0) {
      if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    } else if (e.deltaY < 0) {
      if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    }

    wheelTimeoutRef.current = setTimeout(() => {
      wheelTimeoutRef.current = null;
    }, 300);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex flex-col w-full h-[75.37vh]">
        {/* 헤더 영역 */}
        <div className="flex justify-between items-center w-full h-[2.69vh] mb-[2.6vh]">
          <div className="text-[2.22vh] font-bold text-gray200">
            나의 실수 리스트
          </div>

          <div
            onClick={toggleSort}
            className="flex justify-center items-center px-[0.8vw] h-[2.22vh] text-[1.11vh] text-gray400 bg-gray800-50 border-[0.09vh] border-white-5 rounded-[0.74vh] cursor-pointer hover:text-gray200 transition-colors gap-[0.3vw]"
          >
            <span>{isLatestSort ? "최신순" : "오래된순"}</span>
            <span>▼</span>
          </div>
        </div>

        {/* 목록 영역 */}
        <div
          onWheel={handleWheel}
          className="flex flex-col w-full h-full gap-[1.4vh] overflow-hidden"
        >
          {currentItems.map((item) => {
            const isActive = item.id === selectedReviewId;

            return (
              <div
                key={item.id}
                onClick={() => onSelectReview(item.id)}
                className={`flex flex-col w-full h-[8.70vh] justify-center items-start px-[1.20vw] gap-[0.56vh] border-[0.09vh] rounded-[1.04vw] cursor-pointer transition-colors ${
                  isActive
                    ? "bg-white-5 border-purple500-20"
                    : "border-white-5 hover:bg-white-5"
                }`}
              >
                {/* 뱃지 및 날짜 */}
                <div className="flex justify-between items-center w-full">
                  <span
                    className={`border text-[1.11vh] px-[0.8vw] py-[0.2vh] rounded-2xl ${
                      BADGE_COLORS[item.badgeType] || "bg-gray700 border-white-5 text-gray400"
                    }`}
                  >
                    {item.badge}
                  </span>
                  <span className="text-gray400 text-[1.11vh]">
                    {item.date}
                  </span>
                </div>

                {/* 실수 내용 요약 (isActive 여부에 따라 글자색 전환) */}
                <div
                  className={`text-[1.85vh] text-left tracking-tight truncate w-full transition-colors ${
                    isActive ? "text-gray200" : "text-gray400"
                  }`}
                >
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalItems={totalDataCount}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}