mongoose       = require 'mongoose'
hasher         = require '../services/hasher'
constants      = require '../services/constants'
Carrier        = require './carrier'
keygen         = require '../services/keygen'

# Schema -----------------------------------------------------------------------

UserSchema = new mongoose.Schema
  username      : type: String
  password      : String
  apiKey        : type: String, default: keygen
  created       : type: Date, default: Date.now
  registered    : type: Date, default: null
  firstName     : String
  middleName    : String
  lastName      : String
  suffix        : String
  phone         : String
  preferences   : Object
  parentId      : type: Object, default: null
  coachId       : type: Object, default: null
  refereeId     : type: Object, default: null
  permissions   : type: [String], enum: constants.userPermissions, default: ['free', 'basic', 'advanced']
  recover:
    code    : type: String
    date    : Date
    expires : Date
  direct:
    code    : type: String
    date    : Date
    expires : Date
  lastLogin : Date
  crm:
    id : String
  marketing:
    subscribed: type: Boolean, default: true

# output the virtual getters when calling toJSON
AccountUserSchema.set 'toJSON', {getters : true}

# Virtuals ---------------------------------------------------------------------

AccountUserSchema.virtual('fullName').get ->
  name = "#{@firstName or ''} #{@lastName or ''}".trim()
  unless name.length then name = @username
  name

AccountUserSchema.virtual('email').get ->
  @username

# Methods ----------------------------------------------------------------------

#sets this instance password and calls back with the resulting hashed password; does not save!
AccountUserSchema.methods.setPassword = (password, cb) ->
  hasher.hash password, (err, result) =>
    if err then return cb err
    @password = result
    cb null, @password

#compare passwords
AccountUserSchema.methods.checkPassword = (password, done) ->
  hasher.compare password, @password, done

AccountUserSchema.methods.hasPermission = (permission) ->
  return true if @owner
  return true if @permissions?.indexOf(permission) >= 0
  return false

AccountUserSchema.methods.toPublicObj = ->
  tmp = @.toJSON()
  _id            : tmp.id
  username       : tmp.username
  firstName      : tmp.firstName
  lastName       : tmp.lastName
  fullName       : tmp.fullName
  title          : tmp.title
  phone          : tmp.phone
  preferences    : tmp.preferences or {}
  created        : tmp.created
  registered     : tmp.registered
  lastLogin      : tmp.lastLogin
  owner          : tmp.owner
  permissions    : tmp.permissions
  stats          : tmp.stats
  recent         : tmp.recent
  marketing      : tmp.marketing
  rate_modifier  : tmp.rate_modifier
  savedViews     : tmp.savedViews

# Exports ----------------------------------------------------------------------

module.exports = mongoose.model 'AccountUser', AccountUserSchema
module.exports.Schema = AccountUserSchema
