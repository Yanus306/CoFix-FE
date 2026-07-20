import { useRef } from "react";
import SendIcon from "../icons/SendIcon";

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

      <div className="flex w-full justify-between h-full">
        <div className="flex justify-between w-[48.07vw] h-full">
          <div className="flex flex-col w-full bg-red-100">내용</div>
        </div>

        <div className=" bg-amber-100">스크롤바</div>
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