import { useEffect } from "react";
import Spinner from "./Spinner"

function QuizLoading({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col justify-center items-center h-full gap-[1vh]">
      <div className="flex flex-col items-center gap-[1.2vh]">
        <div className="text-[3.7037vh] text-white font-bold">
          실시간 맞춤 퀴즈 생성 중
        </div>
        <div className="text-[2.9630vh] text-gray400">
          잠시만 기다려 주세요.
        </div>
      </div>

      <div className="flex">
        <Spinner />
      </div>
    </div>
  );
}

export default QuizLoading;
