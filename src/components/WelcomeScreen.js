import React from 'react';

const WelcomeScreen = ({ startSurvey }) => {
  return (
    <div className="welcome-screen">
      <h1>Welcome to Our Customer Survey</h1>
      <button onClick={startSurvey}>Start Survey</button>
    </div>
  );
};

export default WelcomeScreen;
