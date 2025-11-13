const express = require('express');
const { saveResume, getResume } = require('../controllers/resumeController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, saveResume);
router.get('/', authenticateToken, getResume);

module.exports = router;