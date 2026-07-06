import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SettingIcon from "../../assets/SettingIcon.png";
// UserModal 컴포넌트 임포트 (경로는 실제에 맞게 수정해 주세요)
import UserModal from "./UserModal"; 

function SideNav() {
    const menuItems = [
        { name: 'DASHBOARD', path: '/' },
        { name: 'REPORT', path: '/report' },
        { name: 'REVIEW NOTE', path: '/review-note' },
        { name: 'AI CHAT', path: '/ai-chat' }
    ];

    const location = useLocation(); 
    const navigate = useNavigate();
    
    // 모달 열림/닫힘 상태 관리
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="panel-base no-hover flex flex-col justify-between w-[17vw] h-full py-[1.67vh] px-[0.94vw] select-none">
            <div className="flex flex-col items-center w-[15.10vw] gap-[6.57vh]">
                <div className="mt-[5.37vh] text-[3.7vh] font-bold text-purple400">CoFix</div>

                <div className="flex flex-col gap-[1.02vh] w-[15.10vw]">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <button
                                key={item.path} // 수정됨: 객체 대신 string 속성 사용
                                onClick={() => navigate(item.path)}
                                className={`
                                flex items-center w-full h-[7.12vh] px-[2.3vw] rounded-[1.04vw] 
                                text-[1.85vh] transition-colors cursor-pointer
                                ${isActive
                                        ? 'bg-purple500-10 border-[0.09vh] border-purple500-20 text-purple400 font-bold'
                                        : 'text-gray400 border-[0.09vh] border-transparent hover:bg-white-5'
                                    }
                            `}
                            >
                                {item.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="relative flex justify-between items-center w-full h-[7.12vh] px-[2.3vw] bg-gray800-50 rounded-[1.04vw]">
                {isModalOpen && (
                    <div className="absolute bottom-[8.5vh] left-[2vw] w-full z-10">
                        <UserModal />
                    </div>
                )}

                <div 
                    className="flex items-center gap-[0.73vw] cursor-pointer"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                >
                    <div className="w-[1.77vw] h-[1.77vw] rounded-[50%] bg-gray-200"></div>
                    <div className="text-[1.85vh] font-bold text-gray400">사용자</div>
                </div>

                <img 
                    src={SettingIcon} 
                    alt="settings" 
                    className="w-[1.46vw] cursor-pointer"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                />
            </div>
        </div>
    );
}

export default SideNav;