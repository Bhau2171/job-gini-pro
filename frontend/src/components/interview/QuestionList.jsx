import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import { interviewAPI } from '../../utils/auth';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    difficulty: 'All Levels',
    category: 'All Categories'
  });

  const { user } = useAuth();

  useEffect(() => {
    loadQuestions();
  }, [user?.domain]);

  useEffect(() => {
    filterQuestions();
  }, [questions, searchTerm, filters]);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const response = await interviewAPI.getQuestions(user?.domain);
      setQuestions(response.questions || []);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.questions.map(q => q.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading questions:', error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const filterQuestions = () => {
    let filtered = questions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(q =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer_guide.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply difficulty filter
    if (filters.difficulty !== 'All Levels') {
      filtered = filtered.filter(q => q.difficulty_level === filters.difficulty);
    }

    // Apply category filter
    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(q => q.category === filters.category);
    }

    setFilteredQuestions(filtered);
  };

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const getQuestionsByCategory = (category) => {
    return filteredQuestions.filter(q => q.category === category);
  };

  const getUniqueCategories = () => {
    return [...new Set(filteredQuestions.map(q => q.category))];
  };

  if (loading) {
    return <LoadingSpinner text="Loading interview questions..." />;
  }

  return (
    <div className="question-list">
      <div className="questions-header">
        <h2>Interview Questions</h2>
        <p>Practice questions for {user?.domain} domain</p>
      </div>

      {/* Search and Filters */}
      <div className="questions-controls">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <Filter className="filter-icon" />
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
              className="filter-select"
            >
              <option value="All Levels">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="filter-select"
            >
              <option value="All Categories">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="categories-list">
        {getUniqueCategories().map((category, index) => {
          const categoryQuestions = getQuestionsByCategory(category);
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="category-card"
            >
              <div 
                className="category-header"
                onClick={() => toggleCategory(category)}
              >
                <div className="category-info">
                  <h3>{category}</h3>
                  <span className="questions-count">
                    {categoryQuestions.length} question{categoryQuestions.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="expand-icon">
                  {expandedCategory === category ? 
                    <ChevronUp className="w-5 h-5" /> : 
                    <ChevronDown className="w-5 h-5" />
                  }
                </div>
              </div>

              <AnimatePresence>
                {expandedCategory === category && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="questions-container"
                  >
                    {categoryQuestions.map((question, qIndex) => (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: qIndex * 0.1 }}
                        className="question-item"
                      >
                        <div className="question-header">
                          <h4>{question.question}</h4>
                          <span className={`difficulty-badge ${question.difficulty_level.toLowerCase()}`}>
                            {question.difficulty_level}
                          </span>
                        </div>
                        {question.answer_guide && (
                          <div className="answer-guide">
                            <strong>Answer Guide:</strong>
                            <p>{question.answer_guide}</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="no-questions">
          <p>No questions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default QuestionList;