import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import SideNav from '../components/SideNav/SideNav';
import IdeStatus from '../components/IdeStatus';
import IdeDisconnected from '../components/IdeDisconnected';
import NotLoggedIn from '../components/NotLoggedIn';

// 💡 1. 부모(App.jsx)로부터 isLoggedIn뿐만 아니라 모달을 열어주는 onOpenLogin도 함께 받아옵니다!
export default function MainLayout({ isLoggedIn, onOpenLogin }) {
  const [isConnected, setIsConnected] = useState(true); 

  return (
    <div className="flex justify-between w-[95.6vw] h-[92.6vh] my-[3.7vh] mx-[2.1vw]">
      <SideNav />

      <div className="flex flex-col justify-between w-[77.3vw] h-full">
        <IdeStatus isConnected={isConnected} />

        <div className="flex w-[77.3vw] h-[83.33vh]">
          {!isConnected ? (
            <IdeDisconnected />
          ) : !isLoggedIn ? (
            /* 💡 2. 로그인이 안 되어있을 때는 NotLoggedIn 컴포넌트를 보여주고 로그인 버튼 핸들러를 연결합니다. */
            <NotLoggedIn onOpenLogin={onOpenLogin} /> 
          ) : (
            /* 💡 3. 로그인이 완료(true)되면 주소창(/dashboard 등)에 맞는 컴포넌트(Dashboard)가 Outlet 자리에 착 뜹니다! */
            <Outlet />      
          )}
        </div>
      </div>
    </div>
  );
}