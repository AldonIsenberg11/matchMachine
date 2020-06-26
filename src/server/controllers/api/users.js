// const bcrypt  = require('bcrypt')
const express = require('express')
const mongodb = require('mongodb')
const Joi     = require('joi')

const router = express.Router()

// Get users
router.get('/', async (req, res) => {
  const users = await loadUserCollection()
  res.send(await users.find({}).toArray())
})

// Add user
router.post('/', async (req, res) => {

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
  return Joi.validate(user, schema)
}

async function loadUserCollection() {
  const client = await mongodb.MongoClient.connect(encodeURI(process.env.MONGO_CLIENT_WRESTLEDB), {
    useNewUrlParser: true
  })
  return client.db('wrestledb').collection('users')
}

module.exports = router
