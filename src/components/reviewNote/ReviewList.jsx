import { useState, useMemo, useRef } from "react";
import Pagination from "../Pagination";
import ReviewDetail from "./ReviewDetail";
import { MOCK_REVIEWS, BADGE_COLORS } from "../../mocks/reviewdata";

export default function ReviewList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [isLatestSort, setIsLatestSort] = useState(true);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const [reviews, setReviews] = useState(MOCK_REVIEWS);

  // 휠 스크롤 연속 실행 방지용 ref
  const wheelTimeoutRef = useRef(null);

  const toggleSort = () => {
    setIsLatestSort(!isLatestSort);
    setCurrentPage(1);
  };

  // 최적화: useMemo + 문자열 직렬 비교
  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      if (a.date === b.date) return 0;
      return isLatestSort
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date);
    });
  }, [reviews, isLatestSort]);

  const totalDataCount = sortedReviews.length;
  const totalPages = Math.ceil(totalDataCount / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedReviews.slice(indexOfFirstItem, indexOfLastItem);

  const currentSelectedReview = useMemo(() => {
    return reviews.find((item) => item.id === selectedReviewId);
  }, [reviews, selectedReviewId]);

  // 마우스 휠 이동 핸들러
  const handleWheel = (e) => {
    if (wheelTimeoutRef.current) return;

    if (e.deltaY > 0) {
      if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    } else if (e.deltaY < 0) {
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    }

    wheelTimeoutRef.current = setTimeout(() => {
      wheelTimeoutRef.current = null;
    }, 300);
  };

  return (
    <div className="relative flex justify-center w-full max-w-[85vw] mx-auto select-none text-white min-h-[65vh]">
      <div className="flex flex-col gap-[1.85vh] items-center flex-shrink-0">
        <div className="flex justify-between items-center w-[17.92vw]">
          <div className="font-bold text-[2.22vh]">나의 실수 리스트</div>

          <div
            onClick={toggleSort}
            className="text-[1.11vh] text-gray400 cursor-pointer flex items-center gap-[0.26vw] px-[0.78vw] py-[0.37vh] hover:text-white transition-colors"
          >
            {isLatestSort ? "최신순" : "오래된순"} <span>▼</span>
          </div>
        </div>

        {/* 휠 스크롤 감지 영역 & 높이 고정 */}
        <div
          onWheel={handleWheel}
          className="flex flex-col gap-[1.85vh] h-[61.5vh] justify-start cursor-ns-resize"
        >
          {currentItems.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setSelectedReviewId(item.id)}
                className="border border-solid border-white-5 w-[17.92vw] h-[8.70vh] rounded-3xl px-[1.25vw] flex flex-col justify-center gap-[0.74vh] cursor-pointer transition-all duration-200 hover:bg-white-5"
              >
                <div className="flex justify-between items-center w-full">
                  <span
                    className={`border text-[1.11vh] px-[0.78vw] py-[0.18vh] rounded-2xl ${
                      BADGE_COLORS[item.badgeType] || "bg-gray700 border-white-5 text-gray400"
                    }`}
                  >
                    {item.badge}
                  </span>
                  <span className="text-gray700 text-[1.11vh]">
                    {item.date}
                  </span>
                </div>

                <div className="text-[1.85vh] text-left tracking-tight truncate text-gray400">
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-[0.5vh]">
          <Pagination
            currentPage={currentPage}
            totalItems={totalDataCount}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <div
        className={`absolute top-0 transition-all duration-300 flex-shrink-0 ${
          selectedReviewId ? "w-[30vw] opacity-100 visible" : "w-0 opacity-0 invisible overflow-hidden"
        }`}
        style={{ left: "calc(50% + 11vw)" }}
      >
        <ReviewDetail review={currentSelectedReview} />
      </div>
    </div>
  );
}