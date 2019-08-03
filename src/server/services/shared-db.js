const mongoose = require('mongoose')
const colors = require('colors')

let handleFailure = function() {
  console.log("There was an error".bold.red.bgWhite);
  return process.exit(1)
}

module.exports = {
  connect: function() {

    let connection = mongoose.connection

    mongoose.connection.on("error", handleFailure)
    mongoose.connection.on("open", function() {
      console.log(`MongoDB connected to[${connection.db.databaseName}]`.grey.bgRed)
    })
    mongoose.connect(process.env.MONGO_CLIENT_WRESTLEDB, { useNewUrlParser : true } )
  }
  //TO DO: Add disconnect for future CLI tasks
}
