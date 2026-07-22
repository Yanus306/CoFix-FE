import React from "react";
import Logo from "../../assets/logo.png";
import ReactMarkdown from "react-markdown";

export default function ChatBubble({ role, message }) {
  const isUser = role === "user";

  // 전달받은 message가 문자열인지, React 컴포넌트(JSX)인지 확인
  const isString = typeof message === "string";
  const isReactElement = React.isValidElement(message);

  return (
    <div
      className={`flex items-start w-full mb-[2.5vh] ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <img
          src={Logo}
          alt="AI"
          className="shrink-0 w-[4.5vh] h-[4.5vh] mr-[0.8vw] rounded-full"
        />
      )}

      <div
        className={`max-w-[80%] px-[1.5vw] py-[1.8vh] text-[1.85vh] text-gray200 leading-relaxed 
        ${
          isUser
            ? "bg-purple500-30 rounded-[1.04vw] rounded-br-none"
            : "bg-gray800-50 border-[0.09vh] border-white-5 rounded-[1.04vw] rounded-tl-none"
        }`}
      >
        {/* 문자열이면 마크다운으로, React 컴포넌트면 그대로 출력 */}
        {isString ? (
          <div className="prose prose-invert max-w-none whitespace-pre-wrap break-words text-gray200">
            <ReactMarkdown>{message}</ReactMarkdown>
          </div>
        ) : isReactElement ? (
          message // 로딩 아이콘 등 JSX 요소 그대로 렌더링
        ) : (
          "" // 만약 알 수 없는 값이 들어오면 빈칸 처리 (에러 방지)
        )}
      </div>
    </div>
  );
}
