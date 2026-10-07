import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuthFlow() {
  const navigate = useNavigate(); 

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  }); 
  
  const [isConnected, setIsConnected] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const [isModalOpen, setIsModalOpen] = useState(false);     
  const [isModalOpen1, setIsModalOpen1] = useState(false); 
  const [isDoneOpen, setIsDoneOpen] = useState(false);
  const [isWaitingForIde, setIsWaitingForIde] = useState(false);

  useEffect(() => {
    if (isWaitingForIde && isConnected) {
      setIsWaitingForIde(false);  
      setIsDoneOpen(true);  
    }
  }, [isConnected, isWaitingForIde]);

  const handleSwitchToSignUp = () => {
    setIsModalOpen(false);
    setIsModalOpen1(true);
  };

  // 💡 회원가입 창에서 '로그인하러가기'를 눌렀을 때 로그인 창을 띄워주는 함수
  const handleSwitchToLogin = () => {
    setIsModalOpen1(false);
    setIsModalOpen(true);
  };

  const handleSignUpComplete = () => {
    setIsModalOpen1(false);   
    setIsLoggedIn(true);
    setIsConnected(false);  
    setIsWaitingForIde(true); 
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);  
    setIsConnected(true);
    setIsModalOpen(false);
    navigate('/dashboard');
  };

  return {
    isModalOpen, setIsModalOpen,
    isModalOpen1, setIsModalOpen1,
    isDoneOpen, setIsDoneOpen,
    isLoggedIn,
    isConnected,
    isWaitingForIde,
    handleSwitchToSignUp,
    handleSwitchToLogin, 
    handleSignUpComplete,
    handleLoginSuccess
  };
}