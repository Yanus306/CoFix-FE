import { useState } from "react";
import QuizDifficulty from "./QuizDifficulty";
import QuizLoading from "./QuizLoading";
import QuizPlay from "./QuizPlay";

function QuizModal({ isOpen, onClose }) {
  const [step, setStep] = useState('difficulty');
  const [difficulty, setDifficulty] = useState(null); 

  if (!isOpen) return null;

  const handleNextStep = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setStep('loading');
  };

  const handleCloseAndReset = () => {
    setStep('difficulty'); 
    setDifficulty(null);  
    onClose();   
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0" style={{ backgroundColor: "var(--color-background)", opacity: 0.8 }}></div>

      <div className="relative z-10 w-[61.5625vw] h-[69.537vh] p-[1.0417vw] bg-background border-[0.09vh] border-gray500 rounded-[1.04vw]">
        <div className="flex justify-end items-end w-full mb-[0.3704vh]">
          <button
            onClick={handleCloseAndReset}
            className="flex justify-center items-center w-[3.0556vh] h-[3.0556vh] bg-background border-[0.09vh] border-gray500 text-gray500 rounded-[0.9259vh] cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-[1.6vh] h-[1.6vh]">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="w-[55.6771vw] h-[60.2778vh] mx-auto">
          {step === 'difficulty' && (
            <QuizDifficulty onNext={handleNextStep} />
          )}
          
          {step === 'loading' && (
            <QuizLoading 
              difficulty={difficulty} 
              onComplete={() => setStep('play')} 
            />
          )}
          
          {step === 'play' && (
            <QuizPlay difficulty={difficulty} />
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizModal;