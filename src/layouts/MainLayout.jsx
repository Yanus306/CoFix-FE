import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import SideNav from "../components/SideNav/SideNav";
import IdeStatus from "../components/IdeStatus";
import IdeDisconnected from "../components/IdeDisconnected";
import NotLoggedIn from "../components/NotLoggedIn";

export default function MainLayout({
  isLoggedIn,
  isConnected,
  isWaitingForIde,
  onOpenLogin,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const publicPaths = ["/ide-code"];
  const isPublicPath = publicPaths.includes(location.pathname);

  return (
    <div className="flex justify-between w-[95.6vw] h-[92.6vh] my-[3.7vh] mx-[2.1vw]">
      <SideNav />

      <div className="flex flex-col justify-between w-[77.3vw] h-full">
        <IdeStatus isConnected={isConnected} />

        <div className="flex w-[77.3vw] h-[83.33vh]">
          {isWaitingForIde ? (
            <IdeDisconnected />
          ) : (!isLoggedIn && !isPublicPath) ? ( 
            <NotLoggedIn onOpenLogin={onOpenLogin} />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}