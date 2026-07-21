import { useState } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // 💡 useNavigate 추가
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
  
  const navigate = useNavigate(); 

  const handleSwitchToSignUp = () => {
    setIsModalOpen(false);
    setIsModalOpen1(true);
  };

  const handleSignUpComplete = () => {
    setIsModalOpen1(false);
    setIsDoneOpen(true);  
  };

  // 💡 로그인 성공 핸들러 보강
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);  
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
          setIsModalOpen(true); 
        }} 
        onLoginClick={() => {
          setIsDoneOpen(false);
          setIsModalOpen(true);
        }}
      />
        
      <Routes>
        <Route 
          element={<MainLayout isLoggedIn={isLoggedIn} onOpenLogin={() => setIsModalOpen(true)} />}
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