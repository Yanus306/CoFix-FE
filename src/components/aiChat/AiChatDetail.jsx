import { useRef, useEffect } from "react";
import SendIcon from "./SendIcon";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import SlideFadeIn from "../../shared/SlideFadeIn";
import { useAiChatDetail } from "../../hooks/useAiChatDetail";

export default function AiChatDetail({
  sessionId,
  initialMessages = [],
  isNewChat,
  onCreateSession,
}) {
  const {
    messages,
    inputValue,
    setInputValue,
    isAiTyping,
    handleSendMessage,
  } = useAiChatDetail(sessionId, initialMessages, isNewChat, onCreateSession);

  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  // 자동 스크롤 로직
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAiTyping]);

  // textarea 높이 조절 로직
  const handleResizeHeight = (e) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(textareaRef); 
    }
  };

  return (
    <div className="flex flex-col w-full h-full px-[2.29vw] shrink-0">
      <div className="flex flex-col w-full shrink-0">
        <div className="panel-title mb-[1.2vh]">CoFix AI 챗봇</div>
        <div className="w-full h-[0.09vh] mb-[2.22vh] bg-gray400" />
      </div>

      <div className="flex-1 w-full overflow-y-auto">
        <SlideFadeIn animationKey={sessionId === null ? "new-chat" : "active-chat"}>
          <div className="flex flex-col w-full">
            {messages.map((chat) => (
              <ChatBubble key={chat.id} role={chat.role} message={chat.message} />
            ))}

            {isAiTyping && <ChatBubble role="ai" message={<TypingIndicator />} />}

            <div ref={messagesEndRef} />
          </div>
        </SlideFadeIn>
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
          onClick={() => handleSendMessage(textareaRef)} 
          className="flex justify-center items-end w-[6vw] pb-[2.2vh] bg-transparent text-gray400 hover:text-purple400 transition-colors"
        >
          <SendIcon className="w-[3.5vh] h-[3.5vh] text-purple400 rotate-320 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}