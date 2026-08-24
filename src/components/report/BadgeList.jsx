import badgeStarter from '../../assets/badge/badge-starter.png';
import badgeMaster from '../../assets/badge/badge-master.png';
import badgeTotal500 from '../../assets/badge/badge-total-500.png';
import badgeSetting from '../../assets/badge/badge-setting.png';

function BadgeList() {
    const badges = [
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
            name: '오답노트 500회 달성', 
            desc: '오답노트 500회 사용하셨습니다!',
            src: badgeTotal500 
        },
    ];

    return (
        <div className="panel-base justify-center w-full h-[23.89vh] gap-[1vh] flex flex-col p-4 relative">
            {/* 상단 헤더 */}
            <div className="relative flex items-center justify-center w-full">
                <div className="panel-title text-center">학습 배지</div>
                
                {/* ⚙️ 크기를 줄이고 hover 시 90도 회전하는 설정 버튼 */}
                <button 
                    type="button"
                    className="absolute right-0 w-[2.2vh] h-[2.2vh] flex items-center justify-center cursor-pointer group"
                    title="배지 설정"
                >
                    <img 
                        src={badgeSetting} 
                        alt="설정" 
                        className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:rotate-90"
                    />
                </button>
            </div>
            
            {/* 뱃지 아이템 리스트 */}
            <div className="flex items-center justify-around w-full h-full px-2">
                {badges.map((badge) => (
                    <div 
                        key={badge.id} 
                        className="relative flex flex-col items-center justify-center group cursor-pointer"
                    >
                        {/* 뱃지 이미지 */}
                        <div className="w-[7.5vh] h-[7.5vh] flex items-center justify-center transition-transform group-hover:scale-110">
                            <img 
                                src={badge.src} 
                                alt={badge.name} 
                                className="w-full h-full object-contain drop-shadow-md"
                            />
                        </div>

                        {/* 💬 마우스 hover 시 나타나는 커스텀 툴팁 */}
                        <div className="absolute top-[8.5vh] hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                            {/* 말풍선 위쪽 화살표 */}
                            <div className="w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-slate-900/90"></div>
                            
                            {/* 툴팁 본문 카드 */}
                            <div className="bg-slate-900/90 text-white p-2.5 rounded-xl shadow-xl backdrop-blur-sm min-w-[140px] max-w-[200px] text-center">
                                <p className="text-xs font-bold text-amber-300 mb-0.5">{badge.name}</p>
                                <p className="text-[11px] text-slate-200 font-normal leading-tight">{badge.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BadgeList;