const express = require('express')
const mongodb = require('mongodb')
const Joi     = require('joi')

const router = express.Router()

// Get matches
router.get('/', async (req, res) => {
  console.log(`\n\nGetting wrestlers:\n${JSON.stringify(req.body, null, 2)}\n\n`)
  // res.send('Hellooooo')
  const wrestlers = await loadWrestlerCollection()
  res.send(await wrestlers.find({}).toArray())
})

// Add matches
router.post('/', async (req, res) => {
  console.log("Posting wrestler:\n\nreq.body: ", JSON.stringify(req.body, null, 2))

  const { error } = validateWrestler(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const wrestlers = await loadWrestlerCollection()

  await wrestlers.insertOne({
    name: req.body.name,
    createdAt: new Date()
  })
  res.status(201).send(`Successfully added wrestler: ${req.body.name}`)
  // const { error } = validateWrestler(req.body) // result.error
  // if (error) return res.status(400).send(error.details[0].message)

  // const wrestler = {
  //   id: wrestlers.length + 1,
  //   name: req.body.name
  // }

  // wrestlers.push(wrestler)

  // res.send(wrestler)
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
  const wrestlers = await loadWrestlerCollection()
  await wrestlers.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
  res.status(200).send("Successfully deleted wrestler")



  // const wrestler = wrestlers.find(c => c.id === parseInt(req.params.id)) // Look up the wrestler
  // if (!wrestler) return res.status(404).send('The wrestler with the given ID was not found.') // If not existing, return 404

  // const index = wrestlers.indexOf(wrestler)
  // wrestlers.splice(index, 1) // Delete
  // res.send(wrestler) // Return the same wrestler
})




// Functions

function validateWrestler(wrestler) {
  const schema = {
    name: Joi.string().min(3).required()
  }
  console.log("Joi Validation: ", Joi.validate(wrestler, schema))
  return Joi.validate(wrestler, schema)
}



async function loadWrestlerCollection() {
  console.log(`LOADING wrestlers`)
  const client = await mongodb.MongoClient.connect(encodeURI(process.env.MONGO_CLIENT), {
    useNewUrlParser: true
  })
  return client.db('wrestledb').collection('wrestlers')
}





module.exports = router
