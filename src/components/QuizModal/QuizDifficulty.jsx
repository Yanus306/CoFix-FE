function QuizDifficulty({ onNext }) {
  const difficultyLevels = [
    { value: "easy", label: "쉬움" },
    { value: "medium", label: "보통" },
    { value: "hard", label: "어려움" },
  ];

  const btnStyle = "w-[7.8646vw] h-[4.3519vh] border-[0.09vh] text-[1.8519vh] text-gray200 bg-white-3 border-white-5 rounded-[1.04vw] hover:bg-gray700 transition-colors";

  return (
    <div className="flex flex-col justify-center items-center h-full gap-[2.5vh]">
      <div className="flex flex-col items-center gap-[1.2vh]">
        <div className="text-[3.7037vh] text-white font-bold">
          실시간 맞춤 퀴즈
        </div>
        <div className="text-[2.9630vh] text-gray400">
          난이도를 선택하여 취약점과 관련된 문제를 풀어보세요.
        </div>
      </div>

      <div className="flex gap-[2.5926vh]">
        {difficultyLevels.map((level) => (
          <button
            key={level.value} 
            onClick={() => onNext(level.value)}
            className={btnStyle}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizDifficulty;