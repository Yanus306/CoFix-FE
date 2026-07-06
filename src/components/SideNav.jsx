import { useLocation, useNavigate } from 'react-router-dom';
import SettingIcon from "../assets/SettingIcon.png";

function SideNav() {
    const menuItems = [
        { name: 'DASHBOARD', path: '/' },
        { name: 'REPORT', path: '/report' },
        { name: 'REVIEW NOTE', path: '/review-note' },
        { name: 'AI CHAT', path: '/ai-chat' }
    ];

    const location = useLocation(); 
    const navigate = useNavigate();

    return (
        <div className="panel-base no-hover justify-between w-[17vw] h-full py-[1.67vh] px-[0.94vw] select-none">
            <div className="flex flex-col items-center w-[15.10vw] gap-[6.57vh]">
                <div className="mt-[5.37vh] text-[3.7vh] font-bold text-purple400">CoFix</div>

                <div className="flex flex-col gap-[1.02vh] w-[15.10vw]">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <button
                                key={item}
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

            <div className="flex justify-between items-center w-full h-[7.12vh] px-[2.3vw] bg-gray800-50 rounded-[1.04vw]">
                    <div className="flex items-center gap-[0.73vw]">
                        <div className="w-[1.77vw] h-[1.77vw] rounded-[50%] bg-gray-200"></div>
                        <div className="text-[1.85vh] font-bold text-gray400 cursor-pointer">사용자</div>
                    </div>

                    <img src={SettingIcon} alt="" className="w-[1.46vw] cursor-pointer"></img>
            </div>
        </div>
    );
}

export default SideNav;