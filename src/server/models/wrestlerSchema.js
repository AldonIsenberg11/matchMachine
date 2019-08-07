const mongoose = require('mongoose')

let Schema = mongoose.Schema

let wrestlerSchema = new Schema ({
  usawId           : String,
  email            : {type: String, default: ""},

  name           : {type: String, required: true},
  createdAt      : Date,
  // firstName        : {type: String, required: true},
  // lastName         : {type: String, required: true},
  dob              : Date,
  phone            : String,
  gender           : String,
  address1         : String,
  address2         : String,
  city             : String,
  state            : String,
  zip              : String,
  guardians        : [String]
});

let Wrestler = mongoose.model('Wrestler', wrestlerSchema)

module.exports = Wrestler
