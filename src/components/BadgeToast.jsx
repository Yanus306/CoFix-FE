import React, { useState, useEffect, useCallback } from 'react';
import { BADGE_DATA } from './report/badgedata'; // badgedata.js 경로

// ----------------------------------------------------
// 1. 뱃지 순차 출력(큐)을 관리하는 Custom Hook
// ----------------------------------------------------
export const useBadgeToast = () => {
  const [badgeQueue, setBadgeQueue] = useState([]);

  // 뱃지 달성 이벤트 발생 시 대기열(큐)에 추가
  const triggerBadge = useCallback((badgeId) => {
    setBadgeQueue((prev) => [...prev, badgeId]);
  }, []);

  // 토스트 하나가 완전히 닫히면 대기열에서 완료된 뱃지 제거
  const handleToastClose = useCallback(() => {
    setBadgeQueue((prev) => prev.slice(1));
  }, []);

  // 현재 출력할 뱃지 ID (큐의 첫 번째 항목)
  const currentBadgeId = badgeQueue[0] || null;

  return {
    currentBadgeId,
    triggerBadge,
    handleToastClose,
  };
};

// ----------------------------------------------------
// 2. 뷰포트 기반 BadgeToast UI 컴포넌트
// ----------------------------------------------------
const BadgeToast = ({ badgeId = 'starter', onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  // BADGE_DATA에서 전달받은 badgeId에 맞는 뱃지 데이터 검색
  const badgeData = BADGE_DATA.find((badge) => badge.id === badgeId) || BADGE_DATA[0];

  // 수동 닫기 (X 버튼 클릭 시)
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 600);
  };

  useEffect(() => {
    // 1. 마운트 직후 페이드인 & 슬라이드 업
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    // 2. 5초 유지 후 페이드아웃 시작
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // 3. 5.6초 후 완전히 종료 콜백 호출 -> 큐에서 다음 뱃지 꺼냄
    const closeTimer = setTimeout(() => {
      if (onClose) onClose();
    }, 5600);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(closeTimer);
    };
  }, [badgeId, onClose]);

  return (
    <div className="fixed bottom-[2.5vh] right-[1.5vw] z-50 pointer-events-none">
      <div
        className={`relative w-[28vw] h-[16.5vh] min-w-[20vw] min-h-[12vh] bg-gray700 border border-purple500 rounded-[1.2vw] shadow-2xl p-[1.4vw] flex items-center gap-[1.2vw] text-white transition-all duration-300 transform pointer-events-auto ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-[2vh]'
        }`}
      >
        {/* X 닫기 버튼 */}
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

        {/* 배지 이미지 영역 */}
        <div className="w-[5.8vw] h-[5.8vw] min-w-[3.8vw] min-h-[3.8vw] rounded-[0.8vw] bg-gray800-50 border border-purple500/30 flex items-center justify-center shrink-0 overflow-hidden p-[0.4vw]">
          <img 
            src={badgeData.src} 
            alt={badgeData.name} 
            className="w-full h-full object-contain"
          />
        </div>

        {/* 텍스트 정보 영역 */}
        <div className="flex-1 min-w-0 pr-[1.2vw] flex flex-col justify-center gap-[0.3vh]">
          <h4 className="text-[2.2vh] font-bold truncate text-white">
            {badgeData.name}
          </h4>
          <p className="text-[1.6vh] text-gray-200 truncate">
            {badgeData.desc}
          </p>
          <p className="text-[1.4vh] font-medium text-purple400 truncate self-start mt-[0.4vh]">
            {badgeData.comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BadgeToast;