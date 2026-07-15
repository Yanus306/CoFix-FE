import { useState } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotLoggedIn from './components/NotLoggedIn';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import ReviewNote from './pages/ReviewNote';
import AiChat from './pages/AiChat';
import Login from './components/login/Login';
import Create_account from './components/createaccount/Create_account';
import Create_done from './components/createaccount/Create_done'; // 3. 확장자 제거

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);   // 로그인 모달
  const [isModalOpen1, setIsModalOpen1] = useState(false); // 회원가입 모달
  const [isDoneOpen, setIsDoneOpen] = useState(false);     // 완료 모달
  
  // 로그인 창 ➔ 회원가입 창 전환
  const handleSwitchToSignUp = () => {
    setIsModalOpen(false);
    setIsModalOpen1(true);
  };

  // 2. 회원가입 완료 시 동작할 함수 추가
  const handleSignUpComplete = () => {
    setIsModalOpen1(false); // 회원가입창 닫고
    setIsDoneOpen(true);    // 완료창 열기
  };

  return (
    <>
      <Login 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSignUpClick={handleSwitchToSignUp} 
      />

      <Create_account 
        isOpen1={isModalOpen1} 
        onClose1={() => setIsModalOpen1(false)} 
        onSignUpComplete={handleSignUpComplete} // 2. 완료 이벤트 props 추가
      />

      <Create_done 
        isOpen={isDoneOpen} 
        onClose={() => setIsDoneOpen(false)} 
        onLoginClick={() => setIsModalOpen(true)} // 1. 정의된 함수 이름으로 수정
      />
        
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route 
              path="/" 
              element={<NotLoggedIn onOpenLogin={() => setIsModalOpen(true)} />} 
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/report" element={<Report />} />
            <Route path="/review-note" element={<ReviewNote />} />
            <Route path="/ai-chat" element={<AiChat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;