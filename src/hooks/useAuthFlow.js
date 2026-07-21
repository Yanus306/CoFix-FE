import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuthFlow() {
  const [isModalOpen, setIsModalOpen] = useState(false);   
  const [isModalOpen1, setIsModalOpen1] = useState(false); 
  const [isDoneOpen, setIsDoneOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  
  const [isConnected, setIsConnected] = useState(false);
  const [isWaitingForIde, setIsWaitingForIde] = useState(false);

  const navigate = useNavigate(); 

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
    setIsConnected(false);  
    setIsWaitingForIde(true); 

    // Mock API
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

  // 컴포넌트에서 쓸 상태와 함수들을 객체로 반환
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