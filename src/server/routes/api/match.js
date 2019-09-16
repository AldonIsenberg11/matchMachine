const express = require('express')
const mongodb = require('mongodb')
const Joi     = require('joi')

const router = express.Router()

// Mongoose Wrestler model
const Match = require('../../models/matchSchema')


// Get matches
router.get('/', async (req, res) => {
  try {
    matches = await Match.find()
    res.send(matches).status(200)
  } catch (err) {
    res.send(err).status(500)
  }
})

// Get match
router.get('/:id', async (req, res) => {
  match = await Match.findById(req.params.id)
  res.status(200).send(match)
})

// Add matches
router.post('/', async (req, res) => {
//   const { error } = validateWrestler(req.body)
//   if (error) return res.status(400).send(error.details[0].message)

  match = new Match({
    wrestler1: req.body.wrestler1,
    wrestler2: req.body.wrestler2,
    createdAt: new Date()
  })

  console.log("New Match", JSON.stringify(match, null, 2), "\n\n\n")

  match.save((err) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log(`successfully Created a new Match.`)
    }
  })

  return res.status(201).send(match._id)
})


// Update matches

// router.put('/:id', (req, res) => {
//   const wrestler = wrestlers.find(c => c.id === parseInt(req.params.id)) // Look up the wrestler
//   if (!wrestler) return res.status(404).send('The wrestler with the given ID was not found.') // If not existing, return 404

//   const { error } = validateWrestler(req.body) // Validate
//   if (error) return res.status(400).send(error.details[0].message) // If invalid, return 400 - Bad Request

//   wrestler.name = req.body.name // Update wrestler
//   res.send(wrestler) // Return the updated wrestler
// })




// Delete matches
router.delete('/:id', async (req, res) => {
  // const wrestlers = await loadWrestlerCollection()
  await Match.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
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
