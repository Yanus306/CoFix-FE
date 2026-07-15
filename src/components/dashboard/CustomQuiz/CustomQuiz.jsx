import { useState } from "react";
import QuizModal from "../../QuizModal/QuizModal";

function CustomQuiz() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="panel-base justify-center w-[37.86vw] h-[23.24vh] gap-[1.94vh]">
        <div className="panel-title">실시간 맞춤 퀴즈</div>
        <div className="flex flex-col items-center gap-[0.46vh] text-[1.67vh]">
          <p>감지된 취약점과 관련된 최적화 퀴즈가 준비되었습니다.</p>
          <p>실시간 피드백으로 보안 역량을 강화하세요.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex justify-center items-center w-[7.86vw] h-[4.35vh] bg-purple500 text-[1.85vh] rounded-[1.04vw] font-bold text-gray200 cursor-pointer hover:bg-purple400 hover:text-gray700"
        >
          퀴즈 풀기
        </button>
      </div>

      <QuizModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default CustomQuiz;
