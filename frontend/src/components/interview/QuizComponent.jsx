import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const QuizComponent = ({ domain }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Mock quiz questions
  const quizQuestions = [
    {
      question: "What is the main advantage of using React?",
      options: [
        "It's a programming language",
        "Component-based architecture and virtual DOM",
        "It doesn't require JavaScript",
        "It's only for backend development"
      ],
      correctAnswer: 1
    },
    {
      question: "Which hook is used for side effects in React?",
      options: [
        "useState",
        "useEffect", 
        "useContext",
        "useReducer"
      ],
      correctAnswer: 1
    },
    {
      question: "What is JSX?",
      options: [
        "A JavaScript framework",
        "A syntax extension for JavaScript",
        "A CSS preprocessor",
        "A database query language"
      ],
      correctAnswer: 1
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="quiz-result"
      >
        <h2>Quiz Completed!</h2>
        <div className="score-display">
          <h3>Your Score: {score} / {quizQuestions.length}</h3>
          <p>
            {score === quizQuestions.length ? 'Perfect! 🎉' : 
             score >= quizQuestions.length / 2 ? 'Good job! 👍' : 
             'Keep practicing! 💪'}
          </p>
        </div>
        <button onClick={restartQuiz} className="btn-primary">
          Take Quiz Again
        </button>
      </motion.div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="quiz-component"
    >
      <div className="quiz-header">
        <h2>Quick Quiz</h2>
        <div className="quiz-progress">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </div>
      </div>

      <div className="quiz-content">
        <h3 className="question-text">{currentQ.question}</h3>
        
        <div className="options-grid">
          {currentQ.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`option-button ${selectedAnswer === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(index)}
            >
              {option}
            </motion.button>
          ))}
        </div>

        <div className="quiz-actions">
          <button 
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="btn-primary"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizComponent;