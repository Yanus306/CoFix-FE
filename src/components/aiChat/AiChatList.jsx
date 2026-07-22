import { useState } from "react";
import Pagination from "../Pagination";

export default function AiChatList({
  sessions,
  currentSessionId,
  onNewChat,
  onSessionClick,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;
  const totalDataCount = sessions.length;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSessions = sessions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex flex-col w-full h-[75.37vh]">
        <div className="flex justify-between items-center w-full h-[2.69vh] mb-[2.6vh]">
          <div className="text-[2.22vh] font-bold text-white">
            이전 채팅 세션
          </div>
          <div
            onClick={onNewChat}
            className="flex justify-center items-center w-[4.17vw] h-[2.22vh] gap-[0.78vw] text-[1.11vh] text-gray400 bg-gray800-50 border-[0.09vh] border-white-5 rounded-[0.74vh] cursor-pointer"
          >
            <p> 새 채팅</p>
            <p> +</p>
          </div>
        </div>

        <div className="flex flex-col w-full h-full gap-[1.4vh]">
          {currentSessions.map((session) => {
            const isActive = session.id === currentSessionId;

            return (
              <div
                key={session.id}
                onClick={() => onSessionClick(session.id)}
                className={`flex flex-col w-full h-[8.70vh] justify-center items-start px-[1.20vw] gap-[0.56vh] border-[0.09vh] border-white-5 rounded-[1.04vw] cursor-pointer transition-colors
                  ${isActive ? "bg-white-5" : "hover:bg-white-5"}
                `}
              >
                <div className="flex w-full justify-between items-center">
                  <div className=" text-gray400 text-[1.11vh]">
                    {session.date}
                  </div>
                  <div className="text-gray400 hover:text-white cursor-pointer transition-colors p-[0.5vh]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-[1.5vh] h-[1.5vh] mr-[-0.5vw]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-gray400 text-[1.85vh]">
                  {session.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={totalDataCount}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
