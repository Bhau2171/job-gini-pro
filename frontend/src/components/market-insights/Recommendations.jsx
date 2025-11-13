import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, BookOpen, Target, TrendingUp } from 'lucide-react';

const Recommendations = ({ recommendations }) => {
  const recommendationIcons = [
    <BookOpen className="w-5 h-5" />,
    <Target className="w-5 h-5" />,
    <TrendingUp className="w-5 h-5" />,
    <CheckCircle className="w-5 h-5" />
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="recommendations"
    >
      <div className="recommendations-header">
        <h3>Personalized Recommendations</h3>
        <p>Based on current market trends and your selected domain</p>
      </div>
      
      <div className="recommendations-grid">
        {recommendations.map((recommendation, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="recommendation-card"
          >
            <div className="recommendation-icon">
              {recommendationIcons[index] || <CheckCircle className="w-5 h-5" />}
            </div>
            <p>{recommendation}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Recommendations;