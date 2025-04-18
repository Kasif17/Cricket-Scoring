const Match = require('../models/Match');

exports.createMatch = async (req, res) => {
  try {
    const newMatch = new Match(req.body);
    await newMatch.save();
    res.status(201).json(newMatch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addBall = async (req, res) => {
    try {
      const { matchId, inningsIndex, ball } = req.body;
      const match = await Match.findById(matchId);
  
      match.innings[inningsIndex].balls.push(ball);
      match.innings[inningsIndex].score += ball.runs;
      if (ball.outcome === 'Wicket') {
        match.innings[inningsIndex].wickets += 1;
      }
  
      await match.save();
  
      const io = req.app.get('io');
      io.to(matchId).emit('matchUpdated', match); // Emit real-time update
  
      res.status(200).json(match);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
