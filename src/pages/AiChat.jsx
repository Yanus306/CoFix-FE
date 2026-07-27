import { useState } from 'react';
import ListDetailLayout from '../layouts/ListDetailLayout';
import AiChatList from '../components/aiChat/AiChatList';
import AiChatDetail from '../components/aiChat/AiChatDetail';
import { chatSessions as initialSessions } from '../mocks/chatData';

export default function AiChat() {
  const [sessions, setSessions] = useState(initialSessions);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null); // 현재 어떤 방에 있는지 추적

  const handleNewChat = () => {
    setCurrentSessionId(null); // 방 ID를 null로 만들어서 새 채팅 상태임을 알림
    setCurrentMessages([]);
  };

  const handleSessionClick = (sessionId) => {
    setCurrentSessionId(sessionId);
    const selectedSession = sessions.find((session) => session.id === sessionId);
    setCurrentMessages(selectedSession?.messages || []);
  };

  const handleCreateNewSession = (newTitle, newMessages) => {
    const newSessionId = Date.now();
    const newSession = {
      id: newSessionId,
      title: newTitle,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '.'),
      messages: newMessages,
    };

    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newSessionId);
  };

  // 채팅 이름 변경
  const handleRenameSession = (id, newTitle) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === id ? { ...session, title: newTitle } : session
      )
    );
  };

  // 채팅 삭제
  const handleDeleteSession = (id) => {
    setSessions((prevSessions) => prevSessions.filter((session) => session.id !== id));

    // 화면을 새 채팅 상태로 초기화
    if (id === currentSessionId) {
      handleNewChat();
    }
  };

  return (
    <ListDetailLayout
      leftContent={
        <AiChatList
          sessions={sessions}
          currentSessionId={currentSessionId}
          onNewChat={handleNewChat}
          onSessionClick={handleSessionClick}
          onRenameSession={handleRenameSession}
          onDeleteSession={handleDeleteSession}
        />
      }
      rightContent={
        <AiChatDetail
          sessionId={currentSessionId}
          initialMessages={currentMessages}
          isNewChat={currentSessionId === null}
          onCreateSession={handleCreateNewSession}
        />
      }
    />
  );
}