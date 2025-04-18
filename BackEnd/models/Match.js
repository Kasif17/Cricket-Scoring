const mongoose = require('mongoose');

const extraSchema = {
  wide: Number,
  noBall: Number,
  bye: Number,
  legBye: Number
};

const ballSchema = new mongoose.Schema({
  ballNumber: String,
  outcome: String,
  runs: Number,
  extras: extraSchema,
  batsman: String,
  bowler: String,
  commentary: String
}, { timestamps: true });

const matchSchema = new mongoose.Schema({
  teamA: String,
  teamB: String,
  tossWinner: String,
  electedTo: String,
  innings: [{
    battingTeam: String,
    score: Number,
    wickets: Number,
    overs: Number,
    balls: [ballSchema]
  }]
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
