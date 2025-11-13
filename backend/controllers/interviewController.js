const db = require('../config/database');

const getInterviewQuestions = (req, res) => {
    const { domain, difficulty, category } = req.query;

    let query = 'SELECT * FROM interview_questions WHERE 1=1';
    const params = [];

    if (domain) {
        query += ' AND domain = ?';
        params.push(domain);
    }

    if (difficulty && difficulty !== 'All Levels') {
        query += ' AND difficulty_level = ?';
        params.push(difficulty);
    }

    if (category && category !== 'All Categories') {
        query += ' AND category = ?';
        params.push(category);
    }

    query += ' ORDER BY category, difficulty_level';

    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch questions' });
        }
        res.json({ questions: rows });
    });
};

const getQuestionCategories = (req, res) => {
    db.all(
        `SELECT DISTINCT category, domain, difficulty_level 
         FROM interview_questions 
         ORDER BY domain, category, difficulty_level`,
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ categories: rows });
        }
    );
};

const addInterviewQuestion = (req, res) => {
    const { domain, question, answer_guide, difficulty_level, category } = req.body;

    if (!domain || !question) {
        return res.status(400).json({ error: 'Domain and question are required' });
    }

    db.run(
        `INSERT INTO interview_questions (domain, question, answer_guide, difficulty_level, category) 
         VALUES (?, ?, ?, ?, ?)`,
        [domain, question, answer_guide, difficulty_level, category],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to add question' });
            }
            res.status(201).json({ 
                message: 'Question added successfully', 
                id: this.lastID 
            });
        }
    );
};

const getDomains = (req, res) => {
    db.all(
        'SELECT DISTINCT domain FROM interview_questions ORDER BY domain',
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows.map(row => row.domain));
        }
    );
};

module.exports = { 
    getInterviewQuestions, 
    getQuestionCategories, 
    addInterviewQuestion,
    getDomains
};