import { useState } from "react";

function QuizPlay({ difficulty = "보통" }) {
  const [quizData, setQuizData] = useState({
    title: "문제 1.",
    question:
      "다음은 중복 요소를 확인하는 코드입니다. $O(N^2)$의 시간 복잡도를 $O(N)$으로 개선하려고 합니다. 빈칸 [ A ]와 [ B ]에 들어갈 적절한 코드는 무엇인가요?",
    codeSnippet: `// AS-IS: $O(N^2)$\nconst hasDuplicate = (arr) => {\n  return arr.some((item, index) => arr.indexOf(item) !== index);\n};\n\n// TO-BE: $O(N)$\nconst optimizedHasDuplicate = (arr) => {\n  const seen = new [  A  ]();\n  return arr.some(item => {\n    if (seen.[  B  ](item)) return true;\n    seen.add(item);\n    return false;\n  });\n};`,
    options: [
      "1. A: Set, B: has",
      "2. A: Array, B: find",
      "3. A: Map, B: includes",
      "4. A: Set, B: Contails",
    ],
  });

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex flex-col w-full h-full">
        {/* 헤더 영역 */}
        <div className="flex items-center w-full h-[2.6852vh] mb-[2.7778vh] gap-[2vw]">
          <div className="text-[2.5926vh] font-bold text-white">
            실시간 맞춤 퀴즈
          </div>
          <div className="flex justify-center items-center w-[4.7917vw] h-[2.6852vh] bg-yellow400-10 border-[0.09vh] border-yellow400-20 text-gray200 rounded-[1.04vw] text-[1.4vh]">
            {difficulty}
          </div>
        </div>

        {/* 문제 텍스트 영역 */}
        <div className="flex flex-col w-full mb-[2vh] overflow-y-auto">
          <div className="mb-[1.1111vh] text-[2.2222vh] font-bold text-gray400">
            {quizData.title}
          </div>
          <div className="mb-[2.7778vh] text-[2.2222vh] text-gray400 leading-relaxed">
            {quizData.question}
          </div>

          {/* 코드 블록 영역 */}
          {quizData.codeSnippet && (
            <div className="w-full bg-gray900 rounded-[1.04vw] p-[2vh] mb-[2.7778vh]">
              <div className="text-gray400 text-[1vh] mb-[1vh] font-bold">
                JavaScript
              </div>
              <pre className="text-gray200 text-[1.2vh] font-mono whitespace-pre-wrap leading-relaxed">
                <code>{quizData.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* 객관식 선택지 영역 */}
          <div className="grid grid-cols-4 gap-[1vw] mb-[2vh]">
            {quizData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(index)}
                className={`flex justify-center items-center min-w-[1vw] h-[2.7vh] px-[0.9375vw] text-[1.4815vh] rounded-[1.04vw] cursor-pointer transition-colors ${
                  selectedOption === index
                    ? "bg-purple500-10 text-purple400 border-purple500-20" 
                    : "bg-white-3 border-[0.09vh] border-white-5" 
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex justify-end w-full h-[3.0556vh] gap-[1.0417vw] mt-auto">
        <button className="flex justify-center items-center w-[5.4167vw] h-full bg-gray800-50 border-[0.09vh] border-gray500 text-gray400 text-[1.4815vh] rounded-[1.04vw] cursor-pointer">
          이전
        </button>
        <button
          className="flex justify-center items-center w-[5.4167vw] h-full bg-purple400 text-gray700 font-bold text-[1.4815vh] rounded-[1.04vw] cursor-pointer"
          disabled={selectedOption === null} 
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default QuizPlay;
