const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const JWT_SECRET = process.env.JWT_SECRET || 'career-guidance-secret-key';

const register = async (req, res) => {
    const { email, password, firstName, lastName, domain, experienceLevel } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        
        db.run(
            `INSERT INTO users (email, password, first_name, last_name, domain, experience_level) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [email, hashedPassword, firstName, lastName, domain, experienceLevel],
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ error: 'User with this email already exists' });
                    }
                    return res.status(500).json({ error: 'Database error' });
                }
                
                const token = jwt.sign(
                    { userId: this.lastID, email }, 
                    JWT_SECRET, 
                    { expiresIn: '24h' }
                );
                
                res.status(201).json({
                    message: 'User created successfully',
                    token,
                    user: { 
                        id: this.lastID, 
                        email, 
                        firstName, 
                        lastName, 
                        domain, 
                        experienceLevel 
                    }
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Server error during registration' });
    }
};

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );
        
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                domain: user.domain,
                experienceLevel: user.experience_level
            }
        });
    });
};

const getProfile = (req, res) => {
    const userId = req.user.userId;

    db.get('SELECT id, email, first_name, last_name, domain, experience_level FROM users WHERE id = ?', 
    [userId], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    });
};

module.exports = { register, login, getProfile };