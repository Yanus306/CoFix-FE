import { useState } from 'react';
import { useOutletContext } from 'react-router-dom'; // 1. 추가
import { useLogoutApi } from '../../hooks/LogoutApi'; // 경로에 맞게 확인

function UserModal() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const { logoutUser, isLoading } = useLogoutApi();
    
    // 2. MainLayout의 Outlet context에서 onLogoutSuccess 받아오기
    const { onLogoutSuccess } = useOutletContext() || {};

    const handleLogoutClick = async () => {
        if (isLoading) return;

        // API를 호출하되, 성공/실패 여부와 관계없이 강제로 로그아웃 처리 수행
        await logoutUser();

        // 로컬에 저장된 토큰이나 유저 정보 삭제 (필요한 경우)
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');

        // 무조건 부모의 상태를 false로 만들어 NotLoggedIn으로 전환
        if (onLogoutSuccess) {
            onLogoutSuccess();
        } else {
            // 혹시 context가 안 넘어온다면 새로고침으로 비로그인 처리
            window.location.reload();
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-[10.73vw] h-[18vh] bg-gray800-50 border-[0.09vh] border-white-5 rounded-[1.04vw] text-gray400">
            <div className="flex flex-col items-center mb-[0.7vh]">
                <div className="w-[4.17vh] h-[4.17vh] mb-[0.3vh] bg-gray200 rounded-[50%]"></div>
                <div className="font-bold text-[2vh]">사용자</div>
            </div>

            <div 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="relative flex items-center w-[5vw] h-[2.96vh] mb-[0.9vh] border-[0.09vh] border-gray400 rounded-[1.04vw] cursor-pointer"
            >
                <div 
                    className={`
                        absolute flex justify-center items-center w-[1.77vw] h-[2.41vh] bg-gray400 rounded-[1.04vw]
                        transition-all duration-300 ease-in-out
                        ${isDarkMode ? 'left-[calc(100%-1.77vw-0.15vw)]' : 'left-[0.15vw]'}
                    `}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-[1.4vh] h-[1.4vh] text-gray900" 
                    >
                        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            <div className="flex gap-[0.47vw] text-[1.4vh]">
                <div className="cursor-pointer hover:text-white transition-colors">계정관리</div>
                <p>|</p>
                <div 
                    onClick={handleLogoutClick}
                    className="cursor-pointer hover:text-white transition-colors"
                >
                    {isLoading ? '로그아웃 중...' : '로그아웃'}
                </div>
            </div>
        </div>
    );
}

export default UserModal;