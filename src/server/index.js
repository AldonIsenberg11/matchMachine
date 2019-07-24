const Joi       = require('joi')
const express   = require("express")
const cors      = require('cors')
const path      = require('path')
const mongoose  = require('mongoose')
const db        = require('./services/shared-db')
const wrestlers = require('./routes/api/wrestlers')
const users     = require('./routes/api/users')

const app       = express()

db.connect()
// DB Config
// const db = process.env.MONGO_CLIENT

// mongoose.connect(process.env.MONGO_CLIENT, { useNewUrlParser: true })
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err))

// let db = mongoose.connection

// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', () => { console.log("MONGOOSE: Once Open")})


// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/wrestlers', wrestlers)
app.use('/api/users', users)

// Static folder
app.use(express.static(path.resolve(__dirname, '../../dist/')))

// Handle SPA
app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname, '../../dist/index.html')))

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Express App listening on port ${port}!`))
