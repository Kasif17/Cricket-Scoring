const express = require('express');
const router = express.Router();
const { updateScore, createMatch } = require('../controllers/matchController');


router.post('/create', createMatch);
router.post('/update', updateScore);
// POST /api/match/addBatsman
router.post('/addBatsman', async (req, res) => {
    const { matchId, name } = req.body;
    const match = await Match.findById(matchId);
    const player = new Player({ name });
    await player.save();
  
    match.striker = player._id; // or match.nextBatsman
    await match.save();
  
    res.json({ success: true, player });
  });

  // POST /api/match/addBowler
router.post('/addBowler', async (req, res) => {
    const { matchId, name } = req.body;
    const match = await Match.findById(matchId);
    const player = new Player({ name });
    await player.save();
  
    match.bowler = player._id;
    await match.save();
  
    res.json({ success: true, player });
  });
  

module.exports = router;
