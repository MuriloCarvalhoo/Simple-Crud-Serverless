const mongoose = require('mongoose');

// const database = require("../connect");

const UserSchema = new mongoose.Schema({  
  name: String,
  password: String,
  cpf: String,
  email: String,
  dataNascimento: String,
});
module.exports = mongoose.model('User', UserSchema);
