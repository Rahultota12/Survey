import React, { useEffect } from 'react';

const ThankYouScreen = ({ restartSurvey }) => {
  useEffect(() => {
    const timer = setTimeout(restartSurvey, 5000);
    return () => clearTimeout(timer);
  }, [restartSurvey]);

  return (
    <div className="thank-you-screen">
      <h1>Thank you for your feedback!</h1>
    </div>
  );
};

export default ThankYouScreen;
