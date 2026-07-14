import { useState } from "react";
import { mockQuizList } from "../../mocks/quizData"; 

function QuizPlay({ difficulty = "medium" }) { 
  const difficultyMapping = {
    easy: { label: "쉬움", style: "bg-green500-10 border-green500-20" },
    medium: { label: "보통", style: "bg-yellow500-10 border-yellow500-20" },
    hard: { label: "어려움", style: "bg-red500-10 border-red500-20" },
  };
  const currentDifficulty = difficultyMapping[difficulty] || difficultyMapping.medium;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  
  const [checkedStatus, setCheckedStatus] = useState({});

  const currentQuizData = mockQuizList[currentQuestionIndex];
  
  const isAnswerSelected = selectedAnswers[currentQuestionIndex] !== undefined;
  const isAnswerChecked = checkedStatus[currentQuestionIndex] === true;

  const handleOptionClick = (index) => {
    if (isAnswerChecked) return; 

    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: index
    }));
  };

  const handleMainButtonClick = () => {
    if (!isAnswerChecked) {
      setCheckedStatus(prev => ({
        ...prev,
        [currentQuestionIndex]: true
      }));
      return;
    }

    if (currentQuestionIndex < mockQuizList.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      alert("마지막 문제입니다! 채점 화면으로 이동(구현 필요)");
    }
  };

  const handlePrevClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex flex-col w-full h-[57vh]">
        {/* 헤더 영역 */}
        <div className="flex items-center w-full h-[2.6852vh] mb-[1.5vh] gap-[2vw]">
          <div className="text-[2.5926vh] font-bold text-white">실시간 맞춤 퀴즈</div>
          <div className={`flex justify-center items-center w-[4.7917vw] h-[2.6852vh] border-[0.09vh] rounded-[1.04vw] text-[1.4vh] text-gray200 ${currentDifficulty.style}`}>
            {currentDifficulty.label}
          </div>
        </div>

        {/* 문제 텍스트 및 코드 영역 */}
        <div className="flex flex-col w-full mb-[2vh] overflow-y-auto pr-[2vw]">
          <div className="mb-[1.1111vh] text-[2.2222vh] font-bold text-gray400">
            {currentQuizData.title} 
            <span className="text-[1.5vh] ml-2 font-normal text-gray-500">
              ({currentQuestionIndex + 1} / {mockQuizList.length})
            </span>
          </div>
          <div className="mb-[2.7778vh] text-[2.2222vh] text-gray400 leading-relaxed">
            {currentQuizData.question}
          </div>

          {currentQuizData.codeSnippet && (
            <div className="w-full bg-gray900 rounded-[1.04vw] p-[2vh] mb-[2.7778vh]">
              <div className="text-gray400 text-[1vh] mb-[1vh] font-bold">JavaScript</div>
              <pre className="text-gray200 text-[1.2vh] font-mono whitespace-pre-wrap leading-relaxed">
                <code>{currentQuizData.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* 객관식 선택지 영역 */}
          <div className="flex justify-between mx-[2vw]">
            {currentQuizData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={`flex justify-center items-center min-w-[1vw] h-[2.7vh] px-[1.2vw] text-[1.4815vh] rounded-[1.04vw] transition-colors ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? "bg-purple500-10 text-purple400 border-purple500-20"
                    : "bg-white-3 border-[0.09vh] border-white-5"
                } ${isAnswerChecked ? "cursor-default" : "cursor-pointer"}`} // 확인 후에는 커서 변경
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex justify-end w-full h-[3.2vh] gap-[1.0417vw]">
        {currentQuestionIndex > 0 ? (
          <button 
            onClick={handlePrevClick}
            className="flex justify-center items-center w-[5.4167vw] h-full bg-gray800-50 border-[0.09vh] border-gray500 text-gray400 text-[1.4815vh] rounded-[1.04vw] cursor-pointer hover:bg-gray-700 transition-colors"
          >
            이전
          </button>
        ) : (
          <div></div> 
        )}
        
        <button
          onClick={handleMainButtonClick}
          disabled={!isAnswerSelected} 
          className="flex justify-center items-center w-[5.4167vw] h-full bg-purple400 text-gray700 font-bold text-[1.4815vh] rounded-[1.04vw] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!isAnswerChecked 
            ? "정답 확인" 
            : (currentQuestionIndex === mockQuizList.length - 1 ? "제출" : "다음")
          }
        </button>
      </div>
    </div>
  );
}

export default QuizPlay;