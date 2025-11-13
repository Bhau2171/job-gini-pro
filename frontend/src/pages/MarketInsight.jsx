import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DomainSelector from '../components/market-insights/DomainSelector';
import MarketCharts from '../components/market-insights/MarketCharts';
import Recommendations from '../components/market-insights/Recommendations';
import { marketInsightsAPI } from '../utils/auth';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const MarketInsights = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [insights, setInsights] = useState(null);
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDomains();
  }, []);

  useEffect(() => {
    if (selectedDomain) {
      loadInsights(selectedDomain);
    }
  }, [selectedDomain]);

  const loadDomains = async () => {
    try {
      const domainsList = await marketInsightsAPI.getDomains();
      setDomains(domainsList);
      if (domainsList.length > 0) {
        setSelectedDomain(domainsList[0]);
      }
    } catch (error) {
      console.error('Error loading domains:', error);
    }
  };

  const loadInsights = async (domain) => {
    setLoading(true);
    try {
      const insightsData = await marketInsightsAPI.getInsights(domain);
      setInsights(insightsData);
    } catch (error) {
      console.error('Error loading insights:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="market-insights">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <h1>Market Insights</h1>
          <p>Explore real-time data and trends for your career domain</p>
        </motion.div>

        <DomainSelector
          domains={domains}
          selectedDomain={selectedDomain}
          onDomainChange={setSelectedDomain}
        />

        {loading ? (
          <LoadingSpinner />
        ) : insights ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <MarketCharts insights={insights} />
            <Recommendations recommendations={insights.recommendations} />
          </motion.div>
        ) : (
          <div className="no-data">
            <p>Select a domain to view insights</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketInsights;