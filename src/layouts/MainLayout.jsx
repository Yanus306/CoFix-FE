import { Outlet } from 'react-router-dom';
import SideNav from '../components/SideNav';
import IdeStatus from '../components/IdeStatus';

export default function MainLayout() {
  return (
    <div className="flex justify-between w-[95.6vw] h-[92.6vh] my-[3.7vh] mx-[2.1vw]">
      <SideNav />

      <div className="flex flex-col justify-between w-[77.3vw] h-full">
        <IdeStatus isConnected={true} />

        <div className="flex w-[77.3vw] h-[83.33vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}