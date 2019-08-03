// require("@babel/core").transform("code", {
//   plugins: ["@babel/plugin-transform-runtime"]
// })
// require("babel-runtime/regenerator")
// require("webpack-hot-middleware/client")

// const Joi       = require('joi')
const express   = require("express")
const cors      = require('cors')
const path      = require('path')
// const mongoose  = require('mongoose')
const webpack   = require('webpack')
const db        = require('./services/shared-db')
const wrestlers = require('./routes/api/wrestlers')
const users     = require('./routes/api/users')

const app  = express()

//Connect to DB
db.connect()

// Setup webpack Dev Server
const webpackConfig = require('../../webpack.dev.js')
const webpackCompiler = webpack(webpackConfig)
const webpackDevMiddleware = require('webpack-dev-middleware')(webpackCompiler, webpackConfig.devServer)
const webpackHotMiddleware = require('webpack-hot-middleware')(webpackCompiler)

app.use(webpackDevMiddleware)
app.use(webpackHotMiddleware)
// app.use(require("webpack-dev-middleware")(webpackCompiler, {
//   noInfo: true, publicPath: webpackConfig.output.path
// }))
// app.use(require("webpack-hot-middleware")(webpackCompiler))


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

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Express App listening on port ${port}!`))
