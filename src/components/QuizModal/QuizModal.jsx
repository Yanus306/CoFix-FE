function QuizModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 cursor-pointer"
        style={{
          backgroundColor: "var(--color-background)",
          opacity: 0.8,
        }}
        onClick={onClose}
      ></div>

      <div className="relative z-10 w-[61.5625vw] h-[69.537vh] bg-background border-[0.09vh] border-gray500 rounded-[1.04vw]">
          모달 test
          <button
            onClick={onClose}
            className="block mt-[2vh] px-[1vw] py-[1vh] bg-gray500 text-white rounded"
          >
            닫기
          </button>
      </div>
    </div>
  );
}

export default QuizModal;
