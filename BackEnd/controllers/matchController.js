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

    // Count legitimate delivery
    if (!wide && !noball) {
      match.balls += 1;
      if (match.balls === 6) {
        match.overs += 1;
        match.balls = 0;
      }
    }

    // Strike rotation
    if (runs % 2 === 1 && !bye && !legbye && !wide) {
      const temp = match.striker;
      match.striker = match.nonStriker;
      match.nonStriker = temp;
    }

    match.commentary.push(commentary);

    // Save all documents
    await striker.save();
    await nonStriker.save();
    await bowler.save();
    await match.save();

    req.io.emit('scoreUpdate', match); // Emit real-time update

    res.json({ success: true, match });
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

module.exports = { updateScore , createMatch };
