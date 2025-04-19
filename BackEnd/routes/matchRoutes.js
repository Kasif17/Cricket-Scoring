const express = require('express');
const router = express.Router();
const { updateScore, createMatch, createBatsman, createBowler } = require('../controllers/matchController');


router.post('/create', createMatch);
router.post('/update', updateScore);

router.post('/addBatsman', createBatsman );

router.post('/addBowler', createBowler);
  

module.exports = router;
