import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuthFlow() {
  const navigate = useNavigate(); 

  // 💡 새로고침 시 localStorage에 token이 있으면 곧바로 true로 초기화
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

  const handleSignUpComplete = () => {
    setIsModalOpen1(false);   
    
    // 회원가입 성공 시 자동 로그인이 진행
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
    handleSignUpComplete,
    handleLoginSuccess
  };
}