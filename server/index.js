const Joi     = require('joi')
const express = require("express")
const app     = express()
// const cors    = require('cors') #Not sure if we need this yet, not in package.json

app.use(express.json())
// app.use(cors())

const db = require('./services/shared-db.js')

db.connect()

const wrestlers = [
  { id: 1, name: 'Wrestler 1'},
  { id: 2, name: 'Wrestler 2'},
  { id: 3, name: 'Wrestler 3'}
]

const posts = require('./routes/api/matches')

app.get('/', (req, res) => {res.send(`Hello World\n${JSON.stringify(wrestlers, null, 2)}`)})

app.get('/api/wrestlers', (req, res) => {res.send(wrestlers)})

app.post('/api/wrestlers', (req, res) => {
  const { error } = validateWrestler(req.body) // result.error
  if (error) return res.status(400).send(error.details[0].message)

  const wrestler = {
    id: wrestlers.length + 1,
    name: req.body.name
  }
  wrestlers.push(wrestler)
  res.send(wrestler)
})

app.put('/api/wrestlers/:id', (req, res) => {
  const wrestler = wrestlers.find(c => c.id === parseInt(req.params.id)) // Look up the wrestler
  if (!wrestler) return res.status(404).send('The wrestler with the given ID was not found.') // If not existing, return 404

  const { error } = validateWrestler(req.body) // Validate
  if (error) return res.status(400).send(error.details[0].message) // If invalid, return 400 - Bad Request

  wrestler.name = req.body.name // Update wrestler
  res.send(wrestler) // Return the updated wrestler
})

app.delete('/api/wrestlers/:id', (req, res) => {
  const wrestler = wrestlers.find(c => c.id === parseInt(req.params.id)) // Look up the wrestler
  if (!wrestler) return res.status(404).send('The wrestler with the given ID was not found.') // If not existing, return 404

  const index = wrestlers.indexOf(wrestler)
  wrestlers.splice(index, 1) // Delete
  res.send(wrestler) // Return the same wrestler
})

function validateWrestler(wrestler) {
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(wrestler, schema)
}

// app.get('/api/wrestlers/:id', (req, res) => {
//   const wrestler = wrestlers.find(c => c.id === parseInt(req.params.id))
//   if (!wrestler) return res.status(404).send('The wrestler with the given ID was not found.')
//   res.send(wrestler)
// })

const port = process.env.PORT || 3002
app.listen(port, () => console.log(`Listening on port ${port}!`))
