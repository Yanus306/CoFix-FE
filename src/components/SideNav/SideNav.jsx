import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SettingIcon from "../../assets/SettingIcon.png";
import UserModal from "./UserModal"; 

function SideNav() {
    const menuItems = [
        { name: 'DASHBOARD', path: '/dashboard' },
        { name: 'REPORT', path: '/report' },
        { name: 'REVIEW NOTE', path: '/review-note' },
        { name: 'AI CHAT', path: '/ai-chat' }
    ];

    const location = useLocation(); 
    const navigate = useNavigate();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // 💡 닉네임을 state로 관리하여 변경 감지 가능하게 설정
    const [nickname, setNickname] = useState(() => {
        return localStorage.getItem('nickname') || '사용자';
    });
    
    const modalRef = useRef(null);

    // 💡 로그인 직후나 로컬 스토리지 변경 시 사이드바 닉네임 즉시 업데이트
    useEffect(() => {
        const updateNickname = () => {
            const currentNickname = localStorage.getItem('nickname') || '사용자';
            setNickname(currentNickname);
        };

        // 다른 탭이나 창에서의 스토리지 변경 감지
        window.addEventListener('storage', updateNickname);
        
        // 같은 앱 내에서 로그인 성공 시 커스텀 이벤트(login-success)를 받기 위한 리스너
        window.addEventListener('login-success', updateNickname);
        
        return () => {
            window.removeEventListener('storage', updateNickname);
            window.removeEventListener('login-success', updateNickname);
        };
    }, []);

    // 모달을 열 때마다 최신 닉네임으로 갱신하는 안전장치
    const handleToggleModal = () => {
        if (!isModalOpen) {
            const latestNickname = localStorage.getItem('nickname') || '사용자';
            setNickname(latestNickname);
        }
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="panel-base no-hover flex flex-col justify-between w-[17vw] h-full py-[1.67vh] px-[0.94vw] select-none">
            <div className="flex flex-col items-center w-[15.10vw] gap-[6.57vh]">
                <div className="mt-[5.37vh] text-[3.7vh] font-bold text-purple400">CoFix</div>

                <div className="flex flex-col gap-[1.02vh] w-[15.10vw]">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <button
                                key={item.path} 
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

            <div 
                ref={modalRef} 
                className="relative flex justify-between items-center w-full h-[7.12vh] px-[2.3vw] bg-gray800-50 rounded-[1.04vw]"
            >
                {isModalOpen && (
                    <div className="absolute bottom-[8.5vh] left-[2vw] w-full z-10">
                        <UserModal />
                    </div>
                )}

                <div 
                    className="flex items-center gap-[0.73vw] cursor-pointer"
                    onClick={handleToggleModal}
                >
                    <div className="w-[1.77vh] h-[1.77vh] rounded-[50%] bg-gray-200"></div>
                    
                    {/* 💡 동기화된 닉네임 출력 */}
                    <div className="text-[1.85vh] font-bold text-gray400">{nickname}</div>
                </div>

                <img 
                    src={SettingIcon} 
                    alt="settings" 
                    className="w-[1.46vw] cursor-pointer"
                    onClick={handleToggleModal}
                />
            </div>
        </div>
    );
}

export default SideNav;