import { useState, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NotLoggedIn from './components/NotLoggedIn';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import ReviewNote from './pages/ReviewNote';
import AiChat from './pages/AiChat';
import Login from './components/login/Login';
import Create_account from './components/createaccount/Create_account';
import Create_done from './components/createaccount/Create_done'; 

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);   
  const [isModalOpen1, setIsModalOpen1] = useState(false); 
  const [isDoneOpen, setIsDoneOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [isConnected, setIsConnected] = useState(false);

  // 회원가입 후 IDE 연결을 기다리는 상태인지 기억하는 변수
  const [isWaitingForIde, setIsWaitingForIde] = useState(false);

  const navigate = useNavigate(); 

  // 백엔드 신호(isConnected) 변경 감지 로직
  useEffect(() => {
    if (isWaitingForIde && isConnected) {
      setIsWaitingForIde(false); // 대기 상태 끝
      setIsDoneOpen(true);  // 완료 모달 띄우기
    }
  }, [isConnected, isWaitingForIde]);

  const handleSwitchToSignUp = () => {
    setIsModalOpen(false);
    setIsModalOpen1(true);
  };

  const handleSignUpComplete = () => {
    setIsModalOpen1(false);   // 가입 창 닫기
    setIsConnected(false);  // IDE 연결 안 됨 화면 띄우기
    setIsWaitingForIde(true); // 백엔드 연결 신호 대기

    // Mock API 5초 뒤 연동 됐다는 가정
    setTimeout(() => {
      setIsConnected(true);
    }, 5000);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);  
    setIsConnected(true);
    setIsModalOpen(false);
    navigate('/dashboard');
  };

  return (
    <>
      <Login 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSignUpClick={handleSwitchToSignUp} 
        onLoginSuccess={handleLoginSuccess}
      />

      <Create_account 
        isOpen1={isModalOpen1} 
        onClose1={() => setIsModalOpen1(false)} 
        onSignUpComplete={handleSignUpComplete} 
      />

      <Create_done 
        isOpen={isDoneOpen} 
        onClose={() => {
          setIsDoneOpen(false);
          setIsModalOpen(true); // 완료 모달 닫으면 로그인 창 띄우기
        }} 
        onLoginClick={() => {
          setIsDoneOpen(false);
          setIsModalOpen(true);
        }}
      />
        
      <Routes>
        <Route 
          element={
            <MainLayout 
              isLoggedIn={isLoggedIn} 
              isConnected={isConnected} 
              isWaitingForIde={isWaitingForIde}
              onOpenLogin={() => setIsModalOpen(true)} 
            />
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/review-note" element={<ReviewNote />} />
          <Route path="/ai-chat" element={<AiChat />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;