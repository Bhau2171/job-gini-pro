import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, FileText, Brain, User } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Market Insights',
      description: 'Explore industry trends',
      link: '/market-insights',
      color: 'bg-blue-500'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Resume Builder',
      description: 'Create your resume',
      link: '/resume-builder',
      color: 'bg-green-500'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Interview Prep',
      description: 'Practice questions',
      link: '/interview-prep',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="dashboard">
      <div className="container">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="welcome-section"
        >
          <h1 className="welcome-title">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="welcome-subtitle">
            Ready to take the next step in your career journey?
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="quick-actions-section"
        >
          <h2 className="section-title">Quick Actions</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="quick-action-card"
              >
                <div className={`action-icon ${action.color}`}>
                  {action.icon}
                </div>
                <div className="action-content">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="recent-activity-section"
        >
          <h2 className="section-title">Your Progress</h2>
          <div className="progress-cards">
            <div className="progress-card">
              <User className="w-8 h-8 text-blue-500" />
              <div>
                <h3>Profile Completion</h3>
                <p>Update your profile for better recommendations</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;