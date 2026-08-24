import React, { useEffect, useState, useRef } from 'react';

function BadgeSetting({ isOpen, onClose, allBadges, tempSelectedIds, replaceIndex, onSelectBadge, onSave }) {
    const modalRef = useRef(null);
    const [scale, setScale] = useState(1);

    // 💡 뷰포인트 기준과 스케일 축소를 동시 계산하는 로직
    useEffect(() => {
        const handleResize = () => {
            if (!modalRef.current) return;

            // 모달이 원본 비율을 유지하며 맞춰질 최소 권장 높이/너비 (px)
            const minRecommendedWidth = 600;
            const minRecommendedHeight = 580;

            // 현재 화면 크기의 90% 공간 확보
            const availableWidth = window.innerWidth * 0.9;
            const availableHeight = window.innerHeight * 0.9;

            // 화면이 권장 크기보다 작아지면 스케일로 축소
            const scaleX = availableWidth / minRecommendedWidth;
            const scaleY = availableHeight / minRecommendedHeight;

            // 기본값은 1(뷰포인트대로 동작), 화면이 너무 작을 때만 scale 적용
            const newScale = Math.min(scaleX, scaleY, 1);
            setScale(newScale);
        };

        if (isOpen) {
            handleResize();
            window.addEventListener('resize', handleResize);
        }
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-[2vw]">
            {/* 💡 뷰포인트 단위(w-[60vw], h-[75vh])를 기본으로 갖되, scale이 결합되어 찌그러짐 방지 */}
            <div 
                ref={modalRef}
                style={{ transform: `scale(${scale})` }}
                className="bg-gradient-to-b from-[#13111C] via-[#0F0D18] to-[#0A0910] text-white w-[60vw] min-w-[340px] max-w-2xl h-[75vh] min-h-[520px] rounded-[2.5vh] p-[3vh] shadow-2xl border border-[#8262EF]/30 flex flex-col justify-between transition-transform duration-75 origin-center shrink-0"
            >
                {/* 모달 헤더 */}
                <div className="flex justify-between items-center border-b border-[#8262EF]/20 pb-[1.5vh] shrink-0">
                    <div>
                        <h3 className="text-[2.2vh] font-bold text-slate-100 flex items-center gap-[0.8vh]">
                            <span className="w-[1vh] h-[1vh] rounded-full bg-[#8262EF]"></span>
                            대표 배지 설정
                        </h3>
                        <p className="text-[1.3vh] text-purple-200/60 mt-[0.4vh]">클릭하는 순서대로 1, 2, 3번에 등록됩니다.</p>
                    </div>
                    <button 
                        type="button"
                        onClick={onClose} 
                        className="text-purple-300/50 hover:text-white text-[2vh] p-[0.5vh] transition cursor-pointer hover:bg-[#8262EF]/20 rounded-[0.8vh]"
                    >
                        ✕
                    </button>
                </div>

                {/* 상단 1, 2, 3 슬롯 영역 */}
                <div className="bg-[#1A162B]/60 p-[2vh] rounded-[1.8vh] flex justify-around items-center border border-[#8262EF]/20 shrink-0">
                    {[0, 1, 2].map((index) => {
                        const badgeId = tempSelectedIds[index];
                        const badge = allBadges.find(b => b.id === badgeId);
                        const isNextReplaceSlot = tempSelectedIds.length >= 3 && replaceIndex === index;

                        return (
                            <div 
                                key={index} 
                                className={`relative w-[10vh] h-[10vh] bg-[#0E0C16] rounded-[1.8vh] border flex flex-col items-center justify-center transition-all ${
                                    isNextReplaceSlot 
                                        ? 'border-amber-400 border-2' 
                                        : badge 
                                            ? 'border-[#8262EF]/60' 
                                            : 'border-purple-900/30'
                                }`}
                            >
                                <span className="absolute -top-[1vh] -left-[1vh] bg-[#8262EF] text-white text-[1.3vh] font-bold w-[2.8vh] h-[2.8vh] rounded-full flex items-center justify-center text-center leading-none z-10">
                                    {index + 1}
                                </span>

                                {badge ? (
                                    <>
                                        <img src={badge.src} alt={badge.name} className="w-[6vh] h-[6vh] object-contain" />
                                        <button 
                                            type="button"
                                            onClick={() => onSelectBadge(badge.id)}
                                            className="absolute -top-[0.8vh] -right-[0.8vh] bg-[#221B38] hover:bg-rose-500 text-purple-200 hover:text-white rounded-full w-[2.2vh] h-[2.2vh] text-[1.2vh] flex items-center justify-center font-bold border border-[#8262EF]/30 z-10"
                                        >
                                            ✕
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-[1.3vh] text-purple-300/30 font-medium">비어있음</span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* 전체 보유 뱃지 목록 */}
                <div className="flex flex-col gap-[1vh] flex-1 min-h-0 my-[1vh]">
                    <p className="text-[1.4vh] text-purple-200/80 font-bold flex items-center gap-[0.8vh] shrink-0">
                        전체 보유 배지 
                        <span className="text-[1.1vh] px-[0.8vh] py-[0.2vh] bg-[#8262EF]/20 text-[#8262EF] rounded-full border border-[#8262EF]/30">
                            {allBadges.length}
                        </span>
                    </p>
                    
                    <div className="overflow-y-auto p-[0.5vh] pr-[0.5vw] custom-scrollbar flex-1">
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-[1.2vh]">
                            {allBadges.map((badge) => {
                                const selectedOrder = tempSelectedIds.indexOf(badge.id);
                                const isSelected = selectedOrder !== -1;

                                return (
                                    <div 
                                        key={badge.id}
                                        onClick={() => onSelectBadge(badge.id)}
                                        className={`relative aspect-square p-[1vh] rounded-[1.5vh] border flex flex-col items-center justify-center gap-[0.8vh] cursor-pointer transition-all ${
                                            isSelected 
                                                ? 'bg-[#8262EF]/25 border-2 border-[#8262EF]' 
                                                : 'bg-[#151221]/50 border-purple-900/20 hover:border-[#8262EF]/50 hover:bg-[#1C172E]/80'
                                        }`}
                                    >
                                        {isSelected && (
                                            <span className="absolute -top-[0.6vh] -left-[0.6vh] bg-[#8262EF] text-white text-[1.1vh] font-extrabold w-[2vh] h-[2vh] rounded-full flex items-center justify-center text-center leading-none z-10">
                                                {selectedOrder + 1}
                                            </span>
                                        )}

                                        <img src={badge.src} alt={badge.name} className="w-[5vh] h-[5vh] object-contain drop-shadow" />
                                        <span className="text-[1.2vh] text-purple-100 font-bold truncate w-full text-center">
                                            {badge.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 하단 버튼 영역 */}
                <div className="flex gap-[1vw] pt-[1vh] border-t border-[#8262EF]/20 shrink-0">
                    <button 
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-[1.2vh] text-[1.4vh] bg-[#161322] hover:bg-[#1E1930] text-purple-200/70 hover:text-white font-bold rounded-[1.2vh] border border-purple-900/30 transition cursor-pointer"
                    >
                        취소
                    </button>
                    <button 
                        type="button"
                        onClick={onSave}
                        className="flex-1 py-[1.2vh] text-[1.4vh] bg-[#8262EF] hover:bg-[#7150e2] text-white font-bold rounded-[1.2vh] shadow-md transition cursor-pointer"
                    >
                        적용하기
                    </button>
                </div>

            </div>
        </div>
    );
}

export default BadgeSetting;