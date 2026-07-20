import { useState } from "react";
import Pagination from "../Pagination";
import ReviewDetail from "./ReviewDetail";

export default function ReviewList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [isLatestSort, setIsLatestSort] = useState(true);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const [reviews, setReviews] = useState([
    { id: 1, badgeType: "overlap", badge: "중첩 반복문", date: "2026.07.07", content: "중첩 루프로 인한 시간 복잡도 초과" },
    { id: 2, badgeType: "discord", badge: "변수명 불일치", date: "2026.07.06", content: "불명확한 변수명 사용" },
    { id: 3, badgeType: "omission", badge: "예외처리 누락", date: "2026.07.05", content: "예외 처리 잘못함" },
    { id: 4, badgeType: "overlap", badge: "중첩 반복문", date: "2026.07.04", content: "중첩 루프로 인한 시간 복잡도 초과" },
    { id: 5, badgeType: "discord", badge: "변수명 불일치", date: "2026.07.03", content: "규칙에 맞지않는 변수명 사용" },
    { id: 6, badgeType: "omission", badge: "괄호 및 구호 누락", date: "2026.07.02", content: "문장 끝에 세미콜론 누락" },
    { id: 7, badgeType: "overlap", badge: "중첩 반복문", date: "2026.07.01", content: "중첩 루프로 인한 시간 복잡도 초과" },
    { id: 8, badgeType: "overlap", badge: "중첩 반복문", date: "1999.01.01", content: "중첩 루프로 인한 시간 복잡도 초과" }
  ]);

  const badgeColors = {
    overlap: "badge-red",
    discord: "badge-yellow",
    omission: "badge-white"
  };

  const toggleSort = () => {
    setIsLatestSort(!isLatestSort);
    setCurrentPage(1);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    const dateA = new Date(a.date.replaceAll(".", "-"));
    const dateB = new Date(b.date.replaceAll(".", "-"));
    return isLatestSort ? dateB - dateA : dateA - dateB;
  });

  const totalDataCount = sortedReviews.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedReviews.slice(indexOfFirstItem, indexOfLastItem);

  const currentSelectedReview = reviews.find(item => item.id === selectedReviewId);

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
        
        <div className="flex flex-col gap-[1.85vh] min-h-[61.5vh]">
          {currentItems.map((item) => {
            const isSelected = item.id === selectedReviewId;
            return (
              <div 
                key={item.id}
                onClick={() => setSelectedReviewId(item.id)}
                className={`border border-solid w-[17.92vw] h-[8.70vh] rounded-3xl px-[1.25vw] flex flex-col justify-center gap-[0.74vh] cursor-pointer transition-all duration-200 hover:bg-white-5
                  ${isSelected ? "border-purple500 bg-purple-5" : "border-purple500/20"}`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className={`border text-[1.11vh] px-[0.78vw] py-[0.18vh] rounded-2xl ${badgeColors[item.badgeType] || "bg-gray-500/10 border-gray-500/20 text-gray-400"}`}>
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