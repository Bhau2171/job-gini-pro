import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, Pause, Square, AlertCircle } from 'lucide-react';

const MockTest = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  // Mock test questions
  const testQuestions = [
    {
      id: 1,
      question: "Explain the concept of component lifecycle in React and how hooks have changed the way we manage lifecycle events.",
      type: "essay",
      points: 10,
      timeEstimate: 5 // minutes
    },
    {
      id: 2,
      question: "Describe the difference between let, const, and var in JavaScript. Provide examples of when to use each.",
      type: "essay", 
      points: 8,
      timeEstimate: 4
    },
    {
      id: 3,
      question: "What are the key principles of RESTful API design? Explain each principle with examples.",
      type: "essay",
      points: 12,
      timeEstimate: 6
    },
    {
      id: 4,
      question: "How does the virtual DOM work in React and what performance benefits does it provide?",
      type: "essay",
      points: 10,
      timeEstimate: 5
    },
    {
      id: 5,
      question: "Explain the concept of closures in JavaScript and provide a practical use case.",
      type: "essay",
      points: 8,
      timeEstimate: 4
    }
  ];

  // Timer effect
  useEffect(() => {
    if (testStarted && !isPaused && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            clearInterval(timer);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [testStarted, isPaused, timeRemaining]);

  // Show warning when time is running low
  useEffect(() => {
    if (timeRemaining === 300) { // 5 minutes remaining
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
    }
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTest = () => {
    setTestStarted(true);
    setIsPaused(false);
    setTimeRemaining(1800);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const pauseTest = () => {
    setIsPaused(!isPaused);
  };

  const endTest = () => {
    setTestStarted(false);
    setTimeRemaining(1800);
    setIsPaused(false);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const handleNext = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateProgress = () => {
    const answered = Object.keys(answers).length;
    return (answered / testQuestions.length) * 100;
  };

  if (!testStarted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mock-test-intro"
      >
        <div className="test-intro-card">
          <h2>Mock Technical Interview</h2>
          <div className="test-info-grid">
            <div className="info-card">
              <Clock className="w-8 h-8" />
              <h3>30 Minutes</h3>
              <p>Complete the test within the time limit</p>
            </div>
            <div className="info-card">
              <h3>5 Questions</h3>
              <p>Comprehensive technical assessment</p>
            </div>
            <div className="info-card">
              <h3>Essay Format</h3>
              <p>Detailed written responses required</p>
            </div>
            <div className="info-card">
              <h3>50 Points Total</h3>
              <p>Weighted based on question complexity</p>
            </div>
          </div>

          <div className="test-instructions">
            <h3>Instructions:</h3>
            <ul>
              <li>You have 30 minutes to complete all 5 questions</li>
              <li>Write detailed, comprehensive answers</li>
              <li>Think aloud and explain your reasoning clearly</li>
              <li>You can pause the test if needed</li>
              <li>Navigate between questions using the question grid</li>
              <li>Submit your answers before time runs out</li>
            </ul>
          </div>

          <div className="scoring-info">
            <h3>Scoring Criteria:</h3>
            <div className="criteria-list">
              <span>Technical Accuracy</span>
              <span>Depth of Explanation</span>
              <span>Code Quality (if applicable)</span>
              <span>Problem-Solving Approach</span>
            </div>
          </div>

          <button onClick={startTest} className="btn-primary start-test-btn">
            <Play className="w-4 h-4" />
            Start Mock Test
          </button>
        </div>
      </motion.div>
    );
  }

  const currentQ = testQuestions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mock-test-active"
    >
      {/* Header */}
      <div className="test-header">
        <div className="timer-section">
          <div className="timer">
            <Clock className="w-5 h-5" />
            <span className={timeRemaining <= 300 ? 'time-warning' : ''}>
              {formatTime(timeRemaining)}
            </span>
          </div>
          <div className="progress-indicator">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <span>{Object.keys(answers).length}/{testQuestions.length} answered</span>
          </div>
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

      {/* Main Content */}
      <div className="test-content">
        <div className="questions-grid">
          {testQuestions.map((q, index) => (
            <button
              key={q.id}
              className={`question-indicator ${
                currentQuestion === index ? 'active' : ''
              } ${answers[q.id] ? 'answered' : ''}`}
              onClick={() => goToQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="question-section">
          <div className="question-header">
            <h3>Question {currentQuestion + 1} of {testQuestions.length}</h3>
            <div className="question-meta">
              <span className="points">{currentQ.points} points</span>
              <span className="time-estimate">~{currentQ.timeEstimate} min</span>
            </div>
          </div>
          
          <div className="question-content">
            <p>{currentQ.question}</p>
          </div>
          
          <div className="answer-section">
            <textarea
              placeholder="Type your detailed answer here... Explain your reasoning, provide examples, and demonstrate your understanding."
              value={answers[currentQ.id] || ''}
              onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
              rows={12}
              disabled={isPaused}
            />
            <div className="answer-stats">
              <span>
                {answers[currentQ.id]?.length || 0} characters
                {answers[currentQ.id] && ` • ~${Math.ceil((answers[currentQ.id].length || 0) / 50)} minutes reading`}
              </span>
            </div>
          </div>
        </div>

        <div className="test-navigation">
          <button 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="btn-secondary"
          >
            Previous Question
          </button>
          <button 
            onClick={handleNext}
            disabled={currentQuestion === testQuestions.length - 1}
            className="btn-primary"
          >
            Next Question
          </button>
        </div>
      </div>

      {/* Time Warning Modal */}
      {showWarning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="time-warning-modal"
        >
          <AlertCircle className="warning-icon" />
          <h4>5 Minutes Remaining!</h4>
          <p>Please review and submit your answers soon.</p>
        </motion.div>
      )}

      {/* Time Up Modal */}
      {timeRemaining === 0 && (
        <div className="time-up-overlay">
          <div className="time-up-modal">
            <h3>Time's Up! ⏰</h3>
            <p>The test has ended automatically. Your answers have been saved.</p>
            <div className="test-summary">
              <p>You answered {Object.keys(answers).length} out of {testQuestions.length} questions.</p>
            </div>
            <button onClick={endTest} className="btn-primary">
              Review Results
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MockTest;