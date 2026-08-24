import React from 'react';

function BadgeSettingModal({ 
    isOpen, 
    onClose, 
    allBadges, 
    tempSelectedIds, 
    replaceIndex, 
    onSelectBadge, 
    onSave 
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-[2vw]">
            {/* 블러 및 외부 광원(shadow-glow) 제거, 깔끔한 테두리로 변경 */}
            <div className="bg-gradient-to-b from-[#13111C] via-[#0F0D18] to-[#0A0910] text-white w-[65vw] min-w-[360px] max-w-3xl rounded-[2.5vh] p-[3vh] shadow-2xl border border-[#8262EF]/30 flex flex-col gap-[2.5vh]">
                
                {/* 모달 헤더 */}
                <div className="flex justify-between items-center border-b border-[#8262EF]/20 pb-[1.8vh]">
                    <div>
                        <h3 className="text-[2.2vh] font-bold text-slate-100 flex items-center gap-[0.8vh]">
                            <span className="w-[1vh] h-[1vh] rounded-full bg-[#8262EF]"></span>
                            대표 뱃지 설정
                        </h3>
                        <p className="text-[1.4vh] text-purple-200/60 mt-[0.4vh]">클릭하는 순서대로 1, 2, 3번에 등록됩니다.</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-purple-300/50 hover:text-white text-[2.2vh] p-[0.6vh] transition cursor-pointer hover:bg-[#8262EF]/20 rounded-[0.8vh]"
                    >
                        ✕
                    </button>
                </div>

                {/* 상단 1, 2, 3 슬롯 영역 */}
                <div className="bg-[#1A162B]/60 p-[2vh] rounded-[1.8vh] flex justify-around items-center min-h-[14vh] border border-[#8262EF]/20">
                    {[0, 1, 2].map((index) => {
                        const badgeId = tempSelectedIds[index];
                        const badge = allBadges.find(b => b.id === badgeId);
                        const isNextReplaceSlot = tempSelectedIds.length >= 3 && replaceIndex === index;

                        return (
                            <div 
                                key={index} 
                                className={`relative w-[11vh] h-[11vh] bg-[#0E0C16] rounded-[1.8vh] border flex flex-col items-center justify-center transition-all ${
                                    isNextReplaceSlot 
                                        ? 'border-amber-400 border-2' 
                                        : badge 
                                            ? 'border-[#8262EF]/60' 
                                            : 'border-purple-900/30'
                                }`}
                            >
                                <span className="absolute -top-[1.2vh] -left-[1.2vh] bg-[#8262EF] text-white text-[1.4vh] font-bold w-[3vh] h-[3vh] rounded-full flex items-center justify-center text-center leading-none z-10">
                                    {index + 1}
                                </span>

                                {badge ? (
                                    <>
                                        <img src={badge.src} alt={badge.name} className="w-[7vh] h-[7vh] object-contain mt-[0.5vh]" />
                                        <button 
                                            onClick={() => onSelectBadge(badge.id)}
                                            className="absolute -top-[1vh] -right-[1vh] bg-[#221B38] hover:bg-rose-500 text-purple-200 hover:text-white rounded-full w-[2.4vh] h-[2.4vh] text-[1.3vh] flex items-center justify-center font-bold transition cursor-pointer border border-[#8262EF]/30 z-10"
                                        >
                                            ✕
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-[1.4vh] text-purple-300/30 font-medium">비어있음</span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* 전체 보유 뱃지 목록 */}
                <div className="flex flex-col gap-[1.2vh]">
                    <p className="text-[1.5vh] text-purple-200/80 font-bold flex items-center gap-[0.8vh]">
                        전체 보유 뱃지 
                        <span className="text-[1.2vh] px-[0.8vh] py-[0.2vh] bg-[#8262EF]/20 text-[#8262EF] rounded-full border border-[#8262EF]/30">
                            {allBadges.length}
                        </span>
                    </p>
                    
                    <div className="max-h-[36vh] overflow-y-auto p-[0.8vh] pr-[0.8vw] custom-scrollbar">
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-[1.5vh]">
                            {allBadges.map((badge) => {
                                const selectedOrder = tempSelectedIds.indexOf(badge.id);
                                const isSelected = selectedOrder !== -1;

                                return (
                                    <div 
                                        key={badge.id}
                                        onClick={() => onSelectBadge(badge.id)}
                                        className={`relative p-[1.5vh] rounded-[1.5vh] border flex flex-col items-center gap-[1vh] cursor-pointer transition-all ${
                                            isSelected 
                                                ? 'bg-[#8262EF]/25 border-2 border-[#8262EF]' 
                                                : 'bg-[#151221]/50 border-purple-900/20 hover:border-[#8262EF]/50 hover:bg-[#1C172E]/80'
                                        }`}
                                    >
                                        {isSelected && (
                                            <span className="absolute -top-[0.8vh] -left-[0.8vh] bg-[#8262EF] text-white text-[1.2vh] font-extrabold w-[2.2vh] h-[2.2vh] rounded-full flex items-center justify-center text-center leading-none z-10">
                                                {selectedOrder + 1}
                                            </span>
                                        )}

                                        <img src={badge.src} alt={badge.name} className="w-[6vh] h-[6vh] object-contain drop-shadow" />
                                        <span className="text-[1.3vh] text-purple-100 font-bold truncate w-full text-center">
                                            {badge.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 하단 버튼 영역 */}
                <div className="flex gap-[1vw] pt-[1.2vh] border-t border-[#8262EF]/20">
                    <button 
                        onClick={onClose}
                        className="flex-1 py-[1.5vh] text-[1.5vh] bg-[#161322] hover:bg-[#1E1930] text-purple-200/70 hover:text-white font-bold rounded-[1.2vh] border border-purple-900/30 transition cursor-pointer"
                    >
                        취소
                    </button>
                    <button 
                        onClick={onSave}
                        className="flex-1 py-[1.5vh] text-[1.5vh] bg-[#8262EF] hover:bg-[#7150e2] text-white font-bold rounded-[1.2vh] shadow-md transition cursor-pointer"
                    >
                        적용하기
                    </button>
                </div>

            </div>
        </div>
    );
}

export default BadgeSettingModal;