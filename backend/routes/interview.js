const express = require('express');
const { 
    getInterviewQuestions, 
    getQuestionCategories, 
    addInterviewQuestion 
} = require('../controllers/interviewController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/questions', authenticateToken, getInterviewQuestions);
router.get('/categories', authenticateToken, getQuestionCategories);
router.post('/questions', authenticateToken, addInterviewQuestion);

module.exports = router;