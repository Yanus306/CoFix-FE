import { useRef } from "react";
import SendIcon from "./SendIcon";
import ChatBubble from "./ChatBubble"

const mockChatHistory = [
  { id: 1, role: "user", message: "메모리 누수 분석하는 방법 알려줘." },
  {
    id: 2,
    role: "ai",
    message:
      "메모리 누수를 분석하기 위해서는 먼저 프로파일링 도구를 사용해야 합니다.\n\nChrome DevTools의 Memory 탭에서 Heap Snapshot을 찍어 객체들의 참조 상태를 확인해 보세요.",
  },
  {
    id: 3,
    role: "user",
    message: "그럼 React에서 useEffect 메모리 누수는 보통 어떻게 잡아?",
  },
  {
    id: 4,
    role: "ai",
    message:
      "React의 `useEffect`에서 발생하는 메모리 누수는 주로 이벤트 리스너를 해제하지 않거나, 비동기 작업(타이머, API 요청 등)이 완료되기 전에 컴포넌트가 언마운트될 때 발생합니다.\n\n해결하려면 반드시 클린업(cleanup) 함수를 반환해야 합니다.",
  },
  {
    id: 4,
    role: "user",
    message:
      "React의 `useEffect`에서 발생하는 메모리 누수는 주로 이벤트 리스너를 해제하지 않거나, 비동기 작업(타이머, API 요청 등)이 완료되기 전에 컴포넌트가 언마운트될 때 발생합니다.\n\n해결하려면 반드시 클린업(cleanup) 함수를 반환해야 합니다.",
  },
  {
    id: 4,
    role: "ai",
    message:
      "React의 `useEffect`에서 발생하는 메모리 누수는 주로 이벤트 리스너를 해제하지 않거나, 비동기 작업(타이머, API 요청 등)이 완료되기 전에 컴포넌트가 언마운트될 때 발생합니다.\n\n해결하려면 반드시 클린업(cleanup) 함수를 반환해야 합니다.",
  },
];

export default function AiChatDetail() {
  const textareaRef = useRef(null);

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  return (
    <div className="flex flex-col w-full h-full px-[2.29vw]">
      <div className="flex flex-col w-full">
        <div className="panel-title mb-[1.2vh]">CoFix AI 챗봇</div>
        <div className="w-full h-[0.09vh] mb-[2.22vh] bg-gray400" />
      </div>

        <div className="flex flex-col w-full h-full overflow-y-auto pr-[1vw]">
          {mockChatHistory.map((chat) => (
            <ChatBubble key={chat.id} role={chat.role} message={chat.message} />
          ))}
        </div>

      {/* 입력창 */}
      <div className="flex w-full shrink-0 min-h-[7.13vh] mt-[1.5vh] bg-gray800-50 rounded-[1.04vw]">
        <textarea
          ref={textareaRef}
          onChange={handleResizeHeight}
          rows={1}
          className="w-full min-h-[7.13vh] max-h-[20vh] overflow-y-auto pl-[2vw] py-[1.8vh] bg-transparent text-gray400 text-[2.22vh] resize-none outline-none leading-normal"
          placeholder="메시지를 입력하세요..."
        />
        <button className="flex justify-center items-end w-[6vw] pb-[2.2vh] bg-transparent text-gray400 hover:text-purple400 transition-colors">
          <SendIcon className="w-[3.5vh] h-[3.5vh] text-purple400 rotate-320 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
