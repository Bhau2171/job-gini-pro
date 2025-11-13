const db = require('../config/database');

const getMarketInsights = (req, res) => {
    const { domain } = req.params;

    db.get(
        'SELECT * FROM market_insights WHERE domain = ?',
        [domain],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            
            if (!row) {
                return res.status(404).json({ error: 'No insights found for this domain' });
            }

            // Parse JSON strings back to objects
            const insights = {
                ...row,
                skill_demand_data: JSON.parse(row.skill_demand_data),
                job_growth_data: JSON.parse(row.job_growth_data),
                salary_trends: JSON.parse(row.salary_trends),
                recommendations: JSON.parse(row.recommendations)
            };

            res.json(insights);
        }
    );
};

const getDomains = (req, res) => {
    db.all(
        'SELECT DISTINCT domain FROM market_insights ORDER BY domain',
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows.map(row => row.domain));
        }
    );
};

module.exports = { getMarketInsights, getDomains };