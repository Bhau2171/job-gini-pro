const db = require('../config/database');

const saveResume = (req, res) => {
    const { resumeData } = req.body;
    const userId = req.user.userId;

    if (!resumeData) {
        return res.status(400).json({ error: 'Resume data is required' });
    }

    db.run(
        `INSERT OR REPLACE INTO resumes (user_id, resume_data, updated_at) 
         VALUES (?, ?, CURRENT_TIMESTAMP)`,
        [userId, JSON.stringify(resumeData)],
        function(err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to save resume' });
            }
            res.json({ 
                message: 'Resume saved successfully', 
                id: this.lastID 
            });
        }
    );
};

const getResume = (req, res) => {
    const userId = req.user.userId;

    db.get(
        'SELECT * FROM resumes WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1',
        [userId],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            
            if (!row) {
                return res.json({ resumeData: null });
            }

            res.json({ 
                resumeData: JSON.parse(row.resume_data),
                lastUpdated: row.updated_at
            });
        }
    );
};

module.exports = { saveResume, getResume };