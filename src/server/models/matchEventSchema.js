const mongoose = ('mongoose')
const Schema   = mongoose.Schema

let matchActionSchema = new Schema({
  matchId: Schema.Types.ObjectId, // The ObjectId of the Match this belongs in
  date: Date,                     // Used as a timestamp
  period: Number,                 // The current period (currently overtime will be 4,5,6, etc.)
  action: String,                 // Red Score, Red Penalty, Blue Score, Blue Penalty, period start, period end
  redScore: Number,               // Current score
  blueScore: Number,              // Current score
  matchClock: String,             // Current time
  periodEnd: Boolean,             // Did this action cause the period to end?
  matchEnd: Boolean               // Did this action cause the match to end.
})

const MatchAction = mongoose.model('MatchAction', matchActionSchema)

module.exports = MatchAction
module.exports.Schema = matchActionSchema
