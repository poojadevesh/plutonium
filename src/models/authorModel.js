const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  authorName:String,
  authorId:Number,
  age:String,
  address:String

},{ timestamps: true })

module.exports = mongoose.model('Author', authorSchema)