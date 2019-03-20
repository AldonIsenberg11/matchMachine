const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get matches
router.get('/', async (req, res) => {
  const wrestlers = await loadWrestlerCollection()
  res.send(await wrestlers.find({}).toArray())
})

// Add matches

// Delete matches

// functions
async function loadWrestlerCollection() {
  const client = await mongodb.MongoClient.connect
  ('mongodb+srv://aldonisenberg11:betterAskJeeves@cluster0-dckjl.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
  })

  return client.db('wrestledb').collection('wrestlers')
}

module.exports = router
