import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Survey from './components/Survey';
import ThankYouScreen from './components/ThankYouScreen';
import "./App.css";

const App = () => {
  const [stage, setStage] = useState('welcome');

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
      {stage === 'survey' && <Survey onComplete={completeSurvey} />}
      {stage === 'thankyou' && <ThankYouScreen restartSurvey={restartSurvey} />}
    </div>
  );
};

export default App;
