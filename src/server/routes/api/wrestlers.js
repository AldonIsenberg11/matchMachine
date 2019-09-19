const express = require('express')
const mongodb = require('mongodb')
const Joi     = require('joi')

const router = express.Router()

// Mongoose Wrestler model
const Wrestlers = require('../../models/wrestlerSchema')


// Get matches
router.get('/', async (req, res) => {
  res.send(await Wrestlers.find())
})

// Get match
router.get('/:id', async (req, res) => {
  wrestler = await Wrestlers.findById(req.params.id)
  console.log("Wrestler found from Database: ", JSON.stringify(wrestler, null, 2))
  res.status(200).send(wrestler)
})

// Add matches
router.post('/', async (req, res) => {
  const { error } = validateWrestler(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  wrestler = new Wrestlers({
    name: req.body.name,
    createdAt: new Date()
  })

  wrestler.save((err) => {
    if (err) return err
  })

  res.status(201).send(`Successfully added wrestler: ${req.body.name}`)
})

// Delete matches
router.delete('/:id', async (req, res) => {
  // const wrestlers = await loadWrestlerCollection()
  await Wrestlers.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
  console.log('did it did it')
  res.status(200).send("Successfully deleted wrestler")
})


// Functions

function validateWrestler(wrestler) {
  const schema = {
    name: Joi.string().min(3).required()
  }
  console.log("Joi Validation: ", Joi.validate(wrestler, schema))
  return Joi.validate(wrestler, schema)
}

module.exports = router
