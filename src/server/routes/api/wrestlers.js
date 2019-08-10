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
