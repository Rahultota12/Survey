import React from 'react';
import './WelcomeScreen.css'
const WelcomeScreen = ({ startSurvey }) => {
  return (
    <div className="welcome-screen">
      <h1>Welcome to Our Customer Survey</h1>
      <button onClick={startSurvey}  className="red">Start Survey</button>
    </div>
  );
};

export default WelcomeScreen;
