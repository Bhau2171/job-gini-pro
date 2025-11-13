import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, TrendingUp, FileText, Users, Brain } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Market Insights',
      description: 'Get real-time data on job markets, skill demand, and industry trends.'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Resume Builder',
      description: 'Create professional resumes and cover letters with easy-to-use templates.'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Interview Prep',
      description: 'Practice with domain-specific questions and mock interviews.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Career Guidance',
      description: 'Personalized recommendations based on your skills and interests.'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1 className="hero-title">
              Shape Your 
              <span className="gradient-text"> Career Path</span>
            </h1>
            <p className="hero-description">
              Get personalized career guidance, market insights, and professional tools 
              to accelerate your career growth in the digital age.
            </p>
            <div className="hero-actions">
              {user ? (
                <Link to="/dashboard" className="btn-primary">
                  Go to Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link to="/register" className="btn-primary">
                  Start Your Journey <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <Link to="/market-insights" className="btn-secondary">
                Explore Insights
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Everything You Need to Succeed</h2>
            <p>Comprehensive tools and insights for your career development</p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="feature-card"
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;