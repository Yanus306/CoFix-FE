import { useState, useEffect } from "react";
import { authFetch } from "../api/client"; // 실제 경로에 맞게 수정

export function useAiChat() {
  const [sessions, setSessions] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  // 방 목록 불러오기
  const fetchSessions = async () => {
    try {
      const response = await authFetch(`/chat`);
      if (response.ok) {
        const data = await response.json();
        const formattedSessions = data.map((item) => ({
          id: item.id,
          title: item.title,
          date: new Date(item.createdAt)
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/-/g, "."),
        }));
        setSessions(formattedSessions);
      }
    } catch (error) {
      console.error("채팅 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setCurrentMessages([]);
  };

  // 특정 방 클릭 시 이전 메시지 불러오기
  const handleSessionClick = async (sessionId) => {
    setCurrentSessionId(sessionId);
    try {
      const response = await authFetch(`/chat/${sessionId}/message`);
      if (response.ok) {
        const data = await response.json();
        const formattedMessages = data.messages.map((msg, index) => ({
          id: index,
          role: msg.user === 0 ? "user" : "ai",
          message: msg.content,
        }));
        setCurrentMessages(formattedMessages);
      }
    } catch (error) {
      console.error("메시지 내역 불러오기 실패:", error);
    }
  };

  // 새 채팅방 생성 콜백
  const handleCreateNewSession = (newSessionId) => {
    setCurrentSessionId(newSessionId);
    fetchSessions();
  };

  // 채팅 이름 변경
  const handleRenameSession = async (id, newTitle) => {
    try {
      const response = await authFetch(`/chat/${id}/name`, {
        method: "PUT",
        body: JSON.stringify({ name: newTitle }),
      });

      if (response.ok) {
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session.id === id ? { ...session, title: newTitle } : session,
          ),
        );
      } else {
        console.error("이름 변경 처리에 실패했습니다.");
      }
    } catch (error) {
      console.error("이름 변경 API 통신 오류:", error);
    }
  };

  // 채팅방 삭제
  const handleDeleteSession = async (id) => {
    try {
      const response = await authFetch(`/chat/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSessions((prevSessions) =>
          prevSessions.filter((session) => session.id !== id),
        );
        if (id === currentSessionId) handleNewChat();
      }
    } catch (error) {
      console.error("채팅방 삭제 실패:", error);
    }
  };

  return {
    sessions,
    currentMessages,
    currentSessionId,
    handleNewChat,
    handleSessionClick,
    handleCreateNewSession,
    handleRenameSession,
    handleDeleteSession,
  };
}