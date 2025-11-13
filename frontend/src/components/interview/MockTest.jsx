import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, Pause, Square } from 'lucide-react';

const MockTest = ({ domain }) => {
  const [testStarted, setTestStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);

  // Timer effect
  React.useEffect(() => {
    if (testStarted && !isPaused && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [testStarted, isPaused, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTest = () => {
    setTestStarted(true);
    setIsPaused(false);
  };

  const pauseTest = () => {
    setIsPaused(!isPaused);
  };

  const endTest = () => {
    setTestStarted(false);
    setTimeRemaining(1800);
    setIsPaused(false);
  };

  if (!testStarted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mock-test-intro"
      >
        <h2>Mock Interview Test</h2>
        <div className="test-info">
          <div className="info-card">
            <Clock className="w-8 h-8" />
            <h3>30 Minutes</h3>
            <p>Complete the test within the time limit</p>
          </div>
          <div className="info-card">
            <h3>5 Questions</h3>
            <p>Mix of technical and behavioral questions</p>
          </div>
          <div className="info-card">
            <h3>Domain Specific</h3>
            <p>Questions tailored for {domain} roles</p>
          </div>
        </div>

        <div className="test-instructions">
          <h3>Instructions:</h3>
          <ul>
            <li>You have 30 minutes to complete the test</li>
            <li>Answer all questions to the best of your ability</li>
            <li>Think aloud and explain your reasoning</li>
            <li>You can pause the test if needed</li>
          </ul>
        </div>

        <button onClick={startTest} className="btn-primary start-test-btn">
          <Play className="w-4 h-4" />
          Start Mock Test
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mock-test-active"
    >
      <div className="test-header">
        <div className="timer">
          <Clock className="w-5 h-5" />
          <span className={timeRemaining <= 300 ? 'time-warning' : ''}>
            {formatTime(timeRemaining)}
          </span>
        </div>
        
        <div className="test-controls">
          <button onClick={pauseTest} className="btn-secondary">
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button onClick={endTest} className="btn-secondary">
            <Square className="w-4 h-4" />
            End Test
          </button>
        </div>
      </div>

      <div className="test-content">
        <div className="question-section">
          <h3>Question 1 of 5</h3>
          <p>Explain the concept of component lifecycle in React and how hooks have changed the way we manage lifecycle events.</p>
          
          <div className="answer-section">
            <textarea
              placeholder="Type your answer here... Think about: mounting, updating, unmounting phases, and how useEffect replaces lifecycle methods."
              rows={8}
            />
          </div>
        </div>

        <div className="test-navigation">
          <button className="btn-secondary">Previous Question</button>
          <button className="btn-primary">Next Question</button>
        </div>
      </div>

      {timeRemaining === 0 && (
        <div className="time-up-modal">
          <h3>Time's Up!</h3>
          <p>The test has ended automatically.</p>
          <button onClick={endTest} className="btn-primary">
            View Results
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default MockTest;