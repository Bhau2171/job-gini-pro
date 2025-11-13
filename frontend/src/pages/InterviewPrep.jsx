import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QuestionList from '../components/interview/QuestionList';
import QuizComponent from '../components/interview/QuizComponent';
import MockTest from '../components/interview/MockTest';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const InterviewPrep = () => {
  const [activeTab, setActiveTab] = useState('questions');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // In a real app, you would fetch categories from the API
    const mockCategories = [
      { domain: user?.domain || 'AI', category: 'Technical', difficulty_level: 'Beginner' },
      { domain: user?.domain || 'AI', category: 'Technical', difficulty_level: 'Intermediate' },
      { domain: user?.domain || 'AI', category: 'Behavioral', difficulty_level: 'All Levels' },
      { domain: user?.domain || 'AI', category: 'System Design', difficulty_level: 'Advanced' }
    ];
    setCategories(mockCategories);
    setLoading(false);
  }, [user]);

  const tabs = [
    { id: 'questions', label: 'Practice Questions' },
    { id: 'quiz', label: 'Quick Quiz' },
    { id: 'mocktest', label: 'Mock Test' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading interview resources..." />
      </div>
    );
  }

  return (
    <div className="interview-prep">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <h1>Interview Preparation</h1>
          <p>Practice and prepare for your next job interview</p>
          <div className="user-domain-badge">
            Focused on: <strong>{user?.domain || 'General'}</strong> domain
          </div>
        </motion.div>

        <div className="prep-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`prep-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="prep-content">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'questions' && (
              <QuestionList categories={categories} />
            )}
            {activeTab === 'quiz' && (
              <QuizComponent domain={user?.domain} />
            )}
            {activeTab === 'mocktest' && (
              <MockTest domain={user?.domain} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;