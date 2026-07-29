import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useAiChatDetail(sessionId, initialMessages, isNewChat, onCreateSession) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const handleSendMessage = async (textareaRef) => {
    if (!inputValue.trim() || isAiTyping) return;

    const userText = inputValue;
    setInputValue("");
    
    // textarea 높이 초기화
    if (textareaRef?.current) textareaRef.current.style.height = "auto";

    // 유저 메시지 먼저 띄우기
    const newUserMessage = { id: Date.now(), role: "user", message: userText };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsAiTyping(true);

    try {
      let activeSessionId = sessionId;

      // 새 채팅인 경우 방 먼저 생성
      if (isNewChat) {
        const createRes = await fetch(`${BASE_URL}/chat`, {
          method: "POST",
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!createRes.ok) throw new Error("방 생성 실패");

        const createData = await createRes.json();
        activeSessionId = createData.roomId;
      }

      // 메시지 전송
      const msgRes = await fetch(`${BASE_URL}/chat/${activeSessionId}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!msgRes.ok) throw new Error("메시지 전송 실패");

      const msgData = await msgRes.json();
      console.log("📡 백엔드 메시지 응답 데이터:", msgData);

      // 백엔드가 실제로 주는 데이터 구조(aiChatResponse)에 맞춰 파싱합니다.
      if (msgData.aiChatResponse) {
        const newAiMessage = {
          id: Date.now(), // 고유 ID 부여
          role: msgData.aiChatResponse.user === 0 ? "user" : "ai",
          message: msgData.aiChatResponse.content,
        };
        
        // 기존 대화 기록(prev)을 유지한 상태에서 새 AI 메시지를 맨 뒤에 추가합니다.
        setMessages((prev) => [...prev, newAiMessage]);
      }

      if (isNewChat && onCreateSession) {
        onCreateSession(activeSessionId);
      }
    } catch (error) {
      console.error("AI 통신 오류:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "ai",
          message: "서버 응답에 실패했습니다. 다시 시도해 주세요.",
        },
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isAiTyping,
    handleSendMessage,
  };
}