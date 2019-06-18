import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let wrestlerSchema = new Schema ({
  usawId           : String,
  email            : String,
  firstName        : String,
  lastName         : String,
  dob              : Date,
  phone            : String,
  gender           : String,
  address1         : String,
  address2         : String,
  city             : String,
  state            : String,
  zip              : String,
  parentFirstName  : String,
  parentLastName   : String,
  parentEmail      : String,
  parent2FirstName : String,
  parent2LastName  : String,
  parent2Email     : String
});

let Wrestler = mongoose.model('Wrestler', wrestlerSchema);

module.exports = Wrestler;
