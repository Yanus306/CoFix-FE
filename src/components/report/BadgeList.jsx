import { useState } from 'react';
import BadgeSettingModal from './BadgeSetting';

import badgeStarter from '../../assets/badge/badge-starter.png';
import badgeMaster from '../../assets/badge/badge-master.png';
import badgeTotal500 from '../../assets/badge/badge-total-500.png';
import badgeSetting from '../../assets/badge/badge-setting.png';

// 보유 중인 뱃지 전체 데이터베이스
const MOCK_BADGES = [
    { id: 'starter', name: '스타터 배지', desc: 'CoFix에 오신것을 환영합니다.', src: badgeStarter },
    { id: 'master', name: '마스터 배지', desc: '모든 배지를 획득하셨습니다!', src: badgeMaster },
    { id: 'first-solve', name: '첫 문제 해결', desc: '처음으로 알고리즘 문제를 스스로 풀었습니다.', src: badgeStarter },
    { id: 'total-500', name: '오답노트 500회', desc: '오답노트를 500회 복습하셨습니다!', src: badgeTotal500 },
    { id: 'total-100', name: '오답노트 100회', desc: '오답노트를 100회 완성했습니다.', src: badgeTotal500 },
    { id: 'review-king', name: '복습의 귀재', desc: '틀린 문제를 5회 이상 반복 학습했습니다.', src: badgeTotal500 },
    { id: 'streak-7', name: '7일 연속 출석', desc: '일주일 동안 빠짐없이 학습을 완료했습니다.', src: badgeStarter },
    { id: 'streak-30', name: '열정의 30일', desc: '한 달간 매일 연속으로 공부에 성공했습니다.', src: badgeMaster },
    { id: 'streak-100', name: '백일의 기적', desc: '100일 연속 출석 달성자입니다.', src: badgeMaster },
    { id: 'weekend-hero', name: '주말 전사', desc: '주말에도 쉬지 않고 학습을 진행했습니다.', src: badgeStarter },
    { id: 'night-owl', name: '심야 학습자', desc: '자정 이후에도 열정적으로 학습을 진행했습니다.', src: badgeStarter },
    { id: 'early-bird', name: '얼리버드', desc: '오전 7시 전에 첫 학습을 완료했습니다.', src: badgeMaster },
    { id: 'lunch-study', name: '열정적인 점심시간', desc: '점심시간을 활용해 문제를 해결했습니다.', src: badgeStarter },
    { id: 'perfect-score', name: '만점왕', desc: '주간 단원 테스트에서 100점을 기록했습니다.', src: badgeTotal500 },
    { id: 'speed-runner', name: '스피드 러너', desc: '제한시간의 절반 만에 과제를 통과했습니다.', src: badgeMaster },
    { id: 'bug-hunter', name: '버그 헌터', desc: '디버깅 챌린지 10개 과제를 통과했습니다.', src: badgeTotal500 },
    { id: 'algorithm-guru', name: '알고리즘 도사', desc: '고난도 알고리즘 30문제를 해결했습니다.', src: badgeMaster },
    { id: 'code-cleaner', name: '클린 코더', desc: '코드 리팩토링 미션을 완벽히 완료했습니다.', src: badgeStarter },
    { id: 'helper', name: '친절한 답변가', desc: '질문 게시판에서 답변 10개를 작성했습니다.', src: badgeStarter },
    { id: 'study-leader', name: '스터디장', desc: '그룹 스터디를 직접 개설하고 이끌었습니다.', src: badgeMaster },
    { id: 'feedback-master', name: '피드백 왕', desc: '동료의 코드 리뷰를 20회 이상 작성했습니다.', src: badgeTotal500 },
    { id: 'season-top10', name: '시즌 TOP 10', desc: '시즌 랭킹 상위 10위 안에 진입했습니다.', src: badgeMaster },
    { id: 'event-halloween', name: '할로윈 챌린지', desc: '시즌 특별 이벤트 문제를 해결했습니다.', src: badgeTotal500 },
    { id: 'new-year-2026', name: '2026 신년 달성', desc: '새해 첫날 목표 과제를 달성했습니다.', src: badgeStarter },
    { id: 'hidden-easteregg', name: '이스터에그 발견', desc: '숨겨진 특별 미션을 해제했습니다.', src: badgeMaster }
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
            
            {/* 메인 화면 대표 뱃지 3개 슬롯 영역 (고정 3슬롯) */}
            <div className="flex items-center justify-around w-full h-full px-[1vw]">
                {[0, 1, 2].map((index) => {
                    const badgeId = selectedBadgeIds[index];
                    const badge = MOCK_BADGES.find(b => b.id === badgeId);

                    return (
                        <div key={index} className="relative flex flex-col items-center justify-center group cursor-pointer">
                            {badge ? (
                                <>
                                    {/* 장착된 배지 */}
                                    <div className="w-[7.5vh] h-[7.5vh] flex items-center justify-center transition-transform group-hover:scale-110">
                                        <img src={badge.src} alt={badge.name} className="w-full h-full object-contain drop-shadow-md" />
                                    </div>
                                    {/* 배지 정보 툴팁 */}
                                    <div className="absolute top-[8.5vh] hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                                        <div className="w-0 h-0 border-x-[0.4vh] border-x-transparent border-b-[0.4vh] border-b-slate-900/90"></div>
                                        <div className="bg-slate-900/90 text-white p-[1vh] rounded-[1.2vh] shadow-xl backdrop-blur-sm min-w-[15vw] max-w-[20vw] text-center">
                                            <p className="text-[1.3vh] font-bold text-[#8262EF] mb-[0.3vh]">{badge.name}</p>
                                            <p className="text-[1.1vh] text-slate-200 font-normal leading-tight">{badge.desc}</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* 💡 미설정 시 출력되는 원형 그레이 점선 슬롯 및 툴팁 */
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

                                    {/* 💬 비어있는 항목 hover 시 나타나는 '배지 등록' 툴팁 */}
                                    <div className="absolute top-[8.5vh] hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                                        <div className="w-0 h-0 border-x-[0.4vh] border-x-transparent border-b-[0.4vh] border-b-slate-900/90"></div>
                                        <div className="bg-slate-900/90 text-white px-[1.2vh] py-[0.8vh] rounded-[1vh] shadow-xl backdrop-blur-sm text-center whitespace-nowrap border border-slate-700/50">
                                            <p className="text-[1.1vh] font-bold text-[#8262EF]">배지 등록</p>
                                            <p className="text-[0.95vh] text-slate-300 font-normal">클릭하여 대표 배지를 설정하세요</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* ⚙️ 분리한 모달 컴포넌트 렌더링 */}
            <BadgeSettingModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                allBadges={MOCK_BADGES}
                tempSelectedIds={tempSelectedIds}
                replaceIndex={replaceIndex}
                onSelectBadge={handleSelectBadge}
                onSave={handleSave}
            />
        </div>
    );
}

export default BadgeList;