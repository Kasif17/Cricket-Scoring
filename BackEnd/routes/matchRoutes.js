const express = require('express');
const router = express.Router();
const { updateScore, createMatch } = require('../controllers/matchController');


router.post('/create', createMatch);
router.post('/update', updateScore);

module.exports = router;
