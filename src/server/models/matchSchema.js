const mongoose = require('mongoose')

let Schema = mongoose.Schema

let matchSchema = new Schema({
  eventId: Schema.Types.ObjectId,
  completed: Boolean,
  boutNo: Number,
  startTime: Date,
  referee: Object,
  wrestler1: String,
  wrestler2: String,
  // actions: [matchAction],
  matchStatus: String, // started, live, paused, complete
  winner: Object,
  victoryType: String, //decision, major decision, pin, techfall, forfeit, disqualification.
})

const Match = mongoose.model('Match', matchSchema)

module.exports = Match

