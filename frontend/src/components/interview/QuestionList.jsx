import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const QuestionList = ({ categories }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Mock questions data - in real app, fetch from API
  const questionsData = {
    'Technical-Beginner': [
      {
        id: 1,
        question: "What is the difference between let, const, and var in JavaScript?",
        answer: "var is function-scoped and can be redeclared, let is block-scoped and can be reassigned, const is block-scoped but cannot be reassigned."
      },
      {
        id: 2,
        question: "Explain the concept of closures in JavaScript.",
        answer: "Closures are functions that have access to variables in their outer scope even after the outer function has returned."
      }
    ],
    'Technical-Intermediate': [
      {
        id: 3,
        question: "How does React's virtual DOM work?",
        answer: "The virtual DOM is a lightweight copy of the actual DOM. React uses it to perform diffing and update only the necessary parts of the real DOM."
      }
    ]
  };

  const toggleCategory = (categoryKey) => {
    setExpandedCategory(expandedCategory === categoryKey ? null : categoryKey);
  };

  return (
    <div className="question-list">
      <h2>Practice Questions</h2>
      <p className="section-description">
        Practice with domain-specific interview questions. Click on a category to expand.
      </p>

      <div className="categories-list">
        {categories.map((category, index) => {
          const categoryKey = `${category.category}-${category.difficulty_level}`;
          const questions = questionsData[categoryKey] || [];

          return (
            <motion.div
              key={categoryKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="category-card"
            >
              <div 
                className="category-header"
                onClick={() => toggleCategory(categoryKey)}
              >
                <div className="category-info">
                  <h3>{category.category}</h3>
                  <span className="difficulty-badge">{category.difficulty_level}</span>
                  <span className="questions-count">{questions.length} questions</span>
                </div>
                <div className="expand-icon">
                  {expandedCategory === categoryKey ? 
                    <ChevronUp className="w-5 h-5" /> : 
                    <ChevronDown className="w-5 h-5" />
                  }
                </div>
              </div>

              <AnimatePresence>
                {expandedCategory === categoryKey && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="questions-container"
                  >
                    {questions.map((q, qIndex) => (
                      <motion.div
                        key={q.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: qIndex * 0.1 }}
                        className="question-item"
                      >
                        <h4>Q: {q.question}</h4>
                        <div className="answer">
                          <strong>A:</strong> {q.answer}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionList;