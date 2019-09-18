const express = require('express')
const mongodb = require('mongodb')
const Joi     = require('joi')
const Match      = require('../../models/matchSchema')
const MatchEvent = require('../../models/matchEventSchema')

const router = express.Router()

// ---------------------- GET ALL MATCHES --------------------------
router.get('/', async (req, res) => {
  try {
    matches = await Match.find()
    res.send(matches).status(200)
  } catch (err) {
      res.send(err).status(500) }})

// ---------------------- GET SINGLE MATCH -------------------------
router.get('/:id', async (req, res) => {
  match = await Match.findById(req.params.id)
  res.status(200).send(match) })

// ---------------------- ADD MATCH----------------------------------
router.post('/', async (req, res) => {
  match = new Match({
    wrestler1: req.body.match.wrestler1,
    wrestler2: req.body.match.wrestler2,
    completed: req.body.completed,
    createdAt: new Date() })
  match.save((err) => {
    if (err) {
      res.status(500).send(err)
    } else {
        console.log(`successfully Created a new Match.`)}})
  return res.status(201).send(match._id) })

// ---------------------- ADD MATCH EVENT ----------------------------
router.put('/matchEvent/:id', async (req, res) => {
  const match = await Match.findById(req.params.id)
  matchEvent = new MatchEvent({
    matchId   : req.body.matchId,
    action    : req.body.action,
    matchTime : req.body.matchTime,
    createdAt : new Date() })
  match.events.push(matchEvent)
  match.save((err) => {
    if (err) {
      res.status(500).send(err)
    } else {
        console.log(`successfully added a new Match.`) }})
  return res.status(201).send(matchEvent) })

// ---------------------- DELETE MATCH --------------------------------
router.delete('/:id', async (req, res) => {
  matchDeleted = await Match.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
  console.log('did it did it', matchDeleted)
  if (matchDeleted.deletedCount > 0 ) { res.status(200).send("Successfully deleted wrestler") }
  else if (matchDeleted.ok > 0 ) { res.status(404).send("Wrestler not found in database for this") }
  else {res.status(500).send("Something Broke")} })

// Functions
function validateWrestler(wrestler) {
  const schema = {
    name: Joi.string().min(3).required()
  }
  console.log("Joi Validation: ", Joi.validate(wrestler, schema))
  return Joi.validate(wrestler, schema)
}

module.exports = router
