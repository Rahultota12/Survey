
import React, { useState } from 'react';
import Question from './Question';

const Survey = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const sessionId = Date.now().toString();

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    localStorage.setItem(sessionId, JSON.stringify({ ...answers, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(answers, sessionId);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <Question
      question={questions[currentQuestionIndex]}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrevious={handlePrevious}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={questions.length}
    />
  );
};

export default Survey;
