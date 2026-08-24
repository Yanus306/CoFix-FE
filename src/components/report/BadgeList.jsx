import { useState } from 'react';
import BadgeSettingModal from './BadgeSetting';

import badgeStarter from '../../assets/badge/badge-starter.png';
import badgeMaster from '../../assets/badge/badge-master.png';
import badgeTotal500 from '../../assets/badge/badge-total-500.png';
import badgeSetting from '../../assets/badge/badge-setting.png';

// 💡 초기 요청 시 사용했던 기본 3개 배지만 유지
const INITIAL_BADGES = [
    { 
        id: 'starter', 
        name: '스타터 배지', 
        desc: 'CoFix에 오신것을 환영합니다.',
        src: badgeStarter 
    },
    { 
        id: 'master', 
        name: '마스터 배지', 
        desc: '모든 배지를 획득하셨습니다!',
        src: badgeMaster 
    },
    { 
        id: 'total-500', 
        name: '오답노트 500회', 
        desc: '오답노트 500회 사용하셨습니다!',
        src: badgeTotal500 
    },
];

function BadgeList() {
    const [selectedBadgeIds, setSelectedBadgeIds] = useState(['starter', 'master', 'total-500']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedIds, setTempSelectedIds] = useState([]);
    const [replaceIndex, setReplaceIndex] = useState(0);

    const handleOpenModal = () => {
        setTempSelectedIds([...selectedBadgeIds]);
        setReplaceIndex(selectedBadgeIds.length >= 3 ? 0 : selectedBadgeIds.length);
        setIsModalOpen(true);
    };

    const handleSelectBadge = (id) => {
        if (tempSelectedIds.includes(id)) {
            const nextList = tempSelectedIds.filter(item => item !== id);
            setTempSelectedIds(nextList);
            setReplaceIndex(nextList.length);
            return;
        }

        if (tempSelectedIds.length < 3) {
            const nextList = [...tempSelectedIds, id];
            setTempSelectedIds(nextList);
            setReplaceIndex(nextList.length >= 3 ? 0 : nextList.length);
        } else {
            const nextList = [...tempSelectedIds];
            nextList[replaceIndex] = id;
            setTempSelectedIds(nextList);
            setReplaceIndex((replaceIndex + 1) % 3);
        }
    };

    const handleSave = () => {
        setSelectedBadgeIds(tempSelectedIds);
        setIsModalOpen(false);
    };

    return (
        <div className="panel-base justify-center w-full h-[23.89vh] gap-[1vh] flex flex-col p-[1.5vh] relative">
            {/* 상단 헤더 */}
            <div className="relative flex items-center justify-center w-full">
                <div className="panel-title text-center">학습 배지</div>
                <button 
                    type="button"
                    onClick={handleOpenModal}
                    className="absolute right-0 w-[2.2vh] h-[2.2vh] flex items-center justify-center cursor-pointer group"
                    title="대표 배지 설정"
                >
                    <img 
                        src={badgeSetting} 
                        alt="설정" 
                        className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:rotate-90"
                    />
                </button>
            </div>
            
            {/* 메인 화면 대표 뱃지 3개 슬롯 영역 */}
            <div className="flex items-center justify-around w-full h-full px-[1vw]">
                {[0, 1, 2].map((index) => {
                    const badgeId = selectedBadgeIds[index];
                    const badge = INITIAL_BADGES.find(b => b.id === badgeId);

                    return (
                        <div key={index} className="relative flex flex-col items-center justify-center group cursor-pointer">
                            {badge ? (
                                <>
                                    <div className="w-[7.5vh] h-[7.5vh] flex items-center justify-center transition-transform group-hover:scale-110">
                                        <img src={badge.src} alt={badge.name} className="w-full h-full object-contain drop-shadow-md" />
                                    </div>
                                    <div className="absolute top-[8.5vh] hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                                        <div className="w-0 h-0 border-x-[0.4vh] border-x-transparent border-b-[0.4vh] border-b-slate-900/90"></div>
                                        <div className="bg-slate-900/90 text-white p-[1vh] rounded-[1.2vh] shadow-xl backdrop-blur-sm min-w-[15vw] max-w-[20vw] text-center">
                                            <p className="text-[1.5vh] font-bold text-[#8262EF] mb-[0.3vh]">{badge.name}</p>
                                            <p className="text-[1.1vh] text-slate-200 font-normal leading-tight">{badge.desc}</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div 
                                        onClick={handleOpenModal}
                                        className="w-[7.5vh] h-[7.5vh] flex flex-col items-center justify-center transition-all group-hover:scale-105"
                                    >
                                        <div className="w-full h-full rounded-full bg-slate-800/30 border-2 border-dashed border-slate-500/50 hover:border-slate-400 flex items-center justify-center transition-colors">
                                            <span className="text-[1.1vh] font-bold text-slate-400 group-hover:text-slate-200">
                                                비어있음
                                            </span>
                                        </div>
                                    </div>

                                    <div className="absolute top-[8.5vh] hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                                        <div className="w-0 h-0 border-x-[0.4vh] border-x-transparent border-b-[0.4vh] border-b-slate-900/90"></div>
                                        <div className="bg-slate-900/90 text-white px-[1.2vh] py-[0.8vh] rounded-[1vh] shadow-xl backdrop-blur-sm text-center whitespace-nowrap border border-slate-700/50">
                                            <p className="text-[1.3vh] font-bold text-[#8262EF]">배지 등록</p>
                                            <p className="text-[0.95vh] text-slate-300 font-normal">클릭하여 대표 배지를 설정하세요</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* 모달 연동 */}
            <BadgeSettingModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                allBadges={INITIAL_BADGES}
                tempSelectedIds={tempSelectedIds}
                replaceIndex={replaceIndex}
                onSelectBadge={handleSelectBadge}
                onSave={handleSave}
            />
        </div>
    );
}

export default BadgeList;