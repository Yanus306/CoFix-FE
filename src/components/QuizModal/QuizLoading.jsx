import { useEffect } from "react";

function QuizLoading({ difficulty, onComplete }) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]); 

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-[2vh] font-bold">
        {difficulty === 'hard' ? '어려운' : difficulty === 'medium' ? '보통' : '쉬운'} 
        난이도 퀴즈를 생성 중입니다...
      </h2>
      <p className="mt-4">잠시만 기다려주세요.</p>
    </div>
  );
}

export default QuizLoading;