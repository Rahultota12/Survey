import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Survey from './components/Survey';
import ThankYouScreen from './components/ThankYouScreen';
import "./App.css"
const App = () => {
  const [stage, setStage] = useState('welcome');

  const questions = [
    { id: 'q1', text: 'How satisfied are you with our products?', type: 'rating', max: 5 },
    { id: 'q2', text: 'How fair are the prices compared to similar retailers?', type: 'rating', max: 5 },
    { id: 'q3', text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', max: 5 },
    { id: 'q4', text: 'On a scale of 1-10 how would you recommend us to your friends and family?', type: 'rating', max: 10 },
    { id: 'q5', text: 'What could we do to improve our service?', type: 'text' },
  ];

  const startSurvey = () => {
    setStage('survey');
  };

  const completeSurvey = (answers, sessionId) => {
    localStorage.setItem(`${sessionId}_completed`, true);
    setStage('thankyou');
  };

  const restartSurvey = () => {
    setStage('welcome');
  };

  return (
    <div className="App">
      {stage === 'welcome' && <WelcomeScreen startSurvey={startSurvey} />}
      {stage === 'survey' && <Survey questions={questions} onComplete={completeSurvey} />}
      {stage === 'thankyou' && <ThankYouScreen restartSurvey={restartSurvey} />}
    </div>
  );
};

export default App;
