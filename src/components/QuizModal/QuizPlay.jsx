import { mockQuizList } from "../../mocks/quizData"; 
import QuizQuestion from "./QuizQuestion";
import { useQuizLogic } from "./useQuizLogic";

function QuizPlay({ difficulty = "medium", onClose }) { 
  const difficultyMapping = {
    easy: { label: "쉬움", style: "bg-green500-10 border-green500-20" },
    medium: { label: "보통", style: "bg-yellow400-10 border-yellow400-20" },
    hard: { label: "어려움", style: "bg-red500-10 border-red500-20" },
  };
  const currentDifficulty = difficultyMapping[difficulty] || difficultyMapping.medium;

  const {
    currentQuestionIndex,
    currentQuizData,
    isAnswerSelected,
    isAnswerChecked,
    isCorrect,
    selectedAnswer,
    handleOptionClick,
    handleMainButtonClick,
    handlePrevClick
  } = useQuizLogic({ quizList: mockQuizList, onClose });

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
        <QuizQuestion 
          currentQuizData={currentQuizData}
          currentQuestionIndex={currentQuestionIndex}
          totalLength={mockQuizList.length}
          isAnswerChecked={isAnswerChecked}
          selectedAnswer={selectedAnswer}
          isCorrect={isCorrect}
          onOptionClick={handleOptionClick}
        />
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
          className="flex justify-center items-center w-[5.4167vw] h-full bg-purple400 text-gray700 font-bold text-[1.4815vh] rounded-[1.04vw] cursor-pointer"
        >
          {!isAnswerChecked 
            ? "정답 확인" 
            : (currentQuestionIndex === mockQuizList.length - 1 ? "나가기" : "다음")
          }
        </button>
      </div>
    </div>
  );
}

export default QuizPlay;