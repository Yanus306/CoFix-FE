import { useState } from "react";

export function useQuizLogic({ quizList, onClose }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedStatus, setCheckedStatus] = useState({});

  const currentQuizData = quizList[currentQuestionIndex];
  
  const isAnswerSelected = selectedAnswers[currentQuestionIndex] !== undefined;
  const isAnswerChecked = checkedStatus[currentQuestionIndex] === true;
  
  const isCorrect = selectedAnswers[currentQuestionIndex] === currentQuizData.answerIndex;

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

    if (currentQuestionIndex < quizList.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      if (onClose) {
        onClose();
      }
    }
  };

  const handlePrevClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return {
    currentQuestionIndex,
    currentQuizData,
    isAnswerSelected,
    isAnswerChecked,
    isCorrect,
    selectedAnswer: selectedAnswers[currentQuestionIndex],
    handleOptionClick,
    handleMainButtonClick,
    handlePrevClick
  };
}