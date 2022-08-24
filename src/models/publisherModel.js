const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    publisher_id :String,
    Name:String,
    HeadQuarter:String

},{ timestamps: true })

module.exports= mongoose.model('publisher',publisherSchema)