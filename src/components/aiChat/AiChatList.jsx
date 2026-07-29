import { useState, useRef, useEffect } from "react";
import Pagination from "../Pagination";

export default function AiChatList({
  sessions,
  currentSessionId,
  onNewChat,
  onSessionClick,
  onRenameSession,
  onDeleteSession,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef(null);

  const itemsPerPage = 7;
  const totalDataCount = sessions.length;

  const getValidTime = (dateInput) => {
    if (!dateInput) return Date.now();

    let parsedDate;
    if (Array.isArray(dateInput)) {
      parsedDate = new Date(dateInput[0], dateInput[1] - 1, dateInput[2], dateInput[3] || 0, dateInput[4] || 0);
    } else {
      parsedDate = new Date(dateInput);
    }

    if (isNaN(parsedDate.getTime())) {
      return Date.now(); 
    }
    return parsedDate.getTime();
  };

  // 날짜 변환 함수
  const formatDate = (dateInput) => {
    const date = new Date(getValidTime(dateInput));
    
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`; 
  };

  // 최신순 정렬
  const sortedSessions = sessions
    // 배열의 원래 순서 기억
    .map((session, index) => ({ ...session, _originalIndex: index })) 
    .sort((a, b) => {
      const timeA = getValidTime(a.updatedAt || a.date);
      const timeB = getValidTime(b.updatedAt || b.date);

      if (timeB === timeA) {
        return b._originalIndex - a._originalIndex;
      }
      
      return timeB - timeA; 
    });

  // 정렬된 배열 기준으로 페이지네이션 자르기
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSessions = sortedSessions.slice(startIndex, startIndex + itemsPerPage);

  const handleMenuClick = (e, id) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEditStart = (e, session) => {
    e.stopPropagation();
    setEditingId(session.id);
    setEditValue(session.title || "");
    setOpenMenuId(null);
  };

  const handleEditSubmit = () => {
    if (editValue.trim() !== "" && onRenameSession) {
      onRenameSession(editingId, editValue);
    }
    setEditingId(null);
  };

  // 수정 모드 진입 시 input에 자동 포커스
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (onDeleteSession) {
      onDeleteSession(id);
    }
    setOpenMenuId(null);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex flex-col w-full h-[75.37vh]">
        <div className="flex justify-between items-center w-full h-[2.69vh] mb-[2.6vh]">
          <div className="text-[2.22vh] font-bold text-white">이전 채팅 세션</div>
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
            const isEditing = session.id === editingId;

            return (
              <div
                key={session.id}
                onClick={() => !isEditing && onSessionClick(session.id)}
                className={`flex flex-col w-full h-[8.70vh] justify-center items-start px-[1.20vw] gap-[0.56vh] border-[0.09vh] border-white-5 rounded-[1.04vw] cursor-pointer transition-colors
                  ${isActive ? "bg-white-5" : "hover:bg-white-5"}
                `}
              >
                <div className="flex w-full justify-between items-center">
                  <div className=" text-gray400 text-[1.11vh]">
                    {formatDate(session.updatedAt || session.date)}
                  </div>

                  <div className="relative">
                    <div
                      onClick={(e) => handleMenuClick(e, session.id)}
                      className="text-gray400 hover:text-white cursor-pointer transition-colors p-[0.5vh]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-[1.5vh] h-[1.5vh] mr-[-0.5vw]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                      </svg>
                    </div>

                    {openMenuId === session.id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-0 right-[-7vw] z-50 flex flex-col justify-between w-[6vw] h-[9vh] px-[1vw] py-[1.4vh] mt-[1vh] bg-gray700 rounded-[1.04vw] rounded-tl-none overflow-hidden"
                      >
                        <button
                          onClick={(e) => handleEditStart(e, session)}
                          className="w-full px-[0.5vw] py-[0.4vh] text-left text-[1.28vh] text-gray400 hover:bg-white-5 transition-colors cursor-pointer"
                        >
                          이름 변경
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, session.id)}
                          className="w-full px-[0.5vw] py-[0.4vh] text-left text-[1.28vh] text-red400 hover:bg-white-5 transition-colors cursor-pointer"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full truncate text-gray400 text-[1.85vh]">
                  {isEditing ? (
                    <input
                      ref={inputRef}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => {
                        if (editValue.trim() !== "" && onRenameSession) {
                          onRenameSession(session.id, editValue);
                        }
                        setEditingId(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (e.nativeEvent.isComposing) return;
                          if (editValue.trim() !== "" && onRenameSession) {
                            onRenameSession(session.id, editValue);
                          }
                          setEditingId(null);
                        } else if (e.key === "Escape") {
                          setEditingId(null);
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full bg-transparent outline-none border-b border-gray400 text-white"
                    />
                  ) : (
                    session.title || "새로운 채팅" 
                  )}
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