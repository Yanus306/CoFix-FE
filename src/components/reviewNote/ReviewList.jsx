import { useState } from "react";
import Pagination from "../Pagination";

export default function ReviewList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const [reviews, setReviews] = useState([
    {
      id: 1,
      badge: "중중 반복문",
      date: "2026.07.07",
      content: "중첩 루프로 인한 시간 복잡도 초과"
    },
    {
      id: 2,
      badge: "변수명 불일치",
      date: "2026.07.06",
      content: "불명확한 변수명 사용"
    },
    {
      id: 3,
      badge: "예외처리 누락",
      date: "2026.07.05",
      content: "예외 처리 잘못함"
    },
    {
      id: 4,
      badge: "중중 반복문",
      date: "2026.07.04",
      content: "중첩 루프로 인한 시간 복잡도 초과"
    },
    {
      id: 5,
      badge: "변수명 불일치",
      date: "2026.07.03",
      content: "규칙에 맞지 않는 변수명 사용"
    },
    {
      id: 6,
      badge: "괄호 및 기호 누락",
      date: "2026.07.02",
      content: "문장 끝에 세미콜론 누락"
    },
    {
      id: 7,
      badge: "중첩 반복문",
      date: "2026.07.01",
      content: "중첩 반복문으로 인한 무언가의 오류..."
    },
        {
      id: 8,
      badge: "중첩 반복문",
      date: "2026.07.01",
      content: "중첩 반복문으로 인한 무언가의 오류..."
    },
  ]);

  const totalDataCount = reviews.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col gap-[1.85vh] select-none text-white items-center">
      
      <div className="flex justify-between items-center w-[17.92vw]">        
        <div className="font-bold text-[2.22vh]">나의 실수 리스트</div>
        
        <div className="text-[1.11vh] text-gray400 cursor-pointer flex items-center gap-[0.26vw] px-[0.78vw] py-[0.37vh]">
          최신순 <span>▼</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-[1.85vh]">
        {currentItems.map((item) => (
          <div 
            key={item.id}
            className="border border-purple500/20 w-[17.92vw] h-[8.70vh] rounded-3xl px-[1.25vw] flex flex-col justify-center gap-[0.74vh] hover:bg-white-5 transition-all"
          >
            <div className="flex justify-between items-center w-full">
              <span className="bg-red500-10 border border-red500-20 text-red400 text-[1.11vh] px-[0.78vw] py-[0.18vh] rounded-2xl">
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
        ))}
      </div>

      <div className="mt-[2vh]">
        <Pagination
          currentPage={currentPage}
          totalItems={totalDataCount}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

    </div>
  );
}