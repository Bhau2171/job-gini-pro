import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { interviewAPI } from '../../utils/auth';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    loadQuizQuestions();
  }, []);

  const loadQuizQuestions = async () => {
    setLoading(true);
    try {
      const response = await interviewAPI.getQuestions(user?.domain, 'Beginner');
      // Take first 5 questions for the quiz
      const quizQuestions = response.questions.slice(0, 5).map(q => ({
        ...q,
        options: generateOptions(q)
      }));
      setQuestions(quizQuestions);
    } catch (error) {
      console.error('Error loading quiz questions:', error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const generateOptions = (question) => {
    // In a real app, you'd have predefined options or generate them
    const baseOptions = [
      'Yes, absolutely',
      'No, not at all', 
      'It depends on the context',
      'Only in specific cases',
      'The opposite is true'
    ];
    
    return baseOptions.slice(0, 4).map((option, index) => ({
      id: index,
      text: option,
      isCorrect: index === 0 // First option is correct for demo
    }));
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const handleAnswerSelect = (answerId) => {
    if (answered) return;
    
    setSelectedAnswer(answerId);
    setAnswered(true);

    const currentQ = questions[currentQuestion];
    if (answerId === 0) { // First option is correct for demo
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    startQuiz();
  };

  if (loading) {
    return <LoadingSpinner text="Loading quiz questions..." />;
  }

  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="quiz-intro"
      >
        <div className="quiz-card">
          <h2>Quick Knowledge Check</h2>
          <div className="quiz-info">
            <div className="info-item">
              <strong>{questions.length}</strong>
              <span>Questions</span>
            </div>
            <div className="info-item">
              <strong>Beginner</strong>
              <span>Level</span>
            </div>
            <div className="info-item">
              <strong>{user?.domain}</strong>
              <span>Domain</span>
            </div>
          </div>
          <p className="quiz-description">
            Test your knowledge with quick multiple-choice questions. 
            This quiz covers fundamental concepts in your domain.
          </p>
          <button onClick={startQuiz} className="btn-primary start-quiz-btn">
            Start Quiz
          </button>
        </div>
      </motion.div>
    );
  }

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    let message = '';
    let icon = '';

    if (percentage >= 80) {
      message = 'Excellent! You have strong fundamental knowledge.';
      icon = '🎉';
    } else if (percentage >= 60) {
      message = 'Good job! You have a solid understanding.';
      icon = '👍';
    } else {
      message = 'Keep practicing! Review the concepts and try again.';
      icon = '💪';
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="quiz-result"
      >
        <div className="result-card">
          <div className="result-icon">
            <Trophy className="w-12 h-12" />
          </div>
          <h2>Quiz Completed! {icon}</h2>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-percent">{percentage}%</span>
              <span className="score-text">Score</span>
            </div>
            <div className="score-details">
              <p><strong>{score}</strong> out of <strong>{questions.length}</strong> correct</p>
              <p className="result-message">{message}</p>
            </div>
          </div>
          <button onClick={restartQuiz} className="btn-primary">
            <RotateCcw className="w-4 h-4" />
            Take Quiz Again
          </button>
        </div>
      </motion.div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="quiz-component"
    >
      <div className="quiz-card">
        <div className="quiz-header">
          <h2>Knowledge Check</h2>
          <div className="quiz-progress">
            Question {currentQuestion + 1} of {questions.length}
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="quiz-content">
          <h3 className="question-text">{currentQ?.question}</h3>
          
          <div className="options-grid">
            {currentQ?.options.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: answered ? 1 : 1.02 }}
                whileTap={{ scale: answered ? 1 : 0.98 }}
                className={`option-button ${
                  selectedAnswer === option.id ? 'selected' : ''
                } ${
                  answered ? (option.isCorrect ? 'correct' : 'incorrect') : ''
                }`}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={answered}
              >
                <span className="option-text">{option.text}</span>
                {answered && option.isCorrect && (
                  <CheckCircle className="option-icon correct" />
                )}
                {answered && selectedAnswer === option.id && !option.isCorrect && (
                  <XCircle className="option-icon incorrect" />
                )}
              </motion.button>
            ))}
          </div>

          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="answer-feedback"
            >
              <p>
                {selectedAnswer === 0 ? (
                  <span className="correct-feedback">Correct! Well done.</span>
                ) : (
                  <span className="incorrect-feedback">Good attempt! The first option is correct for this demonstration.</span>
                )}
              </p>
            </motion.div>
          )}

          <div className="quiz-actions">
            <button 
              onClick={handleNext}
              disabled={!answered}
              className="btn-primary next-button"
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizComponent;