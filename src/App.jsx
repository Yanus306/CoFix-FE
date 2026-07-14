import { useState } from 'react'; // 1. useState를 상단에 꼭 가져와야 합니다!
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotLoggedIn from './components/NotLoggedIn';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import ReviewNote from './pages/ReviewNote';
import AiChat from './pages/AiChat';
import Login from './components/login/Login';
import Create_account from './components/createaccount/Create_account';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // 2. React Fragment (<> ~ </>) 혹은 전체를 감싸는 하나의 div를 사용하여
    //    모달 요소들과 라우터(BrowserRouter)를 하나의 부모 안에 묶어줍니다.
    <>
      {/* 로그인 모달 컴포넌트는 전역 어디서든 띄울 수 있게 최상단 부모 바로 아래 배치합니다. */}
      <Login isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            {/* 
              3. 메인 루트("/") 경로에 진입했을 때, 
                 NotLoggedIn 컴포넌트에 모달을 열 수 있는 함수(onOpenLogin)를 정상적으로 전달해 줍니다. 
            */}
            <Route 
              path="/" 
              element={<NotLoggedIn onOpenLogin={() => setIsModalOpen(true)} />} 
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/report" element={<Report />} />
            <Route path="/review-note" element={<ReviewNote />} />
            <Route path="/ai-chat" element={<AiChat />} />
          </Route>
          
          {/* 가입 관련 페이지들 */}
          <Route path="/sign-up" element={<Login isOpen={true} onClose={() => {}} />} />
          <Route path="/create-account" element={<Create_account />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;