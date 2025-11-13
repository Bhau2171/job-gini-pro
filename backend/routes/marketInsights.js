const express = require('express');
const { getMarketInsights, getDomains } = require('../controllers/marketInsightsController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/domains', authenticateToken, getDomains);
router.get('/:domain', authenticateToken, getMarketInsights);

module.exports = router;