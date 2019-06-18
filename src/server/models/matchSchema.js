const mongoose = ('mongoose')
const Schema   = mongoose.Schema

// Internal dependencies
// ------------------------------------------------------------------------

matchAction = require('./matchAction').Schema

// Schema
// ------------------------------------------------------------------------

let matchEventSchema = new Schema({
  _id: Schema.Types.ObjectId,
  eventId: Schema.Types.ObjectId,
  boutNo: Number,
  startTime: Date,
  referee: Object,
  redWrestler: Object,
  blueWrestler: Object,
  actions: [matchAction],
  matchStatus: String, // started, live, paused, complete
  winner: Object,
  victoryType: String, //decision, major decision, pin, techfall, forfeit, disqualification.
})

const MatchEvent = mongoose.model('MatchEvent', matchEventSchema)

module.exports = MatchEvent
