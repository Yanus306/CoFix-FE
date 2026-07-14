import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function QuizQuestion({
  currentQuizData,
  currentQuestionIndex,
  totalLength,
  isAnswerChecked,
  selectedAnswer,
  isCorrect,
  onOptionClick,
}) {
  return (
    <div className="flex flex-col w-full mb-[2vh] overflow-y-auto pr-[2vw]">
      <div className="mb-[1.1111vh] text-[2.2222vh] font-bold text-gray400">
        {currentQuizData.title}
        <span className="text-[1.5vh] ml-[0.8vw] font-normal text-gray-500">
          ({currentQuestionIndex + 1} / {totalLength})
        </span>
      </div>
      <div className="mb-[2.7778vh] text-[2.2222vh] text-gray400 leading-relaxed">
        {currentQuizData.question}
      </div>

      {currentQuizData.codeSnippet && (
        <div className="w-full bg-gray900 rounded-[1.04vw] p-[2vh] mb-[2.7778vh]">
          <div className="text-gray400 text-[1vh] mb-[1vh] font-bold uppercase">
            {currentQuizData.language || "CODE"}
          </div>
          
          <SyntaxHighlighter 
            language={currentQuizData.language || "javascript"} 
            style={vscDarkPlus}
            customStyle={{
              background: 'transparent', 
              padding: 0,
              margin: 0,
              fontSize: '1.2vh',
            }}
            codeTagProps={{
              className: 'font-mono leading-relaxed'
            }}
          >
            {currentQuizData.codeSnippet}
          </SyntaxHighlighter>
        </div>
      )}

      {/* 객관식 선택지 영역 */}
      <div className="flex justify-between mx-[2vw] mb-[2vh]">
        {currentQuizData.options.map((option, index) => {
          let optionStyle = "bg-white-3 border-white-5 text-gray-300";

          if (isAnswerChecked) {
            if (index === currentQuizData.answerIndex) {
              optionStyle = "bg-green500-10 border-green500-20 text-green400";
            } else if (selectedAnswer === index) {
              optionStyle = "bg-red500-10 border-red500-20 text-red400";
            }
          } else {
            if (selectedAnswer === index) {
              optionStyle =
                "bg-purple500-10 text-purple400 border-purple500-20";
            }
          }

          return (
            <button
              key={index}
              onClick={() => onOptionClick(index)}
              className={`flex justify-center items-center min-w-[1vw] h-[2.7vh] px-[1.2vw] text-[1.4815vh] rounded-[1.04vw] transition-colors border-[0.09vh] ${optionStyle} ${isAnswerChecked ? "cursor-default" : "cursor-pointer"}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* 해설 영역 */}
      {isAnswerChecked && (
        <div
          className={`mt-[1vh] mx-[2vw] text-[1.4815vh] leading-relaxed ${isCorrect ? "text-green400" : "text-red400"}`}
        >
          <span className="font-bold mr-[0.5vw]">해설:</span>
          {currentQuizData.explanation}
        </div>
      )}
    </div>
  );
}

export default QuizQuestion;