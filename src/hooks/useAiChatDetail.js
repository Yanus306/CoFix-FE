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
      const formattedMessages = msgData.messages.map((msg, index) => ({
        id: index,
        role: msg.user === 0 ? "user" : "ai",
        message: msg.content,
      }));
      setMessages(formattedMessages);

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