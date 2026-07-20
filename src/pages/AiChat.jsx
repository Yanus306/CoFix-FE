import { useState } from 'react';
import ListDetailLayout from '../layouts/ListDetailLayout';
import AiChatList from '../components/aiChat/AiChatList';
import AiChatDetail from '../components/aiChat/AiChatDetail'; 
import { chatSessions } from '../mocks/chatData'; 

export default function AiChat() {
  const [currentMessages, setCurrentMessages] = useState([]);

  // 새 채팅 실행 함수
  const handleNewChat = () => {
    setCurrentMessages([]); 
  };

  // 과거 대화 목록 실행 함수
  const handleSessionClick = (sessionId) => {
    const selectedSession = chatSessions.find((session) => session.id === sessionId);
    
    if (selectedSession && selectedSession.messages) {
      setCurrentMessages(selectedSession.messages);
    } else {
      setCurrentMessages([]);
    }
  };

  return (
    <ListDetailLayout 
      leftContent={
        <AiChatList 
          onNewChat={handleNewChat} 
          onSessionClick={handleSessionClick} 
        />
      } 
      rightContent={
        <AiChatDetail initialMessages={currentMessages} />
      } 
    />
  );
}