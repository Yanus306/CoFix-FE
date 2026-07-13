import { useState } from 'react';

function UserModal() {
    const [isDarkMode, setIsDarkMode] = useState(true);

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
                        className="w-[1.4vh] h-[1.4vh] text-gray-800" 
                    >
                        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            <div className="flex gap-[0.47vw] text-[1.4vh]">
                <div className="cursor-pointer hover:text-white transition-colors">계정관리</div>
                <p>|</p>
                <div className="cursor-pointer hover:text-white transition-colors">로그아웃</div>
            </div>
        </div>
    );
}

export default UserModal;