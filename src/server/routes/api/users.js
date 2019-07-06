const bcrypt  = require('bcrypt')
const express = require('express')
const mongodb = require('mongodb')
const Joi     = require('joi')

const router = express.Router()

// Get users
router.get('/', async (req, res) => {
  console.log(`\n\nGetting users:\n${JSON.stringify(req.body, null, 2)}\n\n`)

  const users = await loadUserCollection()
  res.send(await users.find({}).toArray())
})

// Add user
router.post('/', async (req, res) => {
  console.log("Posting user:\n\nreq.body: ", JSON.stringify(req.body, null, 2))

  // Hash Password


  const { error } = validateUser(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const users = await loadUserCollection()

  await users.insertOne({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    createdAt: new Date()
  })
  res.status(201).send(`Successfully added user: ${req.body.name}: ${req.body.email}!`)
})




// Update user


// Delete user
router.delete('/:id', async (req, res) => {
  const users = await loadUserCollection()
  await users.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
  res.status(200).send("Successfully deleted user")
})




// Functions

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    password: Joi.string().min(4).required()
  }
  console.log("Joi Validation: ", Joi.validate(user, schema))
  return Joi.validate(user, schema)
}



async function loadUserCollection() {
  console.log(`LOADING users`)
  const client = await mongodb.MongoClient.connect(encodeURI(process.env.MONGO_CLIENT), {
    useNewUrlParser: true
  })
  return client.db('wrestledb').collection('users')
}





module.exports = router
