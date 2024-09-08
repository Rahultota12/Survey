import React, { useState } from 'react';
import Question from './Question';
import '../Survey.css';

const Survey = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: 'How satisfied are you with our products?', type: 'rating', max: 5 },
    { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', max: 5 },
    { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', max: 5 },
    { id: 4, text: 'On a scale of 1-10 how would you recommend us to your friends and family?', type: 'rating', max: 10 },
    { id: 5, text: 'What could we do to improve our service?', type: 'text' },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [newQuestion, setNewQuestion] = useState({ text: '', type: 'rating', max: 5 });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.text.trim() === '') {
      alert('Question text cannot be empty');
      return;
    }

    const newId = questions.length + 1;
    setQuestions([...questions, { ...newQuestion, id: newId }]);
    setNewQuestion({ text: '', type: 'rating', max: 5 });
    setShowAddForm(false);
  };

  const handleDeleteQuestion = () => {
    const input = prompt('Enter the question number you want to delete:');
    const questionNumber = parseInt(input, 10);

    if (isNaN(questionNumber) || questionNumber < 1 || questionNumber > questions.length) {
      alert('Invalid question number.');
      return;
    }

    const updatedQuestions = questions.filter((_, index) => index !== questionNumber - 1);
    setQuestions(updatedQuestions);

    if (currentQuestionIndex >= updatedQuestions.length && updatedQuestions.length > 0) {
      setCurrentQuestionIndex(updatedQuestions.length - 1);
    } else if (updatedQuestions.length === 0) {
      setCurrentQuestionIndex(0);
    }
  };

  return (
    <div className="survey">
      {currentQuestionIndex < questions.length ? (
        <Question
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}  
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
      ) : (
        <div>Thank you for completing the survey!</div>
      )}

      <button className="show-add-form-button" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Close Add Question Form' : 'Add Question'}
      </button>

      {showAddForm && (
        <div className="add-question-form">
          <h3>Add a New Question</h3>
          <input
            type="text"
            placeholder="Question Text"
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
          />
          <select
            value={newQuestion.type}
            onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
          >
            <option value="rating">Rating</option>
            <option value="text">Text</option>
          </select>
          {newQuestion.type === 'rating' && (
            <input
              type="number"
              placeholder="Max Rating"
              min="1"
              max="10"
              value={newQuestion.max}
              onChange={(e) => setNewQuestion({ ...newQuestion, max: parseInt(e.target.value, 10) })}
            />
          )}
          <button className="add-button" onClick={handleAddQuestion}>Add Question</button>
        </div>
      )}

      <button className="delete-button" onClick={handleDeleteQuestion}>Delete Question</button>
    </div>
  );
};

export default Survey;
