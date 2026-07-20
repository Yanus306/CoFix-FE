import { useState, useRef, useEffect } from "react";
import SendIcon from "./SendIcon";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";

export default function AiChatDetail({ initialMessages = [] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false); 

  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null); 

  // 리스트 항목 클릭 시 화면 전환 
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAiTyping]);

  const handleResizeHeight = (e) => {
    setInputValue(e.target.value); 
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isAiTyping) return; 

    const newUserMessage = {
      id: Date.now(),
      role: "user",
      message: inputValue,
    };
    setMessages((prev) => [...prev, newUserMessage]);

    setInputValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; 
    }

    setIsAiTyping(true);

    setTimeout(() => {
      const newAiMessage = {
        id: Date.now() + 1,
        role: "ai",
        message: "백엔드에서 받아온 가짜 목업 데이터 응답입니다! 나중에는 이 부분을 실제 API 응답 값으로 교체하시면 됩니다.",
      };
      setMessages((prev) => [...prev, newAiMessage]);
      setIsAiTyping(false);
    }, 4000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full h-full px-[2.29vw]">
      <div className="flex flex-col w-full shrink-0">
        <div className="panel-title mb-[1.2vh]">CoFix AI 챗봇</div>
        <div className="w-full h-[0.09vh] mb-[2.22vh] bg-gray400" />
      </div>

      <div className="flex flex-col w-full h-full overflow-y-auto pr-[1vw]">
        {messages.map((chat) => (
          <ChatBubble key={chat.id} role={chat.role} message={chat.message} />
        ))}

        {isAiTyping && (
          <ChatBubble role="ai" message={<TypingIndicator />} />
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="flex w-full shrink-0 min-h-[7.13vh] mt-[1.5vh] mb-[2vh] bg-gray800-50 rounded-[1.04vw]">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleResizeHeight}
          onKeyDown={handleKeyDown}
          rows={1}
          className="w-full min-h-[7.13vh] max-h-[20vh] overflow-y-auto pl-[2vw] py-[1.8vh] bg-transparent text-gray400 text-[2.22vh] resize-none outline-none leading-normal"
          placeholder="메시지를 입력하세요..."
        />
        <button
          onClick={handleSendMessage}
          className="flex justify-center items-end w-[6vw] pb-[2.2vh] bg-transparent text-gray400 hover:text-purple400 transition-colors"
        >
          <SendIcon className="w-[3.5vh] h-[3.5vh] text-purple400 rotate-320 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}