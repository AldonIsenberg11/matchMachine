const mongoose = require('mongoose')
const Schema   = mongoose.Schema

let matchActionSchema = new Schema({
  matchId   : Schema.Types.ObjectId, // The ObjectId of the Match this belongs in
  type      : String,                // ['scoring', 'timer', 'penalty', 'custom']
  action    : String,                // [Red Score, Red Penalty, Blue Score, Blue Penalty, start, stop]
  matchTime : String,                // Current time
  createdAt : Date,                  // Used as a timestamp
  result    : Object                 // Will contain action outcomes
})

const MatchAction = mongoose.model('MatchAction', matchActionSchema)

module.exports = MatchAction
module.exports.Schema = matchActionSchema
