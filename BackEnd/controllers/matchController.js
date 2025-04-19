const Match = require('../models/Match');
const Player = require('../models/Player');

const updateScore = async (req, res) => {
  const {
    matchId,
    runs = 0,
    overthrow = 0,
    bye = false,
    legbye = false,
    wide = false,
    noball = false,
    wicket = false,
  } = req.body;

  try {
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }

    const striker = await Player.findById(match.striker);
    const nonStriker = await Player.findById(match.nonStriker);
    const bowler = await Player.findById(match.bowler);

    let totalRuns = runs + overthrow;
    let commentary = '';

    if (wide) {
      match.extras.wide += totalRuns;
      match.teamScore += totalRuns;
      commentary = `Wide + ${totalRuns} run(s)`;
    } else if (noball) {
      match.extras.noBall += 1;
      match.teamScore += 1;
      bowler.runs += 1;
      commentary = `No ball`;

      if (bye) {
        match.extras.bye += runs;
        match.teamScore += runs;
        commentary += ` + bye ${runs}`;
      } else if (legbye) {
        match.extras.legBye += runs;
        match.teamScore += runs;
        commentary += ` + legbye ${runs}`;
      } else {
        striker.runs += runs;
        striker.balls += 1;
        match.teamScore += runs;
        bowler.runs += runs;
        commentary += ` + ${runs} run(s)`;
      }
    } else if (bye) {
      match.extras.bye += totalRuns;
      match.teamScore += totalRuns;
      commentary = `Bye + ${totalRuns}`;
    } else if (legbye) {
      match.extras.legBye += totalRuns;
      match.teamScore += totalRuns;
      commentary = `Leg Bye + ${totalRuns}`;
    } else if (wicket) {
      match.wickets += 1;
      striker.isOut = true;
      striker.balls += 1;
      commentary = 'Wicket!';
    } else {
      striker.runs += runs;
      striker.balls += 1;
      bowler.runs += totalRuns;
      match.teamScore += totalRuns;
      commentary = `${runs} run(s)`;
    }

if (!wide && !noball) {
    match.balls += 1;
    bowler.balls += 1;
  
    const currentOver = `${match.overs}.${match.balls}`;
  
    const fullOvers = Math.floor(bowler.balls / 6);
    const remainingBalls = bowler.balls % 6;
    bowler.overs = parseFloat(`${fullOvers}.${remainingBalls}`);
  
    if (match.balls === 6) {
      match.overs += 1;
      match.balls = 0;
  
      const temp = match.striker;
      match.striker = match.nonStriker;
      match.nonStriker = temp;
    }
  
  
    const detailedCommentary = `${currentOver} ${bowler.name} to ${striker.name}, ${runs} run(s)`;
    match.commentary.push(detailedCommentary);
  } else {
    
    const currentOver = `${match.overs}.${match.balls}`;
    const event = wide ? 'Wide' : noball ? 'No Ball' : bye ? 'Bye' : legbye ? 'Leg Bye' : 'Delivery';
    const detailedCommentary = `${currentOver} ${bowler.name} to ${striker.name}, ${event} + ${runs}`;
    match.commentary.push(detailedCommentary);
  }



    if (runs % 2 === 1 && !bye && !legbye && !wide) {
      const temp = match.striker;
      match.striker = match.nonStriker;
      match.nonStriker = temp;
    }


    await striker.save();
    await nonStriker.save();
    await bowler.save();
    await match.save();

    const populatedMatch = await Match.findById(match._id)
      .populate('striker')
      .populate('nonStriker')
      .populate('bowler');

    req.io.emit('scoreUpdate', populatedMatch); 

    res.json({ success: true, match: populatedMatch });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error updating score' });
  }
};

const createMatch = async (req, res) => {
  const { striker, nonStriker, bowler } = req.body;

  if (!striker || !nonStriker || !bowler) {
    return res.status(400).json({ success: false, message: "All players are required." });
  }

  try {
    const strikerPlayer = new Player({ name: striker });
    const nonStrikerPlayer = new Player({ name: nonStriker });
    const bowlerPlayer = new Player({ name: bowler });

    await strikerPlayer.save();
    await nonStrikerPlayer.save();
    await bowlerPlayer.save();

    const match = new Match({
      striker: strikerPlayer._id,
      nonStriker: nonStrikerPlayer._id,
      bowler: bowlerPlayer._id,
    });

    await match.save();

    res.status(201).json({
      success: true,
      message: "Match created successfully.",
      matchId: match._id,
    });
  } catch (err) {
    console.error("Create Match Error:", err.message);
    res.status(500).json({ success: false, message: "Error creating match" });
  }
};

const createBatsman = async (req, res) => {
    try {
      const { matchId, name } = req.body;
  
      if (!matchId || !name) {
        return res.status(400).json({ success: false, message: "matchId and name are required." });
      }
  
      const match = await Match.findById(matchId);
      if (!match) {
        return res.status(404).json({ success: false, message: "Match not found." });
      }
  
      const player = new Player({ name });
      await player.save();
  
      
      match.striker = player._id; 
      await match.save();
  
      res.status(201).json({ success: true, player });
    } catch (error) {
      console.error("Error in createBatsman:", error);
      res.status(500).json({ success: false, message: "Server error." });
    }
  };
  

  const createBowler = async (req, res) => {
    try {
      const { matchId, name } = req.body;
  
    
      if (!matchId || !name) {
        return res.status(400).json({ success: false, message: "matchId and name are required." });
      }
  
      const match = await Match.findById(matchId);
      if (!match) {
        return res.status(404).json({ success: false, message: "Match not found." });
      }
  
   
      const player = new Player({ name, role: 'bowler' }); 
      await player.save();
  
     
      match.bowler = player._id; 
      await match.save();
  
      
      res.status(201).json({ success: true, player });
    } catch (error) {
      console.error("Error in createBowler:", error);
      res.status(500).json({ success: false, message: "Server error." });
    }
  };
  
module.exports = { updateScore, createMatch ,createBatsman, createBowler };


