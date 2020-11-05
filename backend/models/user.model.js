const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")


//schema of users
const userSchema = mongoose.Schema({
  email:{type:String, require:true, unique:true},
  password:{type:String, require:true}
})

userSchema.plugin(uniqueValidator)

module.exports =   mongoose.model('User',userSchema)
