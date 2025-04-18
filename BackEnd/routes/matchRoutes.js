const express = require('express');
const router = express.Router();
const { createMatch, addBall } = require('../controllers/matchController');

router.post('/create', createMatch);
router.post('/ball', addBall);

module.exports = router;
