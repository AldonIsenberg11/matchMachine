const Joi       = require('joi')
const express   = require("express")
const cors      = require('cors')
const path      = require('path')
const wrestlers = require('./routes/api/wrestlers')
const users     = require('./routes/api/users')

const app       = express()

//Middleware
app.use(express.json())
app.use(cors())

//Import routes
app.use('/api/wrestlers', wrestlers)
app.use('/api/users', users)

// Static folder
app.use(express.static(path.resolve(__dirname, '../../dist/')))

// Handle SPA
app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname, '../../dist/index.html')))

const port = process.env.PORT || 8081
app.listen(port, () => console.log(`Express App listening on port ${port}!`))
