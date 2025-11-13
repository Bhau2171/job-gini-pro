import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, TrendingUp, BarChart3, Palette, Calculator } from 'lucide-react';

const DomainSelector = ({ domains, selectedDomain, onDomainChange }) => {
  const domainIcons = {
    'AI': <Brain className="w-5 h-5" />,
    'Web Development': <Code className="w-5 h-5" />,
    'Data Science': <BarChart3 className="w-5 h-5" />,
    'Marketing': <TrendingUp className="w-5 h-5" />,
    'Design': <Palette className="w-5 h-5" />,
    'Finance': <Calculator className="w-5 h-5" />
  };

  const getDomainIcon = (domain) => {
    return domainIcons[domain] || <Code className="w-5 h-5" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="domain-selector"
    >
      <h3 className="selector-title">Select Your Domain</h3>
      <div className="domains-grid">
        {domains.map((domain) => (
          <motion.button
            key={domain}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`domain-card ${selectedDomain === domain ? 'selected' : ''}`}
            onClick={() => onDomainChange(domain)}
          >
            <div className="domain-icon">
              {getDomainIcon(domain)}
            </div>
            <span className="domain-name">{domain}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default DomainSelector;