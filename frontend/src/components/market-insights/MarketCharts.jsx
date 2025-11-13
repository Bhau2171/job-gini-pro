import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const MarketCharts = ({ insights }) => {
  const { skill_demand_data, job_growth_data, salary_trends } = insights;

  const skillData = skill_demand_data.labels.map((label, index) => ({
    skill: label,
    demand: skill_demand_data.data[index]
  }));

  const growthData = job_growth_data.labels.map((label, index) => ({
    year: label,
    growth: job_growth_data.data[index]
  }));

  const salaryData = salary_trends.labels.map((label, index) => ({
    level: label,
    salary: salary_trends.data[index]
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="market-charts"
    >
      <div className="charts-grid">
        {/* Skill Demand Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="chart-card"
        >
          <h3>Skill Demand</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="demand" fill="#8884d8" name="Demand Score" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Job Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="chart-card"
        >
          <h3>Job Growth Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="growth" 
                stroke="#82ca9d" 
                name="Growth Index"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Salary Trends Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="chart-card"
        >
          <h3>Salary Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Salary']} />
              <Legend />
              <Bar dataKey="salary" fill="#ffc658" name="Annual Salary ($)" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MarketCharts;