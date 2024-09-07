import React, { useState } from 'react';
import './Question.css'
const Question = ({ question, onAnswer, onNext, onPrevious, currentQuestionIndex, totalQuestions }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(''); 

  const handleNext = () => {
    if (question.type === 'rating' && (answer < 1 || answer > question.max)) {
      setError(`Please provide a rating between 1 and ${question.max}`);
      return;
    }
    onAnswer(question.id, answer);
    setAnswer('');
    setError('');
  
    onNext();
  };

 
  const renderPaginationDots = () => {
    return Array.from({ length: totalQuestions }).map((_, index) => (
      <span
        key={index}
        className={`dot ${index === currentQuestionIndex ? 'active' : ''}`}
        onClick={() => index !== currentQuestionIndex && handleDirectNavigation(index)}
      >
        {index === currentQuestionIndex ? currentQuestionIndex + 1 : ''}
      </span>
    ));
  };

  
  const handleDirectNavigation = (index) => {
    onAnswer(question.id, answer); 
    setAnswer('');
    setError(''); 
   
    const steps = index - currentQuestionIndex;
    steps > 0 ? onNext() : onPrevious(); 
  };

  return (
    <div className="question">
      <h2>Question {currentQuestionIndex + 1} of {totalQuestions}</h2>
      <p>{question.text}</p>
      {question.type === 'rating' ? (
        <input
          type="number"
          min="1"
          max={question.max}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      ) : (
        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
      )}
      {error && <div className="error">{error}</div>}
      <div className="navigation-buttons">
        <button onClick={onPrevious} disabled={currentQuestionIndex === 0}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <div className="pagination-dots">
        {renderPaginationDots()}
      </div>
    </div>
  );
};

export default Question;
