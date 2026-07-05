import { Outlet } from 'react-router-dom';
import SideNav from '../components/SideNav';

export default function MainLayout() {
  return (
    <div className="flex w-[95.6vw] h-[92.6vh] my-[3.7vh] mx-[2.1vw]">
      <SideNav />
    </div>
  );
}