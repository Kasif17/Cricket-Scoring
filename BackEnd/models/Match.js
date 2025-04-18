const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  teamScore: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  overs: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  striker: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  nonStriker: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  bowler: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  extras: {
    wide: { type: Number, default: 0 },
    noBall: { type: Number, default: 0 },
    bye: { type: Number, default: 0 },
    legBye: { type: Number, default: 0 },
  },
  commentary: [String],
});

module.exports = mongoose.model('Match', matchSchema);

// const mongoose = require('mongoose');

// const extraSchema = {
//   wide: Number,
//   noBall: Number,
//   bye: Number,
//   legBye: Number
// };

// const ballSchema = new mongoose.Schema({
//   ballNumber: String,
//   outcome: String,
//   runs: Number,
//   extras: extraSchema,
//   batsman: String,
//   bowler: String,
//   commentary: String
// }, { timestamps: true });

// const matchSchema = new mongoose.Schema({
//   teamA: String,
//   teamB: String,
//   tossWinner: String,
//   electedTo: String,
//   innings: [{
//     battingTeam: String,
//     score: Number,
//     wickets: Number,
//     overs: Number,
//     balls: [ballSchema]
//   }]
// }, { timestamps: true });

// module.exports = mongoose.model('Match', matchSchema);
