import { useState } from "react";
import Pagination from "../Pagination";

export default function AiChatList({ sessions, onNewChat, onSessionClick }) {
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
          {currentSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => onSessionClick(session.id)}
              className="flex flex-col w-full h-[8.70vh] justify-center items-start px-[1.20vw] gap-[0.56vh] border-[0.09vh] border-white-5 rounded-[1.04vw] cursor-pointer hover:bg-white-5"
            >
              <div className="text-gray400 text-[1.85vh]">{session.title}</div>
              <div className="text-gray700 text-[1.11vh]">{session.date}</div>
            </div>
          ))}
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