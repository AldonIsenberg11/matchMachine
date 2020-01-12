const _ = require('lodash')
const mongoose = require('mongoose')

const opts = { toJSON: { virtuals: true } }

const matchSchema = mongoose.Schema({
  matchRules: Object, // rulebookVersion => style: "folkstyle", matchLength: "", periods: ""
  eventId: mongoose.Schema.Types.ObjectId,
  completed: Boolean,
  boutNo: Number,
  startTime: Date,
  referee: Object,
  wrestler1: String,
  wrestler2: String,
  events: {type: [mongoose.Schema.Types.Mixed], default: []},
  matchStatus: String, // started, live, paused, complete
  winner: Object,
  victoryType: String //decision, major decision, pin, techfall, forfeit, disqualification.
}, opts)

matchSchema.virtual('wrestler1Score').get(function () {
  return _.sum(this.events
    .filter((event) => (event.type === "scoring" && event.result.wrestlerAwarded === 'wrestler1'))
    .map((event) => { return (event.result.pointsAwarded || 0) }))
})

matchSchema.virtual('wrestler2Score').get(function () {
  return _.sum(this.events
    .filter((event) => (event.type === "scoring" && event.result.wrestlerAwarded === 'wrestler2'))
    .map((event) => { return (event.result.pointsAwarded || 0) }))
})

const Match = mongoose.model('Match', matchSchema)

module.exports = Match

