const express   = require("express")
const cors      = require('cors')
const path      = require('path')
const db        = require('./services/shared-db')
const wrestlers = require('./routes/api/wrestlers')
const users     = require('./routes/api/users')

const app  = express()

//Connect to DB
db.connect()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/wrestlers', wrestlers)
app.use('/api/users', users)

// Static folder
app.use(express.static(path.resolve(__dirname, '../../dist/')))

// Handle SPA
app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')))

const port = process.env.PORT || 8081
app.listen(port, () => console.log(`Express App listening on port ${port}!`))
