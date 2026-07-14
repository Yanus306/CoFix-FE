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

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const handleSwitchToSignUp = () => {
    setIsModalOpen(false);
    setIsModalOpen1(true);
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