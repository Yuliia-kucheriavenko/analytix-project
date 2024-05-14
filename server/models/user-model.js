const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
  name: {type: String,require: true},
  email: {type: String, unique: true, require: true},
  password: {type: String, require: true},
  role: {type: String, require: true},
  isActivated: {type: Boolean, default: true},
  activationLink: {type: String},
})

module.exports = model('User', UserSchema);