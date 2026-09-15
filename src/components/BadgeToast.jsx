import React, { useState, useEffect } from 'react';
import { BADGE_DATA } from './report/badgedata'; // badgedata.js 경로

const BadgeToast = ({ badgeId = 'starter', onClose }) => {
  // 등장 애니메이션 컨트롤용 state
  const [isVisible, setIsVisible] = useState(false);

  // 💡 BADGE_DATA에서 badgeId에 맞는 뱃지 검색
  const badgeData = BADGE_DATA.find((badge) => badge.id === badgeId) || BADGE_DATA[0];

  // 닫기 수동 실행 함수 (X 버튼 클릭 시)
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 600);
  };

  useEffect(() => {
    // 1. 마운트 직후 페이드인 및 위로 올라오는 효과
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    // 2. 5초 동안 유지 후 페이드아웃 시작
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // 3. 페이드아웃 애니메이션 완료 후 실제 컴포넌트 닫기
    const closeTimer = setTimeout(() => {
      if (onClose) onClose();
    }, 5600);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
 // 💡 뷰포트 완전 단위로 수정한 토스트 박스 영역
<div className="fixed bottom-[2.5vh] right-[1.5vw] z-50 pointer-events-none">
  <div
    className={`relative w-[28vw] h-[16.5vh] min-w-[20vw] min-h-[12vh] bg-gray700 border border-purple500 rounded-[1.2vw] shadow-2xl p-[1.4vw] flex items-center gap-[1.2vw] text-white transition-all duration-300 transform pointer-events-auto ${
      isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-[2vh]'
    }`}
  >
        {/* 💡 X 닫기 버튼 뷰포트 지정 */}
        <button
          onClick={handleClose}
          className="absolute top-[1.2vh] right-[0.8vw] text-purple500 hover:text-purple400 transition-colors p-[0.3vw] rounded-lg hover:bg-gray800-50 cursor-pointer"
          aria-label="닫기"
        >
          <svg
            className="w-[1.4vw] min-w-[18px] h-[1.4vw] min-h-[18px]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 💡 배지 이미지 영역 뷰포트 지정 (너비/높이 5.8vw) */}
       <div className="w-[5.8vw] h-[5.8vw] min-w-[3.8vw] min-h-[3.8vw] rounded-[0.8vw] bg-gray800-50 border border-purple500/30 flex items-center justify-center shrink-0 overflow-hidden p-[0.4vw]">
  <img 
    src={badgeData.src} 
    alt={badgeData.name} 
    className="w-full h-full object-contain"
  />
</div>

        {/* 💡 텍스트 영역 뷰포트 지정 */}
        <div className="flex-1 min-w-0 pr-[1.2vw] flex flex-col justify-center gap-[0.3vh]">
          {/* 1. 뱃지 이름 (text-[2.2vh]) */}
          <h4 className="text-[2.2vh] font-bold truncate text-white">
            {badgeData.name}
          </h4>

          {/* 2. 뱃지 설명 (text-[1.6vh]) */}
          <p className="text-[1.6vh] text-gray-200 truncate">
            {badgeData.desc}
          </p>

          {/* 3. 뱃지 코멘트 (text-[1.4vh]) */}
          <p className="text-[1.4vh] font-medium text-purple400 truncate self-start mt-[0.4vh]">
            {badgeData.comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BadgeToast;